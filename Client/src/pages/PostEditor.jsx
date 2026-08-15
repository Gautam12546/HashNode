import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Hash, Image as ImageIcon, Settings2 } from 'lucide-react';
import api from '../api/axios';
import MarkdownEditor from '../components/editor/MarkdownEditor';
import ImageUploader from '../components/common/ImageUploader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
    status: 'draft',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchPost = async () => {
        try {
          setLoading(true);
          const response = await api.get('/api/posts/mine');
          const post = response.data.find((p) => p._id === id);
          if (post) {
            setFormData({
              title: post.title,
              content: post.content,
              coverImage: post.coverImage || '',
              status: post.status,
              tags: post.tags.map((t) => t.name).join(', '),
            });
          } else {
            setFetchError('Post not found');
          }
        } catch (err) {
          setFetchError(err.response?.data?.message || 'Failed to load post');
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleCoverImageUpload = (url) => {
    setFormData({ ...formData, coverImage: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, coverImage, status, tags } = formData;
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { title, content, coverImage, status, tags: tagArray };

    try {
      setLoading(true);
      if (isEdit) {
        await api.put(`/api/posts/${id}`, payload);
      } else {
        await api.post('/api/posts', payload);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
      setLoading(false);
    }
  };

  if (loading && isEdit) return <LoadingSpinner label="Loading post..." />;
  if (fetchError) return <div className="container-custom py-10 max-w-2xl"><ErrorMessage message={fetchError} /></div>;

  return (
    <div className="container-custom py-10 max-w-6xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1220] dark:text-white mb-1">
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-7">
        {isEdit ? 'Refine your writing and update it whenever you like.' : 'Draft it, style it, publish it whenever you\'re ready.'}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card space-y-5">
              <div>
                <label htmlFor="title" className="label">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Give your post a compelling title"
                  className="input text-lg font-display font-semibold"
                />
              </div>
            </div>

            <div className="card">
              <label className="label mb-3">Content (Markdown)</label>
              <MarkdownEditor value={formData.content} onChange={handleContentChange} />
            </div>

            {error && <ErrorMessage message={error} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-20">
            <div className="card space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0F1220] dark:text-white">
                <Settings2 size={16} className="text-brand-500" /> Publish settings
              </div>

              <div>
                <span className="label">Status</span>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-gray-100 dark:bg-white/5">
                  {['draft', 'published'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: s })}
                      className={`text-sm font-medium py-1.5 rounded-lg capitalize transition-colors ${
                        formData.status === s
                          ? 'bg-white dark:bg-[#12172A] text-brand-600 dark:text-brand-300 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="label flex items-center gap-1.5">
                  <Hash size={14} /> Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="javascript, react, mongodb"
                  className="input"
                />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">Comma-separated</p>
              </div>
            </div>

            <div className="card">
              <label className="label flex items-center gap-1.5 mb-3">
                <ImageIcon size={14} /> Cover Image
              </label>
              <ImageUploader
                onUploadComplete={handleCoverImageUpload}
                initialImage={formData.coverImage}
                label=""
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="btn flex-1" disabled={loading}>
                {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/dashboard')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
