import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PenSquare, Pencil, Trash2, FileText, CheckCircle2, FileEdit } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/posts/mine');
        setPosts(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your posts');
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      setDeletingId(postId);
      await api.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <LoadingSpinner label="Loading your posts..." />;
  if (error) return <div className="container-custom py-10"><ErrorMessage message={error} /></div>;

  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  return (
    <div className="container-custom py-10">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F1220] dark:text-white">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage the posts you've written.</p>
        </div>
        <Link to="/editor/new" className="btn">
          <PenSquare size={16} /> New Post
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4! sm:p-5! flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center shrink-0">
            <FileText className="text-brand-500" size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold font-display text-[#0F1220] dark:text-white leading-none">{posts.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total posts</p>
          </div>
        </div>
        <div className="card p-4! sm:p-5! flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold font-display text-[#0F1220] dark:text-white leading-none">{publishedCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Published</p>
          </div>
        </div>
        <div className="card p-4! sm:p-5! flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
            <FileEdit className="text-amber-600 dark:text-amber-400" size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold font-display text-[#0F1220] dark:text-white leading-none">{draftCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Drafts</p>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4">
            <PenSquare className="text-brand-500" size={24} />
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">You haven't written any posts yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 mb-5">Your next great write-up starts with a single draft.</p>
          <Link to="/editor/new" className="btn btn-sm inline-flex">Create your first post</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`card py-4! flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-l-4 ${
                post.status === 'draft' ? 'border-l-amber-400' : 'border-l-brand-500'
              }`}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#0F1220] dark:text-white truncate">
                  <Link to={`/post/${post.slug}`} className="hover:text-brand-600 dark:hover:text-brand-300 no-underline">
                    {post.title}
                  </Link>
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1.5 font-mono">
                  <span className={post.status === 'draft' ? 'badge-draft' : 'badge-published'}>
                    {post.status}
                  </span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.tags?.length > 0 && (
                    <span className="truncate">{post.tags.map(t => `#${t.name}`).join(' ')}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link to={`/editor/${post._id}`} className="btn btn-outline btn-sm">
                  <Pencil size={13} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  disabled={deletingId === post._id}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={13} /> {deletingId === post._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
