import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LocationStep = ({ formData, updateFormData, errors }) => {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateFormData('coordinates', { lat: latitude, lng: longitude });
        setUseCurrentLocation(true);
        setIsLoadingLocation(false);
        
        // In a real app, you would reverse geocode to get address
        // For now, we'll just show the coordinates console.log('Location obtained:', latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLoadingLocation(false);
        alert('Unable to retrieve your location. Please enter the address manually.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Location Information
        </h2>
        <p className="text-text-secondary mb-6">
          Please provide the location where the issue occurred. This helps us route your complaint to the appropriate department.
        </p>
      </div>

      {/* Current Location Option */}
      <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={20} className="text-primary" />
            <div>
              <h3 className="text-sm font-medium text-text-primary">
                Use Current Location
              </h3>
              <p className="text-sm text-text-secondary">
                Automatically detect your current location
              </p>
            </div>
          </div>
          <button
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingLocation ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Getting Location...</span>
              </>
            ) : (
              <>
                <Icon name="Navigation" size={16} />
                <span>Get Location</span>
              </>
            )}
          </button>
        </div>
        
        {formData.coordinates && (
          <div className="mt-3 p-3 bg-success-50 border border-success-100 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success-700">
                Location detected: {formData.coordinates.lat.toFixed(6)}, {formData.coordinates.lng.toFixed(6)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Address Fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-text-primary mb-2">
            Street Address <span className="text-error">*</span>
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            placeholder="Enter the complete address where the issue occurred"
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 resize-vertical ${
              errors.address ? 'border-error' : 'border-border'
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.address}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-text-primary mb-2">
              City <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
              placeholder="Enter city name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
                errors.city ? 'border-error' : 'border-border'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-text-primary mb-2">
              State <span className="text-error">*</span>
            </label>
            <select
              id="state"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
                errors.state ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select state</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.state}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-text-primary mb-2">
              Pincode <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="pincode"
              value={formData.pincode}
              onChange={(e) => updateFormData('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
                errors.pincode ? 'border-error' : 'border-border'
              }`}
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.pincode}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="landmark" className="block text-sm font-medium text-text-primary mb-2">
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              value={formData.landmark}
              onChange={(e) => updateFormData('landmark', e.target.value)}
              placeholder="Nearby landmark for reference"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Map Preview */}
      {formData.coordinates && (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-secondary-50 px-4 py-3 border-b border-border">
            <h3 className="text-sm font-medium text-text-primary flex items-center space-x-2">
              <Icon name="Map" size={16} />
              <span>Location Preview</span>
            </h3>
          </div>
          <div className="h-64 bg-secondary-100 flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Complaint Location"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${formData.coordinates.lat},${formData.coordinates.lng}&z=15&output=embed`}
              className="border-0"
            />
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-secondary-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              Location Information Tips
            </h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Provide the exact location where the issue occurred</li>
              <li>• Include nearby landmarks to help identify the location</li>
              <li>• Use current location feature for accurate coordinates</li>
              <li>• Ensure the address is complete and accurate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;