import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TwoFactorAuth = ({ onVerify, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (verificationCode = code.join('')) => {
    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (verificationCode === '123456') {
        onVerify(verificationCode);
      } else {
        setError('Invalid verification code. Please try again.');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResend = () => {
    setTimeLeft(30);
    setError('');
    console.log('Resending verification code...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Smartphone" size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-text-secondary">
          Enter the 6-digit code sent to your registered device
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error-50 border border-error-200 rounded-md p-3 flex items-center space-x-2">
          <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Code Input */}
      <div className="flex justify-center space-x-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200"
            autoComplete="off"
          />
        ))}
      </div>

      {/* Verify Button */}
      <button
        onClick={() => handleVerify()}
        disabled={isLoading || code.some(digit => digit === '')}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <Icon name="Loader2" size={20} className="animate-spin mr-2" />
            Verifying...
          </>
        ) : (
          <>
            <Icon name="Shield" size={20} className="mr-2" />
            Verify Code
          </>
        )}
      </button>

      {/* Resend Code */}
      <div className="text-center">
        <p className="text-sm text-text-secondary mb-2">
          Didn't receive the code?
        </p>
        {timeLeft > 0 ? (
          <p className="text-sm text-text-muted">
            Resend code in {timeLeft} seconds
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-sm text-primary hover:text-primary-700 transition-colors duration-200 font-medium"
          >
            Resend Code
          </button>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full flex justify-center items-center py-2 px-4 border border-border rounded-md text-sm font-medium text-text-secondary hover:bg-secondary-50 transition-colors duration-200"
      >
        <Icon name="ArrowLeft" size={16} className="mr-2" />
        Back to Login
      </button>

      {/* Demo Info */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
        <p className="text-xs text-primary-600 text-center">
          <strong>Demo:</strong> Use code "123456" to proceed
        </p>
      </div>
    </div>
  );
};

export default TwoFactorAuth;