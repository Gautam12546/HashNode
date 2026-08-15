import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import MarkdownPreview from '../components/editor/MarkdownPreview';
import TagPill from '../components/post/TagPill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/posts/${slug}`);
        setPost(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <LoadingSpinner label="Loading post..." />;
  if (error) return <div className="container-custom py-10 max-w-2xl"><ErrorMessage message={error} /></div>;
  if (!post) return <div className="container-custom py-10 max-w-2xl"><ErrorMessage message="Post not found" /></div>;

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readingTime = Math.max(1, Math.round((post.content || '').split(/\s+/).length / 200));

  return (
    <article className="pb-16">
      {post.coverImage && (
        <div className="w-full h-56 sm:h-80 md:h-96 overflow-hidden bg-gray-100 dark:bg-white/5">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-fit: contain" />
        </div>
      )}

      <div className="container-custom max-w-auto pt-10 sm:pt-12 lg:pt-16">
        <div className="pt-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-300 mb-6">
            <ArrowLeft size={15} /> Back to feed
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1220] dark:text-white mb-5 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 pb-6 mb-8 border-b border-gray-200 dark:border-white/10">
            <Link to={`/profile/${post.author._id}`} className="flex items-center gap-2.5">
              {post.author.avatarUrl ? (
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <span className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 flex items-center justify-center font-semibold">
                  {post.author.name.charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-[#0F1220] dark:text-white no-underline">{post.author.name}</p>
                <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
                  <span className="inline-flex items-center gap-1"><Calendar size={12} />{formatDate(post.createdAt)}</span>
                  <span className="inline-flex items-center gap-1"><Clock size={12} />{readingTime} min read</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="prose-hn prose-lg">
            <MarkdownPreview content={post.content} />
          </div>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200 dark:border-white/10">
              {post.tags.map((tag) => (
                <TagPill key={tag._id} tag={tag} size="lg" />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
