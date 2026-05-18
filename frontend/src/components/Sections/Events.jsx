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
      detail: "Kuzhuppilly Kavu Bhagavathi Temple,perumbavoor",
      icon: <Map className="w-6 h-6" />,
      align: "left"
    },
    {
      title: "Wedding Venue",
      detail: (
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=Milan+Convention+Center,+3G88%2BCRC,+Kerala+683541" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors cursor-pointer underline decoration-gold/30 hover:decoration-gold underline-offset-4"
        >
          Milan Convention Centre, Keezhillam (11:00 AM)
        </a>
      ),
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

      {/* Interactive Map Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full max-w-5xl mx-auto mt-24 glass p-4 md:p-6 rounded-3xl relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-light via-gold to-gold-light"></div>
        <h3 className="font-serif text-3xl text-center text-gray-800 mb-6 mt-2">Navigate to the Venue</h3>
        <div className="w-full aspect-square md:aspect-[21/9] rounded-2xl overflow-hidden shadow-inner border border-white/40">
          <iframe 
            src="https://maps.google.com/maps?q=Milan%20Convention%20Centre,%20Keezhillam&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Map"
            className="w-full h-full grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>
        <div className="text-center mt-6 mb-2">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Milan+Convention+Center,+3G88%2BCRC,+Kerala+683541" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-white rounded-full uppercase tracking-widest text-sm font-medium hover:bg-gold-dark transition-all shadow-lg hover:shadow-gold/40 hover:-translate-y-1"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default Events;
