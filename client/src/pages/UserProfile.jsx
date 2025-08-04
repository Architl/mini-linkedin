import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function UserProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const res = await api.get(`/api/users/${userId}`);
        setProfile(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileAndPosts();
  }, [userId]);

  if (!profile) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm mb-4">
        <h2>{profile.name}</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Bio:</strong> {profile.bio || 'No bio added yet.'}</p>
      </div>

      <h3 className="mb-3">Posts by {profile.name}</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card p-3 mb-2 shadow-sm">
            <p>{post.content}</p>
            <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default UserProfile;
