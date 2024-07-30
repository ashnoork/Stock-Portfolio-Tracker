import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('before post sent in login.js');
    axios.post('/api/login', values)
    .then(res => {
      if(res.data.Status === 'Success') {
        console.log('login success');
        navigate('/overview'); 
      } else{
        alert('Failed to login up');
      }
    })
    .then(err => console.log(err));
  }


  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required 
            onChange={e => setValues({...values, email: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required 
            onChange={e => setValues({...values, password: e.target.value})}/>
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
