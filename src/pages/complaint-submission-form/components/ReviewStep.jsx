import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewStep = ({ formData, categories, errors }) => {
  const selectedCategory = categories.find(cat => cat.id === formData.category);
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'text-secondary-600 bg-secondary-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'high': return 'text-error-600 bg-error-100';
      case 'urgent': return 'text-error-700 bg-error-100';
      default: return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getPriorityLabel = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType === 'application/pdf') return 'FileText';
    if (fileType.includes('word') || fileType.includes('document')) return 'FileText';
    return 'File';
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Review Your Complaint
        </h2>
        <p className="text-text-secondary mb-6">
          Please review all the information below before submitting your complaint. You can go back to make changes if needed.
        </p>
      </div>

      {/* Complaint Details Section */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="FileText" size={20} />
          <span>Complaint Details</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Category
            </label>
            <p className="text-text-primary font-medium">
              {selectedCategory?.name || 'Not selected'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Sub-Category
            </label>
            <p className="text-text-primary font-medium">
              {formData.subCategory || 'Not selected'}
            </p>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Subject
            </label>
            <p className="text-text-primary font-medium">
              {formData.subject || 'Not provided'}
            </p>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Description
            </label>
            <div className="bg-surface border border-border rounded-md p-3 max-h-32 overflow-y-auto">
              <p className="text-text-primary whitespace-pre-wrap">
                {formData.description || 'Not provided'}
              </p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Priority Level
            </label>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(formData.priority)}`}>
              {getPriorityLabel(formData.priority)}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Submission Type
            </label>
            <p className="text-text-primary font-medium">
              {formData.anonymous ? 'Anonymous' : 'With Contact Information'}
            </p>
          </div>
        </div>
      </div>

      {/* Location Information Section */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="MapPin" size={20} />
          <span>Location Information</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Address
            </label>
            <p className="text-text-primary">
              {formData.address || 'Not provided'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              City
            </label>
            <p className="text-text-primary font-medium">
              {formData.city || 'Not provided'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              State
            </label>
            <p className="text-text-primary font-medium">
              {formData.state || 'Not provided'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Pincode
            </label>
            <p className="text-text-primary font-medium">
              {formData.pincode || 'Not provided'}
            </p>
          </div>
          
          {formData.landmark && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Landmark
              </label>
              <p className="text-text-primary font-medium">
                {formData.landmark}
              </p>
            </div>
          )}
          
          {formData.coordinates && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-1">
                GPS Coordinates
              </label>
              <p className="text-text-primary font-medium">
                {formData.coordinates.lat.toFixed(6)}, {formData.coordinates.lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Attachments Section */}
      {formData.attachments && formData.attachments.length > 0 && (
        <div className="bg-secondary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Paperclip" size={20} />
            <span>Attached Files ({formData.attachments.length})</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.attachments.map((file) => (
              <div key={file.id} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  {file.preview ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={getFileIcon(file.type)} size={24} className="text-secondary-600" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Preferences Section */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Bell" size={20} />
          <span>Notification Preferences</span>
        </h3>
        
        <div className="space-y-3">
          {formData.contactPreferences.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {formData.contactPreferences.map((preference) => (
                <span
                  key={preference}
                  className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  <Icon name={preference === 'email' ? 'Mail' : 'MessageSquare'} size={16} />
                  <span>{preference === 'email' ? 'Email' : 'SMS'} notifications</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-text-secondary">No notification preferences selected</p>
          )}
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-warning-800 mb-2">
              Important Notice
            </h4>
            <ul className="text-sm text-warning-700 space-y-1">
              <li>• Once submitted, you cannot edit your complaint details</li>
              <li>• You will receive a unique complaint ID for tracking</li>
              <li>• False or misleading information may result in complaint rejection</li>
              <li>• Response time varies based on complaint category and priority</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="border-t border-border pt-6">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            required
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500 mt-0.5"
          />
          <div className="text-sm">
            <span className="text-text-primary">
              I agree to the{' '}
              <button type="button" className="text-primary hover:text-primary-700 underline">
                Terms and Conditions
              </button>
              {' '}and{' '}
              <button type="button" className="text-primary hover:text-primary-700 underline">
                Privacy Policy
              </button>
            </span>
            <p className="text-text-muted mt-1">
              By submitting this complaint, you confirm that the information provided is accurate and complete.
            </p>
          </div>
        </label>
      </div>

      {errors.general && (
        <div className="p-4 bg-error-50 border border-error-100 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} className="text-error" />
            <p className="text-error font-medium">{errors.general}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;