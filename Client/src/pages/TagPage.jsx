import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import PostList from '../components/post/PostList';

const TagPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [tagName, setTagName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTagPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/tags/${slug}/posts`, {
          params: { page, limit: 10 },
        });
        setPosts(response.data.posts);
        setTagName(response.data.tag);
        setTotalPages(response.data.totalPages);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load tag posts');
      } finally {
        setLoading(false);
      }
    };
    fetchTagPosts();
  }, [slug, page]);

  return (
    <div className="container-custom py-10">
      <Link to="/tags" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-300 mb-4">
        <ArrowLeft size={15} /> All tags
      </Link>
      <h1 className="text-3xl font-bold text-[#0F1220] dark:text-white mb-8 font-mono">
        #{tagName || slug}
      </h1>
      <PostList posts={posts} loading={loading} error={error} />
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="btn btn-outline btn-sm"
          >
            <ChevronLeft size={15} /> Previous
          </button>
          <span className="text-sm font-mono text-gray-500 dark:text-gray-400">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-outline btn-sm"
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TagPage;
