import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RSVPModal = ({ intent, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: intent === 'Yes' ? 1 : 0,
    attending: intent,
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      ></motion.div>

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md glass p-8 rounded-[2rem] shadow-2xl bg-white/90"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-800 text-2xl font-light"
        >
          &times;
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${intent === 'Yes' ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-500'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="font-serif text-2xl text-gray-800 mb-2">Thank You!</h3>
            <p className="font-sans text-gray-600">
              {intent === 'Yes' ? 'We are so excited to celebrate with you!' : 'You will be missed! Thank you for letting us know.'}
            </p>
            <button 
              onClick={onClose}
              className="mt-8 px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition uppercase tracking-widest text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-script text-4xl text-gold-dark mb-2 text-center">RSVP</h2>
            <p className="text-center text-sm text-gray-500 mb-6 font-serif italic">
              {intent === 'Yes' ? "We're thrilled you can make it!" : "We're sorry you can't make it."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-gray-500 mb-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-gold/30 rounded-lg px-3 py-2 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 text-sm"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-gray-500 mb-1">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-gold/30 rounded-lg px-3 py-2 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 text-sm"
                />
              </div>

              {intent === 'Yes' && (
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-gray-500 mb-1">Number of Guests</label>
                  <input 
                    required 
                    type="number" 
                    min="1"
                    name="guests" 
                    value={formData.guests} 
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-gold/30 rounded-lg px-3 py-2 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-gray-500 mb-1">Message (Optional)</label>
                <textarea 
                  name="message" 
                  rows="2"
                  value={formData.message} 
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-gold/30 rounded-lg px-3 py-2 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition text-gray-800 text-sm resize-none"
                ></textarea>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-xs text-center">{errorMessage}</p>
              )}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full mt-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-white font-serif text-sm tracking-wider uppercase py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit RSVP'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default RSVPModal;
