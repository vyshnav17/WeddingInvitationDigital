import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Map } from 'lucide-react';

const Events = () => {
  const events = [
    {
      title: "Wedding Date",
      detail: "June 21, 2026 (Sunday)",
      icon: <Calendar className="w-6 h-6" />,
      align: "left"
    },
    {
      title: "Muhurtham",
      detail: "9:35 AM to 10:35 AM",
      icon: <Clock className="w-6 h-6" />,
      align: "right"
    },
    {
      title: "Temple",
      detail: "Kuzhuppilly Kavu Bhagavathi Temple",
      icon: <Map className="w-6 h-6" />,
      align: "left"
    },
    {
      title: "Reception Venue",
      detail: "Milan Convention Centre, Keezhillam (11:00 AM)",
      icon: <MapPin className="w-6 h-6" />,
      align: "right"
    }
  ];

  return (
    <section className="min-h-screen py-24 px-6 relative flex flex-col items-center">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-script text-5xl md:text-7xl text-gold-dark mb-16 text-center"
      >
        Event Details
      </motion.h2>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Central Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-gold-light via-gold to-gold-light opacity-50 hidden md:block"></div>

        <div className="space-y-12 md:space-y-24">
          {events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: event.align === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`flex flex-col md:flex-row items-center w-full ${event.align === 'left' ? 'md:justify-start' : 'md:justify-end'}`}
            >
              <div className={`w-full md:w-5/12 glass p-6 md:p-8 rounded-2xl relative ${event.align === 'left' ? 'md:text-right' : 'md:text-left'} text-center md:text-auto`}>
                
                {/* Desktop Connector Dot */}
                <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] ${event.align === 'left' ? '-right-[calc(16.66%+1.25rem)]' : '-left-[calc(16.66%+1.25rem)]'}`}></div>

                <div className={`flex items-center justify-center md:justify-start gap-4 mb-4 ${event.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-blush rounded-full text-gold-dark">
                    {event.icon}
                  </div>
                  <h4 className="font-serif text-2xl text-gray-800">{event.title}</h4>
                </div>
                <p className="font-sans text-gray-600 font-light text-lg">{event.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
