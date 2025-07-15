import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Blogs from './components/Blogs';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Media from './components/Media';
import Settings from './components/Settings';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Always check for session on mount
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      console.log('Initial session:', session);
    };
    getSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('Auth state changed. New session:', session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (!session) {
    return <Login onLogin={() => {
      supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    }} />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black">
      <Sidebar />
      <div className="flex-1 p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen rounded-none sm:rounded-br-2xl md:rounded-br-3xl shadow-none sm:shadow-xl">
        {/* Global Header */}
        <div className="w-full bg-white shadow-md rounded-t-lg px-3 sm:px-6 md:px-8 py-2 sm:py-4 mb-4 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <h1 className="text-lg sm:text-2xl font-bold text-purple-800 text-center sm:text-left">Admin Dashboard</h1>
          <img src={process.env.PUBLIC_URL + '/profile.JPG'} alt="Profile" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-purple-300 shadow" />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/media" element={<Media />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <button
          onClick={() => supabase.auth.signOut()}
          className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;
