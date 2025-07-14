// QuoteBlock.js - Reusable component for displaying a styled quote or motto
// Props:
//   children: quote text (JSX or string)

import React from 'react';

const QuoteBlock = ({ children }) => (
  <blockquote className="border-l-4 border-purple-500 pl-4 italic text-purple-200 bg-purple-900/30 rounded-lg py-3 mb-6 shadow">
    {/* Quotation mark icon */}
    <svg className="inline w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h1V7a4 4 0 00-4-4H7a4 4 0 00-4 4v6a4 4 0 004 4h2z" /></svg>
    {children}
  </blockquote>
);

export default QuoteBlock; 