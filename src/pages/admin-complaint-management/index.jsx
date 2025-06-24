import React, { useState, useEffect } from 'react';

import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';

import ComplaintSummary from './components/ComplaintSummary';
import ComplaintDetails from './components/ComplaintDetails';
import ActionPanel from './components/ActionPanel';
import BulkActions from './components/BulkActions';
import FilterSidebar from './components/FilterSidebar';

const AdminComplaintManagement = () => {
  const [selectedComplaints, setSelectedComplaints] = useState([]);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    department: 'all',
    dateRange: 'all'
  });
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock complaints data
  const mockComplaints = [
    {
      id: "CMP-2024-001",
      title: "Street Light Not Working",
      description: `The street light on Main Street near the community center has been non-functional for over two weeks. This is causing safety concerns for pedestrians, especially during evening hours.

The light appears to be completely dead - no flickering or partial illumination. Several residents have reported feeling unsafe walking in this area after dark.

This is a high-traffic area with many elderly residents who rely on proper lighting for safe navigation. The issue needs immediate attention to prevent any potential accidents or security incidents.`,
      citizen: {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1-555-0123",
        address: "123 Main Street, Downtown"
      },
      category: "Infrastructure",
      department: "Public Works",
      priority: "high",
      status: "in-progress",
      submittedDate: "2024-01-15T10:30:00Z",
      lastUpdated: "2024-01-18T14:20:00Z",
      assignedTo: "Mike Johnson",
      attachments: [
        {
          id: 1,
          name: "street_light_photo.jpg",
          type: "image",
          size: "2.3 MB",
          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
        }
      ],
      timeline: [
        {
          id: 1,
          action: "Complaint Submitted",
          description: "Complaint submitted by citizen",
          timestamp: "2024-01-15T10:30:00Z",
          user: "John Smith",
          type: "public"
        },
        {
          id: 2,
          action: "Complaint Received",
          description: "Complaint received and assigned ID",
          timestamp: "2024-01-15T10:31:00Z",
          user: "System",
          type: "system"
        },
        {
          id: 3,
          action: "Assigned to Department",
          description: "Assigned to Public Works department",
          timestamp: "2024-01-16T09:15:00Z",
          user: "Admin",
          type: "internal"
        },
        {
          id: 4,
          action: "Status Updated",
          description: "Status changed to In Progress",
          timestamp: "2024-01-18T14:20:00Z",
          user: "Mike Johnson",
          type: "public"
        }
      ],
      internalNotes: [
        {
          id: 1,
          note: "Contacted electrical contractor for assessment",
          author: "Mike Johnson",
          timestamp: "2024-01-17T11:00:00Z"
        }
      ]
    },
    {
      id: "CMP-2024-002",
      title: "Water Supply Interruption",
      description: `Experiencing frequent water supply interruptions in our residential area. The water supply cuts off multiple times during the day without any prior notice.

This has been ongoing for the past week and is affecting daily activities like cooking, cleaning, and basic hygiene. Many families with young children are particularly affected.

We need a permanent solution and advance notification system for planned maintenance to help residents prepare accordingly.`,
      citizen: {
        name: "Sarah Davis",
        email: "sarah.davis@email.com",
        phone: "+1-555-0124",
        address: "456 Oak Avenue, Riverside"
      },
      category: "Utilities",
      department: "Water Department",
      priority: "urgent",
      status: "received",
      submittedDate: "2024-01-20T08:45:00Z",
      lastUpdated: "2024-01-20T08:45:00Z",
      assignedTo: null,
      attachments: [],
      timeline: [
        {
          id: 1,
          action: "Complaint Submitted",
          description: "Complaint submitted by citizen",
          timestamp: "2024-01-20T08:45:00Z",
          user: "Sarah Davis",
          type: "public"
        }
      ],
      internalNotes: []
    },
    {
      id: "CMP-2024-003",
      title: "Noise Pollution from Construction",
      description: `Construction work starting at 6 AM daily is causing severe noise pollution in our residential neighborhood. The noise levels are extremely high and disturbing the peace.

Many residents work night shifts and need to sleep during morning hours. The early start time is affecting the health and well-being of the entire community.

Request for enforcement of noise regulations and restriction of construction hours to reasonable times.`,
      citizen: {
        name: "Robert Wilson",
        email: "robert.wilson@email.com",
        phone: "+1-555-0125",
        address: "789 Pine Street, Westside"
      },
      category: "Environment",
      department: "Environmental Services",
      priority: "medium",
      status: "resolved",
      submittedDate: "2024-01-10T16:20:00Z",
      lastUpdated: "2024-01-19T10:30:00Z",
      assignedTo: "Lisa Chen",
      attachments: [
        {
          id: 1,
          name: "noise_complaint_evidence.mp4",
          type: "video",
          size: "15.7 MB",
          url: "#"
        }
      ],
      timeline: [
        {
          id: 1,
          action: "Complaint Submitted",
          description: "Complaint submitted by citizen",
          timestamp: "2024-01-10T16:20:00Z",
          user: "Robert Wilson",
          type: "public"
        },
        {
          id: 2,
          action: "Investigation Started",
          description: "Environmental officer assigned for investigation",
          timestamp: "2024-01-12T09:00:00Z",
          user: "Lisa Chen",
          type: "internal"
        },
        {
          id: 3,
          action: "Resolution Implemented",
          description: "Construction hours restricted to 8 AM - 6 PM",
          timestamp: "2024-01-19T10:30:00Z",
          user: "Lisa Chen",
          type: "public"
        }
      ],
      internalNotes: [
        {
          id: 1,
          note: "Contacted construction company and issued notice",
          author: "Lisa Chen",
          timestamp: "2024-01-15T14:30:00Z"
        }
      ]
    }
  ];

  useEffect(() => {
    setComplaints(mockComplaints);
    if (mockComplaints.length > 0) {
      setCurrentComplaint(mockComplaints[0]);
    }
  }, []);

  const handleComplaintSelect = (complaint) => {
    setCurrentComplaint(complaint);
    setViewMode('detail');
  };

  const handleBulkSelect = (complaintId) => {
    setSelectedComplaints(prev => 
      prev.includes(complaintId) 
        ? prev.filter(id => id !== complaintId)
        : [...prev, complaintId]
    );
  };

  const handleSelectAll = () => {
    if (selectedComplaints.length === complaints.length) {
      setSelectedComplaints([]);
    } else {
      setSelectedComplaints(complaints.map(c => c.id));
    }
  };

  const handleStatusUpdate = (complaintId, newStatus) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, status: newStatus, lastUpdated: new Date().toISOString() }
          : complaint
      )
    );
    
    if (currentComplaint && currentComplaint.id === complaintId) {
      setCurrentComplaint(prev => ({ ...prev, status: newStatus }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (filters.status !== 'all' && complaint.status !== filters.status) return false;
    if (filters.priority !== 'all' && complaint.priority !== filters.priority) return false;
    if (filters.department !== 'all' && complaint.department !== filters.department) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Admin Complaint Management</h1>
                <p className="mt-1 text-text-secondary">
                  Manage and process citizen complaints efficiently
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden btn-secondary"
                >
                  <Icon name="Filter" size={16} />
                  Filters
                </button>
                
                <div className="flex items-center space-x-2 bg-secondary-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                      viewMode === 'list' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('detail')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                      viewMode === 'detail' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedComplaints.length > 0 && (
            <BulkActions 
              selectedCount={selectedComplaints.length}
              onClearSelection={() => setSelectedComplaints([])}
              onBulkStatusUpdate={(status) => {
                selectedComplaints.forEach(id => handleStatusUpdate(id, status));
                setSelectedComplaints([]);
              }}
            />
          )}

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
              <FilterSidebar 
                filters={filters}
                onFiltersChange={setFilters}
                complaints={complaints}
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {viewMode === 'list' ? (
                /* List View */
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">
                      Complaints ({filteredComplaints.length})
                    </h2>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedComplaints.length === filteredComplaints.length && filteredComplaints.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-border focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-secondary">Select All</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredComplaints.map((complaint) => (
                      <div
                        key={complaint.id}
                        className="border border-border rounded-lg p-4 hover:bg-secondary-50 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleComplaintSelect(complaint)}
                      >
                        <div className="flex items-start space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedComplaints.includes(complaint.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleBulkSelect(complaint.id);
                            }}
                            className="mt-1 rounded border-border focus:ring-primary-500"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-sm font-semibold text-text-primary">
                                  {complaint.id}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                                  {complaint.status.replace('-', ' ').toUpperCase()}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                                  {complaint.priority.toUpperCase()}
                                </span>
                              </div>
                              <span className="text-xs text-text-muted">
                                {new Date(complaint.submittedDate).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <h4 className="text-base font-medium text-text-primary mb-2">
                              {complaint.title}
                            </h4>
                            
                            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                              {complaint.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-text-muted">
                              <div className="flex items-center space-x-4">
                                <span>Citizen: {complaint.citizen.name}</span>
                                <span>Department: {complaint.department}</span>
                                {complaint.assignedTo && (
                                  <span>Assigned: {complaint.assignedTo}</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {complaint.attachments.length > 0 && (
                                  <Icon name="Paperclip" size={14} />
                                )}
                                <Icon name="ChevronRight" size={14} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Detail View */
                currentComplaint && (
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Complaint Summary - Left Panel */}
                    <div className="xl:col-span-4">
                      <ComplaintSummary 
                        complaint={currentComplaint}
                        onStatusUpdate={handleStatusUpdate}
                      />
                    </div>

                    {/* Complaint Details - Center Panel */}
                    <div className="xl:col-span-6">
                      <ComplaintDetails complaint={currentComplaint} />
                    </div>

                    {/* Action Panel - Right Panel */}
                    <div className="xl:col-span-2">
                      <ActionPanel 
                        complaint={currentComplaint}
                        onStatusUpdate={handleStatusUpdate}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center">
          <Icon name="Plus" size={24} />
        </button>
      </div>
    </div>
  );
};

export default AdminComplaintManagement;