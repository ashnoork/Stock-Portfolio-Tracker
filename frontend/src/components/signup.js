import React, {useState} from 'react';
import './signup.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/signup', values)
    .then(res => {
      if(res.data.Status === 'Success') {
        navigate('/login'); 
      } else{
        alert('Failed to sign up');
      }
    })
    .then(err => console.log(err));
  }

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="enter name" id="name" required 
            onChange={e => setValues({...values, name: e.target.value})}/>
          </div>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
