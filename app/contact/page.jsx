'use client';

import { useState } from 'react';
import Link from 'next/link';

const serviceOptions = [
  'Cybersecurity & Identity Protection',
  'ICT Infrastructure',
  'Data & Intelligence',
  'Web Development & Digital Brand',
  'Fractional / Consulting CTO',
  'Tech Classes / Mentorship',
  'General enquiry',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: 'Nigeria',
    service: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const validate = (name, value) => {
    if (!value.trim()) return 'This field is required.';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ['name', 'email', 'service', 'message'];
    const newErrors = {};
    required.forEach((f) => {
      const err = validate(f, form[f]);
      if (err) newErrors[f] = err;
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xpzgwqjq';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', city: '', country: 'Nigeria', service: '', budget: '', message: '' });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0a1a]">
      {/* HEADER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-4">Contact</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-2xl leading-tight">
            Start a conversation.<br />
            <span className="gradient-text">We reply within 24 hours.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            The fastest path to getting a response is WhatsApp — it&apos;s how most of our Nigerian clients prefer to start. If you&apos;re reaching out for an international or enterprise engagement, the form below is ideal.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Sidebar — contact info */}
            <div className="space-y-6">
              {/* WhatsApp CTA */}
              <div className="card border border-[#25D366]/30 bg-[#25D366]/5 p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#25D366]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">WhatsApp (fastest)</h3>
                    <p className="text-gray-400 text-sm mb-3">For Nigerian clients, project discussions, quick questions.</p>
                    <a
                      href="https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp text-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      +234 816 544 3398
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card">
                <h3 className="font-display font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-400 text-sm mb-2">For formal project briefs, proposals, and international enquiries.</p>
                <a href="mailto:contact@caxietechnologies.com" className="text-brand-400 hover:underline text-sm">
                  contact@caxietechnologies.com
                </a>
              </div>

              {/* Location */}
              <div className="card">
                <h3 className="font-display font-semibold text-white mb-2">Location</h3>
                <address className="not-italic text-gray-400 text-sm space-y-1">
                  <p>Kano, Nigeria</p>
                  <p>Available for remote engagements worldwide</p>
                  <p className="text-gray-500 text-xs mt-2">Business hours: Mon–Fri 9am–5pm WAT</p>
                </address>
              </div>

              {/* Response expectation */}
              <div className="bg-brand-600/10 border border-brand-600/20 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2 text-sm">What to expect</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    WhatsApp: usually within hours
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Contact form: within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Proposal: 48–72 hours after discovery call
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div className="card">
                <h3 className="font-display font-semibold text-white mb-3 text-sm">Follow Xavier</h3>
                <div className="space-y-2">
                  <a href="https://x.com/iamxavi_too" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                    @iamxavi_too on X
                  </a>
                  <a href="https://www.instagram.com/iamxavi_too/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                    @iamxavi_too on Instagram
                  </a>
                  <a href="https://www.linkedin.com/in/charles-xavier-ekechukwuemeka-01185a1a5/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="card border border-white/10 p-8">
                <h2 className="font-display font-bold text-xl text-white mb-6">Send a project brief</h2>

                {status === 'success' && (
                  <div className="bg-green-500/15 border border-green-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-green-300 font-semibold">Message sent successfully!</p>
                      <p className="text-green-400/70 text-sm mt-1">We&apos;ll get back to you within 24 hours. Expect a WhatsApp follow-up if you included your number.</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-500/15 border border-red-500/30 rounded-xl p-4 mb-6">
                    <p className="text-red-300 text-sm">Something went wrong. Please try WhatsApp or email directly.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="form-label">Full name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">Email address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="form-label">Phone / WhatsApp</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+234 ..."
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="form-label">Country</label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={form.country}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Nigeria"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="service" className="form-label">Service of interest *</label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`form-input ${errors.service ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                    </div>
                    <div>
                      <label htmlFor="budget" className="form-label">Approximate budget (optional)</label>
                      <input
                        id="budget"
                        name="budget"
                        type="text"
                        value={form.budget}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g. ₦500,000 or $2,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">Tell us about your project *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={`form-input resize-none ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Describe your business challenge, what you need, timeline, and any other relevant context..."
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Project Brief'
                      )}
                    </button>
                    <a
                      href="https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27d%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp flex-shrink-0"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      WhatsApp instead
                    </a>
                  </div>

                  <p className="text-gray-500 text-xs">
                    By submitting this form you agree to our{' '}
                    <Link href="/privacy" className="text-brand-400 hover:underline">Privacy Policy</Link>.
                    Your data will be used only to respond to your enquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
