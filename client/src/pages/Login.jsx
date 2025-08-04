import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to home
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/'); // Redirect to home after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <div className="alert alert-danger p-1 ps-3 mb-3" role="alert">
        Please log in to continue
      </div>

      <div className="d-flex justify-content-center mt-3">
        <div className="card p-4 shadow" style={{ minWidth: '350px' }}>
          <h2 className="text-center mb-4">Login</h2>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">Login</button>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="mb-0 fw-bold">Don't have an account?</p>
              <a href="/register">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
