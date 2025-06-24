import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserContextMenu = ({ user = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: null,
    role: 'citizen'
  };

  const currentUser = user || mockUser;

  const menuItems = [
    {
      label: 'Profile',
      path: '/user-profile-management',
      icon: 'User',
      description: 'Manage your account settings'
    },
    {
      label: 'My Complaints',
      path: '/complaint-tracking-details',
      icon: 'FileText',
      description: 'View and track your complaints'
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      description: 'Application preferences'
    },
    {
      label: 'Help & Support',
      path: '/help',
      icon: 'HelpCircle',
      description: 'Get help and support'
    }
  ];

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

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
    setIsOpen(false);
    // Redirect to login page
    navigate('/user-login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
          {currentUser.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-primary-700">
              {getInitials(currentUser.name)}
            </span>
          )}
        </div>
        
        {/* User Name (hidden on small screens) */}
        <span className="hidden sm:block text-sm font-medium max-w-32 truncate">
          {currentUser.name}
        </span>
        
        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* User Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-surface rounded-lg shadow-modal border border-border animate-slide-down z-1010">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-primary-700">
                    {getInitials(currentUser.name)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {currentUser.email}
                </p>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-700 mt-1">
                  {currentUser.role === 'admin' ? 'Administrator' : 'Citizen'}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-200"
              >
                <Icon name={item.icon} size={18} className="flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-text-muted">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout Section */}
          <div className="border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-error hover:bg-error-50 transition-colors duration-200"
            >
              <Icon name="LogOut" size={18} />
              <div className="flex-1 text-left">
                <p className="font-medium">Sign Out</p>
                <p className="text-xs text-text-muted">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;