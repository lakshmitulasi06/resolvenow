import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ComplaintDetails = ({ complaint }) => {
  const [activeTab, setActiveTab] = useState('description');

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'public': return 'MessageSquare';
      case 'internal': return 'Lock';
      case 'system': return 'Settings';
      default: return 'Clock';
    }
  };

  const getTimelineColor = (type) => {
    switch (type) {
      case 'public': return 'text-blue-600 bg-blue-100';
      case 'internal': return 'text-orange-600 bg-orange-100';
      case 'system': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return 'Image';
      case 'video': return 'Video';
      case 'pdf': return 'FileText';
      default: return 'File';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="card">
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'description' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name="FileText" size={16} className="inline mr-2" />
              Description
            </button>
            <button
              onClick={() => setActiveTab('attachments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'attachments' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name="Paperclip" size={16} className="inline mr-2" />
              Attachments ({complaint.attachments.length})
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'timeline' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name="Clock" size={16} className="inline mr-2" />
              Timeline ({complaint.timeline.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {complaint.title}
                </h3>
                <div className="prose prose-sm max-w-none text-text-secondary">
                  <p className="whitespace-pre-wrap">{complaint.description}</p>
                </div>
              </div>

              {/* Complaint Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Complaint Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Category:</span>
                      <span className="text-sm font-medium text-text-primary">{complaint.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Department:</span>
                      <span className="text-sm font-medium text-text-primary">{complaint.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Priority:</span>
                      <span className="text-sm font-medium text-text-primary capitalize">{complaint.priority}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Timestamps</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Submitted:</span>
                      <span className="text-sm text-text-primary">
                        {new Date(complaint.submittedDate).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Last Updated:</span>
                      <span className="text-sm text-text-primary">
                        {new Date(complaint.lastUpdated).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attachments Tab */}
          {activeTab === 'attachments' && (
            <div className="space-y-4">
              {complaint.attachments.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="Paperclip" size={48} className="mx-auto text-text-muted mb-3" />
                  <p className="text-text-secondary">No attachments found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complaint.attachments.map((attachment) => (
                    <div key={attachment.id} className="border border-border rounded-lg p-4 hover:bg-secondary-50 transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                            <Icon name={getFileIcon(attachment.type)} size={20} className="text-text-muted" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {attachment.size}
                          </p>
                          <div className="mt-2 flex space-x-2">
                            <button className="text-xs text-primary hover:text-primary-700 transition-colors duration-200">
                              View
                            </button>
                            <button className="text-xs text-primary hover:text-primary-700 transition-colors duration-200">
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {attachment.type === 'image' && attachment.url && (
                        <div className="mt-3">
                          <div className="w-full h-32 bg-secondary-100 rounded-lg overflow-hidden">
                            <Image 
                              src={attachment.url} 
                              alt={attachment.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="flow-root">
                <ul className="-mb-8">
                  {complaint.timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== complaint.timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-secondary-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-background ${getTimelineColor(event.type)}`}>
                              <Icon name={getTimelineIcon(event.type)} size={16} />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm font-medium text-text-primary">
                                {event.action}
                              </p>
                              <p className="text-sm text-text-secondary">
                                {event.description}
                              </p>
                              <p className="text-xs text-text-muted mt-1">
                                by {event.user}
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-xs text-text-muted">
                              <time dateTime={event.timestamp}>
                                {new Date(event.timestamp).toLocaleString()}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;