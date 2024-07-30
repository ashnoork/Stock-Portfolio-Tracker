import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = () => {

  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="create-account">
        <button onClick={handleCreateAccount}>Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
