import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';
import ImageUploader from '../components/common/ImageUploader';
import ErrorMessage from '../components/common/ErrorMessage';

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatarUrl: user?.avatarUrl || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarUpload = (url) => {
    setFormData({ ...formData, avatarUrl: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const response = await api.put('/api/users/me', {
        name: formData.name,
        bio: formData.bio,
        avatarUrl: formData.avatarUrl,
      });
      updateUser(response.data);
      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate(`/profile/${user._id}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom max-w-2xl py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1220] dark:text-white mb-1">Edit Profile</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-7">Update your public profile information.</p>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="bio" className="label">
              Bio <span className="text-gray-400 font-normal">({formData.bio.length}/200)</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              maxLength="200"
              placeholder="Tell readers a little about yourself..."
              className="input resize-none"
            />
          </div>
          <ImageUploader
            onUploadComplete={handleAvatarUpload}
            initialImage={formData.avatarUrl}
            label="Avatar"
          />

          {error && <ErrorMessage message={error} />}
          {success && (
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-3 text-sm">
              <CheckCircle2 size={16} /> {success}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Saving...' : 'Update Profile'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
