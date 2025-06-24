import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AccountSecurityForm = ({ formData, errors, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    if (score <= 2) return { strength: score, label: 'Weak', color: 'bg-error' };
    if (score <= 3) return { strength: score, label: 'Fair', color: 'bg-warning' };
    if (score <= 4) return { strength: score, label: 'Good', color: 'bg-primary' };
    return { strength: score, label: 'Strong', color: 'bg-success' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Account Security</h3>
        <p className="text-sm text-text-secondary">
          Create a secure password to protect your account
        </p>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={20} className="text-text-muted" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.password ? 'border-error bg-error-50' : 'border-border bg-surface'
            }`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex-1 bg-secondary-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${
                passwordStrength.strength <= 2 ? 'text-error' :
                passwordStrength.strength <= 3 ? 'text-warning' :
                passwordStrength.strength <= 4 ? 'text-primary' : 'text-success'
              }`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="text-xs text-text-muted space-y-1">
              <p className={formData.password.length >= 8 ? 'text-success' : 'text-text-muted'}>
                ✓ At least 8 characters
              </p>
              <p className={/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'text-success' : 'text-text-muted'}>
                ✓ Upper and lowercase letters
              </p>
              <p className={/\d/.test(formData.password) ? 'text-success' : 'text-text-muted'}>
                ✓ At least one number
              </p>
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={20} className="text-text-muted" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.confirmPassword ? 'border-error bg-error-50' : 'border-border bg-surface'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {formData.confirmPassword && formData.password === formData.confirmPassword && (
          <p className="mt-2 text-sm text-success flex items-center space-x-1">
            <Icon name="CheckCircle" size={16} />
            <span>Passwords match</span>
          </p>
        )}
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.confirmPassword}</span>
          </p>
        )}
      </div>

      {/* SMS Verification Toggle */}
      <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
        <div className="flex items-start space-x-3">
          <button
            type="button"
            onClick={() => onChange('enableSmsVerification', !formData.enableSmsVerification)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
              formData.enableSmsVerification
                ? 'bg-primary border-primary text-white' :'bg-surface border-border hover:border-primary'
            }`}
          >
            {formData.enableSmsVerification && <Icon name="Check" size={14} />}
          </button>
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">
              Enable SMS Verification (Optional)
            </h4>
            <p className="text-xs text-text-secondary">
              Receive SMS codes for additional account security during login
            </p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div>
        <div className="flex items-start space-x-3">
          <button
            type="button"
            onClick={() => onChange('acceptTerms', !formData.acceptTerms)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 mt-0.5 ${
              formData.acceptTerms
                ? 'bg-primary border-primary text-white' :'bg-surface border-border hover:border-primary'
            }`}
          >
            {formData.acceptTerms && <Icon name="Check" size={14} />}
          </button>
          <div>
            <p className="text-sm text-text-primary">
              I agree to the{' '}
              <a href="#" className="text-primary hover:text-primary-700 transition-colors duration-200 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary-700 transition-colors duration-200 underline">
                Privacy Policy
              </a>
              <span className="text-error ml-1">*</span>
            </p>
          </div>
        </div>
        {errors.acceptTerms && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.acceptTerms}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountSecurityForm;