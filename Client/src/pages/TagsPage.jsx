import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tags as TagsIcon } from 'lucide-react';
import api from '../api/axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/tags');
        setTags(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load tags');
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  if (loading) return <LoadingSpinner label="Loading tags..." />;
  if (error) return <div className="container-custom py-10"><ErrorMessage message={error} /></div>;

  return (
    <div className="container-custom py-10">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
          <TagsIcon className="text-brand-500" size={20} />
        </span>
        <h1 className="text-3xl font-bold text-[#0F1220] dark:text-white">All Tags</h1>
      </div>

      {tags.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">No tags yet.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag._id}
              to={`/tag/${tag.slug}`}
              className="tag-pill text-base px-4 py-2 flex items-center gap-1.5"
            >
              #{tag.name}
              <span className="text-xs text-gray-400 dark:text-gray-500">({tag.postCount})</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsPage;
