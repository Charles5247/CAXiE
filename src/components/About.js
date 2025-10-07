// About.js - About section for the portfolio
// This section displays a profile image with orbiting tech icons, a bio, quick facts, a motto, and a resume download button.

import React from 'react';
import aboutData from '../data/aboutData.json'; // Centralized data for the About section
import ProfileImage from './common/ProfileImage'; // Reusable profile image component
import QuickFact from './common/QuickFact'; // Reusable quick fact pill component
import QuoteBlock from './common/QuoteBlock'; // Reusable quote/motto block
import '../App.css'; // Custom CSS for orbit animation

// Map for quick fact icons (location, experience, etc.)
const iconMap = {
  location: (
    // Location pin icon
    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243A8 8 0 1112 20a7.963 7.963 0 01-4.243-1.243z" /></svg>
  ),
  experience: (
    // Experience icon
    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7v-6m0 6a9 9 0 110-18 9 9 0 010 18z" /></svg>
  ),
  clock: (
    // Clock icon
    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="2"/><path d="M12 7v5l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  language: (
    // Language icon
    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0H3" /></svg>
  ),
  education: (
    // Education icon
    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  ),
};

// Array of crisp, official SVGs for orbiting tech icons
const orbitIcons = [
  // React (official)
  <svg key="react" className="w-10 h-10" viewBox="0 0 24 24" fill="none"><g><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1.5"><ellipse rx="9" ry="3.8" cx="12" cy="12" fill="none"/><ellipse rx="9" ry="3.8" cx="12" cy="12" fill="none" transform="rotate(60 12 12)"/><ellipse rx="9" ry="3.8" cx="12" cy="12" fill="none" transform="rotate(120 12 12)"/></g></g></svg>,
  // Python (official)
  <svg key="python" className="w-10 h-10" viewBox="0 0 24 24" fill="none"><g><path d="M12.09 2.003c-1.13.01-2.24.1-3.18.27-2.81.5-3.32 1.54-3.32 3.45v2.53h6.64v.84H5.59c-1.97 0-3.7 1.19-4.23 3.45-.62 2.67-.65 4.33 0 7.13.48 2.13 1.63 3.45 4.23 3.45h1.13v-1.6c0-1.16.95-2.1 2.1-2.1h6.64c1.15 0 2.1.94 2.1 2.1v1.6h1.13c2.6 0 3.75-1.32 4.23-3.45.65-2.8.62-4.46 0-7.13-.53-2.26-2.26-3.45-4.23-3.45h-6.64v-.84h6.64V5.723c0-1.91-.51-2.95-3.32-3.45-1.01-.18-2.05-.26-3.18-.27zm-2.09 1.97c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 16.06c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#3776AB"/></g></svg>,
  // Network (Lucide - nodes)
  <svg key="network" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.36-6.36l-2.12 2.12M6.76 17.24l-2.12 2.12m12.72 0l-2.12-2.12M6.76 6.76L4.64 4.64"/></svg>,
  // PC (Lucide - monitor)
  <svg key="pc" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  // Brain (Lucide)
  <svg key="brain" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 8A5.5 5.5 0 0 0 7 8m8.5 8A5.5 5.5 0 0 1 7 16m8.5-8V5a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v3m8.5 8v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3"/></svg>,
  // Data/Cloud (Lucide - cloud)
  <svg key="data" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 0-9 5.5 5.5 0 0 0-10.9 1.5A4.5 4.5 0 0 0 6.5 19Z"/></svg>,
  // GitHub (brand icon)
  <svg key="github" className="w-10 h-10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 7.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" fill="#181717"/></svg>
];

// Update orbitPositions for 7 icons
const orbitPositions = [
  { top: '-20px', left: '50%', transform: 'translate(-50%, 0)' }, // Top
  { top: '15%', left: '93%', transform: 'translate(-50%, -50%)' }, // Top-right
  { top: '60%', left: '100%', transform: 'translate(-50%, -50%)' }, // Right
  { bottom: '-20px', left: '75%', transform: 'translate(-50%, 0)' }, // Bottom-right
  { bottom: '-20px', left: '25%', transform: 'translate(-50%, 0)' }, // Bottom-left
  { top: '60%', left: '0%', transform: 'translate(-50%, -50%)' }, // Left
  { top: '15%', left: '7%', transform: 'translate(-50%, -50%)' }, // Top-left
];

const About = () => {
  return (
    <section id="about" className="w-full py-12 sm:py-16 px-2 sm:px-0 bg-gradient-to-b from-purple-900/80 to-black/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12 px-2 sm:px-4 md:px-12">
        {/* Profile Image with Orbiting Icons */}
        <div className="relative flex-shrink-0 flex flex-col items-center w-full md:w-auto md:mr-12 mb-8 md:mb-0" style={{ width: 'min(90vw, 300px)', height: 'min(90vw, 300px)' }}>
          <ProfileImage src={aboutData.profileImage} alt="Profile" size={180} />
          <div className="absolute inset-0 orbit-animate pointer-events-none">
            {orbitIcons.map((icon, idx) => (
              <span
                key={idx}
                className="absolute transition-transform duration-300 hover:scale-125"
                style={{ ...orbitPositions[idx], zIndex: 2 }}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col justify-center items-start w-full">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">About Us</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
            {aboutData.quickFacts.map((fact, idx) => (
              <QuickFact key={idx} icon={iconMap[fact.icon]} label={fact.label} />
            ))}
          </div>
          <div className="text-gray-200 text-base sm:text-lg mb-8 max-w-2xl space-y-4">
            {String(aboutData.bio)
              .split('\n\n')
              .filter(Boolean)
              .map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
          </div>
          <QuoteBlock>{aboutData.motto}</QuoteBlock>
          {/* Resume button intentionally hidden */}
        </div>
      </div>
    </section>
  );
};

export default About; 