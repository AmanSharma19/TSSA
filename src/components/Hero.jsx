import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import ownerImage from '../../pic_owner.png';

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const bgGlowX1 = useTransform(springX, [-800, 800], [-40, 40]);
  const bgGlowY1 = useTransform(springY, [-800, 800], [-40, 40]);
  
  const bgGlowX2 = useTransform(springX, [-800, 800], [30, -30]);
  const bgGlowY2 = useTransform(springY, [-800, 800], [30, -30]);

  const rifleParallaxX = useTransform(springX, [-800, 800], [-85, 60]);
  const rifleParallaxY = useTransform(springY, [-800, 800], [-25, 25]);

  const textParallaxX = useTransform(springX, [-800, 800], [-10, 10]);
  const textParallaxY = useTransform(springY, [-800, 800], [-5, 5]);

  const handleMouseMove = (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const offsetX = e.clientX - width / 2;
    const offsetY = e.clientY - height / 2;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const heroBadges = [
    { label: '12 lane premium range', accent: 'gold' },
    { label: 'Live shot analytics', accent: 'blue' },
    { label: 'Olympic coaching', accent: 'gold' }
  ];

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="section" 
      style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        position: 'relative' 
      }}
    >
      <motion.div 
        className="glow-bg" 
        style={{ 
          top: '15%', 
          left: '10%', 
          background: 'rgba(201, 168, 76, 0.18)',
          x: bgGlowX1,
          y: bgGlowY1
        }}
      />
      <motion.div 
        className="glow-bg" 
        style={{ 
          bottom: '10%', 
          right: '10%', 
          background: 'rgba(0, 119, 255, 0.12)',
          x: bgGlowX2,
          y: bgGlowY2
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          x: '-50%',
          y: '-50%',
          translateX: rifleParallaxX,
          translateY: rifleParallaxY,
          zIndex: 0, 
          width: '75%', 
          pointerEvents: 'none' 
        }}
      >
        <svg viewBox="0 0 100 30" fill="var(--text-primary)" style={{ width: '100%', height: 'auto', filter: 'blur(1.5px)' }}>
          <path d="M10,15 L30,15 L35,12 L70,12 L75,14 L95,14 L95,16 L70,16 L65,20 L40,20 L35,18 L15,18 L10,22 Z" />
        </svg>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          x: textParallaxX,
          y: textParallaxY
        }}
        className="container"
      >
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            style={{ textAlign: 'left' }}
          >
            <motion.div
              className="hero-elite-chip"
              variants={itemVariants}
              initial="hidden"
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              Elite varsity marksmanship • Award-winning instruction
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              style={{ 
                fontSize: '5rem', 
                marginBottom: '15px', 
                lineHeight: 1.1,
                textShadow: '0 5px 25px rgba(0,0,0,0.6)', 
                fontWeight: 800,
                fontFamily: 'var(--font-heading)'
              }}
            >
              TARGET SPORTS <br/>
              <span className="text-gold" style={{ background: 'linear-gradient(135deg, #fff 30%, var(--accent-gold) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                SHOOTING ACADEMY
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              style={{ 
                fontSize: '1.4rem', 
                letterSpacing: '5px', 
                textTransform: 'uppercase', 
                marginBottom: '45px', 
                fontWeight: 500,
                color: 'var(--text-secondary)' 
              }}
            >
              Precision. Discipline. Excellence.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex justify-center gap-8"
              style={{ display: 'flex', justifyContent: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}
            >
              <a href="#contact" className="btn btn-primary" style={{ padding: '14px 35px' }}>Join the Academy</a>
              <a href="#virtual-range" className="btn" style={{ padding: '14px 35px' }}>Virtual Range</a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="hero-badges"
              style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}
            >
              {heroBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  className={`hero-badge ${badge.accent}`}
                  animate={{
                    y: [0, -8, 0],
                    boxShadow: [
                      '0 8px 24px rgba(0,0,0,0.24)',
                      '0 12px 30px rgba(201, 168, 76, 0.18)',
                      '0 8px 24px rgba(0,0,0,0.24)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.6,
                    ease: 'easeInOut'
                  }}
                >
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            variants={itemVariants}
          >
            <motion.div
              className="owner-spotlight"
              whileHover={{ y: -6, scale: 1.01 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', padding: '20px', borderRadius: '24px', background: 'rgba(10, 10, 10, 0.72)', border: '1px solid rgba(201, 168, 76, 0.26)', backdropFilter: 'blur(8px)', boxShadow: '0 10px 28px rgba(0,0,0,0.28)' }}
            >
              <img
                src={ownerImage}
                alt="Chaman Lal Jangra"
                className="owner-portrait"
                style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '24px', border: '2px solid rgba(201,168,76,0.72)' }}
              />
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p className="text-gold" style={{ margin: 0, fontSize: '0.66rem', letterSpacing: '1.4px', textTransform: 'uppercase' }}>Founder & Mentor</p>
                <p style={{ margin: 0, color: '#fff', fontSize: '1.18rem', fontWeight: 700 }}>Chaman Lal Jangra</p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Shaping disciplined shooters with elite coaching, tactical insight, and championship mindset.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
