// Projects.js - Projects/portfolio section
// Displays a list or grid of project cards

import React, { useState, useEffect } from 'react';

// Modal component for project details
const ProjectModal = ({ project, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-purple-700 hover:text-purple-900">&times;</button>
      <div className="flex flex-col items-center">
        {/* Project image placeholder */}
        <div className="w-28 h-28 bg-purple-200 rounded-full mb-4 flex items-center justify-center">
          <svg className="w-14 h-14 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 21l4-4 4 4" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-purple-800 mb-2">{project.title}</h3>
        <p className="text-gray-700 mb-4 text-center">{project.description}</p>
        <a href={project.link} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">View Project</a>
      </div>
    </div>
  </div>
);

// Lightbox Modal component for full image viewing
const LightboxModal = ({ image, onClose, imageType }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in px-2" onClick={onClose}>
    <div className="relative w-full max-w-lg md:max-w-3xl max-h-[80vh] flex items-center justify-center p-2 md:p-4">
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-3xl md:text-4xl hover:text-gray-300 transition z-10 bg-black/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
      >
        &times;
      </button>
      <img
        src={process.env.PUBLIC_URL + `/${imageType === 'photography' ? 'Photography' : 'image-artistry'}/` + image}
        alt="Full view"
        className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-lg shadow-2xl mx-auto"
        onClick={e => e.stopPropagation()}
      />
    </div>
  </div>
);

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed z-50 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 bottom-80 right-6 bg-white border-2 border-purple-700 hover:bg-purple-50 text-purple-700 hover:text-purple-900 rounded-full shadow-lg w-12 h-12 md:w-14 md:h-14 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400`}
      style={{ boxShadow: '0 4px 24px 0 rgba(80,0,200,0.10)' }}
    >
      <svg width="24" height="24" className="md:w-7 md:h-7 w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [modalProject, setModalProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxType, setLightboxType] = useState(null);

  // Example projects (replace with data-driven approach if needed)
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A modern personal portfolio built with React and Tailwind CSS.',
      link: '#',
    },
    {
      title: 'E-commerce Store',
      description: 'A full-stack MERN e-commerce application.',
      link: '#',
    },
    {
      title: 'Data Dashboard',
      description: 'A data analytics dashboard using Python and Power BI.',
      link: '#',
    },
  ];

  // List of images for Photography and Image Artistry
  const photographyImages = [
    'anita.jpg',
    'nana-cx.JPG',
    'solo-md.JPG',
    'IMG_2423.JPG',
    'ihoutu-cx.JPG',
    'IMG_2156.JPG',
    'friends.JPG',
    '7A5FF9D6-97C6-49D4-A0AB-0ADE1A23735D.JPG',
    'fam.JPG',
    'happy.JPG',
    'ihoutu-bd.JPG',
  ];
  const artistryImages = [
    'IMG_4516.JPG',
    'IMG_4343.JPG',
    'IMG_7636.JPG',
    'IMG_4513.JPG',
    'IMG_4517.JPG',
    'IMG_7633.JPG',
    'IMG_4336.JPG',
    'IMG_1134.JPG',
    'IMG_1138.JPG',
    'IMG_1136.JPG',
    'IMG-20210619-WA0079.jpg',
  ];

  const openLightbox = (image, type) => {
    setLightboxImage(image);
    setLightboxType(type);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxType(null);
  };

  return (
    <section id="projects" className="py-10 md:py-20 px-2 sm:px-4 md:px-8 bg-gradient-to-br from-purple-900 via-black to-black">
      <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
      <div className="mb-8 flex gap-4">
        <button
          className={`px-4 py-2 rounded font-semibold transition border-b-2 ${activeTab === 'web' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-purple-400'}`}
          onClick={() => setActiveTab('web')}
        >
          Web Dev
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition border-b-2 ${activeTab === 'photo' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-purple-400'}`}
          onClick={() => setActiveTab('photo')}
        >
          Photography
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition border-b-2 ${activeTab === 'artistry' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-purple-400'}`}
          onClick={() => setActiveTab('artistry')}
        >
          Image Artistry
        </button>
      </div>
      {activeTab === 'web' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-gray-800 rounded shadow p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center animate-fade-in-up">
              {/* Project image placeholder */}
              <div className="w-20 h-20 bg-purple-200 rounded-full mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 21l4-4 4 4" /></svg>
              </div>
              <h4 className="font-bold mb-2 text-white">{project.title}</h4>
              <p className="text-gray-300 mb-4 flex-1">{project.description}</p>
              <a href={project.link} className="text-blue-400 hover:underline font-medium mb-2" target="_blank" rel="noopener noreferrer">View Project</a>
              <button
                className="mt-2 px-4 py-2 bg-purple-700 text-white rounded-lg shadow hover:bg-purple-800 transition"
                onClick={() => setModalProject(project)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'photo' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
          {photographyImages.map((img, idx) => (
            <div key={img} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer bg-black/20 group">
              <img
                src={process.env.PUBLIC_URL + '/Photography/' + img}
                alt={`Photography ${idx + 1}`.replace(/(image|photo|picture)/gi, '').trim()}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onClick={() => openLightbox(img, 'photography')}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold">
                  Click to view
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'artistry' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
          {artistryImages.map((img, idx) => (
            <div key={img} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer bg-black/20 group">
              <img
                src={process.env.PUBLIC_URL + '/image-artistry/' + img}
                alt={`Image Artistry ${idx + 1}`.replace(/(image|photo|picture)/gi, '').trim()}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onClick={() => openLightbox(img, 'artistry')}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold">
                  Click to view
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Project details modal */}
      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
      {/* Lightbox modal */}
      {lightboxImage && <LightboxModal image={lightboxImage} onClose={closeLightbox} imageType={lightboxType} />}
      <BackToTopButton />
    </section>
  );
};

export default Projects; 