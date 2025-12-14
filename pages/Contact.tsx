import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { dataService } from '../services/dataService';
import FadeIn from '../components/FadeIn';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await dataService.sendMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-cream-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-900 mb-6">Get in Touch</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We would love to hear from you. Whether you have a prayer request, a question, or just want to say hello.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Side */}
          <FadeIn>
            <div className="bg-brand-900 rounded-2xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
              
              <h2 className="text-3xl font-serif mb-10 relative z-10">Contact Information</h2>
              <div className="space-y-10 relative z-10">
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-gold-500 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-6">
                    <h3 className="font-medium text-lg text-gold-500 mb-1">Visit Us</h3>
                    <p className="text-white/70 leading-relaxed">123 Grace Avenue<br />Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-gold-500 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-6">
                    <h3 className="font-medium text-lg text-gold-500 mb-1">Call Us</h3>
                    <p className="text-white/70">+234 800 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-gold-500 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-6">
                    <h3 className="font-medium text-lg text-gold-500 mb-1">Email Us</h3>
                    <p className="text-white/70">hello@gracechapel.com</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form Side */}
          <FadeIn delay={200}>
            <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-serif text-brand-900 mb-8">Send a Message</h2>
              {status === 'success' ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center">
                  <p className="font-medium text-lg">Message Sent!</p>
                  <p className="mt-2">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-gold-500 outline-none transition-colors bg-transparent text-lg placeholder-gray-300"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-gold-500 outline-none transition-colors bg-transparent text-lg placeholder-gray-300"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Message</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 outline-none transition"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-brand-900 text-white font-medium py-4 px-6 rounded-lg hover:bg-brand-800 transition-all flex items-center justify-center disabled:opacity-70 mt-4"
                  >
                    {status === 'submitting' ? 'Sending...' : (
                      <>Send Message <Send className="ml-2 w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Contact;