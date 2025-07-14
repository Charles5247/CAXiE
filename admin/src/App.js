// App.js - Main entry point for the React portfolio
// Sets up the overall layout, sidebar, and all main sections

import './App.css'; // Global styles and custom CSS
import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; // Sidebar navigation
import Hero from './components/Hero'; // Hero/landing section
import About from './components/About'; // About section
import Skills from './components/Skills'; // Skills section
import Projects from './components/Projects'; // Projects/portfolio section
import Certifications from './components/Certifications'; // Certifications section
import Blog from './components/Blog'; // Blog/updates section
import Contact from './components/Contact'; // Contact form/section
import AIChatbot from './components/AIChatbot';
import { trackVisit } from './services/visitTracking';

function App() {
  // State to track if the sidebar is collapsed (for responsive layout)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // State to track sidebar/header visibility (for seamless margin adjustment)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Pass a callback to Sidebar to update visibility state
  const handleSidebarVisibility = (visible) => {
    setIsSidebarVisible(visible);
  };

  React.useEffect(() => {
    trackVisit();
  }, []);

  return (
    <>
      {/* Main flex container for sidebar + content */}
      <div className="flex min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black">
        {/* Sidebar navigation (collapsible) */}
        <Sidebar onCollapse={setIsSidebarCollapsed} onVisibilityChange={handleSidebarVisibility} />
        {/* Main content area, margin adjusts based on sidebar/header visibility and state */}
        <div
          className={`flex-1 transition-all duration-300
            ${isSidebarVisible ? (isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64') : 'ml-0'}
            ${isSidebarVisible ? 'mt-0' : 'mt-0'}
          `}
        >
          {/* Hero/landing section */}
          <Hero />
          {/* About section */}
          <About />
          {/* Skills section */}
          <Skills />
          {/* Projects section */}
          <Projects />
          {/* Certifications section */}
          <Certifications />
          {/* Blog section */}
          <Blog />
          {/* Contact section */}
          <Contact />
        </div>
    </div>
      {/* Floating AI Assistant Chatbot */}
      <AIChatbot />
    </>
  );
}

export default App;
