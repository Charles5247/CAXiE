import React, { useState, useEffect } from 'react';

function Settings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@caxie.com',
    bio: '',
    website: '',
    social_links: {
      linkedin: '',
      github: '',
      twitter: '',
      instagram: ''
    }
  });
  const [systemSettings, setSystemSettings] = useState({
    site_title: 'Caxie Portfolio',
    site_description: 'Personal portfolio and blog',
    maintenance_mode: false,
    analytics_enabled: true
  });

  // Load settings from localStorage (you can later move this to Supabase)
  useEffect(() => {
    const savedProfile = localStorage.getItem('admin_profile');
    const savedSettings = localStorage.getItem('system_settings');
    
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    if (savedSettings) {
      setSystemSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setProfileData(prev => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [socialKey]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle system settings changes
  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Save profile settings
  const saveProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Save to localStorage (you can later save to Supabase)
      localStorage.setItem('admin_profile', JSON.stringify(profileData));
      
      setSuccess('Profile settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save profile settings');
    } finally {
      setLoading(false);
    }
  };

  // Save system settings
  const saveSystemSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Save to localStorage (you can later save to Supabase)
      localStorage.setItem('system_settings', JSON.stringify(systemSettings));
      
      setSuccess('System settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save system settings');
    } finally {
      setLoading(false);
    }
  };

  // Change password (placeholder)
  const changePassword = () => {
    setError('Password change functionality will be implemented soon');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleProfileChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={profileData.website}
              onChange={handleProfileChange}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {/* Social Links */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Social Links
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                name="social_linkedin"
                value={profileData.social_links.linkedin}
                onChange={handleProfileChange}
                placeholder="LinkedIn URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="url"
                name="social_github"
                value={profileData.social_links.github}
                onChange={handleProfileChange}
                placeholder="GitHub URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="url"
                name="social_twitter"
                value={profileData.social_links.twitter}
                onChange={handleProfileChange}
                placeholder="Twitter URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="url"
                name="social_instagram"
                value={profileData.social_links.instagram}
                onChange={handleProfileChange}
                placeholder="Instagram URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <button
            onClick={saveProfile}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">System Settings</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Title
              </label>
              <input
                type="text"
                name="site_title"
                value={systemSettings.site_title}
                onChange={handleSystemChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Description
              </label>
              <input
                type="text"
                name="site_description"
                value={systemSettings.site_description}
                onChange={handleSystemChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="maintenance_mode"
                checked={systemSettings.maintenance_mode}
                onChange={handleSystemChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Maintenance Mode
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="analytics_enabled"
                checked={systemSettings.analytics_enabled}
                onChange={handleSystemChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Enable Analytics
              </label>
            </div>
          </div>
          
          <button
            onClick={saveSystemSettings}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save System Settings'}
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
        <div className="space-y-4">
          <button
            onClick={changePassword}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Change Password
          </button>
          <p className="text-sm text-gray-600">
            Password change functionality will be implemented in a future update.
          </p>
        </div>
      </div>

      {/* Database Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Database Information</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Database:</strong> Supabase PostgreSQL</p>
          <p><strong>Storage:</strong> Supabase Storage</p>
          <p><strong>Authentication:</strong> Supabase Auth</p>
          <p><strong>Status:</strong> <span className="text-green-600">Connected</span></p>
        </div>
      </div>
    </div>
  );
}

export default Settings; 