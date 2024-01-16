
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from './UserAPI';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
const Login = () => {
  const dispatch = useDispatch();
  const { status, user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(credentials));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/dashboard');
    }
  }, [status, navigate]);

  return (
    <div>
      <h2>Login</h2>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit" disabled={status === 'loading'}>
          Login
        </button>

        <div className="signup-link">
        <button>
          <Link to="/signup">Signup</Link>
        </button>
      </div>

      </form>
    </div>
  );
};

export default Login;
