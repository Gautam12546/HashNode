import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ label = 'Loading...' }) => {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <Loader2 className="animate-spin text-brand-500" size={30} strokeWidth={2.25} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
