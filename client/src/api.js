import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mini-linkedin-1afn.onrender.com/',
});

// Attach token to headers if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
