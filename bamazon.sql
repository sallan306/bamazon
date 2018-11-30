DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db	;

CREATE TABLE products(

    position INTEGER(11) NOT NULL ,
    item VARCHAR (75) NOT NULL,
    department VARCHAR (50) NOT NULL,
    quantity INTEGER(11) NOT NULL,
    price DECIMAL(10,2) NOT NULL,         
    PRIMARY KEY (position)
);

INSERT INTO products (item, department, quantity, price)
VALUES ("socks", "clothing", 4, 5.20);

SELECT * FROM products;
-- SELECT * FROM top5000Songs WHERE artist = "Psy";

-- lists all artists that have more than 1 entry
SELECT artist FROM top5000Songs GROUP BY artist HAVING count(*) > 1;
-- ontop of that, will give the number of times they appear
SELECT artist, count(*) AS times FROM top5000Songs GROUP BY artist HAVING count(*) > 1;
-- ontop of that, will sort in descending order
SELECT artist, count(*) AS times FROM top5000Songs GROUP BY artist HAVING count(*) > 1 ORDER BY times DESC;

-- select all entrys in year 2000
SELECT * FROM top5000Songs
WHERE year_out >= 2000 AND year_out <= 2010;
-- better way to do it 
SELECT * FROM top5000Songs
WHERE year_out BETWEEN 2000 and 2009
ORDER BY year DESC;
-- order by greatest hits
SELECT * FROM top5000Songs
WHERE year_out BETWEEN 2000 and 2009
ORDER BY raw_sales DESC;

-- searches for a specific song in top 5000 and returns data for it
SELECT * FROM top5000Songs WHERE song = "I Kissed A Girl";


-- adds an index that makes it more efficient to search for specific indexes
ALTER TABLE top5000Songs ADD INDEX song (song);

-- -------------------------------------------------------------------ALBUMS DB -----------------------------------------
