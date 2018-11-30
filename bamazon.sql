DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(

    id INT NOT NULL AUTO_INCREMENT,
    item VARCHAR (75) NOT NULL,
    department VARCHAR (50) NOT NULL,
    quantity INTEGER(11) NOT NULL,
    price DECIMAL(10,2) NOT NULL,         
    PRIMARY KEY (id)
);

INSERT INTO products (item, department, quantity, price)
VALUES 	("socks", "clothing", 1, 4.95),
		("shoes", "shoes", 3, 18.75),
		("scissors", "school items", 3, 5.50),
        ("books", "learning", 70, 22.98),
        ("bananas", "food", 14, 5.20),
		("tomatoes", "food", 2, 0.97),
		("glasses", "learning", 4, 10.75),
        ("blankets", "bedding", 11, 20.99);

SELECT * FROM products;
SELECT * FROM products WHERE quantity < 5;
SELECT quantity FROM products WHERE item = "books";
UPDATE products SET products.quantity = 10 WHERE products.item = "books";