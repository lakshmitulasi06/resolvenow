import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Route mapping for better breadcrumb labels
  const routeLabels = {
    'user-registration': 'Registration',
    'user-login': 'Login',
    'complaint-submission-form': 'Submit Complaint',
    'complaint-tracking-details': 'Track Complaint',
    'admin-complaint-management': 'Admin Panel',
    'user-profile-management': 'Profile',
    'settings': 'Settings',
    'help': 'Help'
  };

  // Don't show breadcrumbs on home page or auth pages
  if (pathnames.length === 0 || 
      pathnames.includes('user-login') || 
      pathnames.includes('user-registration')) {
    return null;
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    ...pathnames.map((pathname, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const label = routeLabels[pathname] || pathname.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return { label, path };
    })
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="mx-2 text-text-muted" 
                />
              )}
              {isLast ? (
                <span className="text-text-primary font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;