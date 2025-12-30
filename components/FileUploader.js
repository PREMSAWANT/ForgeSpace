'use client';

import { useState } from 'react';
import { Card, Button } from './ui';

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
    <Card>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload Files</h3>
        
        <div className="border-2 border-dashed border-grey-border rounded-lg p-8 text-center hover:border-grey-soft transition-colors bg-grey-dark/20">
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
                <span className="text-white font-medium text-lg">Click to upload</span>
                <span className="text-grey-muted"> or drag and drop</span>
              </div>
              <p className="text-xs text-grey-muted uppercase tracking-widest font-bold opacity-60">
                Documents, images, or any project files
              </p>
            </div>
          </label>
        </div>

        {isUploading && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-grey-muted font-medium">Uploading...</span>
              <span className="text-white font-bold">{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-grey-border rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-grey-dark border border-grey-border rounded-xl text-sm text-grey-soft">
            <span className="text-white font-bold mr-2">Error:</span> {error}
          </div>
        )}
      </div>
    </Card>
  );
}
