import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './holdings.css';

const HoldingsPage = () => {
  const [holdings, setHoldings] = useState([]);
  const [form, setForm] = useState({
    stockSymbol: '',
    companyName: '',
    sharesOwned: '',
    priceBoughtAt: '',
    currentPrice: '',
    purchaseDate: '',
  });
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    try {
      const response = await axios.get('/api/holdings');
      setHoldings(response.data);
      setFetchError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching holdings:', error);
      setFetchError('Failed to fetch holdings. Please try again later.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.stockSymbol) newErrors.stockSymbol = 'Stock Symbol is required';
    if (!form.companyName) newErrors.companyName = 'Company Name is required';
    if (!form.sharesOwned || form.sharesOwned <= 0) newErrors.sharesOwned = 'Shares Owned must be a positive number';
    if (!form.priceBoughtAt || form.priceBoughtAt <= 0) newErrors.priceBoughtAt = 'Price Bought At must be a positive number';
    if (!form.currentPrice || form.currentPrice <= 0) newErrors.currentPrice = 'Current Price must be a positive number';
    if (!form.purchaseDate) newErrors.purchaseDate = 'Purchase Date is required';
    return newErrors;
  };

  const handleAddHolding = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await axios.post('/api/holdings', form);
      fetchHoldings();
      setForm({
        stockSymbol: '',
        companyName: '',
        sharesOwned: '',
        priceBoughtAt: '',
        currentPrice: '',
        purchaseDate: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding holding:', error);
      setErrors({ form: 'Failed to add holding. Please try again.' });
    }
  };

  const handleDeleteHolding = async (id) => {
    try {
      await axios.delete(`/api/holdings/${id}`);
      fetchHoldings();
    } catch (error) {
      console.error('Error deleting holding:', error);
    }
  };

  const chartData = {
    labels: holdings.map(h => h.stockSymbol),
    datasets: [{
      data: holdings.map(h => h.sharesOwned * h.currentPrice),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }],
  };

  return (
    <div className="holdings-page">
      <h2>Current Holdings</h2>
      
      <div className="add-holding-form">
        <form onSubmit={handleAddHolding}>
          <div>
            <input
              type="text"
              placeholder="Stock Symbol"
              value={form.stockSymbol}
              onChange={(e) => setForm({ ...form, stockSymbol: e.target.value })}
              required
            />
            {errors.stockSymbol && <span className="error">{errors.stockSymbol}</span>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Company Name"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              required
            />
            {errors.companyName && <span className="error">{errors.companyName}</span>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Shares Owned"
              value={form.sharesOwned}
              onChange={(e) => setForm({ ...form, sharesOwned: e.target.value })}
              required
            />
            {errors.sharesOwned && <span className="error">{errors.sharesOwned}</span>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Price Bought At"
              value={form.priceBoughtAt}
              onChange={(e) => setForm({ ...form, priceBoughtAt: e.target.value })}
              required
            />
            {errors.priceBoughtAt && <span className="error">{errors.priceBoughtAt}</span>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Current Price"
              value={form.currentPrice}
              onChange={(e) => setForm({ ...form, currentPrice: e.target.value })}
              required
            />
            {errors.currentPrice && <span className="error">{errors.currentPrice}</span>}
          </div>
          <div>
            <input
              type="date"
              placeholder="Purchase Date"
              value={form.purchaseDate}
              onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
              required
            />
            {errors.purchaseDate && <span className="error">{errors.purchaseDate}</span>}
          </div>
          {errors.form && <p className="error">{errors.form}</p>}
          <button type="submit">Add Holding</button>
        </form>
      </div>
      {fetchError && <p className="error">{fetchError}</p>}
      <table className="holdings-table">
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Company Name</th>
            <th>Shares Owned</th>
            <th>Price Bought At</th>
            <th>Current Price</th>
            <th>Total Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.id}>
              <td>{holding.stockSymbol}</td>
              <td>{holding.companyName}</td>
              <td>{holding.sharesOwned}</td>
              <td>${holding.priceBoughtAt}</td>
              <td>${holding.currentPrice}</td>
              <td>${(holding.sharesOwned * holding.currentPrice).toFixed(2)}</td>
              <td>
                <button onClick={() => handleDeleteHolding(holding.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart">
        <h3>Portfolio Breakdown</h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default HoldingsPage;
