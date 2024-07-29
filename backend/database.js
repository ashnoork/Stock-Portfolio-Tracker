import mysql from 'mysql2';

import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, // local host 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise(); // allows us to use the promsie API version of mySQL instead of using callback functions


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

export default pool;
