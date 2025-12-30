'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if we've already shown the loading screen in this session
    const hasLoaded = sessionStorage.getItem('forgeSpaceLoaded');
    
    if (hasLoaded) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('forgeSpaceLoaded', 'true');
    setIsLoading(false);
    // Small delay for smooth transition
    setTimeout(() => setShowContent(true), 300);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div 
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}
