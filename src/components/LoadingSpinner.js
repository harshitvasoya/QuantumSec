import React from 'react';

// Loading Spinner Component
const LoadingSpinner = ({ text = "Loading content..." }) => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    <p className="ml-4 text-lg text-gray-400">{text}</p>
  </div>
);

export default LoadingSpinner;
