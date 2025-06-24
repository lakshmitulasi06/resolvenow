import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ActionPanel = ({ complaint, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(complaint.status);
  const [selectedAssignee, setSelectedAssignee] = useState(complaint.assignedTo || '');
  const [selectedPriority, setSelectedPriority] = useState(complaint.priority);
  const [internalNote, setInternalNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const statusOptions = [
    { value: 'received', label: 'Received', color: 'text-blue-600' },
    { value: 'in-progress', label: 'In Progress', color: 'text-yellow-600' },
    { value: 'resolved', label: 'Resolved', color: 'text-green-600' },
    { value: 'closed', label: 'Closed', color: 'text-gray-600' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ];

  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    { value: 'Mike Johnson', label: 'Mike Johnson' },
    { value: 'Lisa Chen', label: 'Lisa Chen' },
    { value: 'David Smith', label: 'David Smith' },
    { value: 'Sarah Wilson', label: 'Sarah Wilson' }
  ];

  const handleStatusChange = () => {
    if (selectedStatus !== complaint.status) {
      onStatusUpdate(complaint.id, selectedStatus);
    }
  };

  const handleAddNote = () => {
    if (internalNote.trim()) {
      // Handle adding internal note
      console.log('Adding note:', internalNote);
      setInternalNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Update */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="RefreshCw" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Status Update</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Current Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-sm border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleStatusChange}
            disabled={selectedStatus === complaint.status}
            className="w-full btn-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Assignment */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="UserCheck" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Assignment</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Assign To
            </label>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full text-sm border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary"
            >
              {assigneeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button className="w-full btn-secondary text-sm py-2">
            Update Assignment
          </button>
        </div>
      </div>

      {/* Priority */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="AlertTriangle" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Priority</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Priority Level
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full text-sm border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button className="w-full btn-secondary text-sm py-2">
            Update Priority
          </button>
        </div>
      </div>

      {/* Internal Notes */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="StickyNote" size={16} className="text-text-muted" />
            <h3 className="text-sm font-semibold text-text-primary">Internal Notes</h3>
          </div>
          <button
            onClick={() => setIsAddingNote(!isAddingNote)}
            className="text-xs text-primary hover:text-primary-700 transition-colors duration-200"
          >
            <Icon name="Plus" size={14} className="inline mr-1" />
            Add Note
          </button>
        </div>
        
        {isAddingNote && (
          <div className="space-y-3 mb-4">
            <textarea
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Add internal note..."
              className="w-full text-sm border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary resize-none"
              rows={3}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddNote}
                className="flex-1 btn-primary text-xs py-2"
              >
                Add Note
              </button>
              <button
                onClick={() => {
                  setIsAddingNote(false);
                  setInternalNote('');
                }}
                className="flex-1 btn-secondary text-xs py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        <div className="space-y-3 max-h-40 overflow-y-auto">
          {complaint.internalNotes.length === 0 ? (
            <p className="text-xs text-text-muted text-center py-4">No internal notes yet</p>
          ) : (
            complaint.internalNotes.map((note) => (
              <div key={note.id} className="bg-secondary-50 rounded-lg p-3">
                <p className="text-xs text-text-secondary mb-1">{note.note}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-text-primary">{note.author}</span>
                  <span className="text-xs text-text-muted">
                    {new Date(note.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Quick Actions</h3>
        </div>
        
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center space-x-2 text-xs py-2 px-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors duration-200">
            <Icon name="MessageSquare" size={14} />
            <span>Send Update to Citizen</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-2 text-xs py-2 px-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors duration-200">
            <Icon name="CheckCircle" size={14} />
            <span>Mark as Resolved</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-2 text-xs py-2 px-3 bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 transition-colors duration-200">
            <Icon name="ArrowUp" size={14} />
            <span>Escalate Complaint</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-2 text-xs py-2 px-3 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors duration-200">
            <Icon name="X" size={14} />
            <span>Close Complaint</span>
          </button>
        </div>
      </div>

      {/* Contact Citizen */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Phone" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Contact Citizen</h3>
        </div>
        
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center space-x-2 text-xs py-2 px-3 border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200">
            <Icon name="Mail" size={14} />
            <span>Send Email</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-2 text-xs py-2 px-3 border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200">
            <Icon name="Phone" size={14} />
            <span>Call Citizen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;