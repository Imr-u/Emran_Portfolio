const cyclistic = {
scraper: `import requests
from bs4 import BeautifulSoup
import pandas as pd
import os 
from datetime import datetime


URL = "https://corporate.ethiopianairlines.com/AboutEthiopian/careers/results"
Headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36" ,"Accept-Encoding": "gzip, deflate, br, zstd",  "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1" }

page = requests.get(URL, headers = Headers)

soup = BeautifulSoup(page.content, "html.parser")


results = []
scrape_time = datetime.now().strftime("%Y-%m-%d")
job_items = soup.find_all("li")

for item in job_items:
    header = item.find("div", class_="card-header")
    if not header:
        continue  # not a real posting

    # Extract simple text fields
    title_tag = header.find("strong", string=lambda x: x and "Postion" in x)
    location_tag = header.find("strong", string=lambda x: x and "Location" in x)
    announcement_tag = header.find("strong", string=lambda x: x and "Announcement" in x)

    # Clean values
    def clean_next_text(tag):
        if not tag:
            return None
        # text is often inside the next_sibling
        return tag.next_sibling.strip().replace("\xa0", " ")

    job_title = clean_next_text(title_tag)
    location = clean_next_text(location_tag)
    announcement = clean_next_text(announcement_tag)

    # Move into the collapsible body (candidate part)
    panel_body = item.find("div", class_="panel-body")
    candidate_list = []

    # Locate the DATE & TIME section
    date_time_p = None
    
    for p in item.find_all("p"):
        u = p.find("u")
        if u and "DATE & TIME" in u.get_text(strip=True).upper():
            date_time_p = p
            break
    
    # Extract the actual date/time values
    if date_time_p:
        date_parts = [b.get_text(" ", strip=True) for b in date_time_p.find_all("b")]
        date_time = " ".join(date_parts) if date_parts else None
    else:
        date_time = None

    if panel_body:
        table = panel_body.find("table")
        if table:
            for row in table.find_all("tr"):
                cols = row.find_all("td")
                if len(cols) >= 2:
                    # td0 = index, td1 = candidate name
                    candidate_name = cols[1].get_text(strip=True)
                    candidate_list.append(candidate_name)

    results.append({
        "job_title": job_title,
        "location": location,
        "scrape_time": scrape_time,
        "date_time": date_time,
        "announcement": announcement,
        "candidates": candidate_list,
        
    })

df_new = pd.DataFrame(results)
if os.path.exists("result.jsonl"):
    df_old = pd.read_json("result.jsonl", lines = True)
else:
    df_old = pd.DataFrame(columns=df_new.columns)

# Merge and remove duplicates (by Position + Registration Date)
df_combined = pd.concat([df_old, df_new], ignore_index=True)
df_clean = df_combined.drop_duplicates(subset=["job_title", "announcement","location","date_time"], keep ='first')

# Save the updated file
df_clean.to_json("result.jsonl", orient="records", lines= True ,index=False)`,

scheduler: `name: Results Scraper Every 1 Days

on:
  schedule:
    - cron: '0 1 * * *'   # Every 1 days 
  workflow_dispatch:         # (optional) Manual trigger from GitHub

permissions:
  contents: write
  
jobs:
  scrape:
    runs-on: ubuntu-latest

    steps:
    - name: 📦 Checkout repository
      uses: actions/checkout@v3

    - name: 🐍 Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: 📚 Install dependencies
      run: |
        pip install -r requirements.txt

    - name: 🧹 Run the scraper script
      working-directory: result_list
      run: |
        python result.py

    - name: 💾 Commit Jsonl if changed
      working-directory: result_list
      run: |
        git config --global user.name "github-actions[bot]"
        git config --global user.email "github-actions[bot]@users.noreply.github.com"
        git add result.jsonl
        git commit -m "🔄 Update result list $(date '+%Y-%m-%d %H:%M')" || echo "No changes to commit"
        git push
      continue-on-error: true  # Prevents failure if there's nothing to commit`,

normalizer: `import os
import pandas as pd
import datetime
import re
from dateutil import parser
path_file =(r"C:\Users\hp\Desktop\ET-Airlines\result_list\result.jsonl")
file = pd.read_json(path_file, lines = True)
file["candidates"] = file["candidates"].apply(len)
file["job_title"] = file["job_title"].str.lower()
file["date_time"] = file["date_time"].str.lower()
file["location"] = file["location"].str.lower()
file["announcement"] = file["announcement"].str.lower()

def trainee(title):
    if not isinstance(title, str):
        return None
    is_trainee = title.lower()

    # check if the title containes any 'trainee' in it
    # If it contains that string then it is announcment for trainee's 
    # We will create a column called title then we will assign 'trainee' or 'job' applicants
    if "trainee" in is_trainee:
        return "trainee"
    else:
        return "job"

file["position"] = file["job_title"].apply(trainee)

def normalize_titles(title):
    if not isinstance(title, str):
        return None
    
    t = title.lower()

    # remove location indicators like "- jigjiga", "- hawassa", etc.
    # (because location is already its own column)
    t = re.sub(r"-\s*[a-z ]+$", "", t)

    # remove meaningless prefixes
    t = re.sub(r"\bet[- ]?sponsored\b", "", t)
    t = re.sub(r"\bet\b", "", t)  # catches "ET-SPONSORED" or "ET "

    # remove trainee/junior/assistant
    t = re.sub(r"\btrainee\b", "", t)
    t = re.sub(r"\bjr\b", "", t)
    t = re.sub(r"\bjunior\b", "", t)
    t = re.sub(r"\bassistant\b", "", t)
    t = re.sub(r"\b(?![ac]\b)[a-z]\b", "", t)

    # remove applicant language
    t = re.sub(r"\bapplicant[s]?\b", "", t)

    # remove extra punctuation and spaces
    t = re.sub(r"[^a-z0-9/& ]+", " ", t)
    t = re.sub(r"\s+", " ", t).strip()

    return t

file["job_title"] = file["job_title"].apply(normalize_titles)

def normalize_announcement(text):
    text_lower = text.lower()
    if "interview" in text_lower:
        return "interview"
    elif "written" in text_lower:
        return "written exam"
    elif "employment" in text_lower:
        return "employment process"
    elif "practical" in text_lower:
        return "practical exam"
    else:
        return text

file["announcement"]= file["announcement"].apply(normalize_announcement)

def normalize_location(text):
    if not isinstance(text, str):
        return None
    t = re.sub(r"[^a-z0-9\s]", " ", text.lower()).strip()
    t = re.sub(r"\s+", " ", t)

    # canonicalize some common city spellings/aliases
    aliases = {
        "gonder": "gondar",
        "bahir": "bahir dar",
        "haramaya": "harar",
        "addis": "addis ababa",
        "madda": "robe",
        "goba": "robe",
        "nekemte": "nekemte",
        "wollega": "nekemte",
        "kebridehar": "kebri dehar",
        "kabri": "kebri dehar",
        "dire": "dire dawa",
        "semera": "semera",
        "arbaminch": "arba minch",
        "arba minch":"arba minch",
        "ethiopian":"addia ababa"
    }
    for a, canon in aliases.items():
        if a in t:
            return canon
        # fallback: return the cleaned token containing known city names
    known_cities = [
        "mekelle","dessie","gondar","harar","jigjiga","hawassa","nekemte",
        "robe","semera","arba minch","bahir dar","dire dawa","gambella",
        "shashemene","addis ababa","adama","wolkite","ambo","gode","jimma",
        "assosa","kebri dehar"
    ]
    for city in known_cities:
        if city in t:
            return city

    return t

file["location"]=file["location"].apply(normalize_location)

def clean_date_time(text):
    try:
        return parser.parse(str(text), fuzzy=True)
    except:
        return None

file["date_time"]= file["date_time"].apply(clean_date_time)

def map_region(location):
    if not isinstance(location, str):
        return None
    l = location.lower()

    region_map = [
        (["mekelle"], "tigray"),
        (["wollo","dessie","gondar","bahir dar"], "amhara"),
        (["nekemte","adama","robe","goba","shashemene","gode","jimma","ambo","kebri dehar","kebridehar"], "oromia"),
        (["hawassa"], "sidama"),
        (["addis ababa","ethiopian"], "addis ababa"),
        (["dire dawa","dire"], "dire dawa"),
        (["jigjiga","kebri dehar","kebridehar"], "somali"),
        (["gambella"], "gambella"),
        (["assosa"], "benishangul-gumuz"),
        (["harar","haramaya"], "harari"),
        (["semera"], "afar"),
        (["arba minch","wolkite"], "snnpr")
    ]

    for keys, region in region_map:
        for key in keys:
            if key in l:
                return region
    return "other"
file["region"] = file["location"].apply(map_region)

path_saving = (r"C:\Users\hp\Desktop\practices\0_Tabelau_analysis_files\ET_Airlines\FINAL CSV\result.csv")

file.to_csv(path_saving, index = False)`
};

export default cyclistic;