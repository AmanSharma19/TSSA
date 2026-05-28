import React from 'react';
import { motion } from 'framer-motion';

const teamData = [
  {
    name: "Marcus Thorne",
    role: "Pistol & Rifle Coach",
    bio: "Ex-military marksman with 10 years of combat training experience. Specializes in rapid precision and tactical maneuvers.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80"
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
              className="glass group"
              style={{ overflow: 'hidden', padding: '20px' }}
            >
              <div className="img-wrapper" style={{ height: '300px', marginBottom: '20px' }}>
                <img src={member.image} alt={member.name} className="cinematic-img" />
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
