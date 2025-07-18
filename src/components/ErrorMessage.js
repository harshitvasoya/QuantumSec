import React from 'react';

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-64 text-red-500 text-xl">
    <p>Error: {message}</p>
  </div>
);

export default ErrorMessage;