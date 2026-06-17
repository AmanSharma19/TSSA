import React from 'react';
import { motion } from 'framer-motion';
import headCoachImage from '../../pic_headcoach.png';
import jrCoachImage from '../../pic_jrcoach.png';

const teamData = [
  {
    name: "Gopal Jangra",
    role: "Head Coach (Rifle & Pistol)",
    bio: "NIS certified coach with 10 years of experience in shooting sport, known for shaping disciplined shooters through expert technique, focus, and mentorship.",
    image: headCoachImage
  },
  {
    name: "Mohit Jangra",
    role: "Junior Coach (Rifle & Pistol)",
    bio: "A nationally recognized shooter with 6 years of experience, bringing strong technical skill, discipline, and practical mentorship to every training session.",
    image: jrCoachImage
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
        
        <div className="grid grid-cols-2 gap-6" style={{ maxWidth: '980px', margin: '0 auto' }}>
          {teamData.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, rotateY: -2, boxShadow: '0 24px 60px rgba(201, 168, 76, 0.16)' }}
              className="glass group motion-card"
              style={{ overflow: 'hidden', padding: '20px', position:'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}
            >
              <div className="img-wrapper" style={{ height: '280px', marginBottom: '20px', position: 'relative' }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="cinematic-img"
                  style={{ objectFit: 'cover', objectPosition: 'center 12%' }}
                />
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
