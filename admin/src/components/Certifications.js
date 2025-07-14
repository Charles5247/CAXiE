import React, { useState } from 'react';

// Modal component for certification details
const CertModal = ({ cert, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-purple-700 hover:text-purple-900">&times;</button>
      <div className="flex flex-col items-center">
        {/* Certificate image placeholder */}
        <div className="w-28 h-28 bg-purple-100 rounded-full mb-4 flex items-center justify-center">
          <svg className="w-14 h-14 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-purple-800 mb-2">{cert.title}</h3>
        <span className="text-xs text-gray-400 mb-1">{cert.org}</span>
        <span className="text-xs text-gray-400 mb-2">{cert.date}</span>
        <p className="text-gray-700 mb-4 text-center">{cert.description}</p>
        {cert.link && (
          <a href={cert.link} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">View Certificate</a>
        )}
      </div>
    </div>
  </div>
);

const Certifications = () => {
  const [modalCert, setModalCert] = useState(null);
  // Example certifications (replace with data-driven approach if needed)
  const certs = [
    {
      title: 'AWS Certified Solutions Architect',
      org: 'Amazon Web Services',
      date: '2023',
      description: 'Credential ID: AWS-1234. Validates expertise in designing distributed systems on AWS.',
      featured: true,
      link: '#',
    },
    {
      title: 'Cisco Certified Network Associate',
      org: 'Cisco',
      date: '2022',
      description: 'Credential ID: CCNA-5678. Demonstrates ability to install, configure, and troubleshoot networks.',
      featured: false,
      link: '#',
    },
    {
      title: 'Google Data Analytics Professional',
      org: 'Google',
      date: '2021',
      description: 'Credential ID: GDA-9101. Covers data cleaning, analysis, and visualization.',
      featured: false,
      link: '#',
    },
  ];

  return (
    <section id="certifications" className="py-20 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certs.map((cert, idx) => (
          <div key={idx} className="bg-white rounded shadow p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center animate-fade-in-up relative">
            {/* Badge for featured */}
            {cert.featured && (
              <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Featured</span>
            )}
            {/* Certificate image placeholder */}
            <div className="w-16 h-16 bg-purple-100 rounded-full mb-3 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
            </div>
            <h4 className="font-bold mb-1">{cert.title}</h4>
            <span className="text-xs text-gray-400 mb-1">{cert.org}</span>
            <span className="text-xs text-gray-400 mb-2">{cert.date}</span>
            <span className="text-sm text-gray-600 mb-2">{cert.description}</span>
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