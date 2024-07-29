import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTrash, FiEdit } from 'react-icons/fi';
import './transactionPage.css';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    stockSymbol: '',
    transactionType: '',
    pricePerShare: '',
    numberOfShares: '',
    transactionDate: '',
    brokerFee: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      setServerError('Failed to fetch transactions');
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.stockSymbol) formErrors.stockSymbol = 'Stock Symbol is required';
    if (!form.transactionType) formErrors.transactionType = 'Transaction Type is required';
    if (!form.pricePerShare || form.pricePerShare <= 0) formErrors.pricePerShare = 'Price Per Share must be greater than 0';
    if (!form.numberOfShares || form.numberOfShares <= 0) formErrors.numberOfShares = 'Number of Shares must be greater than 0';
    if (!form.transactionDate) formErrors.transactionDate = 'Transaction Date is required';
    if (form.brokerFee < 0) formErrors.brokerFee = 'Broker Fee cannot be negative';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        await axios.put(`/api/transactions/${editTransactionId}`, form);
        setIsEditing(false);
        setEditTransactionId(null);
      } else {
        await axios.post('/api/transactions', form);
      }
      fetchTransactions();
      setForm({
        stockSymbol: '',
        transactionType: '',
        pricePerShare: '',
        numberOfShares: '',
        transactionDate: '',
        brokerFee: ''
      });
      setErrors({});
      setServerError(''); // Clear any previous server error
    } catch (error) {
      setServerError(isEditing ? 'Failed to update transaction' : 'Failed to add transaction');
    }
  };

  const handleEditTransaction = (transaction) => {
    setForm(transaction);
    setIsEditing(true);
    setEditTransactionId(transaction.id);
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      setServerError('Failed to delete transaction');
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.stockSymbol.toLowerCase().includes(search.toLowerCase()) ||
    transaction.transactionType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      {serverError && <p className="error">{serverError}</p>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="add-transaction-form">
        <form onSubmit={handleAddTransaction}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Stock Symbol"
              value={form.stockSymbol}
              onChange={(e) => setForm({ ...form, stockSymbol: e.target.value })}
              required
            />
            {errors.stockSymbol && <p className="error">{errors.stockSymbol}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Transaction Type"
              value={form.transactionType}
              onChange={(e) => setForm({ ...form, transactionType: e.target.value })}
              required
            />
            {errors.transactionType && <p className="error">{errors.transactionType}</p>}
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Price Per Share"
              value={form.pricePerShare}
              onChange={(e) => setForm({ ...form, pricePerShare: e.target.value })}
              required
            />
            {errors.pricePerShare && <p className="error">{errors.pricePerShare}</p>}
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Number of Shares"
              value={form.numberOfShares}
              onChange={(e) => setForm({ ...form, numberOfShares: e.target.value })}
              required
            />
            {errors.numberOfShares && <p className="error">{errors.numberOfShares}</p>}
          </div>
          <div className="form-group">
            <input
              type="datetime-local"
              placeholder="Transaction Date"
              value={form.transactionDate}
              onChange={(e) => setForm({ ...form, transactionDate: e.target.value })}
              required
            />
            {errors.transactionDate && <p className="error">{errors.transactionDate}</p>}
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Broker Fee"
              value={form.brokerFee}
              onChange={(e) => setForm({ ...form, brokerFee: e.target.value })}
            />
            {errors.brokerFee && <p className="error">{errors.brokerFee}</p>}
          </div>
          <button type="submit">{isEditing ? 'Update Transaction' : 'Add Transaction'}</button>
        </form>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Transaction Type</th>
            <th>Price Per Share</th>
            <th>Number of Shares</th>
            <th>Transaction Date</th>
            <th>Broker Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.stockSymbol}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.pricePerShare}</td>
              <td>{transaction.numberOfShares}</td>
              <td>{transaction.transactionDate}</td>
              <td>{transaction.brokerFee}</td>
              <td>
                <button onClick={() => handleEditTransaction(transaction)}>
                  <FiEdit />
                </button>
                <button onClick={() => handleDeleteTransaction(transaction.id)}>
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
