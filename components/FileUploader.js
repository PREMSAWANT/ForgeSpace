'use client';

import { useState } from 'react';

export default function FileUploader({ projectId, onUploadComplete }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectId', projectId);

        const response = await fetch('/api/files/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        setUploadProgress(((i + 1) / files.length) * 100);
      }

      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload Files</h3>
        
        <div className="border-2 border-dashed border-grey-mid rounded-lg p-8 text-center hover:border-grey-soft transition-colors">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="space-y-2">
              <div className="text-4xl text-grey-muted">📁</div>
              <div>
                <span className="text-white font-medium">Click to upload</span>
                <span className="text-secondary"> or drag and drop</span>
              </div>
              <p className="text-xs text-muted">
                Documents, images, or any project files
              </p>
            </div>
          </label>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Uploading...</span>
              <span className="text-white">{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-grey-mid rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-grey-dark border border-grey-mid rounded text-sm text-secondary">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
