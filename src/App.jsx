import React, { useEffect } from 'react';
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
