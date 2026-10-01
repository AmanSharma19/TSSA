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
        <motion.div
          className="hero-elite-chip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ margin: '0 auto 20px', display: 'inline-flex' }}
        >
          Athlete stories • performance reviews • elite results
        </motion.div>
        <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>Student <span className="text-gold">Testimonials</span></h2>
        
        <div style={{ position: 'relative', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 55, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -55, rotateY: 8 }}
              transition={{ duration: 0.55 }}
              className="glass"
              style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 36px', borderRadius: '18px' }}
            >
              <p style={{ fontSize: '1.5rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--text-primary)' }}>
                "{testimonials[index].quote}"
              </p>
              <h4 className="text-gold" style={{ fontSize: '1.2rem' }}>— {testimonials[index].author}</h4>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="testimonial-dots" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '26px' }}>
          {testimonials.map((item, i) => (
            <motion.button
              key={item.author}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className="testimonial-dot"
              animate={{
                scale: i === index ? 1.25 : 1,
                backgroundColor: i === index ? 'var(--accent-gold)' : 'rgba(255,255,255,0.24)'
              }}
              transition={{ duration: 0.25 }}
              style={{ border: 'none', width: '12px', height: '12px', borderRadius: '999px', cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
