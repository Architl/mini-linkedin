import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  // State to store the content of the post
  const [content, setContent] = useState('');
  
  // Hook to programmatically navigate to another route
  const navigate = useNavigate();

  // Handles form submission to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve JWT token from localStorage
    const token = localStorage.getItem('token');

    // Alert and exit if the user is not logged in
    if (!token) return alert('You must be logged in to post.');

    try {
      // Send POST request to create a new post with the content and token
      await axios.post(
        'http://localhost:5000/api/posts',
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Notify user and redirect to home page after successful post creation
      alert('Post created!');
      navigate('/');
    } catch (err) {
      // Handle error if post creation fails
      alert('Error creating post');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* Textarea for entering post content */}
          <textarea
            className="form-control"
            placeholder="What's on your mind?"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        {/* Submit button to trigger post creation */}
        <button className="btn btn-success">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
