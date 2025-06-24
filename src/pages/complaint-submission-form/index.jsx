import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComplaintDetailsStep from './components/ComplaintDetailsStep';
import LocationStep from './components/LocationStep';
import DocumentUploadStep from './components/DocumentUploadStep';
import ReviewStep from './components/ReviewStep';
import SuccessModal from './components/SuccessModal';

const ComplaintSubmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    subject: '',
    description: '',
    priority: 'medium',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    coordinates: null,
    attachments: [],
    contactPreferences: ['email'],
    anonymous: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedComplaintId, setGeneratedComplaintId] = useState('');
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Complaint Details', icon: 'FileText' },
    { id: 2, title: 'Location Information', icon: 'MapPin' },
    { id: 3, title: 'Upload Documents', icon: 'Upload' },
    { id: 4, title: 'Review & Submit', icon: 'CheckCircle' }
  ];

  const categories = [
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      subCategories: ['Roads & Highways', 'Water Supply', 'Electricity', 'Drainage', 'Street Lighting']
    },
    {
      id: 'public-services',
      name: 'Public Services',
      subCategories: ['Healthcare', 'Education', 'Transportation', 'Sanitation', 'Parks & Recreation']
    },
    {
      id: 'administrative',
      name: 'Administrative',
      subCategories: ['Document Processing', 'License & Permits', 'Tax Issues', 'Corruption', 'Staff Behavior']
    },
    {
      id: 'environment',
      name: 'Environment',
      subCategories: ['Pollution', 'Waste Management', 'Noise Pollution', 'Tree Cutting', 'Water Contamination']
    },
    {
      id: 'safety',
      name: 'Safety & Security',
      subCategories: ['Traffic Issues', 'Crime', 'Fire Safety', 'Building Safety', 'Emergency Services']
    }
  ];

  // Auto-save draft functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.subject || formData.description) {
        localStorage.setItem('complaintDraft', JSON.stringify(formData));
        setIsDraftSaved(true);
        setTimeout(() => setIsDraftSaved(false), 2000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('complaintDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.category) newErrors.category = 'Please select a category';
        if (!formData.subCategory) newErrors.subCategory = 'Please select a sub-category';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
          newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }
        break;
      case 3:
        // Document upload is optional, no validation needed
        break;
      case 4:
        // Final validation - check all required fields
        if (!formData.category || !formData.subCategory || !formData.subject.trim() || 
            !formData.description.trim() || !formData.address.trim() || 
            !formData.city.trim() || !formData.state.trim() || !formData.pincode.trim()) {
          newErrors.general = 'Please complete all required fields';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate complaint ID
      const complaintId = `CMP${Date.now().toString().slice(-6)}`;
      setGeneratedComplaintId(complaintId);
      
      // Clear draft
      localStorage.removeItem('complaintDraft');
      
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setErrors({ general: 'Failed to submit complaint. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    localStorage.setItem('complaintDraft', JSON.stringify(formData));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2000);
  };

  const clearDraft = () => {
    localStorage.removeItem('complaintDraft');
    setFormData({
      category: '',
      subCategory: '',
      subject: '',
      description: '',
      priority: 'medium',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      coordinates: null,
      attachments: [],
      contactPreferences: ['email'],
      anonymous: false
    });
    navigate('/');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ComplaintDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            categories={categories}
          />
        );
      case 2:
        return (
          <LocationStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <DocumentUploadStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <ReviewStep
            formData={formData}
            categories={categories}
            errors={errors}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Submit New Complaint
                </h1>
                <p className="text-text-secondary">
                  Fill out the form below to register your complaint. All fields marked with * are required.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {isDraftSaved && (
                  <div className="flex items-center space-x-2 text-success text-sm">
                    <Icon name="Check" size={16} />
                    <span>Draft saved</span>
                  </div>
                )}
                
                <button
                  onClick={saveDraft}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200"
                >
                  <Icon name="Save" size={16} />
                  <span>Save Draft</span>
                </button>
                
                <button
                  onClick={clearDraft}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-error border border-border rounded-md hover:bg-error-50 transition-colors duration-200"
                >
                  <Icon name="X" size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
                    currentStep > step.id
                      ? 'bg-success border-success text-white'
                      : currentStep === step.id
                      ? 'bg-primary border-primary text-white' :'bg-surface border-border text-text-muted'
                  }`}>
                    {currentStep > step.id ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step.icon} size={20} />
                    )}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 lg:w-24 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-success' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-sm">
              {steps.map((step) => (
                <div key={step.id} className={`text-center ${
                  currentStep === step.id ? 'text-primary font-medium' : 'text-text-muted'
                }`}>
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">Step {step.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-surface rounded-lg shadow-sm border border-border">
            <div className="p-6 sm:p-8">
              {errors.general && (
                <div className="mb-6 p-4 bg-error-50 border border-error-100 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={20} className="text-error" />
                    <p className="text-error font-medium">{errors.general}</p>
                  </div>
                </div>
              )}

              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 sm:px-8 py-4 bg-secondary-50 border-t border-border rounded-b-lg">
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    currentStep === 1
                      ? 'text-text-muted cursor-not-allowed' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                  }`}
                >
                  <Icon name="ChevronLeft" size={20} />
                  <span>Previous</span>
                </button>

                {currentStep < steps.length ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-700 font-medium transition-colors duration-200"
                  >
                    <span>Next</span>
                    <Icon name="ChevronRight" size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2 bg-success text-white rounded-md hover:bg-success-700 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} />
                        <span>Submit Complaint</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          complaintId={generatedComplaintId}
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/complaint-tracking-details');
          }}
        />
      )}
    </div>
  );
};

export default ComplaintSubmissionForm;