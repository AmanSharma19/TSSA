import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import VirtualRange from './components/VirtualRange';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = document.getElementById('crosshair');
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };
    
    const handleMouseDown = () => {
      const cursor = document.getElementById('crosshair');
      if (cursor) cursor.classList.add('clicked');
    };

    const handleMouseUp = () => {
      const cursor = document.getElementById('crosshair');
      if (cursor) cursor.classList.remove('clicked');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="site-ambient-layer" aria-hidden="true">
        <motion.div
          className="ambient-orb orb-1"
          animate={{
            y: [0, -26, 0],
            x: [0, 12, 0],
            scale: [1, 1.12, 1],
            opacity: [0.18, 0.34, 0.18]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="ambient-orb orb-2"
          animate={{
            y: [0, 24, 0],
            x: [0, -18, 0],
            scale: [1, 1.2, 1],
            opacity: [0.14, 0.28, 0.14]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="ambient-orb orb-3"
          animate={{
            y: [0, -18, 0],
            x: [0, -28, 0],
            opacity: [0.12, 0.24, 0.12]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="ambient-grid" />
      </div>
      <div id="crosshair" className="crosshair-cursor">
        <div className="horizontal"></div>
        <div className="vertical"></div>
        <div className="circle"></div>
      </div>
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <VirtualRange />
      <Team />
      <Gallery />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default App;
