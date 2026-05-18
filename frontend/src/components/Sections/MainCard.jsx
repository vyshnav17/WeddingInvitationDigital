import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center">
      <p className="font-serif text-xs md:text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">Countdown to Wedding</p>
      <div className="flex gap-2 md:gap-8 justify-center">
        {Object.keys(timeLeft).map((interval) => (
          <div key={interval} className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-blush-light rounded-xl md:rounded-2xl flex items-center justify-center border border-blush shadow-inner">
              <span className="font-serif text-xl md:text-3xl text-gray-700">
                {timeLeft[interval].toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-[9px] md:text-xs tracking-widest uppercase mt-1.5 md:mt-2 text-gray-400">
              {interval}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MainCard = () => {
  const weddingDate = '2026-06-21T09:35:00'; // June 21, 2026 9:35 AM
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 md:px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-14 text-center overflow-hidden relative"
      >
        {/* Subtle background pattern/gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-light/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="relative z-10">
          <p className="font-serif text-xs md:text-sm tracking-[0.2em] text-gray-400 uppercase mb-8">
            Exclusive Invitation For<br />
            <span className="text-gray-600 block mt-2 text-base">Our Cherished Guests</span>
          </p>

          <p className="font-serif text-[10px] md:text-xs tracking-[0.2em] text-gold-dark uppercase mb-10">
            Together with their families
          </p>

          {/* Couple Names */}
          <div className="flex flex-col items-center justify-center space-y-2 mb-4">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800">Abhishek</h2>
            <span className="font-script text-2xl md:text-3xl text-gold-dark my-1">and</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800">Aishwarya</h2>
          </div>

          <p className="font-serif text-xs md:text-sm tracking-widest text-gray-400 uppercase mt-12 mb-6">
            Request the honor of your presence
          </p>

          {/* Date & Time Container */}
          <div className="mx-auto max-w-md border border-gray-200 rounded-2xl flex divide-x divide-gray-200 mb-8 overflow-hidden bg-white/50">
            <div className="flex-1 py-4 flex flex-col justify-center items-center">
              <span className="font-serif text-sm text-gray-500 uppercase tracking-widest">June</span>
              <span className="font-sans text-xs text-gray-400">2026, Sunday</span>
            </div>

            <div className="flex-1 py-4 flex flex-col justify-center items-center bg-gray-50/50">
              <span className="font-sans font-bold text-4xl md:text-5xl text-emerald-800/80">21</span>
            </div>

            <div className="flex-1 py-4 flex flex-col justify-center items-center">
              <span className="font-serif text-sm text-gray-500 uppercase tracking-widest">09:35</span>
              <span className="font-sans text-[10px] md:text-xs text-gray-400">Muhurtham AM</span>
            </div>
          </div>

          {/* Wedding Callout */}
          <div className="flex items-center justify-center gap-4 mb-8 text-gray-400">
            <div className="h-px bg-gray-200 w-12"></div>
            <span className="font-serif text-xs tracking-widest uppercase">Wedding 11:00 AM</span>
            <div className="h-px bg-gray-200 w-12"></div>
          </div>

          {/* Venue Block */}
          <div className="mb-10 space-y-1">
            <button 
              onClick={() => setShowMapModal(true)}
              className="inline-block hover:opacity-80 transition-opacity focus:outline-none"
            >
              <h3 className="font-serif text-xl md:text-2xl text-gray-700 tracking-wider hover:text-gold transition-colors cursor-pointer flex items-center justify-center gap-2">
                Milan Convention Centre
                <svg className="w-5 h-5 text-gold animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </h3>
            </button>
            <p className="font-sans text-sm text-gray-500 font-light flex items-center justify-center gap-1">
              Keezhillam
            </p>
            <p className="font-sans text-xs mt-2 text-gray-400">Wedding: Kuzhuppilly Kavu Bhagavathi Temple,perumbavoor</p>
          </div>

          {/* Countdown Block */}
          <CountdownTimer targetDate={weddingDate} />

        </div>
      </motion.div>

      {/* Map Modal */}
      <AnimatePresence>
        {showMapModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMapModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-2 rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setShowMapModal(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow backdrop-blur transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <div className="w-full h-[60vh] md:h-[70vh] rounded-xl overflow-hidden border border-gray-100 mt-12 md:mt-0">
                <iframe 
                  src="https://maps.google.com/maps?q=Milan%20Convention%20Centre,%20Keezhillam&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wedding Venue Map"
                  className="w-full h-full"
                ></iframe>
              </div>
              
              <div className="p-4 text-center">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Milan+Convention+Center,+3G88%2BCRC,+Kerala+683541" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-white rounded-full uppercase tracking-widest text-sm font-medium hover:bg-gold-dark transition-colors shadow-lg hover:shadow-gold/40"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Get Directions in App
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default MainCard;
