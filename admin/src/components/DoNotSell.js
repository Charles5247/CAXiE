import React from 'react';

const DoNotSell = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 text-gray-800">
    <h1 className="text-3xl font-bold mb-6">Do Not Sell My Personal Information</h1>
    <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
    <p className="mb-4">Under the California Consumer Privacy Act (CCPA) and similar international laws, you have the right to request that your personal information not be sold.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">2. Your Rights</h2>
    <p className="mb-4">You have the right to opt out of the sale of your personal information at any time. This Site does not sell your personal information, but you may submit a request for assurance.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">3. How to Submit a Request</h2>
    <p className="mb-4">To exercise your rights, please email your request to: johneme2022@gmail.com. Include your name and the nature of your request.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">4. Verification Process</h2>
    <p className="mb-4">For your security, we may need to verify your identity before processing your request. We will respond as required by law.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Information</h2>
    <p>If you have any questions about your rights or this policy, please contact: johneme2022@gmail.com</p>
  </div>
);

export default DoNotSell; 