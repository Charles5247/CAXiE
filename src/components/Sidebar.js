import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBlog, FaProjectDiagram, FaTools, FaImages, FaCog, FaBars } from 'react-icons/fa';

const navLinks = [
  { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/' },
  { name: 'Blogs', icon: <FaBlog />, path: '/blogs' },
  { name: 'Projects', icon: <FaProjectDiagram />, path: '/projects' },
  { name: 'Skills', icon: <FaTools />, path: '/skills' },
  { name: 'Media', icon: <FaImages />, path: '/media' },
  { name: 'Settings', icon: <FaCog />, path: '/settings' },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const logoUrl = process.env.PUBLIC_URL + '/img_logo.png';

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-700 text-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        <FaBars size={24} />
      </button>
      {/* Sidebar */}
      <aside
        className={`
          bg-gradient-to-b from-purple-800 via-purple-900 to-black bg-opacity-80 glass shadow-xl z-40
          w-4/5 max-w-xs h-full
          fixed top-0 left-0 transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:w-64 md:static md:translate-x-0 md:block md:h-auto
        `}
        style={{ minWidth: '220px' }}
      >
        <div className="flex flex-col h-full">
          {/* Logo at the top */}
          <div className="sidebar-header flex items-center justify-center h-16 px-4 border-b border-purple-700">
            <a href="/" className="flex items-center gap-2">
              <img src={logoUrl} alt="Logo" className="h-10 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
          </div>
          {/* Navigation */}
          <nav className="flex-1 py-4 px-2">
            <ul className="menu flex flex-col gap-6">
            {navLinks.map(link => (
                <li key={link.name} className="sidebar-item">
                  <Link
                    to={link.path}
                    className={`sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg text-white transition font-medium ${
                      location.pathname === link.path 
                        ? 'bg-purple-700/80' 
                        : 'hover:bg-purple-700/80'
                    }`}
                    onClick={() => setOpen(false)}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="text-base">{link.name}</span>
                  </Link>
                </li>
            ))}
            </ul>
          </nav>
          {/* Footer at the very bottom */}
          <div className="mt-auto p-2 text-xs text-purple-200 text-center border-t border-purple-700">
            &copy; 2025 Caxie Admin
          </div>
        </div>
      </aside>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setOpen(false)}
          style={{ touchAction: 'none' }}
        />
      )}
    </>
  );
};

export default Sidebar; 