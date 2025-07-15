import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Modal component for certification details
const CertModal = ({ cert, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-purple-700 hover:text-purple-900">&times;</button>
      <div className="flex flex-col items-center">
        {/* Certificate image or fallback */}
        <div className="w-28 h-28 bg-purple-100 rounded-full mb-4 flex items-center justify-center overflow-hidden">
          {cert.image_url ? (
            <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" onError={e => { e.target.onerror = null; e.target.style.display='none'; }} />
          ) : (
            <svg className="w-14 h-14 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
          )}
        </div>
        <h3 className="text-2xl font-bold text-purple-800 mb-2">{cert.title}</h3>
        <span className="text-xs text-gray-400 mb-1">{cert.issuer}</span>
        <span className="text-xs text-gray-400 mb-2">{cert.date}</span>
        <p className="text-gray-700 mb-4 text-center">{cert.description || ''}</p>
        {cert.file_url && cert.file_url !== 'EMPTY' && (
          <a href={cert.file_url} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">View Certificate</a>
        )}
      </div>
    </div>
  </div>
);

const Certifications = () => {
  const [modalCert, setModalCert] = useState(null);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCerts = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });
      console.log('Supabase certifications:', data, error); // Debug log
      if (error) {
        setError('Failed to load certifications.');
        setCerts([]);
      } else {
        setCerts(data || []);
      }
      setLoading(false);
    };
    fetchCerts();
  }, []);

  return (
    <section id="certifications" className="py-20 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications</h2>
      {loading && <div className="text-center text-purple-700">Loading certifications...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certs.map((cert, idx) => (
          <div key={cert.id || idx} className="bg-white rounded shadow p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center animate-fade-in-up relative">
            {/* Badge for featured */}
            {cert.featured && (
              <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Featured</span>
            )}
            {/* Certificate image or fallback */}
            <div className="w-16 h-16 bg-purple-100 rounded-full mb-3 flex items-center justify-center overflow-hidden">
              {cert.image_url ? (
                <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" onError={e => { e.target.onerror = null; e.target.style.display='none'; }} />
              ) : (
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
              )}
            </div>
            <h4 className="font-bold mb-1">{cert.title}</h4>
            <span className="text-xs text-gray-400 mb-1">{cert.issuer}</span>
            <span className="text-xs text-gray-400 mb-2">{cert.date}</span>
            <span className="text-sm text-gray-600 mb-2">{cert.description || ''}</span>
            {cert.file_url && cert.file_url !== 'EMPTY' && (
              <a href={cert.file_url} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">View Certificate</a>
            )}
            <button
              className="mt-2 px-4 py-2 bg-purple-700 text-white rounded-lg shadow hover:bg-purple-800 transition"
              onClick={() => setModalCert(cert)}
            >
              View Certificate
            </button>
          </div>
        ))}
      </div>
      {/* Certification details modal */}
      {modalCert && <CertModal cert={modalCert} onClose={() => setModalCert(null)} />}
    </section>
  );
};

export default Certifications; 