import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PersonalInfoSection = ({ userData, onDataChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    dateOfBirth: userData.dateOfBirth,
    gender: userData.gender,
    occupation: userData.occupation
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onDataChange(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      occupation: userData.occupation
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-200"
          >
            <Icon name="Edit2" size={16} />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Full Name *
          </label>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`input-field ${errors.name ? 'border-error focus:ring-error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name}</p>
              )}
            </div>
          ) : (
            <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
              {userData.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address *
          </label>
          {isEditing ? (
            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`input-field ${errors.email ? 'border-error focus:ring-error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md flex-1">
                {userData.email}
              </p>
              {userData.emailVerified && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-xs">Verified</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Phone Number *
          </label>
          {isEditing ? (
            <div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`input-field ${errors.phone ? 'border-error focus:ring-error' : ''}`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-error">{errors.phone}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md flex-1">
                {userData.phone}
              </p>
              {userData.phoneVerified && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-xs">Verified</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date of Birth
          </label>
          {isEditing ? (
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="input-field"
            />
          ) : (
            <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
              {userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : 'Not specified'}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Gender
          </label>
          {isEditing ? (
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="input-field"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          ) : (
            <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
              {userData.gender ? userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1) : 'Not specified'}
            </p>
          )}
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Occupation
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              className="input-field"
              placeholder="Enter your occupation"
            />
          ) : (
            <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
              {userData.occupation || 'Not specified'}
            </p>
          )}
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-secondary-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Account Verification Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Email Verification</span>
            </div>
            <div className="flex items-center space-x-1">
              {userData.emailVerified ? (
                <>
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success">Verified</span>
                </>
              ) : (
                <>
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                  <span className="text-sm text-warning">Pending</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Phone Verification</span>
            </div>
            <div className="flex items-center space-x-1">
              {userData.phoneVerified ? (
                <>
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success">Verified</span>
                </>
              ) : (
                <>
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                  <span className="text-sm text-warning">Pending</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;