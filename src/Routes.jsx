import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import AdminComplaintManagement from "pages/admin-complaint-management";
import ComplaintSubmissionForm from "pages/complaint-submission-form";
import UserProfileManagement from "pages/user-profile-management";
import ComplaintTrackingDetails from "pages/complaint-tracking-details";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-complaint-management" element={<AdminComplaintManagement />} />
          <Route path="/complaint-submission-form" element={<ComplaintSubmissionForm />} />
          <Route path="/user-profile-management" element={<UserProfileManagement />} />
          <Route path="/complaint-tracking-details" element={<ComplaintTrackingDetails />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;