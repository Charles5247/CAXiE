// ProfileImage.js - Reusable component for displaying a circular profile image
// Props:
//   src: image source path
//   alt: alt text for accessibility
//   size: diameter in pixels (default 160)

import React from 'react';

const ProfileImage = ({ src, alt, size = 160 }) => (
  <img
    src={src}
    alt={alt}
    className="rounded-full object-cover border-4 border-purple-400 shadow-lg"
    style={{ width: size, height: size }} // Set image size
  />
);

export default ProfileImage; 