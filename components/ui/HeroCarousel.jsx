'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const carouselImages = [
  { src: '/Carousel/1.jfif', alt: 'CAXiE Technologies — IT Consultancy Kano Nigeria' },
  { src: '/Carousel/2.jfif', alt: 'CAXiE Technologies — Cybersecurity Solutions' },
  { src: '/Carousel/3.jfif', alt: 'CAXiE Technologies — Digital Infrastructure' },
  { src: '/Carousel/4.jfif', alt: 'CAXiE Technologies — Data & Intelligence' },
  { src: '/Carousel/5.jfif', alt: 'CAXiE Technologies — ICT Infrastructure Deployment' },
  { src: '/Carousel/6.jfif', alt: 'CAXiE Technologies — Web Development Nigeria' },
  { src: '/Carousel/7.jfif', alt: 'CAXiE Technologies — Technology Consulting' },
  { src: '/Carousel/8.jfif', alt: 'CAXiE Technologies — Fractional CTO Services' },
  { src: '/Carousel/9.jfif', alt: 'CAXiE Technologies — Enterprise Systems' },
  { src: '/Carousel/10.jfif', alt: 'CAXiE Technologies — Innovation & Technology' },
  { src: '/Carousel/ChatGPT Image Oct 7, 2025, 08_12_37 PM.png', alt: 'CAXiE Technologies — AI & Future Technology' },
  { src: '/Carousel/Perfect Designer - Tech Innovation.jfif', alt: 'CAXiE Technologies — Tech Innovation' },
];

const AUTOPLAY_INTERVAL = 4500;

export default function HeroCarousel({ className = '' }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = carouselImages.length;

  const goTo = useCallback((index) => {
    setCurrent((index + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { prev(); setPaused(true); }
      if (e.key === 'ArrowRight') { next(); setPaused(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`.trim()}
      role="region"
      aria-label="CAXiE Technologies image carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {carouselImages.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover object-center"
            style={{ filter: 'brightness(0.82)' }}
            loading={i === 0 ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Prev button */}
      <button
        onClick={() => { prev(); setPaused(true); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-black/50 hover:bg-brand-600/80 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Previous image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={() => { next(); setPaused(true); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-black/50 hover:bg-brand-600/80 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Next image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5"
        role="tablist"
        aria-label="Carousel slides"
      >
        {carouselImages.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1} of ${total}`}
            onClick={() => { goTo(i); setPaused(true); }}
            className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-400 ${
              i === current
                ? 'w-5 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-3 right-3 z-30 bg-black/40 text-white text-xs px-2 py-1 rounded-full font-medium">
        {current + 1} / {total}
      </div>
    </div>
  );
}
