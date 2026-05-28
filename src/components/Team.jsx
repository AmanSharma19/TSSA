import React from 'react';
import { motion } from 'framer-motion';
import headCoachImage from '../../pic_headcoach.png';

const teamData = [
  {
    name: "Gopal Jangra",
    role: "Pistol & Rifle Coach",
    bio: "Ex-military marksman with 10 years of combat training experience. Specializes in rapid precision and tactical maneuvers.",
    image: headCoachImage
  },
  {
    name: "Elena Rostova",
    role: "Competitive Shooting Coach",
    bio: "Two-time Olympic gold medalist. Her analytical approach breaks down every micro-movement for perfect shots.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Victor Vance",
    role: "Founder & Director",
    bio: "Visionary behind the academy. Victor built TSSA to create a sanctuary for pure, unadulterated marksmanship excellence.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
  }
];

const Team = () => {
  return (
    <section id="team" className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <motion.div
            className="hero-elite-chip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ margin: '0 auto 20px', display: 'inline-flex' }}
          >
            Coaches • analysts • mentors
          </motion.div>
          <h2 style={{ fontSize: '3rem' }}>Our <span className="text-gold">Team</span></h2>
          <p className="text-muted">Learn from the absolute best in the industry.</p>
        </div>
        
        <div className="grid grid-cols-3">
          {teamData.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, rotateY: -2, boxShadow: '0 24px 60px rgba(201, 168, 76, 0.16)' }}
              className="glass group motion-card"
              style={{ overflow: 'hidden', padding: '20px', position:'relative' }}
            >
              <div className="img-wrapper" style={{ height: '300px', marginBottom: '20px', position: 'relative' }}>
                <img src={member.image} alt={member.name} className="cinematic-img" />
                <div className="image-glow-overlay" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{member.name}</h3>
              <p className="text-gold" style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>{member.role}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
