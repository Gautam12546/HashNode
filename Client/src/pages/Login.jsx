import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/common/AuthForm';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    const { email, password } = formData;
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      <div className="relative z-10 w-full">
        <AuthForm type="login" onSubmit={handleSubmit} error={error} />
      </div>
    </div>
  );
};

export default Login;
