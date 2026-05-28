import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'programs', 'virtual-range', 'team', 'gallery', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'virtual-range', label: 'Range' },
    { id: 'team', label: 'Team' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav 
      animate={{ 
        padding: isScrolled ? '12px 0' : '22px 0',
        backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(10, 10, 10, 0.3)',
        borderBottomColor: isScrolled ? 'rgba(201, 168, 76, 0.2)' : 'rgba(255, 255, 255, 0.03)'
      }}
      transition={{ duration: 0.3 }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 100, 
        borderBottom: '1px solid',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <div className="container flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px', textShadow: '0 0 10px rgba(201, 168, 76, 0.1)' }}
        >
          TARGET SPORTS <span className="text-gold">SHOOTING</span>
        </motion.div>
        
        <div className="flex gap-8 nav-links-container" style={{ display: 'flex', gap: '1.8rem', position: 'relative' }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.a 
                key={link.id} 
                href={`#${link.id}`} 
                whileHover={{ scale: 1.08, y: -2, color: 'var(--accent-gold)' }}
                style={{ 
                  color: isActive ? 'var(--accent-gold)' : '#ffffff', 
                  textDecoration: 'none', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px', 
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 400,
                  position: 'relative',
                  padding: '5px 0',
                  transition: 'color 0.2s ease',
                  display: 'inline-flex'
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
                      boxShadow: '0 2px 8px rgba(201, 168, 76, 0.5)'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
