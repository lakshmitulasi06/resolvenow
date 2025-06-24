import React from 'react';
import Icon from '../../../components/AppIcon';


const ComplaintSummary = ({ complaint, onStatusUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return 'AlertTriangle';
      case 'high': return 'ArrowUp';
      case 'medium': return 'Minus';
      case 'low': return 'ArrowDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="space-y-6">
      {/* Complaint Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              {complaint.id}
            </h2>
            <p className="text-sm text-text-secondary">
              Submitted {new Date(complaint.submittedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
              {complaint.status.replace('-', ' ').toUpperCase()}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(complaint.priority)}`}>
              <Icon name={getPriorityIcon(complaint.priority)} size={12} className="inline mr-1" />
              {complaint.priority.toUpperCase()}
            </span>
          </div>
        </div>

        <h3 className="text-base font-medium text-text-primary mb-3">
          {complaint.title}
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Category:</span>
            <p className="font-medium text-text-primary">{complaint.category}</p>
          </div>
          <div>
            <span className="text-text-secondary">Department:</span>
            <p className="font-medium text-text-primary">{complaint.department}</p>
          </div>
        </div>
      </div>

      {/* Citizen Information */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="#2563EB" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-primary">Citizen Information</h3>
            <p className="text-sm text-text-secondary">Contact details</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="User" size={16} className="text-text-muted" />
            <div>
              <p className="text-sm font-medium text-text-primary">{complaint.citizen.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} className="text-text-muted" />
            <div>
              <p className="text-sm text-text-secondary">{complaint.citizen.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={16} className="text-text-muted" />
            <div>
              <p className="text-sm text-text-secondary">{complaint.citizen.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={16} className="text-text-muted mt-0.5" />
            <div>
              <p className="text-sm text-text-secondary">{complaint.citizen.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Information */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
            <Icon name="UserCheck" size={20} color="#059669" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-primary">Assignment</h3>
            <p className="text-sm text-text-secondary">Current assignment details</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-sm text-text-secondary">Assigned To:</span>
            <p className="text-sm font-medium text-text-primary">
              {complaint.assignedTo || 'Unassigned'}
            </p>
          </div>
          
          <div>
            <span className="text-sm text-text-secondary">Department:</span>
            <p className="text-sm font-medium text-text-primary">{complaint.department}</p>
          </div>
          
          <div>
            <span className="text-sm text-text-secondary">Last Updated:</span>
            <p className="text-sm text-text-secondary">
              {new Date(complaint.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card p-6">
        <h3 className="text-base font-semibold text-text-primary mb-4">Quick Stats</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-text-primary">{complaint.timeline.length}</div>
            <div className="text-xs text-text-secondary">Timeline Events</div>
          </div>
          
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-text-primary">{complaint.attachments.length}</div>
            <div className="text-xs text-text-secondary">Attachments</div>
          </div>
          
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-text-primary">
              {Math.ceil((new Date() - new Date(complaint.submittedDate)) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-xs text-text-secondary">Days Open</div>
          </div>
          
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-text-primary">{complaint.internalNotes.length}</div>
            <div className="text-xs text-text-secondary">Internal Notes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSummary;