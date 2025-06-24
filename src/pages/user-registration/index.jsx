import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressDetailsForm from './components/AddressDetailsForm';
import AccountSecurityForm from './components/AccountSecurityForm';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    
    // Address Details
    street: '',
    city: '',
    postalCode: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    enableSmsVerification: false
  });

  const steps = [
    { id: 1, title: 'Personal Information', icon: 'User' },
    { id: 2, title: 'Address Details', icon: 'MapPin' },
    { id: 3, title: 'Account Security', icon: 'Shield' }
  ];

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (step === 2) {
      if (!formData.street.trim()) errors.street = 'Street address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.postalCode.trim()) {
        errors.postalCode = 'Postal code is required';
      } else if (!/^\d{5,6}$/.test(formData.postalCode)) {
        errors.postalCode = 'Please enter a valid postal code';
      }
    }
    
    if (step === 3) {
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        errors.acceptTerms = 'You must accept the terms and conditions';
      }
    }
    
    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNext = () => {
    const errors = validateStep(currentStep);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setFormErrors({});
  };

  const handleSubmit = async () => {
    const errors = validateStep(3);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    setGeneralError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - check if email already exists
      if (formData.email === 'existing@example.com') {
        throw new Error('An account with this email already exists');
      }
      
      setShowSuccess(true);
      
      // Redirect to login after success
      setTimeout(() => {
        navigate('/user-login');
      }, 3000);
      
    } catch (error) {
      setGeneralError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-surface rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Registration Successful!</h2>
            <p className="text-text-secondary mb-6">
              We've sent a verification email to <strong>{formData.email}</strong>. 
              Please check your inbox and click the verification link to activate your account.
            </p>
            <div className="space-y-3">
              <Link
                to="/user-login"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
              >
                Continue to Login
              </Link>
              <p className="text-sm text-text-muted">
                Redirecting to login page in a few seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-text-primary">ResolveNow</span>
            </Link>
            
            <Link
              to="/user-login"
              className="text-sm text-primary hover:text-primary-700 transition-colors duration-200 font-medium"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                    currentStep >= step.id
                      ? 'bg-primary border-primary text-white' :'bg-surface border-border text-text-muted'
                  }`}>
                    <Icon name={step.icon} size={20} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 transition-colors duration-200 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
              Create Your Account
            </h1>
            <p className="text-text-secondary text-center">
              Step {currentStep} of 3: {steps[currentStep - 1].title}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-surface rounded-lg shadow-lg p-6">
            {/* General Error */}
            {generalError && (
              <div className="mb-6 p-4 bg-error-50 border border-error-100 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
                  <p className="text-sm text-error font-medium">{generalError}</p>
                </div>
              </div>
            )}

            {/* Step Forms */}
            {currentStep === 1 && (
              <PersonalInfoForm
                formData={formData}
                errors={formErrors}
                onChange={handleInputChange}
              />
            )}

            {currentStep === 2 && (
              <AddressDetailsForm
                formData={formData}
                errors={formErrors}
                onChange={handleInputChange}
              />
            )}

            {currentStep === 3 && (
              <AccountSecurityForm
                formData={formData}
                errors={formErrors}
                onChange={handleInputChange}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-6 py-3 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200 font-medium"
                >
                  <Icon name="ArrowLeft" size={20} />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
                >
                  <span>Next</span>
                  <Icon name="ArrowRight" size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium min-w-32"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="UserPlus" size={20} />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-text-muted">
                Already have an account?{' '}
                <Link
                  to="/user-login"
                  className="text-primary hover:text-primary-700 transition-colors duration-200 font-medium"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistration;