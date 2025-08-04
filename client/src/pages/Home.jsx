import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import api from '../api';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/api/posts');
        setPosts(res.data);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Mini LinkedIn Feed</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && posts.length === 0 && <p>No posts found.</p>}

        {posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <div className="card-body">
              {/* ✅ Clickable author name */}
              <h6 className="card-subtitle mb-2 text-muted">
                {post.author ? (
                  <Link to={`/user/${post.author._id}`} className="text-decoration-none fw-bold">
                    {post.author.name}
                  </Link>
                ) : (
                  'Unknown User'
                )}
              </h6>
              <p className="card-text">{post.content}</p>
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
