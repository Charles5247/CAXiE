import React from 'react';

const Preloader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90">
    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <span className="text-white text-lg font-semibold tracking-wide">Loading...</span>
  </div>
);

export default Preloader; 