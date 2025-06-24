import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SecuritySettings = ({ securityData, onDataChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securityData.twoFactorEnabled);

  // Mock active sessions data
  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      lastActive: '2024-01-20T10:30:00Z',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      ipAddress: '192.168.1.101',
      lastActive: '2024-01-20T08:15:00Z',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Android',
      location: 'Brooklyn, NY',
      ipAddress: '192.168.1.102',
      lastActive: '2024-01-19T22:45:00Z',
      current: false
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePasswordForm()) {
      // Handle password change
      console.log('Password change submitted');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      onDataChange({
        securitySettings: {
          ...securityData,
          lastPasswordChange: new Date().toISOString().split('T')[0]
        }
      });
    }
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    onDataChange({
      securitySettings: {
        ...securityData,
        twoFactorEnabled: !twoFactorEnabled
      }
    });
  };

  const handleLogoutSession = (sessionId) => {
    console.log('Logout session:', sessionId);
    // Handle session logout
  };

  const handleLogoutAllSessions = () => {
    console.log('Logout all sessions');
    // Handle logout all sessions
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'text-error' };
      case 2:
      case 3:
        return { label: 'Medium', color: 'text-warning' };
      case 4:
      case 5:
        return { label: 'Strong', color: 'text-success' };
      default:
        return { label: 'Weak', color: 'text-error' };
    }
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Security Settings</h3>
      </div>

      {/* Password Section */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Lock" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-md font-medium text-text-primary">Password</h4>
              <p className="text-sm text-text-secondary">
                Last changed: {new Date(securityData.lastPasswordChange).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-200"
          >
            <Icon name="Edit2" size={16} />
            <span>Change Password</span>
          </button>
        </div>

        {showPasswordForm && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Current Password *
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className={`input-field ${passwordErrors.currentPassword ? 'border-error focus:ring-error' : ''}`}
                placeholder="Enter current password"
              />
              {passwordErrors.currentPassword && (
                <p className="mt-1 text-sm text-error">{passwordErrors.currentPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                New Password *
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                className={`input-field ${passwordErrors.newPassword ? 'border-error focus:ring-error' : ''}`}
                placeholder="Enter new password"
              />
              {passwordForm.newPassword && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-secondary-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength <= 2 ? 'bg-error' : passwordStrength <= 3 ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${strengthInfo.color}`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                </div>
              )}
              {passwordErrors.newPassword && (
                <p className="mt-1 text-sm text-error">{passwordErrors.newPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                className={`input-field ${passwordErrors.confirmPassword ? 'border-error focus:ring-error' : ''}`}
                placeholder="Confirm new password"
              />
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-sm text-error">{passwordErrors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setPasswordErrors({});
                }}
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
              >
                Update Password
              </button>
            </div>

            {/* Password Requirements */}
            <div className="bg-secondary-100 rounded-md p-3 mt-4">
              <h5 className="text-sm font-medium text-text-primary mb-2">Password Requirements:</h5>
              <ul className="text-xs text-text-secondary space-y-1">
                <li className="flex items-center space-x-2">
                  <Icon name={passwordForm.newPassword.length >= 8 ? "CheckCircle" : "Circle"} size={12} className={passwordForm.newPassword.length >= 8 ? "text-success" : "text-text-muted"} />
                  <span>At least 8 characters long</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name={/[a-z]/.test(passwordForm.newPassword) ? "CheckCircle" : "Circle"} size={12} className={/[a-z]/.test(passwordForm.newPassword) ? "text-success" : "text-text-muted"} />
                  <span>Contains lowercase letter</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name={/[A-Z]/.test(passwordForm.newPassword) ? "CheckCircle" : "Circle"} size={12} className={/[A-Z]/.test(passwordForm.newPassword) ? "text-success" : "text-text-muted"} />
                  <span>Contains uppercase letter</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name={/\d/.test(passwordForm.newPassword) ? "CheckCircle" : "Circle"} size={12} className={/\d/.test(passwordForm.newPassword) ? "text-success" : "text-text-muted"} />
                  <span>Contains number</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-md font-medium text-text-primary">Two-Factor Authentication</h4>
              <p className="text-sm text-text-secondary">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <button
            onClick={handleTwoFactorToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              twoFactorEnabled ? 'bg-primary' : 'bg-secondary-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {twoFactorEnabled && (
          <div className="mt-4 p-3 bg-success-50 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">Two-factor authentication is enabled</span>
            </div>
            <p className="text-xs text-success mt-1">
              Your account is protected with an additional security layer
            </p>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Monitor" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-md font-medium text-text-primary">Active Sessions</h4>
              <p className="text-sm text-text-secondary">
                Manage devices that are signed into your account
              </p>
            </div>
          </div>
          <button
            onClick={handleLogoutAllSessions}
            className="text-sm text-error hover:text-error-700 transition-colors duration-200"
          >
            Logout All
          </button>
        </div>

        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-surface rounded-md border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Icon name={session.device.includes('iPhone') || session.device.includes('Android') ? 'Smartphone' : 'Monitor'} size={16} className="text-text-secondary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-text-primary">{session.device}</p>
                    {session.current && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-700">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary">
                    {session.location} • {session.ipAddress}
                  </p>
                  <p className="text-xs text-text-muted">
                    Last active: {new Date(session.lastActive).toLocaleString()}
                  </p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleLogoutSession(session.id)}
                  className="text-sm text-error hover:text-error-700 transition-colors duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span>Security Tips</span>
        </h4>
        <ul className="text-sm text-text-secondary space-y-2">
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Use a strong, unique password for your account</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Enable two-factor authentication for extra security</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Regularly review and logout unused sessions</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Never share your login credentials with others</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SecuritySettings;