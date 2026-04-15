import React, { useEffect, useState, useRef } from 'react';
import Hero from '../components/Sections/Hero';
import MainCard from '../components/Sections/MainCard';
import RSVPModal from '../components/RSVPModal';
import Petals from '../components/Petals';
import MusicPlayer from '../components/MusicPlayer';
import EntranceOverlay from '../components/EntranceOverlay';
import { motion, AnimatePresence } from 'framer-motion';

const Invitation = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [rsvpIntent, setRsvpIntent] = useState('Yes'); // 'Yes' or 'No'
  const mainCardRef = useRef(null);
  
  // Auto-scroll logic happens ONLY after the user enters
  useEffect(() => {
    if (!hasEntered) return;

    const timer = setTimeout(() => {
      if (mainCardRef.current) {
        mainCardRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 4500); // Wait 4.5 seconds after opening before scrolling

    return () => clearTimeout(timer);
  }, [hasEntered]);

  const handleEnter = () => {
    setHasEntered(true);
    // Ensure we start at top when entering
    window.scrollTo(0, 0);
  };

  const handleOpenRSVP = (intent) => {
    setRsvpIntent(intent);
    setShowModal(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cream via-white to-blush-light/30 overflow-hidden">
      
      {/* Entrance Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <EntranceOverlay onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Ambient Effects */}
      <Petals />
      <MusicPlayer playing={hasEntered} />
      
      {/* Sections */}
      <main className={`relative z-10 pb-24 transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <div ref={mainCardRef}>
          <MainCard />
        </div>
      </main>

      {/* Pinned RSVP Bar */}
      {hasEntered && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed bottom-0 left-0 w-full z-40 p-4 bg-white/70 backdrop-blur-xl border-t border-gold/20 shadow-[0_-10px_30px_rgba(212,175,55,0.1)] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
        >
          <p className="font-serif text-gray-500 tracking-widest text-sm uppercase">Will you attend?</p>
          <div className="flex gap-4">
            <button 
              onClick={() => handleOpenRSVP('Yes')}
              className="px-6 py-2 bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 text-green-700 font-serif tracking-wide rounded-full hover:shadow-lg transition-all"
            >
              Yes, Gladly
            </button>
            <button 
              onClick={() => handleOpenRSVP('No')}
              className="px-6 py-2 bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 text-red-600 font-serif tracking-wide rounded-full hover:shadow-lg transition-all"
            >
              Regretfully No
            </button>
          </div>
        </motion.div>
      )}

      {/* RSVP Modal pop-up */}
      <AnimatePresence>
        {showModal && (
          <RSVPModal 
            intent={rsvpIntent} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Invitation;
