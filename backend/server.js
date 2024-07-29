import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { getTransactions, addTransaction, deleteTransaction } from './database.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
    const id = await addTransaction(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    await updateTransaction(req.params.id, req.body);
    res.status(200).json({ message: 'Transaction updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaction' });
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

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
