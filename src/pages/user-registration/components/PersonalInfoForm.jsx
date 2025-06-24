import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonalInfoForm = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Personal Information</h3>
        <p className="text-sm text-text-secondary">
          Please provide your basic information to get started
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="User" size={20} className="text-text-muted" />
          </div>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.fullName ? 'border-error bg-error-50' : 'border-border bg-surface'
            }`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.fullName && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.fullName}</span>
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Mail" size={20} className="text-text-muted" />
          </div>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.email ? 'border-error bg-error-50' : 'border-border bg-surface'
            }`}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
          Phone Number <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Phone" size={20} className="text-text-muted" />
          </div>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.phone ? 'border-error bg-error-50' : 'border-border bg-surface'
            }`}
            placeholder="Enter your phone number"
          />
        </div>
        {errors.phone && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.phone}</span>
          </p>
        )}
        <p className="mt-2 text-xs text-text-muted">
          We'll use this number for important account notifications
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;