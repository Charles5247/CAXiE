import React, { useState } from 'react';

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
].map(name => `/Photography/${name}`);

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
].map(name => `/image-artistry/${name}`);

const tabs = [
  { key: 'photography', label: 'Photography', images: photographyImages },
  { key: 'artistry', label: 'Image Artistry', images: artistryImages },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('photography');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentTab = tabs.find(tab => tab.key === activeTab);
  const images = currentTab.images;

  const openLightbox = idx => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  const nextImage = () => setLightboxIndex((lightboxIndex + 1) % images.length);

  return (
    <section id="gallery" className="w-full py-16 px-4 bg-gradient-to-b from-purple-900/80 to-black/80 min-h-[80vh]">
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-6 py-2 rounded-full font-semibold transition border-2 text-lg focus:outline-none ${activeTab === tab.key ? 'bg-purple-700 text-white border-purple-700 shadow' : 'bg-white/10 text-purple-200 border-purple-700/30 hover:bg-purple-800/40'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, idx) => (
            <div key={src} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer bg-black/20">
              <img
                src={src}
                alt="Gallery"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                onClick={() => openLightbox(idx)}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <button className="absolute top-4 right-4 text-white text-3xl font-bold" onClick={closeLightbox}>&times;</button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl px-2" onClick={prevImage}>&#8592;</button>
            <img src={images[lightboxIndex]} alt="Large" className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white" />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl px-2" onClick={nextImage}>&#8594;</button>
          </div>
        )}
      </div>
    </section>
  );
} 