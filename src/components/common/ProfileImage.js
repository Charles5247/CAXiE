// ProfileImage.js - Reusable component for displaying a profile image
// Props:
//   src: image source path
//   alt: alt text for accessibility
//   size: diameter in pixels (default 160)

import React from 'react';

const ProfileImage = ({ src, alt, size = 160 }) => (
  <img
    src={src}
    alt={alt}
    className="rounded-xl object-cover border-4 border-purple-400 shadow-lg"
    style={{ width: size, height: size * 1.2, objectPosition: 'center top' }}
  />
);

export default ProfileImage; 