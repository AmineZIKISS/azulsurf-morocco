import React, { useState } from 'react';
import api from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    subject: '',
    selected_service: 'Other',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await api.post('/contact', formData);
      setSuccess(response.data.message || 'Your message has been sent successfully.');
      setFormData({
        full_name: '',
        email: '',
        phone_number: '',
        subject: '',
        selected_service: 'Other',
        message: '',
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      const msg = err.response?.data?.message || 'Failed to submit. Please check validation requirements.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-[80px]">
      {/* Hero Section */}
      <section className="relative h-[614px] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-60" 
            alt="A serene wide-angle shot of the Mirleft coastline at sunrise" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJi1W-7iai8qC206x6FBktIrCn3U5VVaqKFZZSK0mHoDkzEYvAeKMmwju1XA3WCgH3sQzebltHNXbh3syXWWdPJHYJtHg1oJ3L4O57qfxixGL1JgV6_XZu10abip4P036hrcfwWmsrXFje1EjIqHZoDEkrW3TeWeeCUv7Nu5O8uCRrBUltRLJ_Z43Y84BFSTFSTlW71QIsD71UMYghbinEFueJ7dhVD4m7YIwcOLCjOFDXlKAkrKtXZpwVOIUaZp8_yTsiWZG-CKU"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        </div>
        <div className="relative z-10 w-full px-margin-desktop max-w-container-max mx-auto text-center md:text-left">
          <h1 className="font-display-lg text-display-lg md:text-[80px] leading-tight text-primary mb-6">
            Contact Us
          </h1>
          <p className="font-headline-md text-headline-md text-on-surface-variant max-w-2xl">
            We're here to help you find your rhythm on the waves. Reach out to plan your escape.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-section-padding px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-10 md:p-12 rounded-xl shadow-[0_4px_30px_rgba(0,95,115,0.03)]">
            {success && (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 px-4 py-3 rounded-lg text-sm mb-6">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2 uppercase tracking-wide">Name</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md transition-all placeholder:text-outline-variant focus:border-primary-container" 
                    placeholder="Your Full Name" 
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="relative">
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2 uppercase tracking-wide">Email</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md transition-all placeholder:text-outline-variant focus:border-primary-container" 
                    placeholder="Email Address" 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2 uppercase tracking-wide">Subject</label>
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md transition-all placeholder:text-outline-variant focus:border-primary-container" 
                  placeholder="What is your inquiry about?" 
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2 uppercase tracking-wide">Message</label>
                <textarea 
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md transition-all placeholder:text-outline-variant focus:border-primary-container resize-none" 
                  placeholder="How can we help you?" 
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                ></textarea>
              </div>
              <div className="pt-4">
                <button 
                  className="bg-[#E76F51] text-white px-10 py-4 rounded-lg font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all hover:translate-y-[-2px] shadow-lg shadow-[#E76F51]/20 cursor-pointer disabled:bg-slate-450" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 lg:pl-12 space-y-12">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-fixed text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-2">Address</h4>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    Mirleft Coast Road, BP 12, Tiznit, Morocco
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-fixed text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-2">Email</h4>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    hello@azulsurfmirleft.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-fixed text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-2">Phone</h4>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    +212 (0) 528 123 456
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <a className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-full text-on-surface-variant hover:border-primary hover:text-primary transition-all" href="#">
                  <span className="material-symbols-outlined">brand_family</span>
                </a>
                <a className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-full text-on-surface-variant hover:border-primary hover:text-primary transition-all" href="#">
                  <span className="material-symbols-outlined">chat</span>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden shadow-sm group">
              <div className="relative h-[300px]">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="A minimalist, high-end map render of the Mirleft coastal region in Morocco" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnUXUSGPFvETVdqXRjnR1sEhLfV4k7aoYJr4RK6fUGuuFaScqVjM4PeZ1u5cAgw37gWMWPMB7Mt7w4fBpEuR-_qZ0fkJKdUHvrSHFuvZ2NnnlEejV-w2T-Um-aSioAYecLQN_uFYLQ4uULnToRVkQND_YSzHvY_D54pUQgPYan0GbxGmpHhHzFbvc2ZnCFlvt3S6ffuEGlxfO9JnO6l19ECHTx1KR7PQ974aEY2afCvK2XMUe4fmUQkUr2VApGKJxfXoXRMsNk7YI"
                />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-primary font-label-md text-label-md">
                  Mirleft, Morocco
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
