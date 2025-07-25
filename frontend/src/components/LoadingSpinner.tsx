import React from 'react';

const LoadingSpinner: React.FC<{ fullPage?: boolean }> = ({ fullPage = false }) => (
  <div className={`flex items-center justify-center ${fullPage ? 'min-h-screen' : ''}`}>
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default LoadingSpinner;