import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579991475723-5e937d5778a0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584063223018-b223d6b1d428?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1563299796-b729d0af5f05?auto=format&fit=crop&w=800&q=80"
];

const Gallery = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem' }}>The <span className="text-gold">Gallery</span></h2>
          <p className="text-muted">A glimpse into the life and premium training facilities at the academy.</p>
        </div>
        
        <div className="grid grid-cols-2" style={{ gap: '20px' }}>
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setActiveIdx(idx)}
              className="img-wrapper group"
              style={{ height: '350px', cursor: 'pointer', position: 'relative' }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={img} alt={`Gallery ${idx}`} className="cinematic-img" />
              {/* Modern hover overlay to invite clicking */}
              <div 
                className="flex items-center justify-center"
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  background: 'rgba(201, 168, 76, 0.25)', 
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(3px)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <div style={{ padding: '12px 24px', background: '#0a0a0a', border: '1px solid var(--accent-gold)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>
                  Enlarge Target
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX POPUP CAROUSEL */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100vw', 
              height: '100vh', 
              background: 'rgba(5, 5, 5, 0.92)', 
              zIndex: 1000, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveIdx(null)}
              style={{ 
                position: 'absolute', 
                top: '40px', 
                right: '40px', 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: '#fff', 
                padding: '12px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-gold)';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = '#fff';
              }}
            >
              <X size={24} />
            </button>

            {/* Left Nav Arrow */}
            <button 
              onClick={handlePrev}
              style={{ 
                position: 'absolute', 
                left: '40px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.08)', 
                color: '#fff', 
                padding: '18px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <ArrowLeft size={24} />
            </button>

            {/* Central Animated Image Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()} // prevent modal close on image click
              style={{ 
                width: '80%', 
                maxWidth: '900px', 
                height: '70%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeIdx}
                  src={images[activeIdx]} 
                  alt="Enlarged gallery visual" 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </AnimatePresence>

              {/* Stats/Position Indicator overlay */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Frame {activeIdx + 1} / {images.length}
              </div>
            </motion.div>

            {/* Right Nav Arrow */}
            <button 
              onClick={handleNext}
              style={{ 
                position: 'absolute', 
                right: '40px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.08)', 
                color: '#fff', 
                padding: '18px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <ArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
