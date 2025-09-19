// Contact.js - Contact section with a form
// Allows users to send a message or inquiry

import React, { useState } from 'react';
import { sendEmail } from '../services/emailService';

const initialForm = {
  name: '',
  city: '',
  country: '',
  email: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validation
  const validate = (field, value) => {
    let error = '';
    if (!value.trim()) {
      error = 'This field is required.';
    } else if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Please enter a valid email address.';
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setSuccess(false);
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validate all fields
    const newErrors = {
      name: validate('name', form.name),
      city: validate('city', form.city),
      country: validate('country', form.country),
      email: validate('email', form.email),
      subject: validate('subject', form.subject),
      message: validate('message', form.message),
    };
    
    if (Object.values(newErrors).some(Boolean)) return;
    
    // Set loading state
    setLoading(true);
    
    try {
      // Send email using the updated service
      const result = await sendEmail(form);
      
      if (result.success) {
        setSuccess(true);
        setSuccessMessage(result.message);
        setForm(initialForm);
        setErrors({});
        
        // Clear success message after 6 seconds
        setTimeout(() => {
          setSuccess(false);
          setSuccessMessage('');
        }, 6000);
      } else {
        setErrorMessage(result.message || 'Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="py-8 px-2 sm:px-4 font-sans flex justify-center w-full bg-gradient-to-b from-purple-800 via-purple-900 to-black"
      >
        <div
          className="w-full max-w-2xl md:w-[70%] mx-auto rounded-3xl shadow-2xl flex flex-col md:flex-row items-stretch bg-white font-sans p-0 md:p-0 overflow-hidden"
        >
          {/* Left: Contact Info */}
          <div className="flex-1 flex flex-col justify-between p-3 md:p-4 text-gray-800 min-w-[180px] sm:min-w-[260px] bg-white font-sans rounded-none md:rounded-l-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4 tracking-tight leading-tight">Get in touch</h3>
            <p className="text-gray-500 text-base sm:text-xl font-normal mb-8 leading-snug">Thank you for looking me up today, trust I could be of help. For more info use any of the links below to connect with me.</p>
            <div className="flex flex-col gap-4 text-xl mb-8">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-700">
                  {/* Location icon */}
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"/></svg>
                </span>
                <div>
                  <div className="font-semibold text-gray-900 text-xl leading-tight">Location</div>
                  <div className="text-gray-600 text-lg leading-tight">Abuja, Nigeria</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-700">
                  {/* Email icon */}
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0-4V8" /></svg>
                </span>
                <div>
                  <div className="font-semibold text-gray-900 text-xl leading-tight">Email</div>
                  <a href="mailto:johneme2022@gmail.com" className="text-gray-600 text-lg hover:text-purple-700 transition leading-tight" target="_blank" rel="noopener noreferrer">johneme2022@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-700">
                  {/* Phone icon */}
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                </span>
                <div>
                  <div className="font-semibold text-gray-900 text-xl leading-tight">Phone</div>
                  <div className="text-gray-600 text-lg leading-tight">+234 901 492 1243</div>
                </div>
              </div>
            </div>
            <div>
              <span className="block font-semibold text-purple-700 text-xl mb-4">Follow my social media</span>
              <div className="flex gap-4 mt-1">
                <a href="https://www.instagram.com/iamxavi_too/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-700 text-white text-2xl hover:bg-purple-800 transition">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/charles-xavier-ekechukwuemeka-01185a1a5/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-700 text-white text-2xl hover:bg-purple-800 transition">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-700 text-white text-2xl hover:bg-purple-800 transition">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6.1v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 010 19.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" /></svg>
                </a>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-700 text-white text-2xl hover:bg-purple-800 transition">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
                </a>
              </div>
            </div>
          </div>
          {/* Divider for desktop */}
          <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>
          {/* Right: Contact Form */}
          <div className="flex-[1.2] flex flex-col justify-between p-3 md:p-4 bg-white/90">
            <h3 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">Send me a message</h3>
            {success && (
              <div className="max-w-xl mx-auto mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow text-center">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="max-w-xl mx-auto mb-4 p-4 bg-red-100 text-red-800 rounded-lg shadow text-center">{errorMessage}</div>
            )}
            <form 
              onSubmit={handleSubmit} 
              className="w-full flex flex-col gap-5 transition-transform duration-300 text-gray-800"
            >
              
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-200'} bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 active:border-purple-700 shadow-sm transition text-base`}
                value={form.name}
                onChange={handleChange}
                onBlur={handleChange}
                required
              />
              {errors.name && <span className="text-red-500 text-xs -mt-4 mb-2">{errors.name}</span>}
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-400' : 'border-gray-200'} bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 active:border-purple-700 shadow-sm transition text-base`}
                  value={form.city}
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.country ? 'border-red-400' : 'border-gray-200'} bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 active:border-purple-700 shadow-sm transition text-base`}
                  value={form.country}
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                />
              </div>
              <div className="flex flex-row gap-4 w-full">
                {errors.city && <span className="text-red-500 text-xs -mt-4 mb-2 w-full">{errors.city}</span>}
                {errors.country && <span className="text-red-500 text-xs -mt-4 mb-2 w-full">{errors.country}</span>}
              </div>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 active:border-purple-700 shadow-sm transition text-base`}
                value={form.email}
                onChange={handleChange}
                onBlur={handleChange}
                required
              />
              {errors.email && <span className="text-red-500 text-xs -mt-4 mb-2">{errors.email}</span>}
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-400' : 'border-gray-200'} bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 active:border-purple-700 shadow-sm transition text-base`}
                value={form.subject}
                onChange={handleChange}
                onBlur={handleChange}
                required
              />
              {errors.subject && <span className="text-red-500 text-xs -mt-4 mb-2">{errors.subject}</span>}
              <textarea
                name="message"
                placeholder="Your Message"
                className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-400' : 'border-gray-200'} bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 active:border-purple-700 shadow-sm transition text-base min-h-[120px]`}
                rows={5}
                value={form.message}
                onChange={handleChange}
                onBlur={handleChange}
                required
              />
              {errors.message && <span className="text-red-500 text-xs -mt-4 mb-2">{errors.message}</span>}
              <button
                type="submit"
                disabled={loading}
                className={`bg-purple-700 text-white font-semibold rounded-lg px-6 py-3 shadow-lg hover:bg-purple-800 hover:scale-105 transition-transform duration-300 mt-2 w-full text-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-gray-300 py-6 flex flex-col items-center mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[70%] mx-auto px-4 gap-4">
          <div className="text-center md:text-left text-sm md:text-base font-medium">&copy; {new Date().getFullYear()} Charles Xavier. All rights reserved.</div>
          <div className="flex flex-wrap gap-4 mt-2 md:mt-0 text-sm md:text-base">
            <a href="/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">Terms of Use</a>
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">Privacy Policy</a>
            <a href="/cookies.html" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">Cookie Policy</a>
            <a href="/do-not-sell.html" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">Do Not Sell My Personal Information</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact; 