import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterSidebar = ({ filters, onFiltersChange, complaints }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate filter counts
  const getFilterCounts = () => {
    const counts = {
      status: {},
      priority: {},
      department: {}
    };

    complaints.forEach(complaint => {
      // Status counts
      counts.status[complaint.status] = (counts.status[complaint.status] || 0) + 1;
      
      // Priority counts
      counts.priority[complaint.priority] = (counts.priority[complaint.priority] || 0) + 1;
      
      // Department counts
      counts.department[complaint.department] = (counts.department[complaint.department] || 0) + 1;
    });

    return counts;
  };

  const filterCounts = getFilterCounts();

  const statusOptions = [
    { value: 'all', label: 'All Status', count: complaints.length },
    { value: 'received', label: 'Received', count: filterCounts.status.received || 0 },
    { value: 'in-progress', label: 'In Progress', count: filterCounts.status['in-progress'] || 0 },
    { value: 'resolved', label: 'Resolved', count: filterCounts.status.resolved || 0 },
    { value: 'closed', label: 'Closed', count: filterCounts.status.closed || 0 }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priority', count: complaints.length },
    { value: 'urgent', label: 'Urgent', count: filterCounts.priority.urgent || 0 },
    { value: 'high', label: 'High', count: filterCounts.priority.high || 0 },
    { value: 'medium', label: 'Medium', count: filterCounts.priority.medium || 0 },
    { value: 'low', label: 'Low', count: filterCounts.priority.low || 0 }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments', count: complaints.length },
    { value: 'Public Works', label: 'Public Works', count: filterCounts.department['Public Works'] || 0 },
    { value: 'Water Department', label: 'Water Department', count: filterCounts.department['Water Department'] || 0 },
    { value: 'Environmental Services', label: 'Environmental Services', count: filterCounts.department['Environmental Services'] || 0 },
    { value: 'Transportation', label: 'Transportation', count: filterCounts.department['Transportation'] || 0 },
    { value: 'Health Services', label: 'Health Services', count: filterCounts.department['Health Services'] || 0 }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: 'all',
      priority: 'all',
      department: 'all',
      dateRange: 'all'
    });
    setSearchTerm('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'text-blue-600';
      case 'in-progress': return 'text-yellow-600';
      case 'resolved': return 'text-green-600';
      case 'closed': return 'text-gray-600';
      default: return 'text-text-primary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-text-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Search" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Search</h3>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary"
          />
          <Icon name="Search" size={16} className="absolute left-3 top-2.5 text-text-muted" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="BarChart3" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Quick Stats</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {filterCounts.status.received || 0}
            </div>
            <div className="text-xs text-blue-600">New</div>
          </div>
          
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-bold text-yellow-600">
              {filterCounts.status['in-progress'] || 0}
            </div>
            <div className="text-xs text-yellow-600">In Progress</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {filterCounts.status.resolved || 0}
            </div>
            <div className="text-xs text-green-600">Resolved</div>
          </div>
          
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-lg font-bold text-red-600">
              {filterCounts.priority.urgent || 0}
            </div>
            <div className="text-xs text-red-600">Urgent</div>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Activity" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Status</h3>
        </div>
        
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={option.value}
                checked={filters.status === option.value}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="text-primary focus:ring-primary-500"
              />
              <span className={`text-sm flex-1 ${getStatusColor(option.value)}`}>
                {option.label}
              </span>
              <span className="text-xs text-text-muted bg-secondary-100 px-2 py-0.5 rounded-full">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="AlertTriangle" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Priority</h3>
        </div>
        
        <div className="space-y-2">
          {priorityOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="priority"
                value={option.value}
                checked={filters.priority === option.value}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="text-primary focus:ring-primary-500"
              />
              <span className={`text-sm flex-1 ${getPriorityColor(option.value)}`}>
                {option.label}
              </span>
              <span className="text-xs text-text-muted bg-secondary-100 px-2 py-0.5 rounded-full">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Department Filter */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Building" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Department</h3>
        </div>
        
        <div className="space-y-2">
          {departmentOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="department"
                value={option.value}
                checked={filters.department === option.value}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="text-primary focus:ring-primary-500"
              />
              <span className="text-sm flex-1 text-text-primary">
                {option.label}
              </span>
              <span className="text-xs text-text-muted bg-secondary-100 px-2 py-0.5 rounded-full">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Calendar" size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">Date Range</h3>
        </div>
        
        <div className="space-y-2">
          {dateRangeOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="dateRange"
                value={option.value}
                checked={filters.dateRange === option.value}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="text-primary focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="card p-4">
        <button
          onClick={clearAllFilters}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-200"
        >
          <Icon name="X" size={16} />
          <span>Clear All Filters</span>
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;