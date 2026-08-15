import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="error-message" role="alert">
      <AlertCircle size={18} className="shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
