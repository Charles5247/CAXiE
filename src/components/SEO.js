// SEO.js - SEO optimization component
// Provides dynamic meta tags and structured data

import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = "Charles Xavier - Full Stack Developer | Network Engineer | Data Analyst | Photographer",
  description = "Professional portfolio of Charles Xavier Ekechukwuemeka - Full Stack Developer, Network & Systems Engineer, Project Manager, Data Analyst, and Creative Photographer. Based in Abuja, Nigeria.",
  keywords = "Charles Xavier, Full Stack Developer, Web Developer, Network Engineer, Data Analyst, Photographer, React, JavaScript, Node.js, Python, Abuja, Nigeria, Portfolio, Software Engineer",
  image = "/preview.png",
  url = "https://charles5247.github.io/CAXiE/",
  type = "website",
  structuredData = null
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CAXiE Technologies",
    "alternateName": "CAXIE Tech",
    "url": url,
    "image": image,
    "description": description,
    "jobTitle": ["IT Consultancy", "Network Engineering", "Web Development", "Data Analysis", "Media Tech"],
    "worksFor": {
      "@type": "Organization",
      "name": "CAXiE Technologies"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abuja",
      "addressCountry": "Nigeria"
    },
    "email": "johneme2022@gmail.com",
    "telephone": "+234-901-492-1243",
    "sameAs": [
      "https://github.com/Charles5247",
      "https://www.linkedin.com/in/charles-xavier-ekechukwuemeka-01185a1a5/",
      "https://www.instagram.com/iamxavi_too/"
    ],
    "knowsAbout": [
      "Web Development",
      "IT Consultancy",
      "Network Engineering",
      "Data Analysis",
      "Media Tech",
      "React",
      "JavaScript",
      "Node.js",
      "Python",
      "Database Management"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Charles Xavier Ekechukwuemeka" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="CAXiE Technologies" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@iamxavi_too" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
