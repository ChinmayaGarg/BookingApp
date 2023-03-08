import React, { useContext, useState } from 'react';
import './login.css';
import { AuthContext, AUTH_ACTIONS } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const BASE_URL = 'https://bookingapp-production.up.railway.app';
      const RELATIVE_URL = '/auth/login';
      const url = BASE_URL + RELATIVE_URL;
      const res = await axios.post(url, credentials);
      // const res = await axios.post(RELATIVE_URL, credentials);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.data });
      navigate('/');
    } catch (err) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
