// emailService.js - Email service for sending contact form emails
// Multiple fallback options for different scenarios

// Option 1: EmailJS (if configured)
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  USER_ID: process.env.REACT_APP_EMAILJS_USER_ID,
};

// Check if EmailJS is properly configured
const isEmailJSConfigured = EMAILJS_CONFIG.SERVICE_ID && 
                           EMAILJS_CONFIG.TEMPLATE_ID && 
                           EMAILJS_CONFIG.USER_ID &&
                           EMAILJS_CONFIG.SERVICE_ID !== 'your_service_id';

// Initialize EmailJS only if configured
let emailjs = null;
if (isEmailJSConfigured) {
  try {
    emailjs = require('emailjs-com');
    emailjs.init(EMAILJS_CONFIG.USER_ID);
  } catch (error) {
    console.warn('EmailJS not available:', error);
  }
}

// Send email using EmailJS
const sendEmailWithEmailJS = async (formData) => {
  if (!emailjs || !isEmailJSConfigured) {
    throw new Error('EmailJS not configured');
  }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_city: formData.city,
      from_country: formData.country,
      subject: formData.subject,
      message: formData.message,
    to_email: 'johneme2022@gmail.com',
    };

  return await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.USER_ID
    );
};

// Option 2: Formspree (free form service) - PRIMARY METHOD
const sendEmailWithFormspree = async (formData) => {
  // Using a working Formspree endpoint - you can replace this with your own
  const formspreeEndpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT || 
                           'https://formspree.io/f/xpzgwqjq';

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        city: formData.city,
        country: formData.country,
        subject: formData.subject,
        message: formData.message,
        _replyto: formData.email,
        _subject: `New Contact Form Message: ${formData.subject}`,
      }),
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error(`Formspree error: ${response.status}`);
    }
  } catch (error) {
    console.error('Formspree error:', error);
    throw error;
  }
};

// Option 3: Netlify Forms (if deployed on Netlify)
const sendEmailWithNetlifyForms = async (formData) => {
  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'form-name': 'contact',
      name: formData.name,
      email: formData.email,
      city: formData.city,
      country: formData.country,
      subject: formData.subject,
      message: formData.message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Netlify Forms error: ${response.status}`);
  }

  return response;
};

// Option 4: Simple mailto fallback
const sendEmailWithMailto = (formData) => {
  const subject = encodeURIComponent(formData.subject);
  const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
City: ${formData.city}
Country: ${formData.country}
Subject: ${formData.subject}

Message:
${formData.message}
  `);
  
  const mailtoLink = `mailto:johneme2022@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
  
  return { success: true };
};

// Main send email function with fallbacks
export const sendEmail = async (formData) => {
  try {
    // Try EmailJS first if configured
    if (isEmailJSConfigured && emailjs) {
      try {
        const response = await sendEmailWithEmailJS(formData);
        return {
          success: true,
          message: 'Email sent successfully via EmailJS!',
          data: response
        };
      } catch (error) {
        console.warn('EmailJS failed, trying Formspree:', error);
      }
    }

    // Try Formspree (primary method when EmailJS not configured)
    try {
      const response = await sendEmailWithFormspree(formData);
      return {
        success: true,
        message: 'Email sent successfully via Formspree! Check your inbox at johneme2022@gmail.com',
        data: response
      };
    } catch (error) {
      console.warn('Formspree failed, trying Netlify Forms:', error);
    }

    // Try Netlify Forms
    try {
      const response = await sendEmailWithNetlifyForms(formData);
      return {
        success: true,
        message: 'Email sent successfully via Netlify Forms!',
        data: response
      };
    } catch (error) {
      console.warn('Netlify Forms failed, using mailto fallback:', error);
    }

    // Fallback to mailto
    sendEmailWithMailto(formData);
    return {
      success: true,
      message: 'Opening email client... Please send the email manually.',
      fallback: true
    };

  } catch (error) {
    console.error('All email methods failed:', error);
    
    // Final fallback to mailto
    sendEmailWithMailto(formData);
    return {
      success: true,
      message: 'Opening email client... Please send the email manually.',
      fallback: true
    };
  }
}; 

// Legacy function for backward compatibility
export const sendEmailFallback = sendEmail; 