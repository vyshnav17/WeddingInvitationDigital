import React from 'react';
import { motion } from 'framer-motion';

const Couple = () => {
  return (
    <section className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush-light/50 to-cream opacity-50 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-4xl mx-auto text-center z-10 glass px-4 py-16 md:p-24 rounded-[3rem] shadow-2xl relative"
      >
        {/* Decorative corner accents could go here */}
        
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-script text-6xl md:text-8xl lg:text-9xl text-gold-dark text-glow mb-2"
        >
          Abhishek
        </motion.h2>
        
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-serif text-3xl md:text-5xl text-gray-400 my-4 italic"
        >
          &
        </motion.div>
        
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-script text-6xl md:text-8xl lg:text-9xl text-gold-dark text-glow mt-2"
        >
          Aishwarya
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 font-serif text-lg md:text-2xl text-gray-600 tracking-wide"
        >
          Are getting married
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Couple;
