import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ complaintId }) => {
  const [showRequestUpdate, setShowRequestUpdate] = useState(false);
  const [updateRequest, setUpdateRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestUpdate = async () => {
    if (!updateRequest.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Update request submitted:', updateRequest);
      setUpdateRequest('');
      setShowRequestUpdate(false);
      setIsSubmitting(false);
      alert('Update request submitted successfully!');
    }, 1000);
  };

  const quickActions = [
    {
      id: 'add-info',
      label: 'Add Information',
      description: 'Provide additional details or documents',
      icon: 'Plus',
      color: 'bg-primary text-white hover:bg-primary-700',
      action: () => {
        // Scroll to communication thread
        const commThread = document.querySelector('[data-section="communication"]');
        if (commThread) {
          commThread.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      id: 'request-update',
      label: 'Request Update',
      description: 'Ask for status update from department',
      icon: 'MessageSquare',
      color: 'bg-accent text-white hover:bg-accent-700',
      action: () => setShowRequestUpdate(true)
    },
    {
      id: 'escalate',
      label: 'Escalate Complaint',
      description: 'Escalate to higher authority',
      icon: 'TrendingUp',
      color: 'bg-warning text-white hover:bg-warning-600',
      action: () => {
        if (confirm('Are you sure you want to escalate this complaint? This action will notify higher authorities.')) {
          console.log('Escalating complaint:', complaintId);
          alert('Complaint escalated successfully!');
        }
      }
    },
    {
      id: 'similar-complaints',
      label: 'View Similar',
      description: 'See similar complaints in your area',
      icon: 'Search',
      color: 'bg-secondary-600 text-white hover:bg-secondary-700',
      action: () => {
        console.log('Viewing similar complaints');
        // In a real app, this would navigate to a filtered view
      }
    }
  ];

  const supportActions = [
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'HelpCircle',
      path: '/help'
    },
    {
      id: 'feedback',
      label: 'Provide Feedback',
      icon: 'MessageCircle',
      action: () => {
        console.log('Opening feedback form');
        alert('Feedback form would open here');
      }
    },
    {
      id: 'contact',
      label: 'Contact Department',
      icon: 'Phone',
      action: () => {
        console.log('Contacting department');
        alert('Department contact information:\nPhone: +1-555-0199\nEmail: publicworks@city.gov');
      }
    }
  ];

  return (
    <>
      <div className="bg-surface rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
          <Icon name="Zap" size={20} className="text-warning" />
        </div>

        <div className="space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-colors duration-200 ${action.color}`}
            >
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Icon name={action.icon} size={18} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{action.label}</p>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} />
            </button>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-4">Need Help?</h4>
          <div className="space-y-2">
            {supportActions.map((action) => (
              action.path ? (
                <Link
                  key={action.id}
                  to={action.path}
                  className="flex items-center space-x-3 p-3 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                >
                  <Icon name={action.icon} size={16} />
                  <span className="text-sm">{action.label}</span>
                </Link>
              ) : (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="w-full flex items-center space-x-3 p-3 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                >
                  <Icon name={action.icon} size={16} />
                  <span className="text-sm">{action.label}</span>
                </button>
              )
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 p-4 bg-error-50 rounded-lg border border-error-200">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={18} className="text-error mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-error mb-1">Emergency?</h4>
              <p className="text-xs text-error-600 mb-2">
                For urgent issues requiring immediate attention, contact emergency services.
              </p>
              <button className="text-xs text-error font-medium hover:text-error-700 transition-colors duration-200">
                Call Emergency Hotline: 911
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Update Modal */}
      {showRequestUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Request Status Update</h3>
              <button
                onClick={() => setShowRequestUpdate(false)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Reason for Update Request
              </label>
              <textarea
                value={updateRequest}
                onChange={(e) => setUpdateRequest(e.target.value)}
                placeholder="Please explain why you need a status update..."
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary resize-none"
                rows={4}
              />
            </div>

            <div className="bg-secondary-50 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-text-secondary">
                    Update requests are reviewed within 24 hours. You'll receive a notification once there's a response.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowRequestUpdate(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestUpdate}
                disabled={!updateRequest.trim() || isSubmitting}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;