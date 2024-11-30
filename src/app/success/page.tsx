"use client"
import React from 'react';

const SuccessPage: React.FC = () => {
  

  const handleGoBack = () => {
    window.location.href = '/shop';// Redirect to the shop page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase! Your order has been successfully processed.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Return to Shop
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
