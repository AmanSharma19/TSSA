import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { quote: "The coaching at TSSA transformed my amateur skills into competition-ready precision. Elite in every way.", author: "James Peterson" },
  { quote: "State-of-the-art facilities and coaches who genuinely care about every single detail of your form.", author: "Sarah Jenkins" },
  { quote: "I've trained all over the world, but the discipline instilled here is unmatched. TSSA is top tier.", author: "Michael Chang" }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-bg" style={{ top: '50%', right: '20%', transform: 'translate(0, -50%)', background: 'rgba(201, 168, 76, 0.1)' }}></div>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>Student <span className="text-gold">Testimonials</span></h2>
        
        <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '800px', margin: '0 auto' }}
            >
              <p style={{ fontSize: '1.5rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--text-primary)' }}>
                "{testimonials[index].quote}"
              </p>
              <h4 className="text-gold" style={{ fontSize: '1.2rem' }}>— {testimonials[index].author}</h4>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
