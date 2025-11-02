import Code from "./codes/code";

const ProjectList = {
  SQL: [
    {
      name: "Cyclistic Bike Share Analysis",
      image: "/assets/cyclistic.png",
      medium: "https://medium.com/@rafsanahmed2828/from-data-to-insights-googles-cyclistic-case-study-04fb362c2d0d",
      github: "https://github.com/rafsanahmed28/Cyclistic-Case-Study",
      dataset: "https://divvy-tripdata.s3.amazonaws.com/index.html",
      tags: ["MySQL", "Excel", "Tableau", "Data Visualization", "Data Analysis"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Cyclistic is a fictional bike-share company in Chicago. The goal of this project is to analyze the bike usage data to understand how different types of users (casual vs. annual members) use the service and to provide insights for marketing strategies. Learn more about my approach, analysis, and findings in the Medium article linked below.",
        },
        { name: "cleaning.sql", type: "code", content: Code("Cyclistic").cleaning, language: "sql" },
        { name: "querying.sql", type: "code", content: Code("Cyclistic").querying, language: "sql" },
        { name: "viz_query.sql", type: "code", content: Code("Cyclistic").viz_query, language: "sql" }
      ],
    },

    {
      name: "Data Cleaning - NashVille Housing Data",
      image: "/assets/nashville.png",
      github: "https://github.com/rafsanahmed28/Data-Cleaning-MySQL",
      tags: ["MySQL", "Data Cleaning", "Data Transformation"],
      dataset: "http://kaggle.com/datasets/tmthyjames/nashville-housing-data",
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Cleaned and transformed Nashville housing data for analysis, focusing on data integrity and consistency. This project's goal was to go through the important steps of data cleaning and transformation, including removing duplicates, handling missing values, and ensuring data types are correct.",
        },
        {
          name: "nasvhille.sql",
          type: "code",
          content: Code("Nashville"),
          language: "sql",
        },
      ],
    },

    {
      name: "Covid-19 Exploratory Data Analysis",
      image: "/assets/covid19.png",
      github: "https://github.com/rafsanahmed28/Covid-Data-Exploration-Project",
      dataset: "https://ourworldindata.org/covid-deaths",
      tags: ["MySQL", "Excel", "Tableau", "Data Visualization", "Data Analysis"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Performed exploratory data analysis on Covid-19 data to find the damage caused by the pandemic in different countries. The project focuses on data transformation, exploratory data analysis and visualization to provide insights into the impact of Covid-19 globally.",
        },
        {
          name: "covid19.sql",
          type: "code",
          content: Code("Covid19"),
          language: "sql",
        },
      ],
    }
  ],
  Python: [
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
  ],
  Tableau: [
    {
      name: "Cyclistic Case Study Visualization",
      image: "/assets/cyclisticviz.png",
      medium: "https://medium.com/@rafsanahmed2828/from-data-to-insights-googles-cyclistic-case-study-04fb362c2d0d",
      tableau: "https://public.tableau.com/app/profile/rafsan.ahmed8668/viz/GoogleCyclisticCaseStudyVisualization/DashboardMain",
      tags: ["Tableau", "Data Visualization"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Designed an interactive Tableau dashboard for the Cyclistic Case Study, visualizing the seasonal trends and usage patterns during different times as well as different routes the users take. The dashboard helps us dive deeper into how the annual users differ from casual users.",
        }
      ],
    },

    {
      name: "Covid-19 Data Visualization Dashboard",
      image: "/assets/covid19viz.png",
      tableau: "https://public.tableau.com/app/profile/rafsan.ahmed8668/viz/CovidDataVisualizationDashboard-May2024/Dashboard1",
      tags: ["Tableau", "Data Visualization"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Developed a Tableau dashboard to visualize Covid-19 infection data across all the countries around the world. The dashboard also gives an overview of the global death count, continental death count, and a filtered view of percentage population infected by country.",
        }
      ],
    },
  ],
};

export default ProjectList;