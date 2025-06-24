import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CommunicationThread = ({ communications, complaintId }) => {
  const [isAddingMessage, setIsAddingMessage] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
  };

  const handleSubmitMessage = () => {
    if (!newMessage.trim()) return;
    
    // Handle message submission
    console.log('Submitting message:', newMessage);
    console.log('Attachments:', attachments);
    
    // Reset form
    setNewMessage('');
    setAttachments([]);
    setIsAddingMessage(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Communication Thread</h3>
        <button
          onClick={() => setIsAddingMessage(!isAddingMessage)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <Icon name="MessageSquare" size={16} />
          <span className="text-sm font-medium">Add Update</span>
        </button>
      </div>

      {/* Add Message Form */}
      {isAddingMessage && (
        <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h4 className="text-sm font-medium text-text-primary mb-3">Add Information</h4>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Provide additional information about your complaint..."
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary resize-none"
            rows={4}
          />
          
          {/* File Upload */}
          <div className="mt-3">
            <label className="flex items-center space-x-2 text-sm text-text-secondary cursor-pointer hover:text-text-primary transition-colors duration-200">
              <Icon name="Paperclip" size={16} />
              <span>Attach files (optional)</span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map(attachment => (
                <div key={attachment.id} className="flex items-center justify-between p-2 bg-surface rounded border border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="File" size={16} className="text-text-muted" />
                    <span className="text-sm text-text-primary">{attachment.name}</span>
                    <span className="text-xs text-text-secondary">({formatFileSize(attachment.size)})</span>
                  </div>
                  <button
                    onClick={() => removeAttachment(attachment.id)}
                    className="text-error hover:text-error-600 transition-colors duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 mt-4">
            <button
              onClick={() => {
                setIsAddingMessage(false);
                setNewMessage('');
                setAttachments([]);
              }}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Communications List */}
      <div className="space-y-4">
        {communications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} className="mx-auto text-text-muted mb-3" />
            <p className="text-text-secondary">No communications yet</p>
            <p className="text-sm text-text-muted">Start a conversation by adding an update</p>
          </div>
        ) : (
          communications.map((comm) => (
            <div key={comm.id} className="flex space-x-4">
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                comm.senderType === 'citizen' ? 'bg-primary-100' : 'bg-accent-100'
              }`}>
                <Icon 
                  name={comm.senderType === 'citizen' ? 'User' : 'Shield'} 
                  size={18} 
                  color={comm.senderType === 'citizen' ? '#2563EB' : '#059669'}
                />
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className={`rounded-lg p-4 ${
                  comm.senderType === 'citizen' ?'bg-primary-50 border border-primary-200' :'bg-accent-50 border border-accent-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-primary">
                        {comm.sender}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        comm.senderType === 'citizen' ?'bg-primary-100 text-primary-700' :'bg-accent-100 text-accent-700'
                      }`}>
                        {comm.senderType === 'citizen' ? 'Citizen' : 'Official'}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary">
                      {formatDate(comm.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {comm.message}
                  </p>

                  {/* Attachments */}
                  {comm.attachments && comm.attachments.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Paperclip" size={14} className="text-text-muted" />
                        <span className="text-xs text-text-muted">Attachments</span>
                      </div>
                      <div className="space-y-1">
                        {comm.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <Icon name="File" size={12} className="text-text-muted" />
                            <span className="text-primary hover:text-primary-700 cursor-pointer">
                              {attachment.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Communication Guidelines */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Communication Guidelines</h4>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>• Be clear and specific about any additional information</li>
                <li>• Attach relevant photos or documents to support your case</li>
                <li>• Officials will respond within 24-48 hours during business days</li>
                <li>• Keep communication professional and respectful</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationThread;