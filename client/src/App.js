import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home route logic */}
        <Route path="/" element={token ? <Home /> : <Login />} />

        {/* Login and Register routes */}
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />

        {/* Protected CreatePost route */}
        <Route path="/create" element={token ? <CreatePost /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
