import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, AtSign, Rss } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200/80 dark:border-white/10 mt-16">
      <div className="container-custom py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-500 text-white font-display font-bold text-sm">
            #
          </span>
          <span className="font-display font-semibold text-[#0F1220] dark:text-white">
            Hash<span className="text-brand-500">Node</span>
          </span>
        </div>

        <div className="flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-300">Feed</Link>
          <Link to="/tags" className="hover:text-brand-600 dark:hover:text-brand-300">Tags</Link>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 dark:hover:text-brand-300">Privacy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 dark:hover:text-brand-300">Terms</a>
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Source code" className="hover:text-brand-500 transition-colors"><Code2 size={18} /></a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Contact" className="hover:text-brand-500 transition-colors"><AtSign size={18} /></a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="RSS feed" className="hover:text-brand-500 transition-colors"><Rss size={18} /></a>
        </div>
      </div>
      <div className="border-t border-gray-200/80 dark:border-white/10 py-4">
        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} HashNode. Built with the MERN stack.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
