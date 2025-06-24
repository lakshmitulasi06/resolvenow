import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplaintOverview = ({ complaint }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-secondary-100 text-secondary-700';
      case 'acknowledged':
        return 'bg-primary-100 text-primary-700';
      case 'in-progress':
        return 'bg-warning-100 text-warning-700';
      case 'resolved':
        return 'bg-success-100 text-success-700';
      case 'closed':
        return 'bg-secondary-200 text-secondary-800';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-success-100 text-success-700';
      case 'medium':
        return 'bg-warning-100 text-warning-700';
      case 'high':
        return 'bg-error-100 text-error-700';
      case 'urgent':
        return 'bg-error-200 text-error-800';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return 'FileText';
      case 'acknowledged':
        return 'Eye';
      case 'in-progress':
        return 'Clock';
      case 'resolved':
        return 'CheckCircle';
      case 'closed':
        return 'Archive';
      default:
        return 'FileText';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'submitted':
        return 20;
      case 'acknowledged':
        return 40;
      case 'in-progress':
        return 60;
      case 'resolved':
        return 80;
      case 'closed':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            {complaint.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
              <Icon name={getStatusIcon(complaint.status)} size={14} className="mr-1.5" />
              {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1).replace('-', ' ')}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
              <Icon name="AlertTriangle" size={14} className="mr-1.5" />
              {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Progress</span>
          <span className="text-sm text-text-secondary">{getProgressPercentage(complaint.status)}%</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage(complaint.status)}%` }}
          ></div>
        </div>
      </div>

      {/* Complaint Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={18} color="#2563EB" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Submitted</p>
            <p className="text-sm font-medium text-text-primary">
              {formatDate(complaint.submissionDate)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
            <Icon name="Tag" size={18} color="#059669" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Category</p>
            <p className="text-sm font-medium text-text-primary">
              {complaint.category}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
            <Icon name="Building" size={18} color="#F59E0B" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Department</p>
            <p className="text-sm font-medium text-text-primary">
              {complaint.department}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={18} color="#64748B" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Location</p>
            <p className="text-sm font-medium text-text-primary">
              {complaint.location}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
            <Icon name="User" size={18} color="#10B981" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Assigned To</p>
            <p className="text-sm font-medium text-text-primary">
              {complaint.assignedTo}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={18} color="#EF4444" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Est. Resolution</p>
            <p className="text-sm font-medium text-text-primary">
              {formatDate(complaint.estimatedResolution)}
            </p>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="RefreshCw" size={16} />
          <span className="text-sm">Last updated: {formatDate(complaint.lastUpdated)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success font-medium">Live Updates</span>
        </div>
      </div>
    </div>
  );
};

export default ComplaintOverview;