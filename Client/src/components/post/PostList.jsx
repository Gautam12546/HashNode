import React from 'react';
import { FileQuestion } from 'lucide-react';
import PostCard from './PostCard';
import ErrorMessage from '../common/ErrorMessage';

const SkeletonCard = () => (
  <div className="card flex flex-col sm:flex-row gap-5 p-5 sm:p-6">
    <div className="skeleton shrink-0 w-full sm:w-44 h-40 sm:h-28" />
    <div className="flex-1 min-w-0 space-y-3">
      <div className="skeleton h-3 w-32" />
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-2/3" />
    </div>
  </div>
);

const PostList = ({ posts, loading, error }) => {
  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} />;

  if (!posts || posts.length === 0) {
    return (
      <div className="card text-center py-16 px-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4">
          <FileQuestion className="text-brand-500" size={26} />
        </div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">No posts found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different search, or check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
