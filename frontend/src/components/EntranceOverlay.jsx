import React from 'react';
import { motion } from 'framer-motion';

// A subtle geometric diamond repeating pattern to simulate an embossed look
const embossedPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M30 0L60 30 30 60 0 30z' stroke='%23d7cabc' stroke-width='1' stroke-opacity='0.6'/%3E%3Cpath d='M30 15L45 30 30 45 15 30z' stroke='%23ffffff' stroke-width='1.5' stroke-opacity='0.9'/%3E%3Cpath d='M30 20L40 30 30 40 20 30z' stroke='%23d7cabc' stroke-width='0.5' stroke-opacity='0.5'/%3E%3C/g%3E%3C/svg%3E")`;

const goldFoilGradient = "linear-gradient(135deg, #d4af37 0%, #ffe699 50%, #c59b27 100%)";

const EntranceOverlay = ({ onEnter }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] flex overflow-hidden bg-cream"
      variants={{
        exit: { opacity: 0, pointerEvents: 'none', transition: { duration: 0.8, delay: 1.5 } }
      }}
    >
      {/* Dark Inner Card Layer (Visible momentarily when flaps open) */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[#3a0d16] flex flex-col items-center justify-start pt-20 border-x-8 border-[#3a0d16]"
      >
        <div className="w-full max-w-lg h-full opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%236e1b2b' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
      </motion.div>

      {/* Left Flap */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-[#f4ebe1] flex flex-col justify-end overflow-hidden origin-left shadow-[10px_0_30px_rgba(0,0,0,0.3)] z-10 border-r border-[#d7cabc]/60"
        style={{ backgroundImage: embossedPattern }}
        variants={{
          exit: { x: '-100%', transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }
        }}
      >
        {/* Left Foil Decor */}
        <div className="absolute bottom-10 left-0 w-full opacity-90 pointer-events-none flex justify-end pr-2 md:pr-6">
          <svg width="180" height="80" viewBox="0 0 120 60" fill="url(#goldGradL)" className="drop-shadow-md">
            <defs>
              <linearGradient id="goldGradL" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="30%" stopColor="#fff3cd" />
                <stop offset="70%" stopColor="#c59b27" />
                <stop offset="100%" stopColor="#9a7b1c" />
              </linearGradient>
            </defs>
            {/* Organic Floral Swirl Path */}
            <path d="M120 60 C90 60 70 30 50 20 C30 10 15 25 20 40 C25 55 45 50 65 55 C50 45 40 35 45 25 C50 15 70 35 90 50 C100 55 110 60 120 60 Z" />
            <path d="M70 60 C50 60 40 45 30 35 C20 25 10 35 15 45 C20 55 35 55 50 55 Z" />
            <circle cx="25" cy="20" r="3" />
            <circle cx="45" cy="10" r="2" />
          </svg>
        </div>
      </motion.div>

      {/* Right Flap */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#f4ebe1] flex flex-col justify-end overflow-hidden origin-right shadow-[-10px_0_30px_rgba(0,0,0,0.3)] z-10"
        style={{ backgroundImage: embossedPattern }}
        variants={{
          exit: { x: '100%', transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }
        }}
      >
        {/* Right Foil Decor */}
        <div className="absolute bottom-10 right-0 w-full opacity-90 pointer-events-none flex justify-start pl-2 md:pl-6 transform -scale-x-100">
           <svg width="180" height="80" viewBox="0 0 120 60" fill="url(#goldGradR)" className="drop-shadow-md">
             <defs>
               <linearGradient id="goldGradR" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#d4af37" />
                 <stop offset="30%" stopColor="#fff3cd" />
                 <stop offset="70%" stopColor="#c59b27" />
                 <stop offset="100%" stopColor="#9a7b1c" />
               </linearGradient>
             </defs>
             <path d="M120 60 C90 60 70 30 50 20 C30 10 15 25 20 40 C25 55 45 50 65 55 C50 45 40 35 45 25 C50 15 70 35 90 50 C100 55 110 60 120 60 Z" />
             <path d="M70 60 C50 60 40 45 30 35 C20 25 10 35 15 45 C20 55 35 55 50 55 Z" />
             <circle cx="25" cy="20" r="3" />
             <circle cx="45" cy="10" r="2" />
           </svg>
        </div>
      </motion.div>

      {/* Central Emblem & Button */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
        variants={{
          exit: { opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.4 } }
        }}
      >
        <button
          onClick={onEnter}
          className="relative group transition-transform duration-500 hover:scale-105 active:scale-95 outline-none rounded-full"
        >
          {/* Gold Outer Ornate Frame glow */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#c59b27] via-[#ffe699] to-[#d4af37] opacity-60 blur-xl group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full bg-[#fcf9f2] flex flex-col items-center justify-center p-6 shadow-2xl border-[6px] border-[#d4af37] shadow-[inset_0_0_20px_rgba(212,175,55,0.3)]">
            {/* Inner Gold Border / Details */}
            <div className="absolute inset-2 md:inset-3 rounded-full border border-[#d4af37] opacity-50 pointer-events-none"></div>
            <div className="absolute inset-4 md:inset-5 rounded-full border border-dashed border-[#d4af37] opacity-40 pointer-events-none"></div>
            
            {/* Flourish Top */}
            <svg viewBox="0 0 50 15" className="w-16 h-8 mb-4 text-[#d4af37] fill-current drop-shadow-sm">
               <path d="M25 0 C25 0 20 8 10 8 C0 8 5 15 5 15 C5 15 15 12 25 15 C35 12 45 15 45 15 C45 15 50 8 40 8 C30 8 25 0 25 0 Z"/>
            </svg>

            <h1 className="font-serif text-xl md:text-2xl text-gray-800 tracking-[0.15em] text-center leading-relaxed">
              ABHISHEK<br/>
              <span className="text-base my-2 block text-gold-dark font-script opacity-80">&amp;</span>
              AISHWARYA
            </h1>

            {/* Flourish Bottom */}
            <svg viewBox="0 0 50 15" className="w-16 h-8 mt-4 text-[#d4af37] fill-current transform rotate-180 drop-shadow-sm">
               <path d="M25 0 C25 0 20 8 10 8 C0 8 5 15 5 15 C5 15 15 12 25 15 C35 12 45 15 45 15 C45 15 50 8 40 8 C30 8 25 0 25 0 Z"/>
            </svg>
          </div>
          
          <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-sm tracking-[0.2em] text-gray-700/80 uppercase font-light opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
            Tap to Open
          </p>
        </button>
      </motion.div>
      
    </motion.div>
  );
};

export default EntranceOverlay;
