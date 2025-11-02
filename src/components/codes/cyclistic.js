const cyclistic = {
cleaning: `-- In this query, we'll go through the Data Cleaning process
-- 12 months of data (June 2023- May 2024) was imported
-- Total 5743278 rows imported
-- P.S. Even though deleting data is not a good practice,
-- but this dataset had a lot of unusable and irrelevant data

SELECT * 
FROM cyclistic.cyclisticmain
;

-- Checking for ride_id with more or less than 16 characters
SELECT ride_id, length(ride_id) 
FROM cyclistic.cyclisticmain
WHERE length(ride_id)  != 16
;

-- Removing the odd ride_id's, 3865 rows deleted
DELETE 
FROM cyclistic.cyclisticmain
WHERE length(ride_id)  != 16
;

-- 3 different ride types, electric_bike, classic_bike and docked_bike
SELECT DISTINCT rideable_type
FROM cyclistic.cyclisticmain
;

-- Trying to find unusual lengths of ridetime
SELECT *, TIMESTAMPDIFF(MINUTE, started_at, ended_at) AS time_difference
FROM cyclistic.cyclisticclean
WHERE TIMESTAMPDIFF(MINUTE, started_at, ended_at) <= 1 OR TIMESTAMPDIFF(MINUTE, started_at, ended_at) >=1440
;

-- 192013 rows affected
DELETE
FROM cyclistic.cyclisticclean
WHERE TIMESTAMPDIFF(MINUTE, started_at, ended_at) <= 1 OR TIMESTAMPDIFF(MINUTE, started_at, ended_at) >=1440
;

-- The next data process removes a large portion of data which are missing which is why backup table was created
-- Backup Table: cyclisticmain, data will be cleaned on cyclisticcclean Table
CREATE TABLE cyclisticclean AS
SELECT * FROM cyclisticmain
;

-- Checking for empty rows with no start_station_name
SELECT start_station_name, COUNT(start_station_name)
FROM cyclistic.cyclisticclean
GROUP BY start_station_name
;

-- Checking for empty rows with no end_station_name
SELECT end_station_name, COUNT(start_station_name)
FROM cyclistic.cyclisticclean
GROUP BY end_station_name
;

-- Checking the ride types for the empty rows resulted in some interesting insights as majority of the empty rows were from electric bikes
SELECT rideable_type, COUNT(*)
FROM cyclistic.cyclisticclean
WHERE start_station_name = '' OR end_station_name = ''
GROUP BY rideable_type
;

-- We need to delete the empty rows to move forward with our analysis as they won't be useful for gathering insights from these trips
-- 1343975 rows affected
DELETE
FROM cyclistic.cyclisticclean
WHERE start_station_name = '' OR start_station_id = '' OR end_station_name = ''  OR end_station_id = ''
;

-- After deleting the empty rows of station_name, we will check why start_station_name and start_station_id doesn't have the same number
-- There are 1581 unique stations with 1553 unique station id's and this query helps to find that there are some stations with 2 distinct ids
-- This data doesn't really affect the accuracy much so we can ignore this part
SELECT start_station_name, COUNT(DISTINCT start_station_id) AS distinct_ids
FROM cyclistic.cyclisticclean
GROUP BY start_station_name
HAVING COUNT(DISTINCT start_station_id) > 1
;

-- Checking for NULL values for start_lat
SELECT start_lat, COUNT(*)
FROM cyclistic.cyclisticclean
GROUP BY start_lat
ORDER BY start_lat
;

-- Checking for NULL values for end_lat
SELECT end_lat
FROM cyclistic.cyclisticclean
GROUP BY end_lat
ORDER BY end_lat
;

-- Removing empty cells and 0 values for end_lat
DELETE
FROM cyclistic.cyclisticclean
WHERE end_lat = '' OR end_lat = '0'
;

-- Checking for NULL values in member_casual column
SELECT member_casual
FROM cyclistic.cyclisticclean
GROUP BY member_casual
ORDER BY member_casual
;

-- Upon further inspection, we'll remove data where start_station and end_station are the same as it doesn't give much information about trip data
DELETE
FROM cyclistic.cyclisticclean
WHERE start_station_name = end_station_name
;

-- docked_bike are only used by casual members, this study is to compare to see how casual riders differ from members
-- docked_bike also has almost doubles the trip duration of classic_bike rides for casual riders
SELECT member_casual, rideable_type, COUNT(*) AS number_of_rides_per_type, AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
GROUP BY member_casual, rideable_type
;

-- As there are not enough information to determine its nature and the data seems a bit skewed, we'll keep docked_bike out of our analysis
DELETE
FROM cyclistic.cyclisticclean
WHERE rideable_type = 'docked_bike'
;

-- With that, the data cleaning process has ended. This is the final dataset we'll be working on
-- 3982402 rows is the cleaned data size from an initial data size of 5743278 rows
SELECT *
FROM cyclistic.cyclisticclean;
;`,

querying: `-- Here we'll dive deeper into the data and take a closer look at how different bikes are used, duration of the trips, usage in different days and months
-- Member vs Casual Total Rides and Average Trip Duration 
SELECT member_casual, 
	   COUNT(member_casual) AS number_of_rides,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
GROUP BY member_casual
;

-- Member vs Casual Rides per Different Ride Types and Average Trip Duration
SELECT member_casual, rideable_type, 
	   COUNT(*) AS number_of_rides_per_type, 
	   AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
GROUP BY member_casual, rideable_type
;

-- Member vs Casual Rides Per Month
SELECT member_casual, rideable_type, DATE_FORMAT(started_at, '%M') AS month_name,
	   COUNT(*) AS rides_per_month,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
GROUP BY member_casual, rideable_type, month, month_name
;

-- Member vs Casual Rides Per Weekday
SELECT member_casual, rideable_type, DATE_FORMAT(started_at, '%W') AS weekday,
	   COUNT(*) AS rides_per_weekday,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
GROUP BY member_casual, rideable_type, weekday
ORDER BY weekday
;

-- Member vs Casual Rides Per Hour
SELECT member_casual, rideable_type, DATE_FORMAT(started_at, '%H') AS hour_of_day,
	   COUNT(*) AS rides_per_hour,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
GROUP BY member_casual, rideable_type, hour_of_day
ORDER BY hour_of_day
;

-- Reference: Top 3 Most Popular Starting Station among riders
SELECT start_station_name,
	   COUNT(start_station_name) AS most_popular_start,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
GROUP BY start_station_name
ORDER BY most_popular_start DESC
LIMIT 3
;

-- Top 10 Member Trip Starting Stations
-- Note: Instead of "WHERE member_casual = 'member'" the statement below was used 
-- because it contained a non-printable character which gave it a length of 7
SELECT start_station_name,
	   COUNT(*) AS most_popular_start,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_start_trip_duration_member
FROM cyclistic.cyclisticclean
WHERE member_casual LIKE 'member%'
GROUP BY start_station_name
ORDER BY most_popular_start DESC
LIMIT 10
;

-- Top 10 Member Trip Ending Stations
SELECT end_station_name,
	   COUNT(*) AS most_popular_end,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_end_trip_duration_member
FROM cyclistic.cyclisticclean
WHERE member_casual LIKE 'member%'
GROUP BY end_station_name
ORDER BY most_popular_end DESC
LIMIT 10
;

-- Top 10 Casual Trip Starting Stations
SELECT start_station_name,
	   COUNT(*) AS most_popular_start,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration_casual
FROM cyclistic.cyclisticclean
WHERE member_casual LIKE 'casual%'
GROUP BY start_station_name
ORDER BY most_popular_start DESC
LIMIT 10
;


-- Top 10 Casual Trip Ending Stations
SELECT end_station_name,
	   COUNT(*) AS most_popular_end,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration_casual
FROM cyclistic.cyclisticclean
WHERE member_casual LIKE 'casual%'
GROUP BY end_station_name
ORDER BY most_popular_end DESC
LIMIT 10
;


-- The Most Popular Starting Station Hourly for Member Riders
SELECT member_casual, COUNT(*) AS total, start_station_name, DATE_FORMAT(started_at, '%H') AS hour_of_day
FROM cyclistic.cyclisticclean
WHERE start_station_name = 'Clinton St & Washington Blvd' AND member_casual LIKE 'member%'
GROUP BY member_casual, start_station_name, hour_of_day
ORDER BY hour_of_day
;

-- The Most Popular Ending Station Hourly for Member Riders
SELECT member_casual, COUNT(*) AS total, end_station_name, DATE_FORMAT(started_at, '%H') AS hour_of_day
FROM cyclistic.cyclisticclean
WHERE end_station_name = 'Clinton St & Washington Blvd' AND member_casual LIKE 'member%'
GROUP BY member_casual, end_station_name, hour_of_day
ORDER BY hour_of_day
;

-- Combine the Results of the Two Earlier Queries and Sum the Total Trips
-- Most Popular Member Station Trips Per Hour
SELECT 
    start_station_name AS member_popular_station,
    hour_of_day,
    SUM(total) AS total_trips
FROM (
    -- The Most Popular Starting Station Hourly for Member Riders
    SELECT COUNT(*) AS total, start_station_name, DATE_FORMAT(started_at, '%H') AS hour_of_day
    FROM cyclistic.cyclisticclean
    WHERE start_station_name = 'Clinton St & Washington Blvd' AND member_casual LIKE 'member%'
    GROUP BY start_station_name, hour_of_day
    
    UNION ALL
    
    -- The Most Popular Ending Station Hourly for Member Riders
    SELECT COUNT(*) AS total, end_station_name, DATE_FORMAT(started_at, '%H') AS hour_of_day
    FROM cyclistic.cyclisticclean
    WHERE end_station_name = 'Clinton St & Washington Blvd' AND member_casual LIKE 'member%'
    GROUP BY end_station_name, hour_of_day
) AS combined_member
GROUP BY member_popular_station, hour_of_day
ORDER BY hour_of_day
;

-- Similarly, Most Popular Casual Station Trips Per Hour
SELECT start_station_name AS casual_popular_station,
	hour_of_day,
    SUM(total) AS total_trips
FROM (
	-- The Most Popular Starting Station Hourly for Casual Riders
	SELECT COUNT(*) AS total, start_station_name, DATE_FORMAT(started_at, '%H') AS hour_of_day
	FROM cyclistic.cyclisticclean
	WHERE start_station_name = 'Streeter Dr & Grand Ave' AND member_casual LIKE 'casual%'
	GROUP BY start_station_name, hour_of_day

	UNION ALL

	-- The Most Popular Ending Station Hourly for Casual Riders
	SELECT COUNT(*) AS total, end_station_name, DATE_FORMAT(started_at, '%H') AS hour_of_day
	FROM cyclistic.cyclisticclean
	WHERE end_station_name = 'Streeter Dr & Grand Ave' AND member_casual LIKE 'casual%'
	GROUP BY end_station_name, hour_of_day
) AS combined_casual
GROUP BY casual_popular_station, hour_of_day
ORDER BY hour_of_day
;

-- Most Popular Casual Routes
SELECT start_station_name, end_station_name,
	   COUNT(*) AS most_popular, ROUND(AVG(start_lat), 4) AS start_lat,
       ROUND(AVG(start_lng), 4) AS start_lng, ROUND(AVG(end_lat), 4) AS end_lat,
       ROUND(AVG(end_lng), 4) AS end_lng, 
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
WHERE member_casual LIKE 'casual%'
GROUP BY start_station_name, end_station_name
ORDER BY most_popular desc
LIMIT 10
;

-- Most Popular Member Routes
SELECT start_station_name, end_station_name,
	   COUNT(*) AS most_popular, ROUND(AVG(start_lat), 4) AS start_lat,
       ROUND(AVG(start_lng), 4) AS start_lng, ROUND(AVG(end_lat), 4) AS end_lat,
       ROUND(AVG(end_lng), 4) AS end_lng,
       AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avg_trip_duration
FROM cyclistic.cyclisticclean
WHERE member_casual LIKE 'member%'
GROUP BY start_station_name, end_station_name
ORDER BY most_popular desc
LIMIT 10
;`,

viz_query: `-- The following queries are used to create the visualizations in the dashboard
-- The goal of this query to find a big workable data to get hourly insights as well as geographical location to correlate between them
-- Calculate the average latitudes and longitudes for each station and group by stations, member_casual, hour of day

SELECT 
	member_casual,
    start_station_name AS all_stations,
    hour_of_day,
    SUM(total) AS total_trips,
    ROUND(AVG(avgtd),2) AS avg_trip_duration,
    ROUND(AVG(startlat), 4) AS start_lat,
	ROUND(AVG(startlng), 4) AS start_lng, 
    ROUND(AVG(endlat), 4) AS end_lat,
	ROUND(AVG(endlng), 4) AS end_lng
FROM (
    -- The Most Popular Starting Station Hourly for Member Riders
    SELECT member_casual, 
    COUNT(*) AS total, 
    start_station_name, 
    DATE_FORMAT(started_at, '%H') AS hour_of_day,
    AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avgtd,
    ROUND(AVG(start_lat), 4) AS startlat,
	ROUND(AVG(start_lng), 4) AS startlng, 
    ROUND(AVG(end_lat), 4) AS endlat,
	ROUND(AVG(end_lng), 4) AS endlng
    FROM cyclistic.cyclisticclean
    GROUP BY member_casual, start_station_name, hour_of_day
    
    UNION ALL
    
    -- The Most Popular Ending Station Hourly for Member Riders
    SELECT member_casual, 
    COUNT(*) AS total, 
    end_station_name, 
    DATE_FORMAT(started_at, '%H') AS hour_of_day,
    AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) AS avgtd,
    ROUND(AVG(start_lat), 4) AS startlat,
	ROUND(AVG(start_lng), 4) AS startlng, 
    ROUND(AVG(end_lat), 4) AS endlat,
	ROUND(AVG(end_lng), 4) AS endlng
    FROM cyclistic.cyclisticclean
    GROUP BY member_casual, end_station_name, hour_of_day
) AS combined_count
GROUP BY member_casual, all_stations, hour_of_day
ORDER BY hour_of_day
;

-- This data was later cleaned on Excel to remove inconsistent data for proper visualization`
};

export default cyclistic;