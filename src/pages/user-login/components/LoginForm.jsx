import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginForm = ({
  formData,
  showPassword,
  rememberMe,
  isLoading,
  loginError,
  onInputChange,
  onTogglePassword,
  onToggleRemember,
  onSubmit,
  onForgotPassword
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Error Message */}
      {loginError && (
        <div className="bg-error-50 border border-error-200 rounded-md p-3 flex items-center space-x-2">
          <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
          <p className="text-sm text-error">{loginError}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Mail" size={20} className="text-text-muted" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={onInputChange}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200"
            placeholder="Enter your email address"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={20} className="text-text-muted" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={onInputChange}
            className="w-full pl-10 pr-12 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <Icon
              name={showPassword ? "EyeOff" : "Eye"}
              size={20}
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
            />
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={onToggleRemember}
            className="h-4 w-4 text-primary focus:ring-primary-500 border-border rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
            Remember me
          </label>
        </div>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <Icon name="Loader2" size={20} className="animate-spin mr-2" />
            Signing In...
          </>
        ) : (
          <>
            <Icon name="LogIn" size={20} className="mr-2" />
            Sign In
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;