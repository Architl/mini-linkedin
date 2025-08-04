import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Register() {
  // Hook to navigate programmatically after successful registration
  const navigate = useNavigate();

  // State to store user input for registration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // State to handle and display error messages
  const [error, setError] = useState('');

  // Handle input field changes and update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  // Handle form submission for user registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to register endpoint
      const res = await API.post('/auth/register', formData);

      // Store token in localStorage and redirect to home page
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      // Set error message if registration fails
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="card p-4" style={{ minWidth: "350px" }}>
        <h2 className="text-center mb-4">Register</h2>

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="mb-3">
            <label>Name</label>
            <input
              name="name"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email input */}
          <div className="mb-3">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <button className="btn btn-primary w-100">Register</button>

          {/* Redirect link to login page */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="mb-0 fw-bold">Already have an account?</p>
            <a href="/login">Login</a>
          </div>
        </form>

        {/* Display error message if exists */}
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}

// Optional styles (not used in JSX currently but defined for future use)
const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '16px',
  },
  button: {
    padding: '0.6rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
};

export default Register;
