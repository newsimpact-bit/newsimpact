import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      // Error is already set in the hook
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-dark-50 to-slate-dark-100 flex items-center justify-center p-6">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full opacity-5 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-500 rounded-full opacity-5 -ml-36 -mb-36"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-dark-200">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-dark-900 text-center">NewsImpact</h1>
            <p className="text-slate-dark-500 text-sm text-center mt-2">Market intelligence, powered by AI</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-dark-700 mb-2.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-slate-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:bg-slate-dark-50 disabled:cursor-not-allowed text-slate-dark-900 placeholder-slate-dark-400 transition-all"
                placeholder="name@company.com"
              />
              {validationErrors.email && (
                <p className="mt-2 text-xs text-red-600 font-medium">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-dark-700 mb-2.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-slate-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:bg-slate-dark-50 disabled:cursor-not-allowed text-slate-dark-900 placeholder-slate-dark-400 transition-all"
                placeholder="••••••••"
              />
              {validationErrors.password && (
                <p className="mt-2 text-xs text-red-600 font-medium">{validationErrors.password}</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:from-slate-dark-400 disabled:to-slate-dark-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-7 mb-7 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-dark-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-xs text-slate-dark-500 font-medium">New to NewsImpact?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            to="/signup"
            className="block w-full text-center border-2 border-slate-dark-300 hover:border-brand-500 text-slate-dark-700 hover:text-brand-600 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            Create Account
          </Link>

          {/* Footer */}
          <p className="text-center text-xs text-slate-dark-500 mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
