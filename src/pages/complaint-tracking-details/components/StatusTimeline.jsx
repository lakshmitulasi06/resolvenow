import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StatusTimeline = ({ timeline }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusColor = (status, isCurrent = false) => {
    if (isCurrent) {
      return 'bg-primary border-primary-200';
    }
    
    switch (status) {
      case 'submitted':
        return 'bg-secondary-500 border-secondary-200';
      case 'acknowledged':
        return 'bg-primary border-primary-200';
      case 'in-progress':
        return 'bg-warning border-warning-200';
      case 'resolved':
        return 'bg-success border-success-200';
      case 'closed':
        return 'bg-secondary-600 border-secondary-200';
      case 'scheduled':
        return 'bg-accent border-accent-200';
      default:
        return 'bg-secondary-300 border-secondary-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return 'FileText';
      case 'acknowledged':
        return 'Eye';
      case 'in-progress':
        return 'Play';
      case 'resolved':
        return 'CheckCircle';
      case 'closed':
        return 'Archive';
      case 'scheduled':
        return 'Calendar';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Status Timeline</h3>
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Clock" size={16} />
          <span className="text-sm">Real-time updates</span>
        </div>
      </div>

      <div className="relative">
        {timeline.map((item, index) => {
          const isExpanded = expandedItems.has(item.id);
          const isLast = index === timeline.length - 1;
          
          return (
            <div key={item.id} className="relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-secondary-200"></div>
              )}
              
              {/* Timeline Item */}
              <div className="flex items-start space-x-4 pb-8">
                {/* Status Dot */}
                <div className={`relative flex-shrink-0 w-12 h-12 rounded-full border-4 flex items-center justify-center ${getStatusColor(item.status, item.isCurrent)}`}>
                  <Icon 
                    name={getStatusIcon(item.status)} 
                    size={18} 
                    color="white"
                  />
                  {item.isCurrent && (
                    <div className="absolute -inset-1 rounded-full border-2 border-primary animate-pulse"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={`bg-background rounded-lg border p-4 ${item.isCurrent ? 'border-primary-200 bg-primary-50' : 'border-border'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-semibold text-text-primary">
                        {item.title}
                      </h4>
                      <span className="text-xs text-text-secondary whitespace-nowrap ml-4">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-3">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="User" size={14} className="text-text-muted" />
                        <span className="text-xs text-text-muted">
                          {item.responsibleParty}
                        </span>
                      </div>
                      
                      {item.isExpandable && (
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="flex items-center space-x-1 text-xs text-primary hover:text-primary-700 transition-colors duration-200"
                        >
                          <span>{isExpanded ? 'Less details' : 'More details'}</span>
                          <Icon 
                            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                            size={14} 
                          />
                        </button>
                      )}
                    </div>
                    
                    {/* Expanded Details */}
                    {isExpanded && item.details && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="bg-secondary-50 rounded-md p-3">
                          <p className="text-sm text-text-secondary">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline Legend */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Status Legend</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
            <span className="text-xs text-text-secondary">Submitted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-text-secondary">Acknowledged</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-text-secondary">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-text-secondary">Scheduled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-text-secondary">Resolved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary-600 rounded-full"></div>
            <span className="text-xs text-text-secondary">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTimeline;