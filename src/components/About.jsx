import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ endValue, label, suffix = "" }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo easing function
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * endValue);
      
      setValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, endValue]);

  return (
    <div ref={ref} className="glass" style={{ padding: '30px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {hasStarted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
      )}
      <h3 className="text-gold" style={{ fontSize: '3rem', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span>{value}</span>{suffix}
      </h3>
      <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', marginTop: '10px' }}>{label}</p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-gold" style={{ fontSize: '3rem' }}>Our Legacy</h2>
            <p className="text-muted" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
              Founded with the singular vision of forging champions, Target Sports Shooting Academy combines elite infrastructure with world-class coaching. We distill the art of shooting into science, precision, and unyielding discipline.
            </p>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>
              Whether you are taking your first shot or training for the Olympics, our facilities provide the environment you need to excel.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <StatItem endValue={15} label="Years Experience" suffix="+" />
            <StatItem endValue={5000} label="Students Trained" suffix="+" />
            <StatItem endValue={120} label="Medals Won" />
            <StatItem endValue={50} label="Firing Lanes" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
