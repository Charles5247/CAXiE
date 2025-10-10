import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';

// Add Google Fonts import for 'Poppins' at the top level (index.html or via @import in index.css)
// For now, apply font-family inline for demonstration

const fontFamily = { fontFamily: 'Poppins, Inter, Arial, sans-serif' };

const FULL_NAME = 'CAXiE Technologies';

const Hero = () => {
  // Improved typewriter effect state
  const [displayedName, setDisplayedName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100;

  useEffect(() => {
    let timeout;
    const fullText = FULL_NAME;
    if (!isDeleting) {
      if (displayedName.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedName(fullText.substring(0, displayedName.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      if (displayedName.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedName(fullText.substring(0, displayedName.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedName, isDeleting, loopNum, typingSpeed]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-start px-4 sm:px-8 overflow-hidden"
      style={{ position: 'relative', ...fontFamily }}
    >
      <div className="absolute inset-0 z-0">
        <Carousel />
      </div>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <a
        href="https://wa.me/2349014921243"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-2 sm:top-8 sm:right-8 flex items-center gap-2 bg-black/80 hover:bg-black text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-lg transition z-20 backdrop-blur text-sm sm:text-base"
        style={{ fontSize: '1rem' }}
      >
        Let's chat now
      </a>
      <div className="relative z-20 flex flex-col items-start text-left w-full max-w-2xl">
        <h1 className="text-sm sm:text-base md:text-lg font-extrabold text-gray-100 mb-3" style={fontFamily}>
          Welcome to{' '}
          <span className="text-purple-400">
            {displayedName}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-200 mb-4 max-w-2xl leading-relaxed" style={fontFamily}>
          IT Consultancy | Network & Systems Engineering | Web Development | Data Analyst | Media Tech
        </h2>
        <div className="mb-3 text-gray-300 space-y-2" style={fontFamily}>
          <div className="flex gap-4 items-center mt-2">
            <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-8">
              <a
                href="https://github.com/Charles5247"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-2xl text-gray-200 hover:text-purple-400 transition"
              >
                {/* GitHub SVG */}
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/charles-xavier-ekechukwuemeka-01185a1a5/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-2xl text-gray-200 hover:text-purple-400 transition"
              >
                {/* LinkedIn SVG */}
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/iamxavi_too/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-2xl text-gray-200 hover:text-purple-400 transition"
              >
                {/* Instagram SVG */}
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.5.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <a href="#contact" className="inline-block px-6 py-3 bg-purple-700 text-white font-semibold rounded-full shadow-lg hover:bg-purple-800 transition text-base" style={fontFamily}>
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default Hero; 