import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { getUser, addUser, getHoldings, addHolding, deleteHolding, getTransactions, addTransaction, deleteTransaction, updateTransaction } from './database.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["POST, GET"],
  credentials: true,
}));

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    console.log('APP POST');
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Invalid request: No transaction data provided' });
    }
    const id = await addTransaction(req.body);
    res.status(201).json({ id });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Failed to add transaction:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    await updateTransaction(req.params.id, req.body);
    console.log('Transaction updated successfully');
    res.status(200).json({ message: 'Transaction updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaction11' });
  }
});


app.delete('/api/transactions/:id', async (req, res) => {
  try {
    await deleteTransaction(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});


// HOLDINGSSSS ENDPOINTSS

app.get('/api/holdings', async (req, res) => {
  try {
    const holdings = await getHoldings();
    res.json(holdings);
  } catch (error) {
    console.error('Error fetching holdings:', error);
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
});

app.post('/api/holdings', async (req, res) => {
  try {
    const id = await addHolding(req.body);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error adding holding:', error);
    res.status(500).json({ error: 'Failed to add holding' });
  }
});

app.delete('/api/holdings/:id', async (req, res) => {
  try {
    await deleteHolding(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting holding:', error);
    res.status(500).json({ error: 'Failed to delete holding' });
  }
});

// SIGNUP ENDPOINT

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Request Body:', req.body);
  try {
      console.log('Adding user');
      const userId = await addUser({ name, email, password });
      console.log('User added successfully APIII');
      return res.json({ Status: 'Success', userId });
  } catch (error) {
      return res.json({ Errors: error.message });
  }
});

// LOGIN ENDPOINT

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Request Body:', req.body);
  try {
    const user = await getUser(email);
   
    if (!user) {
      return res.status(400).json({ Errors: 'No email address existed' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log('isMatch:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ Errors: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token);
    return res.json({ Status: 'Success', token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ Errors: error.message });
  }
});

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
