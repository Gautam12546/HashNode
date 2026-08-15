import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import api from '../api/axios';
import PostList from '../components/post/PostList';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/users/${id}`);
        setProfileUser(response.data.user);
        setPosts(response.data.posts);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'User not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading profile..." />;
  if (error) return <div className="container-custom py-10"><ErrorMessage message={error} /></div>;
  if (!profileUser) return <div className="container-custom py-10"><ErrorMessage message="User not found" /></div>;

  const isOwnProfile = currentUser && currentUser._id === profileUser._id;

  return (
    <div>
      {/* <div className="h-36 sm:h-44 bg-gradient-to-r from-brand-200 to-brand-700 relative">
        <div className="absolute inset-0 bg-dot-grid text-white/10" />
      </div> */}
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 pt-8 pb-8">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white dark:bg-[#12172A] p-1.5 shadow-lg shrink-0">
            <div className="w-full h-full rounded-xl bg-brand-100 dark:bg-brand-500/20 overflow-hidden flex items-center justify-center text-3xl font-bold text-brand-700 dark:text-brand-300">
              {profileUser.avatarUrl ? (
                <img src={profileUser.avatarUrl} alt={profileUser.name} className="w-full h-full object-cover" />
              ) : (
                <span>{profileUser.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
          <div className="text-center sm:text-left flex-1 pb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1220] dark:text-white">{profileUser.name}</h1>
            {profileUser.bio && <p className="text-gray-600 dark:text-gray-300 mt-1 max-w-xl">{profileUser.bio}</p>}
          </div>
          {isOwnProfile && (
            <Link to="/settings" className="btn btn-outline btn-sm shrink-0">
              <Settings size={14} /> Edit Profile
            </Link>
          )}
        </div>

        <h2 className="text-lg font-semibold text-[#0F1220] dark:text-white mb-4">
          Posts by {profileUser.name}
        </h2>
        <PostList posts={posts} loading={false} error={posts.length === 0 ? 'No published posts yet.' : ''} />
      </div>
    </div>
  );
};

export default Profile;
