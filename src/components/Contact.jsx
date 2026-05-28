import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem' }}>Join <span className="text-gold">The Academy</span></h2>
          <p className="text-muted">Take the first step towards excellence.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass"
            style={{ padding: '40px' }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>Enlist Now</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="text" placeholder="Full Name" style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none', fontFamily: 'var(--font-body)' }} />
              <input type="email" placeholder="Email Address" style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none', fontFamily: 'var(--font-body)' }} />
              <input type="tel" placeholder="Phone Number" style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none', fontFamily: 'var(--font-body)' }} />
              <select style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none', fontFamily: 'var(--font-body)' }}>
                <option value="" style={{ color: '#000' }}>Select Program Interest</option>
                <option value="beginner" style={{ color: '#000' }}>Beginner</option>
                <option value="intermediate" style={{ color: '#000' }}>Intermediate</option>
                <option value="advanced" style={{ color: '#000' }}>Advanced</option>
                <option value="competition" style={{ color: '#000' }}>Competition</option>
              </select>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Submit Application</button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="glass" style={{ padding: '30px', flex: 1 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Location & Contact</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <MapPin className="text-gold" />
                <p className="text-muted">123 Precision Way, Marksman Valley, TX 75001</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <Phone className="text-gold" />
                <p className="text-muted">+1 (555) 123-4567</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Mail className="text-gold" />
                <p className="text-muted">enlist@targetsports.edu</p>
              </div>
            </div>
            <div className="glass" style={{ padding: '10px', height: '250px', overflow: 'hidden' }}>
              <iframe 
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113063.18182740209!2d-97.03159355!3d32.7483083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7c7a5ba496ad%3A0xcb1b5e58cb30f0f4!2sGrand%20Prairie%2C%20TX!5e0!3m2!1sen!2sus!4v1689230000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
