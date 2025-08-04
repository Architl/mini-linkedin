import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  // State to manage form data for email and password
  const [formData, setFormData] = useState({ email: '', password: '' });

  // State to store any login error message
  const [error, setError] = useState('');

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle input changes and update formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to log the user in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Send login request to backend with form data
      const res = await api.post('/auth/login', formData);

      // Save received JWT token to localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      // Show error message if login fails
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      {/* Alert message prompting user to log in */}
      <div className="alert alert-danger p-1 ps-3 mb-3" role="alert">
        Please log in to continue
      </div>

      {/* Centered login card */}
      <div className="d-flex justify-content-center mt-3">
        <div className="card p-4 shadow" style={{ minWidth: '350px' }}>
          <h2 className="text-center mb-4">Login</h2>

          {/* Display error message if exists */}
          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Email input */}
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

            {/* Password input */}
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

            {/* Submit button */}
            <button className="btn btn-primary w-100" type="submit">Login</button>

            {/* Link to register page */}
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
