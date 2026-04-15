import React from 'react';
import { motion } from 'framer-motion';

const EntranceOverlay = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfaf5]"
    >
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}></div>

      <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center p-8">
        {/* Envelope Base */}
        <div className="absolute inset-0 bg-white shadow-2xl rounded-sm border border-gold/10"></div>
        
        {/* Decorative Borders */}
        <div className="absolute inset-4 border border-gold/20 rounded-sm pointer-events-none"></div>

        {/* Content Inside "Envelope" */}
        <div className="text-center z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="font-serif text-sm tracking-[0.3em] text-gold-dark uppercase mb-2">The Invitation of</h2>
            <h1 className="font-script text-5xl md:text-6xl text-gray-800">Abhishek & Aishwarya</h1>
          </motion.div>

          {/* Wax Seal Button */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
            className="flex flex-col items-center gap-4"
          >
            <button
              onClick={onEnter}
              className="relative group transition-transform hover:scale-105 active:scale-95"
            >
              {/* Wax Seal SVG */}
              <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
                <circle cx="50" cy="50" r="45" fill="#a31d1d" className="group-hover:fill-[#b52424]" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <path 
                  d="M50 25 L55 45 L75 45 L60 55 L65 75 L50 65 L35 75 L40 55 L25 45 L45 45 Z" 
                  fill="white" 
                  opacity="0.8"
                />
                <circle cx="50" cy="50" r="45" fill="url(#shine)" opacity="0.4" />
                <defs>
                  <radialGradient id="shine" cx="30%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xs tracking-widest text-gold-dark uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Open Invitation
              </span>
            </button>
            <p className="font-serif text-[10px] tracking-widest text-gray-400 uppercase mt-4 animate-pulse">
              Tap the seal to open
            </p>
          </motion.div>
        </div>

        {/* Floating Petals for the overlay too */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {/* We can add a few localized petals here if we want */}
        </div>
      </div>
    </motion.div>
  );
};

export default EntranceOverlay;
