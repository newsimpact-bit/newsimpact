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
    <div className="min-h-screen bg-sf-white flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-sf-dark mb-2" style={{ fontWeight: 800 }}>
            NewsImpact
          </h1>
          <p className="text-lg text-sf-gray-dark font-light">
            Market intelligence, powered by AI
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-sf-dark mb-3"
              style={{ letterSpacing: '0.5px' }}
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-sf-light border border-sf-gray text-sf-dark placeholder-sf-gray-dark focus:outline-none focus:border-sf-orange transition-colors"
              placeholder="name@company.com"
              style={{ fontSize: '16px' }}
            />
            {validationErrors.email && (
              <p className="mt-2 text-sm text-sf-orange font-medium">{validationErrors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-sf-dark mb-3"
              style={{ letterSpacing: '0.5px' }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-sf-light border border-sf-gray text-sf-dark placeholder-sf-gray-dark focus:outline-none focus:border-sf-orange transition-colors"
              placeholder="••••••••"
              style={{ fontSize: '16px' }}
            />
            {validationErrors.password && (
              <p className="mt-2 text-sm text-sf-orange font-medium">{validationErrors.password}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-sf-light border border-sf-orange">
              <p className="text-sm text-sf-orange font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sf-orange hover:bg-orange-600 disabled:bg-sf-gray-dark disabled:cursor-not-allowed text-white font-semibold py-3 px-4 transition-colors mt-8"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-sf-gray"></div>
          <span className="text-sm text-sf-gray-dark font-light">New to NewsImpact?</span>
          <div className="flex-1 h-px bg-sf-gray"></div>
        </div>

        {/* Sign Up Link */}
        <Link
          to="/signup"
          className="block w-full text-center border border-sf-dark text-sf-dark hover:bg-sf-dark hover:text-white font-medium py-3 px-4 transition-colors"
          style={{ fontSize: '16px' }}
        >
          Create account
        </Link>

        {/* Footer */}
        <p className="text-center text-xs text-sf-gray-dark mt-8 font-light">
          By continuing, you agree to our{' '}
          <a href="#" className="text-sf-dark hover:text-sf-orange font-medium">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-sf-dark hover:text-sf-orange font-medium">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};
