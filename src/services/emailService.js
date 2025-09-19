// emailService.js - Contact form email service
// Uses a simple, reliable method that works immediately

// Store form submissions locally for now (you can check browser console)
const storeSubmission = (formData) => {
  const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
  submissions.push({
    ...formData,
    timestamp: new Date().toISOString(),
    id: Date.now()
  });
  localStorage.setItem('contact_submissions', JSON.stringify(submissions));
  console.log('Form submission stored locally:', formData);
  console.log('All submissions:', submissions);
};

// Send email using a working method
export const sendEmail = async (formData) => {
  try {
    console.log('Processing contact form submission:', formData);
    
    // Store the submission locally for debugging
    storeSubmission(formData);
    
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
This message was sent from your portfolio website at ${new Date().toLocaleString()}.
    `);
    
    // Create mailto link
    const mailtoLink = `mailto:johneme2022@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    // Also copy to clipboard as backup
    try {
      await navigator.clipboard.writeText(`
Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Location: ${formData.city}, ${formData.country}
Subject: ${formData.subject}
Message: ${formData.message}
Timestamp: ${new Date().toLocaleString()}
      `);
      console.log('Message details copied to clipboard');
    } catch (clipboardError) {
      console.log('Clipboard not available, but email client should open');
    }
    
    // Show success message
    return {
      success: true,
      message: 'Email client opened! The message details have been copied to your clipboard as backup. Please send the email manually.',
      method: 'mailto',
      fallback: true
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