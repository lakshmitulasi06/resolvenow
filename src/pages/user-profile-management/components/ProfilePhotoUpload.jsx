import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePhotoUpload = ({ userData, onDataChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setIsUploading(true);
      
      // Create a FileReader to read the file
      const reader = new FileReader();
      reader.onload = (e) => {
        // Simulate upload delay
        setTimeout(() => {
          onDataChange({ avatar: e.target.result });
          setIsUploading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    onDataChange({ avatar: null });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="text-center">
      <div className="relative inline-block">
        {/* Profile Photo Display */}
        <div className="w-24 h-24 mx-auto mb-4 relative">
          {userData.avatar ? (
            <Image
              src={userData.avatar}
              alt={userData.name}
              className="w-full h-full rounded-full object-cover border-4 border-surface shadow-md"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center border-4 border-surface shadow-md">
              <span className="text-xl font-semibold text-primary-700">
                {getInitials(userData.name)}
              </span>
            </div>
          )}
          
          {/* Upload Overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Icon name="Loader2" size={24} color="white" className="animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200 shadow-md disabled:opacity-50"
        >
          <Icon name="Camera" size={16} />
        </button>
      </div>

      {/* Upload Area */}
      <div
        className={`mt-4 border-2 border-dashed rounded-lg p-4 transition-colors duration-200 ${
          dragActive 
            ? 'border-primary bg-primary-50' :'border-secondary-300 hover:border-primary hover:bg-secondary-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Icon name="Upload" size={24} className="mx-auto text-text-muted mb-2" />
          <p className="text-sm text-text-secondary mb-2">
            Drag and drop your photo here, or{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-primary hover:text-primary-700 font-medium"
            >
              browse
            </button>
          </p>
          <p className="text-xs text-text-muted">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Action Buttons */}
      {userData.avatar && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-3 py-1 text-sm text-primary hover:text-primary-700 transition-colors duration-200 disabled:opacity-50"
          >
            Change Photo
          </button>
          <button
            onClick={handleRemovePhoto}
            disabled={isUploading}
            className="px-3 py-1 text-sm text-error hover:text-error-700 transition-colors duration-200 disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="mt-4 text-xs text-text-muted">
        <p>• Use a clear, recent photo of yourself</p>
        <p>• Square images work best</p>
        <p>• Avoid group photos or images with text</p>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;