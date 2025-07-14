// QuickFact.js - Reusable pill component for displaying a quick fact with an icon
// Props:
//   icon: JSX for the icon
//   label: string for the fact label

import React from 'react';

const QuickFact = ({ icon, label }) => (
  <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full text-sm text-gray-200 font-medium shadow">
    {icon}
    {label}
  </div>
);

export default QuickFact; 