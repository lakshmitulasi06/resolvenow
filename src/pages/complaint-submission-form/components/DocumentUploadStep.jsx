import React, { useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DocumentUploadStep = ({ formData, updateFormData, errors }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFiles = 5;
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType === 'application/pdf') return 'FileText';
    if (fileType.includes('word') || fileType.includes('document')) return 'FileText';
    return 'File';
  };

  const getFileTypeLabel = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType === 'application/pdf') return 'PDF';
    if (fileType.includes('word') || fileType.includes('document')) return 'Document';
    return 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      return 'File type not supported. Please upload images, PDF, or document files.';
    }
    if (file.size > maxFileSize) {
      return 'File size exceeds 5MB limit.';
    }
    return null;
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const currentFiles = formData.attachments || [];
    
    if (currentFiles.length + fileArray.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        const fileData = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        };
        validFiles.push(fileData);
      }
    });

    if (errors.length > 0) {
      alert('Some files could not be uploaded:\n' + errors.join('\n'));
    }

    if (validFiles.length > 0) {
      updateFormData('attachments', [...currentFiles, ...validFiles]);
      
      // Simulate upload progress
      validFiles.forEach(fileData => {
        simulateUpload(fileData.id);
      });
    }
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: progress
      }));
    }, 200);
  };

  const removeFile = (fileId) => {
    const updatedFiles = formData.attachments.filter(file => file.id !== fileId);
    updateFormData('attachments', updatedFiles);
    
    // Clean up progress tracking
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const totalSize = formData.attachments?.reduce((total, file) => total + file.size, 0) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Upload Supporting Documents
        </h2>
        <p className="text-text-secondary mb-6">
          Upload photos, documents, or other files that support your complaint. This step is optional but recommended for faster resolution.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragActive
            ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300 hover:bg-secondary-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-text-secondary">
              Support for images, PDF, and document files up to 5MB each
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Plus" size={16} />
            <span>Choose Files</span>
          </button>
        </div>
      </div>

      {/* File List */}
      {formData.attachments && formData.attachments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-text-primary">
              Uploaded Files ({formData.attachments.length}/{maxFiles})
            </h3>
            <span className="text-sm text-text-secondary">
              Total size: {formatFileSize(totalSize)}
            </span>
          </div>
          
          <div className="space-y-3">
            {formData.attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-4 p-4 bg-surface border border-border rounded-lg"
              >
                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {file.preview ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <Icon name={getFileIcon(file.type)} size={24} className="text-secondary-600" />
                    </div>
                  )}
                </div>
                
                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {file.name}
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary-100 text-secondary-700">
                      {getFileTypeLabel(file.type)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {formatFileSize(file.size)}
                  </p>
                  
                  {/* Upload Progress */}
                  {uploadProgress[file.id] !== undefined && uploadProgress[file.id] < 100 && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-secondary-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[file.id]}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-muted">
                          {Math.round(uploadProgress[file.id])}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex-shrink-0 p-2 text-text-secondary hover:text-error hover:bg-error-50 rounded-md transition-colors duration-200"
                  title="Remove file"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-secondary-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              File Upload Guidelines
            </h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Maximum file size: 5MB per file</li>
              <li>• Maximum files: {maxFiles} files total</li>
              <li>• Supported formats: JPEG, PNG, GIF, PDF, DOC, DOCX, TXT</li>
              <li>• Include photos of the issue, relevant documents, or receipts</li>
              <li>• Ensure files are clear and readable</li>
            </ul>
          </div>
        </div>
      </div>

      {/* File Type Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 border border-border rounded-lg">
          <Icon name="Camera" size={32} className="mx-auto text-primary mb-2" />
          <h4 className="font-medium text-text-primary mb-1">Photos</h4>
          <p className="text-sm text-text-secondary">
            Pictures of the issue, damage, or location
          </p>
        </div>
        
        <div className="text-center p-4 border border-border rounded-lg">
          <Icon name="FileText" size={32} className="mx-auto text-primary mb-2" />
          <h4 className="font-medium text-text-primary mb-1">Documents</h4>
          <p className="text-sm text-text-secondary">
            Bills, receipts, official correspondence
          </p>
        </div>
        
        <div className="text-center p-4 border border-border rounded-lg">
          <Icon name="Video" size={32} className="mx-auto text-primary mb-2" />
          <h4 className="font-medium text-text-primary mb-1">Evidence</h4>
          <p className="text-sm text-text-secondary">
            Any supporting evidence or proof
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;