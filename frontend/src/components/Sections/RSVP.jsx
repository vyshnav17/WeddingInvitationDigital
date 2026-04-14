import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 1,
    attending: 'Yes',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Sending to backend port 5000
      const res = await fetch('http://localhost:5000/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  return (
    <section className="min-h-screen py-24 px-6 flex items-center justify-center relative bg-gradient-to-t from-blush-light via-cream to-cream">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl glass p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
      >
        <h2 className="font-script text-5xl md:text-6xl text-gold-dark mb-8 text-center">RSVP</h2>
        
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="font-serif text-3xl text-gray-800 mb-4">Thank You!</h3>
            <p className="font-sans text-gray-600">Your RSVP has been received successfully.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-sans text-sm tracking-widest uppercase text-gray-500 mb-2">Full Name</label>
              <input 
                required 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full bg-white/50 border border-gold/30 rounded-lg px-4 py-3 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 font-sans"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-sm tracking-widest uppercase text-gray-500 mb-2">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-gold/30 rounded-lg px-4 py-3 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 font-sans"
                />
              </div>
              
              <div>
                <label className="block font-sans text-sm tracking-widest uppercase text-gray-500 mb-2">Number of Guests</label>
                <input 
                  required 
                  type="number" 
                  min="1"
                  name="guests" 
                  value={formData.guests} 
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-gold/30 rounded-lg px-4 py-3 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm tracking-widest uppercase text-gray-500 mb-2">Will you be attending?</label>
              <select 
                name="attending" 
                value={formData.attending} 
                onChange={handleChange}
                className="w-full bg-white/50 border border-gold/30 rounded-lg px-4 py-3 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 font-sans"
              >
                <option value="Yes">Yes, gladly accept</option>
                <option value="No">No, regretfully decline</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-sm tracking-widest uppercase text-gray-500 mb-2">Message for the couple (Optional)</label>
              <textarea 
                name="message" 
                rows="3"
                value={formData.message} 
                onChange={handleChange}
                className="w-full bg-white/50 border border-gold/30 rounded-lg px-4 py-3 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 font-sans resize-none"
              ></textarea>
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-white font-serif text-lg tracking-wider uppercase py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {status === 'submitting' ? 'Submitting...' : 'Send RSVP'}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default RSVP;
