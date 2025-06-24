import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCount, onClearSelection, onBulkStatusUpdate }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActions = [
    { value: '', label: 'Select Action', disabled: true },
    { value: 'status-received', label: 'Mark as Received' },
    { value: 'status-in-progress', label: 'Mark as In Progress' },
    { value: 'status-resolved', label: 'Mark as Resolved' },
    { value: 'status-closed', label: 'Mark as Closed' },
    { value: 'priority-low', label: 'Set Priority: Low' },
    { value: 'priority-medium', label: 'Set Priority: Medium' },
    { value: 'priority-high', label: 'Set Priority: High' },
    { value: 'priority-urgent', label: 'Set Priority: Urgent' },
    { value: 'assign', label: 'Bulk Assign' },
    { value: 'export', label: 'Export Selected' }
  ];

  const handleBulkAction = async () => {
    if (!selectedAction) return;

    setIsProcessing(true);
    
    try {
      if (selectedAction.startsWith('status-')) {
        const status = selectedAction.replace('status-', '');
        onBulkStatusUpdate(status);
      } else if (selectedAction.startsWith('priority-')) {
        const priority = selectedAction.replace('priority-', '');
        // Handle bulk priority update
        console.log('Bulk priority update:', priority);
      } else if (selectedAction === 'assign') {
        // Handle bulk assignment
        console.log('Bulk assignment');
      } else if (selectedAction === 'export') {
        // Handle export
        console.log('Export selected complaints');
      }
      
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {selectedCount} complaint{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <button
            onClick={onClearSelection}
            className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
          >
            Clear selection
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="text-sm border border-primary-300 rounded-md px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary"
          >
            {bulkActions.map((action) => (
              <option 
                key={action.value} 
                value={action.value}
                disabled={action.disabled}
              >
                {action.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={handleBulkAction}
            disabled={!selectedAction || isProcessing}
            className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isProcessing ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Icon name="Play" size={16} />
                <span>Apply</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="mt-4 pt-4 border-t border-primary-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onBulkStatusUpdate('in-progress')}
            className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium hover:bg-yellow-200 transition-colors duration-200"
          >
            <Icon name="Clock" size={12} />
            <span>Mark In Progress</span>
          </button>
          
          <button
            onClick={() => onBulkStatusUpdate('resolved')}
            className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-green-200 transition-colors duration-200"
          >
            <Icon name="CheckCircle" size={12} />
            <span>Mark Resolved</span>
          </button>
          
          <button
            className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors duration-200"
          >
            <Icon name="UserCheck" size={12} />
            <span>Bulk Assign</span>
          </button>
          
          <button
            className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors duration-200"
          >
            <Icon name="Download" size={12} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;