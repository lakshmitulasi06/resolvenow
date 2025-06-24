import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationPreferences = ({ preferences, onDataChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: { ...preferences.email },
    sms: { ...preferences.sms },
    push: { ...preferences.push }
  });

  const handleToggle = (category, setting) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSave = () => {
    onDataChange({ notificationPreferences: formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      email: { ...preferences.email },
      sms: { ...preferences.sms },
      push: { ...preferences.push }
    });
    setIsEditing(false);
  };

  const notificationCategories = [
    {
      id: 'email',
      title: 'Email Notifications',
      icon: 'Mail',
      description: 'Receive notifications via email',
      settings: [
        {
          key: 'complaintUpdates',
          label: 'Complaint Status Updates',
          description: 'Get notified when your complaint status changes'
        },
        {
          key: 'systemNotifications',
          label: 'System Notifications',
          description: 'Important system updates and maintenance notices'
        },
        {
          key: 'newsletter',
          label: 'Newsletter',
          description: 'Monthly newsletter with tips and updates'
        },
        {
          key: 'promotions',
          label: 'Promotions & Offers',
          description: 'Special offers and promotional content'
        }
      ]
    },
    {
      id: 'sms',
      title: 'SMS Notifications',
      icon: 'MessageSquare',
      description: 'Receive notifications via text message',
      settings: [
        {
          key: 'complaintUpdates',
          label: 'Complaint Status Updates',
          description: 'Get SMS when your complaint status changes'
        },
        {
          key: 'systemNotifications',
          label: 'System Notifications',
          description: 'Critical system alerts via SMS'
        },
        {
          key: 'emergencyAlerts',
          label: 'Emergency Alerts',
          description: 'Urgent notifications for emergency situations'
        }
      ]
    },
    {
      id: 'push',
      title: 'Push Notifications',
      icon: 'Bell',
      description: 'Receive notifications in your browser',
      settings: [
        {
          key: 'complaintUpdates',
          label: 'Complaint Status Updates',
          description: 'Browser notifications for complaint updates'
        },
        {
          key: 'systemNotifications',
          label: 'System Notifications',
          description: 'System updates and maintenance notices'
        },
        {
          key: 'emergencyAlerts',
          label: 'Emergency Alerts',
          description: 'Immediate alerts for urgent matters'
        }
      ]
    }
  ];

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        enabled ? 'bg-primary' : 'bg-secondary-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Notification Preferences</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-200"
          >
            <Icon name="Edit2" size={16} />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {notificationCategories.map((category) => (
          <div key={category.id} className="bg-secondary-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name={category.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="text-md font-medium text-text-primary">{category.title}</h4>
                <p className="text-sm text-text-secondary">{category.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {category.settings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="text-sm font-medium text-text-primary">{setting.label}</h5>
                      {setting.key === 'complaintUpdates' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-700">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{setting.description}</p>
                  </div>
                  <div className="ml-4">
                    <ToggleSwitch
                      enabled={isEditing ? formData[category.id][setting.key] : preferences[category.id][setting.key]}
                      onChange={() => isEditing && handleToggle(category.id, setting.key)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Notification Summary */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span>Notification Summary</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {Object.values(formData.email).filter(Boolean).length}
            </div>
            <div className="text-text-secondary">Email Types</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {Object.values(formData.sms).filter(Boolean).length}
            </div>
            <div className="text-text-secondary">SMS Types</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {Object.values(formData.push).filter(Boolean).length}
            </div>
            <div className="text-text-secondary">Push Types</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            if (isEditing) {
              const allEnabled = {
                email: Object.keys(formData.email).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
                sms: Object.keys(formData.sms).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
                push: Object.keys(formData.push).reduce((acc, key) => ({ ...acc, [key]: true }), {})
              };
              setFormData(allEnabled);
            }
          }}
          disabled={!isEditing}
          className="px-3 py-1 text-sm bg-success-100 text-success-700 rounded-md hover:bg-success-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enable All
        </button>
        <button
          onClick={() => {
            if (isEditing) {
              const allDisabled = {
                email: Object.keys(formData.email).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
                sms: Object.keys(formData.sms).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
                push: Object.keys(formData.push).reduce((acc, key) => ({ ...acc, [key]: false }), {})
              };
              setFormData(allDisabled);
            }
          }}
          disabled={!isEditing}
          className="px-3 py-1 text-sm bg-error-100 text-error-700 rounded-md hover:bg-error-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Disable All
        </button>
        <button
          onClick={() => {
            if (isEditing) {
              const essentialOnly = {
                email: { complaintUpdates: true, systemNotifications: true, newsletter: false, promotions: false },
                sms: { complaintUpdates: true, systemNotifications: false, emergencyAlerts: true },
                push: { complaintUpdates: true, systemNotifications: true, emergencyAlerts: true }
              };
              setFormData(essentialOnly);
            }
          }}
          disabled={!isEditing}
          className="px-3 py-1 text-sm bg-warning-100 text-warning-700 rounded-md hover:bg-warning-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;