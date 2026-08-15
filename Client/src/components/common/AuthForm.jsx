import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

const AuthForm = ({ type, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  const isLogin = type === 'login';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card p-8">
        <div className="mb-7 text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-500 text-white font-display font-bold text-2xl shadow-glow mb-4">
            #
          </span>
          <h2 className="text-2xl font-bold text-[#0F1220] dark:text-white">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            {isLogin ? 'Sign in to keep writing and reading.' : 'Join a community of developers who write.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="label">Name</label>
              <div className="relative">
                <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  className="input pl-10"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="label">Email</label>
            <div className="relative">
              <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                placeholder="••••••••"
                className="input pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn w-full" disabled={submitting}>
            {submitting ? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'}
            {!submitting && <ArrowRight size={16} />}
          </button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-1">
            {isLogin ? (
              <p>Don't have an account? <Link to="/register" className="font-medium hover:underline">Register</Link></p>
            ) : (
              <p>Already have an account? <Link to="/login" className="font-medium hover:underline">Login</Link></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
