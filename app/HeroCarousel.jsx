"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const carouselImages = [
  {
    src: "/Carousel/1.jfif",
    alt: "CAXiE Technologies Ltd — IT Consultancy Kano Nigeria",
  },
  {
    src: "/Carousel/2.jfif",
    alt: "CAXiE Technologies Ltd — Cybersecurity Solutions",
  },
  {
    src: "/Carousel/3.jfif",
    alt: "CAXiE Technologies Ltd — Digital Infrastructure",
  },
  {
    src: "/Carousel/4.jfif",
    alt: "CAXiE Technologies Ltd — Data & Intelligence",
  },
  {
    src: "/Carousel/5.jfif",
    alt: "CAXiE Technologies Ltd — ICT Infrastructure Deployment",
  },
  {
    src: "/Carousel/6.jfif",
    alt: "CAXiE Technologies Ltd — Web Development Nigeria",
  },
  {
    src: "/Carousel/7.jfif",
    alt: "CAXiE Technologies Ltd — Technology Consulting",
  },
  {
    src: "/Carousel/8.jfif",
    alt: "CAXiE Technologies Ltd — Fractional CTO Services",
  },
  {
    src: "/Carousel/9.jfif",
    alt: "CAXiE Technologies Ltd — Enterprise Systems",
  },
  {
    src: "/Carousel/10.jfif",
    alt: "CAXiE Technologies Ltd — Innovation & Technology",
  },
  {
    src: "/Carousel/11.png",
    alt: "CAXiE Technologies Ltd — AI & Future Technology",
  },
  {
    src: "/Carousel/Perfect Designer - Tech Innovation.jfif",
    alt: "CAXiE Technologies Ltd — Tech Innovation",
  },
];

const AUTOPLAY_INTERVAL = 4500;

export default function HeroCarousel({ className = "" }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedSrcs, setFailedSrcs] = useState(() => new Set());
  const timerRef = useRef(null);
  const total = carouselImages.length;
  const allFailed = failedSrcs.size === total;

  const goTo = useCallback(
    (index) => {
      setCurrent((index + total) % total);
    },
    [total],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused || allFailed) return;
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next, allFailed]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        prev();
        setPaused(true);
      }
      if (e.key === "ArrowRight") {
        next();
        setPaused(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const handleImgError = (src) => {
    // Logs exactly which carousel images are missing/404ing so this is
    // diagnosable from the browser console instead of a silent blank hero.
    // eslint-disable-next-line no-console
    console.warn(
      `[HeroCarousel] Failed to load "${src}" — check that this file exists in /public/Carousel and is committed to git (not excluded by .gitignore).`,
    );
    setFailedSrcs((prev) => {
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        allFailed
          ? "bg-gradient-to-br from-brand-900 via-brand-800 to-[#1a0f2e]"
          : ""
      } ${className}`.trim()}
      role="region"
      aria-label="CAXiE Technologies Ltd image carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {carouselImages.map((img, i) => {
        if (failedSrcs.has(img.src)) return null;
        return (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={i !== current}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover object-center"
              style={{ filter: "brightness(0.82)" }}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              onError={() => handleImgError(img.src)}
            />
          </div>
        );
      })}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {!allFailed && (
        <>
          {/* Prev button */}
          <button
            onClick={() => {
              prev();
              setPaused(true);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-black/50 hover:bg-brand-600/80 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Previous image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={() => {
              next();
              setPaused(true);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-black/50 hover:bg-brand-600/80 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Next image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
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
                onClick={() => {
                  goTo(i);
                  setPaused(true);
                }}
                className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-400 ${
                  i === current
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute top-3 right-3 z-30 bg-black/40 text-white text-xs px-2 py-1 rounded-full font-medium">
            {current + 1} / {total}
          </div>
        </>
      )}
    </div>
  );
}
