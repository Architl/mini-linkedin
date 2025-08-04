import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function UserProfile() {
  const { id } = useParams(); // ✅ Get user ID from URL
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const userRes = await api.get(`/api/users/${id}`); // ✅ Uses correct ID
        setUser(userRes.data);

        const postsRes = await api.get(`/api/posts/user/${id}`);
        setPosts(postsRes.data);
      } catch (err) {
        setError('Failed to load profile or posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>{user?.name || 'User Profile'}</h2>
        <p>{user?.email}</p>
      </div>

      <h4 className="mb-3">Posts by {user?.name}</h4>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <div className="card-body">
              <p className="card-text">{post.content}</p>
              <small className="text-muted">
                Posted on {new Date(post.createdAt).toLocaleString()}
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserProfile;
