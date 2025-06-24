import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ComplaintDetails = ({ complaint }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Complaint Details</h3>
        <Icon name="FileText" size={20} className="text-text-muted" />
      </div>

      {/* Complaint Description */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Description</h4>
        <div className="bg-secondary-50 rounded-lg p-4">
          <p className="text-sm text-text-secondary leading-relaxed">
            {isExpanded ? complaint.description : truncateText(complaint.description)}
          </p>
          {complaint.description.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm text-primary hover:text-primary-700 transition-colors duration-200"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Citizen Information */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Citizen Information</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="User" size={16} color="#2563EB" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Name</p>
              <p className="text-sm font-medium text-text-primary">{complaint.citizenName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={16} color="#059669" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Email</p>
              <p className="text-sm font-medium text-text-primary">{complaint.citizenEmail}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="Phone" size={16} color="#F59E0B" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Phone</p>
              <p className="text-sm font-medium text-text-primary">{complaint.citizenPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Location Details</h4>
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={18} className="text-error mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">{complaint.location}</p>
              <p className="text-xs text-text-secondary">Exact location of the reported issue</p>
            </div>
          </div>
          
          {/* Map Preview */}
          <div className="mt-4 h-32 bg-secondary-200 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Complaint Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
              className="border-0"
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-text-secondary">Complaint ID</span>
          <span className="text-sm font-mono font-medium text-text-primary">{complaint.id}</span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-text-secondary">Category</span>
          <span className="text-sm font-medium text-text-primary">{complaint.category}</span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-text-secondary">Priority Level</span>
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            complaint.priority === 'high' ? 'bg-error-100 text-error-700' :
            complaint.priority === 'medium'? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'
          }`}>
            {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-text-secondary">Department</span>
          <span className="text-sm font-medium text-text-primary">{complaint.department}</span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-text-secondary">Assigned Officer</span>
          <span className="text-sm font-medium text-text-primary">{complaint.assignedTo}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;