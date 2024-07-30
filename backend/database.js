import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import { hash } from 'crypto';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, // local host 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise(); // allows us to use the promsie API version of mySQL instead of using callback functions

// USER FUNCTIONS

export const getUser = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user from the database:', error);
    throw new Error('Error fetching user from the database');
  }
};

export const addUser = async (user) => {
  const { name, email, password } = user;
  const saltRounds = 10;

  try {
    console.log('Hashing password', password);
    const hash = await bcrypt.hash(password, saltRounds);
    const [result] = await pool.query(
      'INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)',
      [name, email, hash]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error inserting user into the database:', error);
    throw new Error('Error inserting user into the database');
  }
};

export const getTransactions = async () => {
    const [rows] = await pool.query('SELECT * FROM Transactions');
    return rows;
};

export const addTransaction = async (transaction) => {
    const { stockSymbol, transactionType, pricePerShare, numberOfShares, transactionDate, brokerFee } = transaction;
    const [result] = await pool.query(
      'INSERT INTO Transactions (stockSymbol, transactionType, pricePerShare, numberOfShares, transactionDate, brokerFee) VALUES (?, ?, ?, ?, ?, ?)',
      [stockSymbol, transactionType, pricePerShare, numberOfShares, transactionDate, brokerFee]
    );
    return result.insertId;
};

// delete a transaction at a given id 
export const deleteTransaction = async (id) => {
    await pool.query('DELETE FROM Transactions WHERE id = ?', [id]);
};

export const updateTransaction = async (id, updatedTransaction) => {
    const { stockSymbol, transactionType, pricePerShare, numberOfShares, transactionDate, brokerFee } = updatedTransaction;
    const [result] = await pool.query(
      'UPDATE Transactions SET stockSymbol = ?, transactionType = ?, pricePerShare = ?, numberOfShares = ?, transactionDate = ?, brokerFee = ? WHERE id = ?',
      [stockSymbol, transactionType, pricePerShare, numberOfShares, transactionDate, brokerFee, id]
    );

    if (result.affectedRows === 0) {
        throw new Error('Transaction not found');
    }
};

// HOLDINGS FUNCTIONS
export const getHoldings = async () => {
    const [rows] = await pool.query('SELECT * FROM Holdings');
    return rows;
  };
  
  export const addHolding = async (holding) => {
    const { stockSymbol, companyName, sharesOwned, priceBoughtAt, currentPrice, purchaseDate } = holding;
    const [result] = await pool.query(
      'INSERT INTO Holdings (stockSymbol, companyName, sharesOwned, priceBoughtAt, currentPrice, purchaseDate) VALUES (?, ?, ?, ?, ?, ?)',
      [stockSymbol, companyName, sharesOwned, priceBoughtAt, currentPrice, purchaseDate]
    );
    return result.insertId;
  };
  
  export const deleteHolding = async (id) => {
    await pool.query('DELETE FROM Holdings WHERE id = ?', [id]);
  };


export default pool;
