import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      <div className="relative text-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500 text-white font-display font-bold text-3xl shadow-glow mb-6">
          #
        </span>
        <h1 className="text-6xl sm:text-7xl font-display font-extrabold text-[#0F1220] dark:text-white mb-3">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn">
          <ArrowLeft size={16} /> Back to Feed
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
