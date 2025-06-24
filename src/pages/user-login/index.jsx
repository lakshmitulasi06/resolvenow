import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import TwoFactorAuth from './components/TwoFactorAuth';

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    citizen: { email: 'citizen@resolvenow.com', password: 'citizen123' },
    admin: { email: 'admin@resolvenow.com', password: 'admin123' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // Simulate API call delay
    setTimeout(() => {
      // Check mock credentials
      if (formData.email === mockCredentials.citizen.email && 
          formData.password === mockCredentials.citizen.password) {
        // Citizen login success
        localStorage.setItem('userRole', 'citizen');
        localStorage.setItem('userEmail', formData.email);
        navigate('/complaint-tracking-details');
      } else if (formData.email === mockCredentials.admin.email && 
                 formData.password === mockCredentials.admin.password) {
        // Admin login success
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', formData.email);
        navigate('/admin-complaint-management');
      } else {
        // Invalid credentials
        setLoginError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Mock social login
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('userRole', 'citizen');
      localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
      navigate('/complaint-tracking-details');
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = (email) => {
    console.log('Password reset requested for:', email);
    setShowForgotPassword(false);
    // Show success message or handle password reset
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 group-hover:bg-primary-700">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                ResolveNow
              </span>
            </Link>

            {/* Registration Link */}
            <Link
              to="/user-registration"
              className="text-sm text-primary hover:text-primary-700 transition-colors duration-200 font-medium"
            >
              Need an account?
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="LogIn" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary">
              Sign in to your ResolveNow account to manage your complaints
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-surface rounded-lg shadow-md border border-border p-8">
            {!showTwoFactor ? (
              <LoginForm
                formData={formData}
                showPassword={showPassword}
                rememberMe={rememberMe}
                isLoading={isLoading}
                loginError={loginError}
                onInputChange={handleInputChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onToggleRemember={() => setRememberMe(!rememberMe)}
                onSubmit={handleLogin}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <TwoFactorAuth
                onVerify={(code) => {
                  console.log('2FA code:', code);
                  setShowTwoFactor(false);
                  navigate('/complaint-tracking-details');
                }}
                onBack={() => setShowTwoFactor(false)}
              />
            )}

            {/* Divider */}
            {!showTwoFactor && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-surface text-text-muted">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <SocialLogin onSocialLogin={handleSocialLogin} isLoading={isLoading} />
              </div>
            )}
          </div>

          {/* Mock Credentials Info */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-primary-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-primary-600 space-y-1">
              <p><strong>Citizen:</strong> citizen@resolvenow.com / citizen123</p>
              <p><strong>Admin:</strong> admin@resolvenow.com / admin123</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center text-sm text-text-muted">
            <p>
              Don't have an account?{' '}
              <Link
                to="/user-registration"
                className="text-primary hover:text-primary-700 transition-colors duration-200 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal
          onClose={() => setShowForgotPassword(false)}
          onSubmit={handleForgotPassword}
        />
      )}
    </div>
  );
};

export default UserLogin;