# mini-linkedin
A full-stack Mini LinkedIn clone with user registration, login, and post sharing functionality. Built using React, Node.js, Express, and MongoDB with JWT authentication and Bootstrap for styling.

# 🌐 Mini LinkedIn-like Community Platform

A minimal social community platform inspired by LinkedIn, built as part of the Full Stack Development Internship Challenge for **CIAAN Cyber Tech Pvt Ltd**.

## 🚀 Live Demo

🔗 https://mini-linkedin-frontend-tsma.onrender.com/

⚠️ *Please note: The server is hosted on Render's free tier, so it might take a minute to load.*

## 📂 GitHub Repository

🔗 https://github.com/Architl/mini-linkedin

---

## 🛠️ Tech Stack Used

### 🔹 Frontend
- **React.js**
- **Bootstrap 5** (for responsive UI)
- **React Router DOM** (for navigation)

### 🔹 Backend
- **Node.js** with **Express.js**
- **JWT Authentication**

### 🔹 Database
- **MongoDB** with **Mongoose**

### 🔹 Deployment
- **Frontend:** Render
- **Backend & DB:** Render + MongoDB Atlas

---

## ✨ Features

### 1. 👤 User Authentication
- Register with name, email, password
- Login with email & password
- JWT-based session management

### 2. 📰 Public Post Feed
- Create and view text-only posts
- Home feed shows all posts with author's name & timestamp

### 3. 👁️ Profile Page
- View any user’s profile
- See user's own posts and those by other users

---

## 🧰 Local Setup Instructions

### 🔽 Prerequisites
- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB setup)

---

### 🔧 Backend Setup

```bash
git clone https://github.com/Architl/mini-linkedin.git
cd mini-linkedin/server
npm install
```

### Create a .env file in the server directory with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret


### Start the backend:

```bash
node index.js
```

### Frontend Setup:
```bash
cd ../client
npm install
npm start
```
