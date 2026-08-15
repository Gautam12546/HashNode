import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../api/axios';
import PostList from '../components/post/PostList';

const Feed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/posts', {
          params: { search: searchQuery, page, limit: 10 },
        });
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load feed');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [searchQuery, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchInput = form.elements.search.value;
    setSearchParams(searchInput ? { search: searchInput } : {});
    setPage(1);
  };

  return (
    <div className="container-custom py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1220] dark:text-white">
          {searchQuery ? (
            <>Results for <span className="text-brand-500">"{searchQuery}"</span></>
          ) : (
            <>Latest from the community</>
          )}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {searchQuery ? 'Posts matching your search.' : 'Fresh technical writing from developers, for developers.'}
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-8 max-w-xl">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          name="search"
          placeholder="Search posts by title..."
          defaultValue={searchQuery}
          key={searchQuery}
          className="input pl-10 pr-24"
        />
        <button type="submit" className="btn btn-sm absolute right-1.5 top-1/2 -translate-y-1/2">
          Search
        </button>
      </form>

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
          <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
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

export default Feed;
