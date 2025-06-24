import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';

import ComplaintOverview from './components/ComplaintOverview';
import StatusTimeline from './components/StatusTimeline';
import ComplaintDetails from './components/ComplaintDetails';
import CommunicationThread from './components/CommunicationThread';
import DocumentSection from './components/DocumentSection';
import QuickActions from './components/QuickActions';

const ComplaintTrackingDetails = () => {
  const [complaint, setComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true
  });

  // Mock complaint data
  const mockComplaint = {
    id: "CMP-2024-001234",
    title: "Street Light Not Working",
    description: `The street light on Main Street near the community center has been non-functional for the past two weeks. This is causing safety concerns for pedestrians and vehicles, especially during evening hours.

The light appears to be completely dead - no flickering or partial illumination. This is affecting the visibility for people walking home from work and children playing in the nearby area.

I have noticed that other residents are also concerned about this issue. Please prioritize this repair as it's a safety hazard for our community.`,
    status: "in-progress",
    priority: "high",
    category: "Infrastructure",
    department: "Public Works Department",
    submissionDate: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-20T14:45:00Z",
    location: "Main Street, Block A, Sector 15",
    assignedTo: "John Smith",
    estimatedResolution: "2024-01-25T17:00:00Z",
    citizenName: "Sarah Johnson",
    citizenEmail: "sarah.johnson@email.com",
    citizenPhone: "+1-555-0123"
  };

  const mockTimeline = [
    {
      id: 1,
      status: "submitted",
      title: "Complaint Submitted",
      description: "Your complaint has been successfully submitted and assigned a tracking ID.",
      timestamp: "2024-01-15T10:30:00Z",
      responsibleParty: "System",
      details: "Complaint automatically assigned to Public Works Department based on category selection.",
      isExpandable: true
    },
    {
      id: 2,
      status: "acknowledged",
      title: "Complaint Acknowledged",
      description: "Your complaint has been reviewed and acknowledged by the department.",
      timestamp: "2024-01-16T09:15:00Z",
      responsibleParty: "Public Works Department",
      details: "Initial assessment completed. Field inspection scheduled for January 18th.",
      isExpandable: true
    },
    {
      id: 3,
      status: "in-progress",
      title: "Investigation Started",
      description: "Field team has been dispatched to investigate the issue.",
      timestamp: "2024-01-18T11:20:00Z",
      responsibleParty: "John Smith - Field Inspector",
      details: "Field inspection confirmed the street light malfunction. Electrical fault identified. Repair work scheduled for January 22nd.",
      isExpandable: true,
      isCurrent: true
    },
    {
      id: 4,
      status: "scheduled",
      title: "Repair Scheduled",
      description: "Repair work has been scheduled and resources allocated.",
      timestamp: "2024-01-20T14:45:00Z",
      responsibleParty: "Maintenance Team",
      details: "Repair team assigned. Required parts ordered. Work scheduled for January 22nd between 9:00 AM - 12:00 PM.",
      isExpandable: true
    }
  ];

  const mockDocuments = [
    {
      id: 1,
      name: "street-light-photo-1.jpg",
      type: "image",
      size: "2.4 MB",
      uploadDate: "2024-01-15T10:30:00Z",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      name: "location-map.jpg",
      type: "image",
      size: "1.8 MB",
      uploadDate: "2024-01-15T10:32:00Z",
      url: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=200&h=150&fit=crop"
    },
    {
      id: 3,
      name: "inspection-report.pdf",
      type: "pdf",
      size: "856 KB",
      uploadDate: "2024-01-18T11:45:00Z",
      url: "#",
      thumbnail: null
    }
  ];

  const mockCommunications = [
    {
      id: 1,
      sender: "Sarah Johnson",
      senderType: "citizen",
      message: "I wanted to add that the street light has been making a buzzing sound before it stopped working completely.",
      timestamp: "2024-01-16T15:30:00Z",
      attachments: []
    },
    {
      id: 2,
      sender: "John Smith",
      senderType: "official",
      message: "Thank you for the additional information. Our team will check the electrical connections during the inspection.",
      timestamp: "2024-01-17T09:45:00Z",
      attachments: []
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      senderType: "citizen",
      message: "The buzzing sound started about a week before the light stopped working. I hope this helps with the diagnosis.",
      timestamp: "2024-01-17T18:20:00Z",
      attachments: []
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setComplaint(mockComplaint);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = (method) => {
    const shareUrl = window.location.href;
    const shareText = `Complaint Status: ${complaint?.title} - ${complaint?.id}`;

    switch (method) {
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`);
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNotificationToggle = (type) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-secondary-200 rounded-lg"></div>
                  <div className="h-96 bg-secondary-200 rounded-lg"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-48 bg-secondary-200 rounded-lg"></div>
                  <div className="h-32 bg-secondary-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                Complaint Details
              </h1>
              <div className="flex items-center space-x-2 text-text-secondary">
                <span className="text-sm">ID:</span>
                <span className="font-mono text-sm font-medium text-primary">
                  {complaint.id}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
                >
                  <Icon name="Share2" size={16} />
                  <span className="text-sm font-medium">Share</span>
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-border z-10">
                    <div className="py-2">
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                      >
                        <Icon name="Copy" size={16} />
                        <span>Copy Link</span>
                      </button>
                      <button
                        onClick={() => handleShare('email')}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                      >
                        <Icon name="Mail" size={16} />
                        <span>Email</span>
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                      >
                        <Icon name="MessageCircle" size={16} />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Printer" size={16} />
                <span className="text-sm font-medium">Print</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Timeline and Communication */}
            <div className="lg:col-span-2 space-y-8">
              <ComplaintOverview complaint={complaint} />
              <StatusTimeline timeline={mockTimeline} />
              <CommunicationThread 
                communications={mockCommunications}
                complaintId={complaint.id}
              />
            </div>

            {/* Right Column - Details and Actions */}
            <div className="space-y-8">
              <ComplaintDetails complaint={complaint} />
              <DocumentSection documents={mockDocuments} />
              <QuickActions complaintId={complaint.id} />
              
              {/* Notification Settings */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-primary">Email Notifications</p>
                      <p className="text-xs text-text-secondary">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('email')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        notificationSettings.email ? 'bg-primary' : 'bg-secondary-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          notificationSettings.email ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-primary">SMS Notifications</p>
                      <p className="text-xs text-text-secondary">Receive updates via SMS</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('sms')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        notificationSettings.sms ? 'bg-primary' : 'bg-secondary-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          notificationSettings.sms ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-primary">Push Notifications</p>
                      <p className="text-xs text-text-secondary">Receive browser notifications</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('push')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        notificationSettings.push ? 'bg-primary' : 'bg-secondary-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          notificationSettings.push ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTrackingDetails;