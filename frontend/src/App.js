import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Menu from './components/menu';
import LoginPage from './components/login';
import SignUpPage from './components/signup';
import TransactionsPage from './components/transactionPage';
import HoldingsPage from './components/holdingsPage';
import './App.css';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="menu-icon" onClick={toggleMenu}>
            <FiMenu size={24} />
          </div>
          <h1 className="title">Dashboard</h1>
        </header>
        <Menu isOpen={menuOpen} toggleMenu={toggleMenu} />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/overview" element={<HoldingsPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
