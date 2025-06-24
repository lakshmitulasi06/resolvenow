import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DocumentSection = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type === 'application/pdf') return 'FileText';
    if (type.includes('document') || type.includes('word')) return 'FileText';
    return 'File';
  };

  const getFileTypeColor = (type) => {
    if (type.startsWith('image/')) return 'text-success';
    if (type === 'application/pdf') return 'text-error';
    if (type.includes('document') || type.includes('word')) return 'text-primary';
    return 'text-text-muted';
  };

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
  };

  const handleDownload = (document) => {
    // Handle document download
    console.log('Downloading:', document.name);
    // In a real app, this would trigger the actual download
    const link = document.createElement('a');
    link.href = document.url;
    link.download = document.name;
    link.click();
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <div className="bg-surface rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Documents & Attachments</h3>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Paperclip" size={16} />
            <span className="text-sm">{documents.length} files</span>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="mx-auto text-text-muted mb-3" />
            <p className="text-text-secondary">No documents attached</p>
            <p className="text-sm text-text-muted">Documents will appear here when uploaded</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {documents
                .filter(doc => doc.type === 'image')
                .map((document) => (
                  <div key={document.id} className="group relative">
                    <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden cursor-pointer">
                      <Image
                        src={document.thumbnail || document.url}
                        alt={document.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        onClick={() => handlePreview(document)}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-2">
                        <button
                          onClick={() => handlePreview(document)}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-secondary-50 transition-colors duration-200"
                        >
                          <Icon name="Eye" size={16} className="text-text-primary" />
                        </button>
                        <button
                          onClick={() => handleDownload(document)}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-secondary-50 transition-colors duration-200"
                        >
                          <Icon name="Download" size={16} className="text-text-primary" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-2 truncate">{document.name}</p>
                  </div>
                ))}
            </div>

            {/* Document List */}
            <div className="space-y-3">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg border border-border hover:bg-secondary-100 transition-colors duration-200">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      document.type === 'image' ? 'bg-success-100' :
                      document.type === 'pdf' ? 'bg-error-100' : 'bg-primary-100'
                    }`}>
                      <Icon 
                        name={getFileIcon(document.type)} 
                        size={18} 
                        className={getFileTypeColor(document.type)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {document.name}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-text-secondary">
                        <span>{formatFileSize(document.size)}</span>
                        <span>•</span>
                        <span>Uploaded {formatDate(document.uploadDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {document.type === 'image' && (
                      <button
                        onClick={() => handlePreview(document)}
                        className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
                        title="Preview"
                      >
                        <Icon name="Eye" size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDownload(document)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
                      title="Download"
                    >
                      <Icon name="Download" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={18} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-1">Document Guidelines</h4>
                <ul className="text-xs text-text-secondary space-y-1">
                  <li>• Supported formats: JPG, PNG, PDF, DOC, DOCX</li>
                  <li>• Maximum file size: 10MB per file</li>
                  <li>• Clear, high-quality images help faster resolution</li>
                  <li>• Include multiple angles for better assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {isPreviewOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full bg-surface rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary truncate">
                {selectedDocument.name}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
                  title="Download"
                >
                  <Icon name="Download" size={20} />
                </button>
                <button
                  onClick={closePreview}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
                  title="Close"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <Image
                src={selectedDocument.url}
                alt={selectedDocument.name}
                className="max-w-full max-h-96 object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentSection;