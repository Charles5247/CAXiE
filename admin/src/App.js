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
    // Get the current session (Supabase v2)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session?.session ?? null);
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
      <div className="flex-1 p-8 bg-gray-50 min-h-screen rounded-br-3xl shadow-xl">
        {/* Global Header */}
        <div className="w-full bg-white shadow-md rounded-t-lg px-8 py-4 mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-800">Admin Dashboard</h1>
          <img src={process.env.PUBLIC_URL + '/profile.JPG'} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-purple-300 shadow" />
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
          className="fixed bottom-4 right-4 bg-gray-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;
