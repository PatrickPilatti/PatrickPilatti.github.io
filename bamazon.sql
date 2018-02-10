DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    dept_name VARCHAR(100),
    price DECIMAL(11),
    stock_quantity INTEGER(100),
    PRIMARY KEY (id)

);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Chair","Furniture ", 55.00, 50);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Couch","Furniture ", 200.00, 20);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Table ","Furniture ", 150.00, 20);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Pen ","Office ", 1.00, 100);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Paper ","Office ", 5.00, 100);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Eraser ","Office ", 0.50, 100);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Plate ","Kitchen ", 10.00, 50);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Cup ","Kitchen ", 8.00, 50);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Bowl ","Kitchen ", 10.00, 30);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Glass","Kitchen ", 6.00, 80);