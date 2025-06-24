import React from 'react';
import Icon from '../../../components/AppIcon';

const AddressDetailsForm = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Address Details</h3>
        <p className="text-sm text-text-secondary">
          Your address helps us route complaints to the right local authorities
        </p>
      </div>

      {/* Street Address */}
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-text-primary mb-2">
          Street Address <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="MapPin" size={20} className="text-text-muted" />
          </div>
          <input
            type="text"
            id="street"
            value={formData.street}
            onChange={(e) => onChange('street', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.street ? 'border-error bg-error-50' : 'border-border bg-surface'
            }`}
            placeholder="Enter your street address"
          />
        </div>
        {errors.street && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.street}</span>
          </p>
        )}
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-text-primary mb-2">
          City <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Building" size={20} className="text-text-muted" />
          </div>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.city ? 'border-error bg-error-50' : 'border-border bg-surface'
            }`}
            placeholder="Enter your city"
          />
        </div>
        {errors.city && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.city}</span>
          </p>
        )}
      </div>

      {/* Postal Code */}
      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-text-primary mb-2">
          Postal Code <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Hash" size={20} className="text-text-muted" />
          </div>
          <input
            type="text"
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => onChange('postalCode', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.postalCode ? 'border-error bg-error-50' : 'border-border bg-surface'
            }`}
            placeholder="Enter postal code"
            maxLength="6"
          />
        </div>
        {errors.postalCode && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.postalCode}</span>
          </p>
        )}
        <p className="mt-2 text-xs text-text-muted">
          5-6 digit postal code for your area
        </p>
      </div>

      {/* Address Preview */}
      <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
        <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center space-x-2">
          <Icon name="Eye" size={16} />
          <span>Address Preview</span>
        </h4>
        <p className="text-sm text-text-secondary">
          {formData.street || 'Street Address'}<br />
          {formData.city || 'City'} {formData.postalCode || 'Postal Code'}
        </p>
      </div>
    </div>
  );
};

export default AddressDetailsForm;