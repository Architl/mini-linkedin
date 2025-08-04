import React, { useEffect, useState } from 'react';
import api from '../api';

function Home() {
  // State to store list of posts
  const [posts, setPosts] = useState([]);
  // State to manage loading indicator
  const [loading, setLoading] = useState(true);
  // State to store error message if any
  const [error, setError] = useState('');

  // useEffect runs once when the component mounts to fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // API call to fetch all posts
        const res = await api.get('/api/posts');
        setPosts(res.data); // Store posts in state
      } catch (err) {
        // Set error message if API call fails
        setError('Failed to fetch posts');
      } finally {
        // Stop loading regardless of success or failure
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Mini LinkedIn Feed</h2>

        {/* Show loading message */}
        {loading && <p>Loading...</p>}

        {/* Show error message if any */}
        {error && <p className="text-danger">{error}</p>}

        {/* Show message if no posts exist after loading */}
        {!loading && posts.length === 0 && <p>No posts found.</p>}

        {/* Render each post as a card */}
        {posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <div className="card-body">
              {/* Show post author or fallback to 'Unknown User' */}
              <h6 className="card-subtitle mb-2 text-muted">
                {post.author?.name || 'Unknown User'}
              </h6>
              {/* Post content */}
              <p className="card-text">{post.content}</p>
              {/* Post creation timestamp */}
              <small className="text-muted">
                Posted on {new Date(post.createdAt).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
