-- Create a new database called SHIPPING
CREATE DATABASE SHIPPING;

-- Switch to the SHIPPING database
USE SHIPPING;

-- Create a table to store user information
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,      -- Unique ID for each user (Primary Key)
  username VARCHAR(50) NOT NULL,           -- Username (cannot be empty)
  name VARCHAR(100),                        -- Full name of the user (optional)
  password VARCHAR(255) NOT NULL,          -- User password (cannot be empty)
  PRIMARY KEY (id)                         -- Set 'id' as the Primary Key
);

-- Insert user records into the users table
INSERT INTO users (username, name, password)
VALUES
('rahul123', 'Rahul Sharma', 'password1'),  -- User 1
('priya_gupta', 'Priya Gupta', 'password2'), -- User 2
('amit.kumar', 'Amit Kumar', 'password3'),   -- User 3
('nisha.patel', 'Nisha Patel', 'password4'), -- User 4
('arjun.verma', 'Arjun Verma', 'password5');  -- User 5

-- Create a table to store addresses
CREATE TABLE addresses (
    id INT(11) NOT NULL AUTO_INCREMENT,        -- Unique ID for each address (Primary Key)
    name VARCHAR(100) NOT NULL,                -- Name of the person (cannot be empty)
    company_name VARCHAR(100) DEFAULT NULL,    -- Company name (optional)
    street1 VARCHAR(255) NOT NULL,             -- Main street address (cannot be empty)
    street2 VARCHAR(255) DEFAULT NULL,         -- Optional second line of address
    zip_code VARCHAR(20) NOT NULL,             -- Postal code (cannot be empty)
    city VARCHAR(100) NOT NULL,                -- City (cannot be empty)
    state VARCHAR(100) NOT NULL,               -- State (cannot be empty)
    country VARCHAR(100) NOT NULL,             -- Country (cannot be empty)
    PRIMARY KEY (id)                           -- Set 'id' as the Primary Key
);

-- Insert address records into the addresses table
INSERT INTO addresses (name, company_name, street1, street2, zip_code, city, state, country)
VALUES
('Rahul Sharma', 'Tech Solutions', '123 MG Road', NULL, '110001', 'Delhi', 'Delhi', 'India'),  -- Address 1
('Priya Gupta', 'Fashion Hub', '45 Andheri Street', 'Near Metro', '400053', 'Mumbai', 'Maharashtra', 'India');  -- Address 2


-- Create a table to store USPS orders
CREATE TABLE uuspsorders (
    id INT(11) NOT NULL AUTO_INCREMENT,          -- Unique ID for each order (Primary Key)
    order_type ENUM('USPS GROUND OZ', 'USPS GROUND lb', 'USPS Priority', 'USPS Express', 'USPS Priority V2') NOT NULL,  -- Type of order (cannot be empty)
    weight INT(11) NOT NULL,                     -- Weight of the order (cannot be empty)
    template ENUM('Pitney Bows', 'Indica', 'EVS') DEFAULT NULL,  -- Template used (optional)
    total_price DECIMAL(10, 2) NOT NULL,        -- Total price of the order (cannot be empty)
    from_address_id INT(11) NOT NULL,           -- ID of the from address (cannot be empty)
    to_address_id INT(11) NOT NULL,             -- ID of the to address (cannot be empty)
    order_date DATETIME DEFAULT NULL,            -- Date and time of the order (optional)
    status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending',  -- Current status of the order (default is Pending)
    PRIMARY KEY (id)                             -- Set 'id' as the Primary Key
);

-- Insert an order record into the USPS_orders table
INSERT INTO uspsorders (order_type, weight, template, total_price, from_address_id, to_address_id, order_date, status) 
VALUES 
('USPS Priority', 10, 'Pitney Bows', 1499.50, 1, 2, '2024-10-15 16:57:38', 'Pending');  -- Order record
