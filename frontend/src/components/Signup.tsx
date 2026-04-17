import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      errors.terms = 'You must agree to the terms and conditions';
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
      await register(formData.email, formData.username, formData.password, formData.name);
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
            Join the future of market analysis
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-sf-dark mb-3"
              style={{ letterSpacing: '0.5px' }}
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-sf-light border border-sf-gray text-sf-dark placeholder-sf-gray-dark focus:outline-none focus:border-sf-orange transition-colors"
              placeholder="John Doe"
              style={{ fontSize: '16px' }}
            />
          </div>

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

          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-sf-dark mb-3"
              style={{ letterSpacing: '0.5px' }}
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-sf-light border border-sf-gray text-sf-dark placeholder-sf-gray-dark focus:outline-none focus:border-sf-orange transition-colors"
              placeholder="johndoe"
              style={{ fontSize: '16px' }}
            />
            {validationErrors.username && (
              <p className="mt-2 text-sm text-sf-orange font-medium">{validationErrors.username}</p>
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

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-sf-dark mb-3"
              style={{ letterSpacing: '0.5px' }}
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-sf-light border border-sf-gray text-sf-dark placeholder-sf-gray-dark focus:outline-none focus:border-sf-orange transition-colors"
              placeholder="••••••••"
              style={{ fontSize: '16px' }}
            />
            {validationErrors.confirmPassword && (
              <p className="mt-2 text-sm text-sf-orange font-medium">{validationErrors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start pt-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={isLoading}
              className="mt-1 w-4 h-4 border border-sf-gray text-sf-orange focus:outline-none"
            />
            <label htmlFor="terms" className="ml-3 text-sm text-sf-dark font-light">
              I agree to the{' '}
              <a href="#" className="text-sf-orange hover:underline font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-sf-orange hover:underline font-medium">
                Privacy Policy
              </a>
            </label>
          </div>
          {validationErrors.terms && (
            <p className="text-sm text-sf-orange font-medium">{validationErrors.terms}</p>
          )}

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
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-sf-gray"></div>
          <span className="text-sm text-sf-gray-dark font-light">Already a member?</span>
          <div className="flex-1 h-px bg-sf-gray"></div>
        </div>

        {/* Login Link */}
        <Link
          to="/login"
          className="block w-full text-center border border-sf-dark text-sf-dark hover:bg-sf-dark hover:text-white font-medium py-3 px-4 transition-colors"
          style={{ fontSize: '16px' }}
        >
          Sign in
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
