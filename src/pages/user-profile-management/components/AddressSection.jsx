import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AddressSection = ({ userData, onDataChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeAddress, setActiveAddress] = useState('primary');
  const [formData, setFormData] = useState({
    primaryAddress: { ...userData.primaryAddress },
    alternateAddress: { ...userData.alternateAddress }
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (addressType, field, value) => {
    setFormData(prev => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    const errorKey = `${addressType}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate primary address
    if (!formData.primaryAddress.street.trim()) {
      newErrors['primaryAddress.street'] = 'Street address is required';
    }
    if (!formData.primaryAddress.city.trim()) {
      newErrors['primaryAddress.city'] = 'City is required';
    }
    if (!formData.primaryAddress.state.trim()) {
      newErrors['primaryAddress.state'] = 'State is required';
    }
    if (!formData.primaryAddress.zipCode.trim()) {
      newErrors['primaryAddress.zipCode'] = 'ZIP code is required';
    }
    if (!formData.primaryAddress.country.trim()) {
      newErrors['primaryAddress.country'] = 'Country is required';
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
      primaryAddress: { ...userData.primaryAddress },
      alternateAddress: { ...userData.alternateAddress }
    });
    setErrors({});
    setIsEditing(false);
  };

  const renderAddressForm = (addressType, addressData, title) => {
    const isRequired = addressType === 'primaryAddress';
    
    return (
      <div className="space-y-4">
        <h4 className="text-md font-medium text-text-primary flex items-center space-x-2">
          <Icon name={addressType === 'primaryAddress' ? 'Home' : 'MapPin'} size={16} />
          <span>{title}</span>
          {isRequired && <span className="text-error">*</span>}
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Street Address {isRequired && '*'}
            </label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={formData[addressType].street}
                  onChange={(e) => handleInputChange(addressType, 'street', e.target.value)}
                  className={`input-field ${errors[`${addressType}.street`] ? 'border-error focus:ring-error' : ''}`}
                  placeholder="Enter street address"
                />
                {errors[`${addressType}.street`] && (
                  <p className="mt-1 text-sm text-error">{errors[`${addressType}.street`]}</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
                {addressData.street || 'Not specified'}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                City {isRequired && '*'}
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={formData[addressType].city}
                    onChange={(e) => handleInputChange(addressType, 'city', e.target.value)}
                    className={`input-field ${errors[`${addressType}.city`] ? 'border-error focus:ring-error' : ''}`}
                    placeholder="Enter city"
                  />
                  {errors[`${addressType}.city`] && (
                    <p className="mt-1 text-sm text-error">{errors[`${addressType}.city`]}</p>
                  )}
                </div>
              ) : (
                <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
                  {addressData.city || 'Not specified'}
                </p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                State {isRequired && '*'}
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={formData[addressType].state}
                    onChange={(e) => handleInputChange(addressType, 'state', e.target.value)}
                    className={`input-field ${errors[`${addressType}.state`] ? 'border-error focus:ring-error' : ''}`}
                    placeholder="Enter state"
                  />
                  {errors[`${addressType}.state`] && (
                    <p className="mt-1 text-sm text-error">{errors[`${addressType}.state`]}</p>
                  )}
                </div>
              ) : (
                <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
                  {addressData.state || 'Not specified'}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                ZIP Code {isRequired && '*'}
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={formData[addressType].zipCode}
                    onChange={(e) => handleInputChange(addressType, 'zipCode', e.target.value)}
                    className={`input-field ${errors[`${addressType}.zipCode`] ? 'border-error focus:ring-error' : ''}`}
                    placeholder="Enter ZIP code"
                  />
                  {errors[`${addressType}.zipCode`] && (
                    <p className="mt-1 text-sm text-error">{errors[`${addressType}.zipCode`]}</p>
                  )}
                </div>
              ) : (
                <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
                  {addressData.zipCode || 'Not specified'}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Country {isRequired && '*'}
              </label>
              {isEditing ? (
                <div>
                  <select
                    value={formData[addressType].country}
                    onChange={(e) => handleInputChange(addressType, 'country', e.target.value)}
                    className={`input-field ${errors[`${addressType}.country`] ? 'border-error focus:ring-error' : ''}`}
                  >
                    <option value="">Select country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors[`${addressType}.country`] && (
                    <p className="mt-1 text-sm text-error">{errors[`${addressType}.country`]}</p>
                  )}
                </div>
              ) : (
                <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-md">
                  {addressData.country || 'Not specified'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Address Information</h3>
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

      {/* Address Type Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8" aria-label="Address types">
          <button
            onClick={() => setActiveAddress('primary')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeAddress === 'primary' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
            }`}
          >
            Primary Address
          </button>
          <button
            onClick={() => setActiveAddress('alternate')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeAddress === 'alternate' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
            }`}
          >
            Alternate Address
          </button>
        </nav>
      </div>

      {/* Address Forms */}
      <div className="space-y-8">
        {activeAddress === 'primary' && renderAddressForm('primaryAddress', userData.primaryAddress, 'Primary Address')}
        {activeAddress === 'alternate' && renderAddressForm('alternateAddress', userData.alternateAddress, 'Alternate Address')}
      </div>

      {/* Map Integration */}
      <div className="bg-secondary-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Map" size={16} />
          <span>Address Location</span>
        </h4>
        <div className="w-full h-64 bg-secondary-100 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Address Location"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
            className="border-0"
          />
        </div>
        <p className="text-xs text-text-muted mt-2">
          Map shows approximate location based on your primary address
        </p>
      </div>
    </div>
  );
};

export default AddressSection;