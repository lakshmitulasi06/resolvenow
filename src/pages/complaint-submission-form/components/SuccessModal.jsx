import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ complaintId, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(complaintId);
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-1020">
      <div className="bg-surface rounded-lg shadow-modal max-w-md w-full">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Complaint Submitted Successfully!
          </h2>
          
          <p className="text-text-secondary">
            Your complaint has been registered and assigned a unique ID for tracking.
          </p>
        </div>

        {/* Complaint ID */}
        <div className="px-6 pb-6">
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
            <div className="text-center">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Your Complaint ID
              </label>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold text-primary font-mono">
                  {complaintId}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-primary hover:text-primary-700 hover:bg-primary-100 rounded-md transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  <Icon name="Copy" size={20} />
                </button>
              </div>
              <p className="text-sm text-text-muted mt-2">
                Save this ID to track your complaint status
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-text-primary">What happens next?</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Complaint Review
                  </p>
                  <p className="text-sm text-text-secondary">
                    Your complaint will be reviewed and assigned to the appropriate department within 24 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Investigation
                  </p>
                  <p className="text-sm text-text-secondary">
                    The concerned department will investigate and work on resolving your complaint.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Resolution & Feedback
                  </p>
                  <p className="text-sm text-text-secondary">
                    You'll be notified once the complaint is resolved and can provide feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Info */}
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="Bell" size={20} className="text-secondary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary mb-1">
                  Stay Updated
                </p>
                <p className="text-sm text-text-secondary">
                  You'll receive notifications about status updates via your selected preferences. 
                  You can also track your complaint anytime using the complaint ID.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/complaint-tracking-details"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              <Icon name="Search" size={20} />
              <span>Track Complaint</span>
            </Link>
            
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors duration-200 font-medium"
            >
              <Icon name="Home" size={20} />
              <span>Go to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;