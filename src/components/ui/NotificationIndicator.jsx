import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationIndicator = ({ notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      title: 'Complaint Status Updated',
      message: 'Your complaint #12345 has been reviewed and is now in progress.',
      time: '2 minutes ago',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'New Response Available',
      message: 'The department has responded to your complaint #12344.',
      time: '1 hour ago',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'Document Required',
      message: 'Additional documentation needed for complaint #12343.',
      time: '3 hours ago',
      type: 'warning',
      read: true
    },
    {
      id: 4,
      title: 'Complaint Resolved',
      message: 'Your complaint #12342 has been successfully resolved.',
      time: '1 day ago',
      type: 'success',
      read: true
    }
  ];

  const allNotifications = notifications.length > 0 ? notifications : mockNotifications;

  useEffect(() => {
    const unread = allNotifications.filter(notification => !notification.read).length;
    setUnreadCount(unread);
  }, [allNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const markAsRead = (notificationId) => {
    // Handle marking notification as read
    console.log('Mark as read:', notificationId);
  };

  const markAllAsRead = () => {
    // Handle marking all notifications as read
    console.log('Mark all as read');
    setUnreadCount(0);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-md hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-modal border border-border animate-slide-down z-1010">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {allNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Icon name="Bell" size={48} className="mx-auto text-text-muted mb-3" />
                <p className="text-text-secondary">No notifications yet</p>
              </div>
            ) : (
              <div className="py-2">
                {allNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-secondary-50 transition-colors duration-200 cursor-pointer border-l-4 ${
                      !notification.read 
                        ? 'border-l-primary bg-primary-50/30' :'border-l-transparent'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                        <Icon name={getNotificationIcon(notification.type)} size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.read ? 'text-text-primary' : 'text-text-secondary'
                          }`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-text-muted mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {allNotifications.length > 0 && (
            <div className="px-4 py-3 border-t border-border">
              <button className="w-full text-center text-sm text-primary hover:text-primary-700 transition-colors duration-200">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIndicator;