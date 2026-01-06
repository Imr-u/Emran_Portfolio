const Covid19 = {
scraper: `
from bs4 import BeautifulSoup
import requests
import datetime
import os
import pandas as pd


url = "https://api.nbe.gov.et/api/filter-exchange-rates"

date_str = datetime.date.today().strftime("%Y-%m-%d")
page = requests.get(url, params={"date": date_str})

data = page.json()
file_path = "ETB_fx.csv"
records = [ ]

if data.get("success") and "data" in data:
    for item in data["data"]:
        currency_code = item["currency"]["code"]  # USD, EUR, etc.
        buying = item["buying"]
        selling = item["selling"]
        date_val = item["date"]
        avg = item["weighted_average"]
        scrape_time = datetime.date.today()
        pair = f"{currency_code}BIRR"

        records.append({
            "buying": buying,
            "selling": selling,
            "avg": avg,
            "scrape_time": scrape_time,
            "Pair": pair,
            "date": date_str
        })
df_new = pd.DataFrame(records)


if os.path.exists(file_path):
    old_df = pd.read_csv(file_path)
    df_combined = pd.concat([old_df, df_new], ignore_index=True).drop_duplicates(subset=["date","scrape_time", "Pair"], keep="last")
else:
    df_combined = df_new

# Step 4: save
df_combined.to_csv(file_path, index=False)`,

scheduler: `name: ETB_fx Scraper

on:
  schedule:
    - cron: "0 */12 * * *"   # every 12 hours
  workflow_dispatch:         # allow manual run


permissions:
  contents: write

jobs:
  scrape:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.10"

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install requests beautifulsoup4 pandas

      - name: Run scraper
        working-directory: Scraper_&_datasets/Ethiopia_fx
        run: |
          python ETB_fx.py

      - name: Commit and push results
        working-directory: Scraper_&_datasets/Ethiopia_fx
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add ETB_fx.csv
          git commit -m "Update ETB_fx.csv on $(date '+%Y-%m-%d')[skip ci]" || echo "No changes to commit"
          git push`,

normalizer: `import pandas as pd

# Load your data
df = pd.read_csv("final_fx_dataset.csv")

# Ensure date column is datetime
df['scrape_date'] = pd.to_datetime(df['scrape_date'])

# Define the common start date
start_date = pd.Timestamp("2025-10-08")

# Drop duplicates within each pair_id + date (keeping the last row)
df = df.drop_duplicates(subset=['pair_id', 'scrape_date'], keep='last')

# Create a filled DataFrame
filled_df = (
    df.groupby('pair_id', group_keys=False)
      .apply(lambda g: (
          g.set_index('scrape_date')
           .sort_index()
           .reindex(pd.date_range(start=max(start_date, g['scrape_date'].min()),
                                  end=g['scrape_date'].max(), freq='D'))
           .ffill().bfill()
           .assign(pair_id=g['pair_id'].iloc[0])
           .reset_index()
           .rename(columns={'index': 'scrape_date'})
      ))
)
# Calculate peak-relative change from base
def peak_relative_change(prices):
    """
    prices: pd.Series of exchange rates for a single pair_id, sorted by date
    Returns: pd.Series of changes relative to peak/base
    """
    base = prices.iloc[0]
    peak = base
    changes = []
    
    for price in prices:
        if price >= peak:
            # new peak: positive change from base or previous peak
            peak = price
            change = (price - base)/ base
        else:
            # if below base, negative change
            change = (price - base)/ base if price < base else (price - base)/base
        changes.append(change)
    return pd.Series(changes, index=prices.index)

filled_df['peak_change'] = filled_df.groupby('pair_id')['avg_price'].transform(peak_relative_change)

filled_df['weighted_spread'] = filled_df['spread'] / filled_df['avg_price']

# Save result
filled_df.to_csv("final_final.csv", index=False)`
};

export default Covid19;