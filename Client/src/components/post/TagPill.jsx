import React from 'react';
import { Link } from 'react-router-dom';

const TagPill = ({ tag, size = 'sm' }) => {
  const sizeClass = size === 'lg' ? 'text-base px-4 py-2' : '';
  return (
    <Link to={`/tag/${tag.slug}`} className={`tag-pill ${sizeClass}`}>
      #{tag.name}
    </Link>
  );
};

export default TagPill;
