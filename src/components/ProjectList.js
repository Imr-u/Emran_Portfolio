import Code from "./codes/code";

const ProjectList = {
 Python: [
    {
      name: "ET-Airlines Recquirment Process Analysis",
      image: "/assets/cyclistic.png",
      medium: "https://medium.com/@imruabubeker/afri-rate-4d1e87baa1ad",
      github: "https://github.com/Imr-u/ET-Airlines",
      dataset: "https://github.com/Imr-u/ET-Airlines/blob/main/result_list/result.jsonl",
      tags: ["Python", "ETL", "Tableau", "Data Visualization", "Data Analysis"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Transforming raw recruitment data into strategic insights to map and improve the candidate journey for Africa's largest airline,we tried  identifying key bottlenecks and trends to optimize their trainee and employee recruitment strategy.",
        },
        { name: "result.py", type: "code", content: Code("Cyclistic").scraper, language: "python" },
        { name: "normalizer.py", type: "code", content: Code("Cyclistic").normalizer, language: "python" },
        { name: "result_run_scraper.yml", type: "code", content: Code("Cyclistic").scheduler, language: "yml" }
      ],
    },
    {
      name: "Afri Rate",
      image: "/assets/cyclistic.png",
      medium: "https://medium.com/@imruabubeker/afri-rate-4d1e87baa1ad",
      github: "https://github.com/Imr-u/ET-Airlines",
      dataset: "https://github.com/Imr-u/ET-Airlines/blob/main/result_list/result.jsonl",
      tags: ["Python", "ETL", "Tableau", "Data Visualization", "Data Analysis"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Developed an automated data platform that collects, processes, and serves daily exchange rates from five African central banks, transforming scattered official sources into a clean, reliable pan-African forex dataset.",
        },
        { name: "ETB_scraper.py", type: "code", content: Code("Covid19").scraper, language: "python" },
        { name: "normalizer.py", type: "code", content: Code("Covid19").normalizer, language: "python" },
        { name: "ETB_scraper_runner.yml", type: "code", content: Code("Covid19").scheduler, language: "yml" }
      ],
    },
 
  ], /*
  SQL: [
    {
      name: "Movie Correlation Analysis",
      image: "/assets/correlation.png",
      github: "https://github.com/rafsanahmed28/Movie-Correlation---Pandas-NumPy-SNS",
      tags: ["Pandas", "Numpy", "Seaborn", "Matplotlib"],
      dataset: "https://www.kaggle.com/datasets/danielgrijalvas/movies",
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Analyzed movie data to find correlations between different features such as budget, revenue, and ratings using Python libraries like Pandas, NumPy, and Seaborn. The project includes data cleaning, transformation, and visualization to uncover insights about the movie industry.",
        },
        {
          name: "correlation.ipynb",
          type: "notebook",
          content: "https://nbviewer.org/github/rafsanahmed28/Movie-Correlation---Pandas-NumPy-SNS/blob/main/Finding%20Movie%20Correlation.ipynb?flush_cache=true",
          language: "python",
        },
      ],
    },

    {
      name: "Automating Crypto Data using CoinGecko API",
      image: "/assets/crypto.png",
      github: "https://github.com/rafsanahmed28/Automating-Crypto-Data-using-CoinGecko-API",
      tags: ["Pandas", "Seaborn", "Matplotlib"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Automated the retrieval of cryptocurrency data using the CoinGecko API and performed analysis using Python libraries pandas, seaborn and matplotlib. This project is meant to showcase the data automation and collection process, which can be used for further analysis or visualization.",
        },
        {
          name: "crypto.ipynb",
          type: "notebook",
          content: "https://nbviewer.org/github/rafsanahmed28/Automating-Crypto-Data-using-CoinGecko-API/blob/main/Automating%20Crypto%20-%20CoinGecko%20API.ipynb?flush_cache=true",
          language: "python",
        },
      ],
    },

    {
      name: "Amazon Web Scraping",
      image: "/assets/amazon.png",
      github: "https://github.com/rafsanahmed28/Amazon-Web-Scraping",
      tags: ["BeautifulSoup", "Pandas", "Web Scraping", "Email Automation"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Scraped product data from Amazon using BeautifulSoup and Pandas. The data is stored in a CSV file and is used for tracking price changes over time. This project also showcases how you can email yourself whenever a product's price drops below a certain threshold.",  
        },
        {
          name: "amazon.ipynb",
          type: "notebook",
          content: "https://nbviewer.org/github/rafsanahmed28/Amazon-Web-Scraping/blob/main/Amazon%20Web%20Scraping%20-%20Data%20Project.ipynb?flush_cache=true",
          language: "python",
        },
      ],
    },
  ], */
  Tableau: [
    {
      name: "ET-Airlines Analysis Dashboard",
      image: "/assets/ETA_Dashboard.png",
      medium: "https://medium.com/@imruabubeker/afri-rate-4d1e87baa1ad",
      tableau: "https://public.tableau.com/app/profile/emran.abubeker/viz/Book1_17433207117740/FinalDashboard",
      tags: ["Tableau", "Data Visualization"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Built an interactive Tableau dashboard analyzing Ethiopian Airlines' recruitment pipeline, visualizing hiring timelines, candidate funnel drop-off rates, and the effectiveness of different sourcing channels. The dashboard enables HR teams to identify bottlenecks and optimize their talent acquisition strategy for both trainee and employee programs.",
        }
      ],
    },

    {
      name: "Afri Rate",
      image: "/assets/Afri_rate.png",
      tableau: "https://public.tableau.com/app/profile/emran.abubeker/viz/PFA_17633180789900/Dashboard1",
      tags: ["Tableau", "Data Visualization"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Built an interactive dashboard that visualizes daily exchange rates from African central banks, tracking currency trends across Ethiopia, Nigeria, Egypt, Zambia, and Algeria through automated data pipelines and live updates.",
        }
      ],
    },
  ],
};

export default ProjectList;