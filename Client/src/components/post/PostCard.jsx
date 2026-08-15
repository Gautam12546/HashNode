import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import TagPill from './TagPill';

const PostCard = ({ post }) => {
  const { title, slug, excerpt, coverImage, author, createdAt, tags, status } = post;

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="card card-hover group flex flex-col sm:flex-row gap-5 p-5 sm:p-6">
      {coverImage && (
        <Link to={`/post/${slug}`} className="shrink-0 block w-full sm:w-44 h-40 sm:h-auto rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
          <Link to={`/profile/${author?._id}`} className="flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-300 not-prose">
            {author?.avatarUrl ? (
              <img src={author.avatarUrl} alt={author.name} className="w-5 h-5 rounded-full object-cover" />
            ) : (
              <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 flex items-center justify-center text-[10px] font-semibold">
                {author?.name?.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="text-gray-700 dark:text-gray-300 font-medium">{author?.name}</span>
          </Link>
          <span className="text-gray-300 dark:text-gray-600">&middot;</span>
          <span className="inline-flex items-center gap-1"><Calendar size={12} /> {formatDate(createdAt)}</span>
          {status === 'draft' && <span className="badge-draft">Draft</span>}
        </div>

        <h2 className="text-xl font-bold mb-1.5 leading-snug">
          <Link to={`/post/${slug}`} className="text-[#0F1220] dark:text-white hover:text-brand-600 dark:hover:text-brand-300 no-underline">
            {title}
          </Link>
        </h2>

        {excerpt && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{excerpt}</p>
        )}

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <TagPill key={tag._id} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;
