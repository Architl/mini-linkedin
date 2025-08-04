import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  // Hook from react-router-dom to programmatically navigate between routes
  const navigate = useNavigate();

  // Get token from localStorage to check if user is authenticated
  const token = localStorage.getItem('token');

  // Logout function to clear token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-3"
      // Custom background color for the navbar
      style={{ backgroundColor: '#0077B5' }}
    >
      {/* Brand link that navigates to the homepage */}
      <Link className="navbar-brand fw-bold text-white" to="/">MiniLinkedIn</Link>

      {/* Toggler button for collapsing navbar on smaller screens */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar links (either for authenticated or unauthenticated users) */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto">
          {token ? (
            // If user is logged in, show "Create Post" and "Logout" options
            <>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/create">Create Post</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-2 mt-1" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            // If user is not logged in, show "Login" and "Register" links
            <>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
