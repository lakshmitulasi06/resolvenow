import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DangerZone = ({ userData, onDataChange }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeactivateConfirmation, setShowDeactivateConfirmation] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccountDeactivation = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Account deactivated');
    setIsProcessing(false);
    setShowDeactivateConfirmation(false);
  };

  const handleAccountDeletion = async () => {
    if (deleteConfirmText !== 'DELETE') {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Account deleted');
    setIsProcessing(false);
    setShowDeleteConfirmation(false);
  };

  const handleDataExport = () => {
    // Simulate data export
    const exportData = {
      profile: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        joinDate: userData.joinDate
      },
      complaints: {
        total: userData.totalComplaints,
        resolved: userData.resolvedComplaints
      },
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${userData.name.replace(/\s+/g, '_')}_data_export.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="AlertTriangle" size={20} className="text-error" />
        <h3 className="text-lg font-semibold text-text-primary">Account Management</h3>
      </div>

      {/* Data Export */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-md font-medium text-text-primary mb-2">Export Your Data</h4>
            <p className="text-sm text-text-secondary mb-4">
              Download a copy of your account data including profile information, complaints, and activity history. This includes all personal data we have stored about you.
            </p>
            <ul className="text-sm text-text-secondary space-y-1 mb-4">
              <li className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span>Profile information and settings</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span>Complaint history and status</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span>Account activity and preferences</span>
              </li>
            </ul>
          </div>
          <button
            onClick={handleDataExport}
            className="ml-4 flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Download" size={16} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Account Deactivation */}
      <div className="bg-warning-50 rounded-lg p-6 border border-warning-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-md font-medium text-text-primary mb-2 flex items-center space-x-2">
              <Icon name="Pause" size={16} className="text-warning" />
              <span>Deactivate Account</span>
            </h4>
            <p className="text-sm text-text-secondary mb-4">
              Temporarily deactivate your account. You can reactivate it anytime by logging back in. Your data will be preserved during deactivation.
            </p>
            <ul className="text-sm text-text-secondary space-y-1 mb-4">
              <li>• Your profile will be hidden from other users</li>
              <li>• You won't receive notifications</li>
              <li>• Your complaints will remain accessible to administrators</li>
              <li>• You can reactivate anytime by logging in</li>
            </ul>
          </div>
          <button
            onClick={() => setShowDeactivateConfirmation(true)}
            className="ml-4 flex items-center space-x-2 px-4 py-2 bg-warning text-white rounded-md hover:bg-warning-600 transition-colors duration-200"
          >
            <Icon name="Pause" size={16} />
            <span>Deactivate</span>
          </button>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-error-50 rounded-lg p-6 border border-error-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-md font-medium text-text-primary mb-2 flex items-center space-x-2">
              <Icon name="Trash2" size={16} className="text-error" />
              <span>Delete Account</span>
            </h4>
            <p className="text-sm text-text-secondary mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <div className="bg-error-100 rounded-md p-3 mb-4">
              <p className="text-sm text-error font-medium mb-2">⚠️ This will permanently:</p>
              <ul className="text-sm text-error space-y-1">
                <li>• Delete your profile and personal information</li>
                <li>• Remove all your complaints and history</li>
                <li>• Cancel any pending complaints</li>
                <li>• Revoke access to your account immediately</li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="ml-4 flex items-center space-x-2 px-4 py-2 bg-error text-white rounded-md hover:bg-error-600 transition-colors duration-200"
          >
            <Icon name="Trash2" size={16} />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

      {/* Deactivation Confirmation Modal */}
      {showDeactivateConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Pause" size={24} className="text-warning" />
              <h3 className="text-lg font-semibold text-text-primary">Deactivate Account</h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to deactivate your account? You can reactivate it anytime by logging back in.
            </p>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDeactivateConfirmation(false)}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountDeactivation}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-warning text-white rounded-md hover:bg-warning-600 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Deactivating...</span>
                  </>
                ) : (
                  <span>Deactivate Account</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deletion Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-error" />
              <h3 className="text-lg font-semibold text-text-primary">Delete Account</h3>
            </div>
            
            <p className="text-text-secondary mb-4">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Type "DELETE" to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="input-field"
                placeholder="Type DELETE to confirm"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setDeleteConfirmText('');
                }}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountDeletion}
                disabled={isProcessing || deleteConfirmText !== 'DELETE'}
                className="flex-1 px-4 py-2 bg-error text-white rounded-md hover:bg-error-600 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Account</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangerZone;