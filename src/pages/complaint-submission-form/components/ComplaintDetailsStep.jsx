import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplaintDetailsStep = ({ formData, updateFormData, errors, categories }) => {
  const selectedCategory = categories.find(cat => cat.id === formData.category);
  
  const priorityLevels = [
    {
      value: 'low',
      label: 'Low',
      description: 'Non-urgent issues that can be addressed within a week',
      color: 'text-secondary-600'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'Standard issues requiring attention within 3-5 days',
      color: 'text-warning-600'
    },
    {
      value: 'high',
      label: 'High',
      description: 'Important issues needing resolution within 24-48 hours',
      color: 'text-error-600'
    },
    {
      value: 'urgent',
      label: 'Urgent',
      description: 'Critical issues requiring immediate attention',
      color: 'text-error-700'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Complaint Details
        </h2>
        <p className="text-text-secondary mb-6">
          Please provide detailed information about your complaint to help us understand and address the issue effectively.
        </p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
            Category <span className="text-error">*</span>
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => {
              updateFormData('category', e.target.value);
              updateFormData('subCategory', ''); // Reset sub-category
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.category ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.category}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subCategory" className="block text-sm font-medium text-text-primary mb-2">
            Sub-Category <span className="text-error">*</span>
          </label>
          <select
            id="subCategory"
            value={formData.subCategory}
            onChange={(e) => updateFormData('subCategory', e.target.value)}
            disabled={!selectedCategory}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 disabled:bg-secondary-50 disabled:cursor-not-allowed ${
              errors.subCategory ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select a sub-category</option>
            {selectedCategory?.subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
          {errors.subCategory && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.subCategory}</span>
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
          Subject <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => updateFormData('subject', e.target.value)}
          placeholder="Brief summary of your complaint"
          maxLength={100}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
            errors.subject ? 'border-error' : 'border-border'
          }`}
        />
        <div className="mt-1 flex justify-between items-center">
          {errors.subject ? (
            <p className="text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.subject}</span>
            </p>
          ) : (
            <span></span>
          )}
          <span className="text-sm text-text-muted">
            {formData.subject.length}/100
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
          Detailed Description <span className="text-error">*</span>
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder="Please provide a detailed description of your complaint. Include relevant dates, times, locations, and any other important information that will help us understand and resolve the issue."
          rows={6}
          maxLength={2000}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 resize-vertical ${
            errors.description ? 'border-error' : 'border-border'
          }`}
        />
        <div className="mt-1 flex justify-between items-center">
          {errors.description ? (
            <p className="text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.description}</span>
            </p>
          ) : (
            <p className="text-sm text-text-muted">
              Minimum 50 characters required
            </p>
          )}
          <span className={`text-sm ${
            formData.description.length < 50 ? 'text-error' : 'text-text-muted'
          }`}>
            {formData.description.length}/2000
          </span>
        </div>
      </div>

      {/* Priority Level */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Priority Level
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {priorityLevels.map((priority) => (
            <label
              key={priority.value}
              className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-primary-300 ${
                formData.priority === priority.value
                  ? 'border-primary bg-primary-50' :'border-border bg-surface'
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={priority.value}
                checked={formData.priority === priority.value}
                onChange={(e) => updateFormData('priority', e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  priority.value === 'low' ? 'bg-secondary-400' :
                  priority.value === 'medium' ? 'bg-warning-500' :
                  priority.value === 'high'? 'bg-error-500' : 'bg-error-700'
                }`} />
                <span className={`font-medium ${priority.color}`}>
                  {priority.label}
                </span>
              </div>
              <p className="text-xs text-text-muted">
                {priority.description}
              </p>
              {formData.priority === priority.value && (
                <div className="absolute top-2 right-2">
                  <Icon name="Check" size={16} className="text-primary" />
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Contact Preferences */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Notification Preferences
        </label>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.contactPreferences.includes('email')}
              onChange={(e) => {
                const preferences = e.target.checked
                  ? [...formData.contactPreferences, 'email']
                  : formData.contactPreferences.filter(p => p !== 'email');
                updateFormData('contactPreferences', preferences);
              }}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">Email notifications</span>
            </div>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.contactPreferences.includes('sms')}
              onChange={(e) => {
                const preferences = e.target.checked
                  ? [...formData.contactPreferences, 'sms']
                  : formData.contactPreferences.filter(p => p !== 'sms');
                updateFormData('contactPreferences', preferences);
              }}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">SMS notifications</span>
            </div>
          </label>
        </div>
      </div>

      {/* Anonymous Option */}
      <div className="border-t border-border pt-6">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.anonymous}
            onChange={(e) => updateFormData('anonymous', e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500 mt-0.5"
          />
          <div>
            <span className="text-sm font-medium text-text-primary">
              Submit anonymously
            </span>
            <p className="text-sm text-text-muted mt-1">
              Your personal information will not be shared with the concerned department. 
              However, this may limit our ability to contact you for additional information or updates.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ComplaintDetailsStep;