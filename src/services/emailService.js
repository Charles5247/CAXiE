// emailService.js - Contact form email service
// Uses mailto as primary method for immediate functionality

export const sendEmail = async (formData) => {
  try {
    console.log('Processing contact form submission:', formData);
    
    // Create a detailed email body
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(`
New message from your portfolio contact form:

Name: ${formData.name}
Email: ${formData.email}
Location: ${formData.city}, ${formData.country}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from your portfolio website.
    `);
    
    // Create mailto link
    const mailtoLink = `mailto:johneme2022@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    // Also copy to clipboard as backup
    try {
      await navigator.clipboard.writeText(`
Name: ${formData.name}
Email: ${formData.email}
Location: ${formData.city}, ${formData.country}
Subject: ${formData.subject}

Message: ${formData.message}
      `);
    } catch (clipboardError) {
      console.log('Clipboard not available');
    }
    
    return {
      success: true,
      message: 'Email client opened! The message details have been copied to your clipboard as backup.',
      fallback: false
    };
    
  } catch (error) {
    console.error('Email service error:', error);
    
    return {
      success: false,
      message: 'Unable to open email client. Please contact johneme2022@gmail.com directly.',
      error: error.message
    };
  }
}; 

// Legacy function for backward compatibility
export const sendEmailFallback = sendEmail; 