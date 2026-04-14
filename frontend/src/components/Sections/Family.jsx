import React from 'react';
import { motion } from 'framer-motion';

const Family = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center relative">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 justify-center"
      >
        {/* Groom Family */}
        <motion.div variants={itemVariants} className="flex-1 glass p-8 md:p-12 rounded-3xl text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-gold-dark mb-6 border-b border-gold/20 pb-4">
            Groom
          </h3>
          <p className="font-sans text-gray-600 mb-2 font-light">Son of</p>
          <p className="font-serif text-xl text-gray-800 mb-6">Gopan & Vrinda</p>
          
          <div className="space-y-4 text-sm md:text-base text-gray-500 font-light">
            <p className="font-medium text-gray-700">Sreenandhanam House,</p>
            <p>Vattakattupady</p>
            <div className="mt-6 pt-6 border-t border-gray-200/50">
              <p className="text-xs italic mb-1">Grandson of</p>
              <p className="mb-1">Late Gopinathan Kartha & Thankam</p>
              <p>and Late Gopalan & Jaya</p>
            </div>
          </div>
        </motion.div>

        {/* Divider for Desktop */}
        <div className="hidden md:flex flex-col justify-center items-center px-4">
          <div className="h-24 w-px bg-gradient-to-b from-transparent via-gold to-transparent"></div>
          <div className="my-4 font-script text-3xl text-gold/60">&</div>
          <div className="h-24 w-px bg-gradient-to-b from-transparent via-gold to-transparent"></div>
        </div>

        {/* Bride Family */}
        <motion.div variants={itemVariants} className="flex-1 glass p-8 md:p-12 rounded-3xl text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-gold-dark mb-6 border-b border-gold/20 pb-4">
            Bride
          </h3>
          <p className="font-sans text-gray-600 mb-2 font-light">Daughter of</p>
          <p className="font-serif text-xl text-gray-800 mb-6">Umesh & Sahana</p>
          
          <div className="space-y-4 text-sm md:text-base text-gray-500 font-light">
            <p className="font-medium text-gray-700">Kallaja House,</p>
            <p>Keezhillam</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Family;
