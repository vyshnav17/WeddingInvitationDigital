import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center z-10 p-8 glass rounded-3xl max-w-xl w-full mx-auto"
      >
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="font-serif text-sm md:text-lg tracking-[0.2em] text-gray-500 uppercase mb-8"
        >
          Together with their families
        </motion.p>
        
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-gradient mb-6 py-2"
        >
          We Invite You
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="font-sans font-light text-gray-600 text-lg md:text-xl"
        >
          To celebrate the beginning of our forever.
        </motion.p>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 sm:mt-24 text-gold/70"
        >
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <br/>
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
