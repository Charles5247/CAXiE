import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    file: null,
    file_url: ''
  });
  const [uploading, setUploading] = useState(false);

  // Fetch certifications from Supabase
  const fetchCerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });
      if (error) setError(error.message);
      else setCerts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files && files[0]) {
      setFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    let file_url = '';
    try {
      // Upload file if provided
      if (formData.file) {
        const fileName = `certifications/${Date.now()}-${formData.file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(fileName, formData.file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(fileName);
        file_url = urlData.publicUrl;
      }
      // Insert certification record
      const { error: dbError } = await supabase
        .from('certifications')
        .insert([{
          title: formData.title,
          issuer: formData.issuer,
          date: formData.date,
          file_url
        }]);
      if (dbError) throw dbError;
      setShowForm(false);
      setFormData({ title: '', issuer: '', date: '', file: null, file_url: '' });
      fetchCerts();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    setError(null);
    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchCerts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Certifications</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-purple-700 w-full sm:w-auto"
        >
          Add Certification
        </button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {showForm && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Add Certification</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuer *</label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certificate File (optional)</label>
              <input
                type="file"
                name="file"
                accept="image/*,application/pdf"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={uploading}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Certifications List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading certifications...</div>
        ) : certs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No certifications found.</div>
        ) : (
          certs.map(cert => (
            <div key={cert.id} className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="font-semibold text-purple-800 text-base sm:text-lg">{cert.title}</div>
                <div className="text-sm text-gray-600">{cert.issuer}</div>
                <div className="text-xs text-gray-400">{cert.date}</div>
                {cert.file_url && (
                  <a href={cert.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs block mt-1">View Certificate</a>
                )}
              </div>
              <button
                onClick={() => handleDelete(cert.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 self-start sm:self-center"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Certifications; 