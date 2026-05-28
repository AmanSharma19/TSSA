import React from 'react';
import { motion } from 'framer-motion';
import { Target, Crosshair, Shield, Award } from 'lucide-react';

const programsData = [
  { title: "Beginner", icon: <Target size={40} className="text-gold" />, desc: "Master safety protocols, basic handling, and foundational marksmanship." },
  { title: "Intermediate", icon: <Shield size={40} className="text-gold" />, desc: "Refine technique, speed, and accuracy in dynamic shooting scenarios." },
  { title: "Advanced", icon: <Crosshair size={40} className="text-gold" />, desc: "Tactical drills, advanced ballistics, and high-pressure performance." },
  { title: "Competition", icon: <Award size={40} className="text-gold" />, desc: "Olympic-level preparation, mental conditioning, and tournament readiness." },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }
  }
};

const Programs = () => {
  return (
    <section id="programs" className="section" style={{ position: 'relative' }}>
      <div className="glow-bg" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(201, 168, 76, 0.1)' }}></div>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem' }}>Training <span className="text-gold">Programs</span></h2>
          <p className="text-muted">Structured curriculum for every skill level, designed for pure accuracy.</p>
        </div>
        
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-4"
        >
          {programsData.map((prog, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.025,
                borderColor: 'rgba(201,168,76,0.3)',
                boxShadow: '0 15px 35px rgba(201, 168, 76, 0.12)'
              }}
              className="glass"
              style={{ 
                padding: '45px 25px', 
                textAlign: 'center', 
                cursor: 'pointer',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
            >
              <motion.div 
                style={{ marginBottom: '22px', display: 'flex', justifyContent: 'center' }}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {prog.icon}
              </motion.div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: 600 }}>{prog.title}</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{prog.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
