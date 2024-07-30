-- Database
CREATE DATABASE IF NOT EXISTS stockPortfolio;
USE stockPortfolio;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Current Share Holdings Table
CREATE TABLE IF NOT EXISTS Holdings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stockSymbol VARCHAR(10) NOT NULL,
    companyName VARCHAR(255) NOT NULL,
    sharesOwned INT NOT NULL,
    priceBoughtAt DECIMAL(10, 2) NOT NULL,
    currentPrice DECIMAL(10, 2) NOT NULL,
    totalValue DECIMAL(10, 2) AS (sharesOwned * currentPrice) STORED,
    gain DECIMAL(10, 2) AS ((currentPrice - priceBoughtAt) * sharesOwned) STORED,
    purchaseDate DATE NOT NULL,
    -- CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS Transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stockSymbol VARCHAR(10) NOT NULL,
    transactionType ENUM('Buy', 'Sell') NOT NULL,
    pricePerShare DECIMAL(10, 2) NOT NULL,
    numberOfShares INT NOT NULL,
    transactionDate DATE NOT NULL,
    brokerFee DECIMAL(10, 2) DEFAULT 0.00,
    -- CONSTRAINT fk_user_id_transactions FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Dummy Data for Holdings Table
INSERT INTO Holdings (stockSymbol, companyName, sharesOwned, priceBoughtAt, currentPrice, purchaseDate) VALUES
('AAPL', 'Apple Inc.', 50, 145.00, 150.00, '2023-01-01'),
('GOOGL', 'Alphabet Inc.', 10, 2500.00, 2600.00, '2023-02-01'),
('AMZN', 'Amazon.com Inc.', 5, 3200.00, 3300.00, '2023-03-01'),
('TSLA', 'Tesla Inc.', 20, 700.00, 720.00, '2023-04-01'),
('MSFT', 'Microsoft Corporation', 30, 280.00, 290.00, '2023-05-01'),
('NFLX', 'Netflix Inc.', 15, 540.00, 560.00, '2023-06-01');

-- Dummy Data for Transactions Table
INSERT INTO Transactions (stockSymbol, transactionType, pricePerShare, numberOfShares, transactionDate, brokerFee) VALUES
('AAPL', 'Buy', 145.00, 50, '2023-01-01', 0),
('GOOGL', 'Buy', 2500.00, 10, '2023-02-01', 0),
('AMZN', 'Buy', 3200.00, 5, '2023-03-01', 0),
('TSLA', 'Buy', 700.00, 20, '2023-04-01', 0),
('MSFT', 'Buy', 280.00, 30, '2023-05-01', 0),
('NFLX', 'Buy', 540.00, 15, '2023-06-01', 0),
('AAPL', 'Sell', 150.00, 10, '2023-07-01', 1.00),
('GOOGL', 'Sell', 2600.00, 5, '2023-08-01', 2.00);
