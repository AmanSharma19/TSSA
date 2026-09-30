import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import coachAchiv1 from '../../coach_achiv1.jpg';
import coachAchiv2 from '../../coach_achiv2.jpg';
import coachAchiv3 from '../../coach_achiv3.jpg';
import shooter1 from '../../shooter1.png';
import shooter2 from '../../shooter2.png';
import shooter3 from '../../shooter3.png';
import shooter4 from '../../shooter4.png';
import shooter5 from '../../shooter5.png';
import shooter6 from '../../shooter6.png';
import shooter7 from '../../shooter7.png';

const images = [
  "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579991475723-5e937d5778a0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584063223018-b223d6b1d428?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1563299796-b729d0af5f05?auto=format&fit=crop&w=800&q=80"
];

const coachAchievementImages = [coachAchiv1, coachAchiv2, coachAchiv3];
const ourPlayersImages = [shooter1, shooter2, shooter3, shooter4, shooter5, shooter6, shooter7];

const gallerySections = [
  {
    title: "Coach's Achievements",
    description: "Milestones, recognitions, and proud moments of our coaching team.",
    images: coachAchievementImages
  },
  {
    title: "Our Players",
    description: "Celebrations, victories, and unforgettable highlights from the range.",
    images: ourPlayersImages
  },
  {
    title: "Academy Overview",
    description: "A look at our infrastructure, training environment, and academy spirit.",
    images: images.slice(2, 4)
  }
];

const Gallery = () => {
  const [activeGallery, setActiveGallery] = useState(null);
  const [playerStart, setPlayerStart] = useState(0);
  const [showAllPlayers, setShowAllPlayers] = useState(false);

  const currentImages = activeGallery ? gallerySections[activeGallery.sectionIdx].images : [];

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!activeGallery) return;

    setActiveGallery((prev) => {
      const total = gallerySections[prev.sectionIdx].images.length;
      return { ...prev, idx: prev.idx === 0 ? total - 1 : prev.idx - 1 };
    });
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (!activeGallery) return;

    setActiveGallery((prev) => {
      const total = gallerySections[prev.sectionIdx].images.length;
      return { ...prev, idx: prev.idx === total - 1 ? 0 : prev.idx + 1 };
    });
  };

  return (
    <section id="gallery" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem' }}>The <span className="text-gold">Gallery</span></h2>
          <p className="text-muted">A glimpse into the life and premium training facilities at the academy.</p>
        </div>
        
        <div style={{ display: 'grid', gap: '40px' }}>
          {gallerySections.map((section, sectionIdx) => {
            const playerOrder = section.title === 'Our Players'
              ? [
                  shooter5,
                  shooter6,
                  shooter1,
                  shooter3,
                  shooter7,
                  shooter2,
                  shooter4
                ]
              : section.images;

            const displayImages = section.title === 'Our Players'
              ? (showAllPlayers ? playerOrder : playerOrder.slice(0, 3))
              : section.images;

            return (
              <div key={sectionIdx}>
                <div style={{ marginBottom: '18px' }}>
                  <h3 className="text-gold" style={{ fontSize: '1.8rem', marginBottom: '6px' }}>{section.title}</h3>
                  <p className="text-muted" style={{ margin: 0 }}>{section.description}</p>
                </div>

                <div className={displayImages.length >= 3 ? 'grid grid-cols-3' : 'grid grid-cols-2'} style={{ gap: '20px' }}>
                  {displayImages.map((img, idx) => {
                    const actualIndex = section.title === 'Our Players' ? section.images.indexOf(img) : idx;

                    return (
                      <motion.div 
                        key={`${sectionIdx}-${actualIndex}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: (sectionIdx * 0.15) + (idx * 0.1) }}
                        onClick={() => setActiveGallery({ sectionIdx, idx: actualIndex })}
                        className="img-wrapper group"
                        style={{
                          height: '300px',
                          cursor: 'pointer',
                          position: 'relative',
                          width: '100%',
                          overflow: 'hidden',
                          transform: section.title === 'Our Players' && img === shooter6 ? 'scale(1.55)' : 'scale(1)',
                          transformOrigin: 'center center',
                          zIndex: section.title === 'Our Players' && img === shooter6 ? 6 : 1
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={img}
                          alt={section.title === "Coach's Achievements" ? `Coach Achiv ${actualIndex + 1}` : `${section.title} ${actualIndex + 1}`}
                          className="cinematic-img"
                          style={{
                            objectFit: 'cover',
                            objectPosition:
                              section.title === 'Coach\'s Achievements' && actualIndex === 1 ? 'center 12%' :
                              section.title === 'Our Players' && actualIndex < 4 ? 'center 5%' :
                              section.title === 'Our Players' ? 'center 8%' : 'center',
                            width: '100%',
                            height: '100%'
                          }}
                        />
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
                            {section.title === "Coach's Achievements" ? `Coach Achiv ${actualIndex + 1}` : 'View Gallery'}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {section.title === 'Our Players' && section.images.length > 3 && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button
                      type="button"
                      onClick={() => setShowAllPlayers((prev) => !prev)}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        border: '1px solid var(--accent-gold)',
                        background: 'rgba(201,168,76,0.12)',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {showAllPlayers ? '↑' : '↓'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX POPUP CAROUSEL */}
      <AnimatePresence>
        {activeGallery !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGallery(null)}
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
              onClick={() => setActiveGallery(null)}
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
                width: '92vw',
                maxWidth: '900px', 
                height: '78vh',
                maxHeight: '780px',
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
                  key={`${activeGallery.sectionIdx}-${activeGallery.idx}`}
                  src={currentImages[activeGallery.idx]} 
                  alt="Enlarged gallery visual" 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit:
                      activeGallery &&
                      gallerySections[activeGallery.sectionIdx].title === "Coach's Achievements" &&
                      activeGallery.idx === 2 ? 'contain' : 'cover',
                    objectPosition:
                      activeGallery &&
                      gallerySections[activeGallery.sectionIdx].title === "Coach's Achievements" &&
                      activeGallery.idx === 2 ? 'center center' : 'center 10%'
                  }}
                />
              </AnimatePresence>

              {/* Stats/Position Indicator overlay */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {gallerySections[activeGallery.sectionIdx].title} {activeGallery.idx + 1} / {currentImages.length}
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
