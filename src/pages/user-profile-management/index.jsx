import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PersonalInfoSection from './components/PersonalInfoSection';
import AddressSection from './components/AddressSection';
import NotificationPreferences from './components/NotificationPreferences';
import SecuritySettings from './components/SecuritySettings';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import DangerZone from './components/DangerZone';

const UserProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    phoneVerified: true,
    emailVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    dateOfBirth: "1990-05-15",
    gender: "male",
    occupation: "Software Engineer",
    primaryAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    alternateAddress: {
      street: "456 Oak Avenue",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "United States"
    },
    notificationPreferences: {
      email: {
        complaintUpdates: true,
        systemNotifications: true,
        newsletter: false,
        promotions: false
      },
      sms: {
        complaintUpdates: true,
        systemNotifications: false,
        emergencyAlerts: true
      },
      push: {
        complaintUpdates: true,
        systemNotifications: true,
        emergencyAlerts: true
      }
    },
    securitySettings: {
      twoFactorEnabled: false,
      lastPasswordChange: "2024-01-15",
      activeSessions: 3
    },
    joinDate: "2023-06-15",
    totalComplaints: 12,
    resolvedComplaints: 8
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'address', label: 'Address', icon: 'MapPin' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'account', label: 'Account', icon: 'Settings' }
  ];

  // Handle unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setShowSaveIndicator(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setHasUnsavedChanges(false);
    setIsLoading(false);
    
    // Hide save indicator after 2 seconds
    setTimeout(() => setShowSaveIndicator(false), 2000);
  };

  const handleDataChange = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
    setHasUnsavedChanges(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoSection 
            userData={userData} 
            onDataChange={handleDataChange}
          />
        );
      case 'address':
        return (
          <AddressSection 
            userData={userData} 
            onDataChange={handleDataChange}
          />
        );
      case 'notifications':
        return (
          <NotificationPreferences 
            preferences={userData.notificationPreferences}
            onDataChange={handleDataChange}
          />
        );
      case 'security':
        return (
          <SecuritySettings 
            securityData={userData.securitySettings}
            onDataChange={handleDataChange}
          />
        );
      case 'account':
        return (
          <DangerZone 
            userData={userData}
            onDataChange={handleDataChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Profile Settings</h1>
                <p className="text-text-secondary">Manage your account information and preferences</p>
              </div>
              
              {/* Save Changes Button */}
              {hasUnsavedChanges && (
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-warning">
                    <Icon name="AlertCircle" size={16} />
                    <span className="text-sm">Unsaved changes</span>
                  </div>
                  <button
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Save" size={16} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {/* Save Success Indicator */}
              {showSaveIndicator && !hasUnsavedChanges && (
                <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm">Changes saved successfully</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Summary Card - Mobile/Desktop */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <ProfilePhotoUpload 
                  userData={userData}
                  onDataChange={handleDataChange}
                />
                
                <div className="text-center mt-4">
                  <h3 className="text-lg font-semibold text-text-primary">{userData.name}</h3>
                  <p className="text-text-secondary text-sm">{userData.email}</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    {userData.emailVerified && (
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    )}
                    <span className="text-xs text-success">Verified Account</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Member since</span>
                      <span className="text-sm font-medium text-text-primary">
                        {new Date(userData.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Total complaints</span>
                      <span className="text-sm font-medium text-text-primary">{userData.totalComplaints}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Resolved</span>
                      <span className="text-sm font-medium text-success">{userData.resolvedComplaints}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border space-y-2">
                  <Link
                    to="/complaint-submission-form"
                    className="w-full btn-primary text-center block"
                  >
                    <Icon name="Plus" size={16} className="inline mr-2" />
                    New Complaint
                  </Link>
                  <Link
                    to="/complaint-tracking-details"
                    className="w-full btn-secondary text-center block"
                  >
                    <Icon name="Search" size={16} className="inline mr-2" />
                    Track Complaints
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="card mb-6">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Profile sections">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileManagement;