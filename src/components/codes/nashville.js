const nashville = (

`SELECT * FROM nashville.nashdata;

# Updating Date to a Proper Format
SELECT SaleDate, DATE_FORMAT(SaleDate, '%M %e %Y')
FROM nashdata;

UPDATE nashdata 
SET SaleDate = STR_TO_DATE(SaleDate, '%M %e, %Y');

# Updating Blank Addresses
SELECT PropertyAddress
FROM nashdata
WHERE PropertyAddress = ''
;

SELECT a1.ParcelID, a1.PropertyAddress, a2.ParcelID, a2.PropertyAddress, IF(a1.PropertyAddress='', a2.PropertyAddress, 0) AS PropertyAddress
FROM nashdata a1
JOIN nashdata a2 ON a1.ParcelID = a2.ParcelID AND a1.UniqueID <> a2.UniqueID
WHERE a1.PropertyAddress=''
;

UPDATE nashdata a1
JOIN nashdata a2 ON a1.ParcelID = a2.ParcelID AND a1.UniqueID <> a2.UniqueID
SET a1.PropertyAddress = a2.PropertyAddress
WHERE a1.PropertyAddress=''
;

# Separating the Property Street and City Address from PropertyAddress
SELECT SUBSTRING(PropertyAddress, 1, LOCATE(',', PropertyAddress)-1) AS Address,
	   SUBSTRING(PropertyAddress, LOCATE(',', PropertyAddress)+1, LENGTH(PropertyAddress)) AS City
FROM nashdata;

ALTER TABLE nashdata
ADD COLUMN PropertyStreet CHAR(255);

UPDATE nashdata
SET PropertyStreet = SUBSTRING(PropertyAddress, 1, LOCATE(',', PropertyAddress)-1);

ALTER TABLE nashdata
ADD COLUMN PropertyCity CHAR(255);

UPDATE nashdata
SET PropertyCity = SUBSTRING(PropertyAddress, LOCATE(',', PropertyAddress)+1, LENGTH(PropertyAddress));


# Separating the Property Street, City and State Address from OwnerAddress
# Optimal way of Parsing Data with Delimiters
SELECT SUBSTRING_INDEX(OwnerAddress, ',', 1) AS Street,
		SUBSTRING_INDEX(SUBSTRING_INDEX(OwnerAddress, ',', 2), ',', -1) AS City,
        SUBSTRING_INDEX(OwnerAddress, ',', -1) AS State
FROM nashdata
;

ALTER TABLE nashdata
ADD COLUMN OwnerStreet CHAR(255);

ALTER TABLE nashdata
ADD COLUMN OwnerCity CHAR(255);

ALTER TABLE nashdata
ADD COLUMN OwnerState CHAR(255);

UPDATE nashdata
SET OwnerStreet = SUBSTRING_INDEX(OwnerAddress, ',', 1);

UPDATE nashdata
SET OwnerCity = SUBSTRING_INDEX(SUBSTRING_INDEX(OwnerAddress, ',', 2), ',', -1);

UPDATE nashdata
SET OwnerState = SUBSTRING_INDEX(OwnerAddress, ',', -1);

# Updating Yes/No and Y/N Format
SELECT SoldAsVacant, COUNT(*) FROM nashdata
GROUP BY 1;

SELECT SoldAsVacant, CASE WHEN SoldAsVacant = "Y" THEN "Yes"
						  WHEN SoldAsVacant = "N" THEN "No" ELSE SoldAsVacant END AS new_yes
FROM nashdata;

UPDATE nashdata
SET SoldAsVacant = CASE WHEN SoldAsVacant = "Y" THEN "Yes"
						WHEN SoldAsVacant = "N" THEN "No" ELSE SoldAsVacant END;
                        
# Checking to Find & Remove Duplicates
WITH row_num AS (
SELECT *, ROW_NUMBER() OVER (PARTITION BY ParcelID, PropertyAddress, SalePrice, SaleDate, LegalReference ORDER BY UniqueId) AS rnk
FROM nashdata)
SELECT *
FROM row_num
WHERE rnk > 1
;
# Verifying duplicates
SELECT ParcelID, PropertyAddress, COUNT(*) 
FROM nashdata
GROUP BY ParcelID, PropertyAddress, SalePrice, SaleDate, LegalReference
HAVING COUNT(*) > 1;

DELETE FROM nashdata
WHERE UniqueID IN (SELECT UniqueID FROM 
				(SELECT *, ROW_NUMBER() OVER (PARTITION BY ParcelID, PropertyAddress, SalePrice, SaleDate, LegalReference ORDER BY UniqueId) AS rnk
				 FROM nashdata) AS ranked
WHERE rnk > 1)
;

# Dropping Unnecessary Columns
ALTER TABLE nashdata
DROP COLUMN PropertyAddress, 
DROP COLUMN OwnerAddress, 
DROP COLUMN TaxDistrict;`
);

export default nashville;