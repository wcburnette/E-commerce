-- Drop the existing database if it exists
DROP DATABASE IF EXISTS ecommerce_db;

-- Create a new database named ecommerce_db
CREATE DATABASE ecommerce_db;

-- Connect to the newly created database
\c ecommerce_db;

-- Create the Category table
CREATE TABLE Category (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) UNIQUE NOT NULL
);

-- Create the Tag table
CREATE TABLE Tag (
  id SERIAL PRIMARY KEY,
  tag_name VARCHAR(255) UNIQUE NOT NULL
);

-- Create the Product table with a foreign key reference to the Category table
CREATE TABLE Product (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  category_id INTEGER REFERENCES Category(id) ON DELETE SET NULL
);

-- Create the ProductTag table to establish a many-to-many relationship between Product and Tag
CREATE TABLE ProductTag (
  product_id INTEGER REFERENCES Product(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES Tag(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);




