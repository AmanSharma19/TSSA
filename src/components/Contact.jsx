import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });

  const emailAddress = 'pataudishooting@gmail.com';
  const academyAddress = 'Target Sports Shooting Academy, Safedar nagar Road, Pataudi, Haryana 122503, India';
  const academyDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(academyAddress)}`;
  const phoneNumbers = [
    { display: '+91 7988616455', raw: '+91 7988616455', whatsapp: '917988616455' },
    { display: '+91 8684879299', raw: '+91 8684879299', whatsapp: '918684879299' },
  ];
  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@tssa_10x',
      href: 'https://www.instagram.com/tssa_10x/',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5"></rect>
          <circle cx="12" cy="12" r="4"></circle>
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"></circle>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      handle: 'Target Sports Shooting Academy Pataudi',
      href: 'https://youtube.com/@targetsportsshootingacadem5806?si=B4B-pyC_Ku8P0tmy',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.37.56A3.02 3.02 0 0 0 .5 6.2 31.28 31.28 0 0 0 0 12a31.28 31.28 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14C4.3 20.5 12 20.5 12 20.5s7.7 0 9.37-.56a3.02 3.02 0 0 0 2.13-2.14A31.28 31.28 0 0 0 24 12a31.28 31.28 0 0 0-.5-5.8ZM9.75 16.25V7.75L16 12l-6.25 4.25Z"></path>
        </svg>
      ),
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneAction = (number, whatsappNumber) => {
    const wantCall = window.confirm(`Call ${number}? OK = Call, Cancel = WhatsApp chat`);

    if (wantCall) {
      window.location.href = `tel:${number.replace(/\D/g, '')}`;
    } else {
      window.open(`https://wa.me/${whatsappNumber}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = `Training Inquiry - ${formData.name || 'New Applicant'}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Program Interest: ${formData.program || 'Not specified'}`,
      `Message: ${formData.message || 'No additional message provided'}`,
    ].join('\n');

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = gmailComposeUrl;
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <motion.div
            className="hero-elite-chip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ margin: '0 auto 20px', display: 'inline-flex' }}
          >
            Start your training journey • schedule a trial session
          </motion.div>
          <h2 style={{ fontSize: '3rem' }}>Join <span className="text-gold">The Academy</span></h2>
          <p className="text-muted">Take the first step towards excellence.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass motion-card"
            style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '30px', position: 'relative', zIndex: 1 }}>Enlist Now</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
              <motion.input 
                whileFocus={{ scale: 1.01, borderColor: 'rgba(201,168,76,0.85)', boxShadow: '0 0 0 3px rgba(201,168,76,0.16)' }} 
                type="text" 
                name="name"
                placeholder="Full Name" 
                className="fancy-input" 
                value={formData.name}
                onChange={handleChange}
                required
              />
              <motion.input 
                whileFocus={{ scale: 1.01, borderColor: 'rgba(201,168,76,0.85)', boxShadow: '0 0 0 3px rgba(201,168,76,0.16)' }} 
                type="email" 
                name="email"
                placeholder="Email Address" 
                className="fancy-input" 
                value={formData.email}
                onChange={handleChange}
                required
              />
              <motion.input 
                whileFocus={{ scale: 1.01, borderColor: 'rgba(201,168,76,0.85)', boxShadow: '0 0 0 3px rgba(201,168,76,0.16)' }} 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                className="fancy-input" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <motion.select 
                whileFocus={{ scale: 1.01, borderColor: 'rgba(201,168,76,0.85)', boxShadow: '0 0 0 3px rgba(201,168,76,0.16)' }} 
                className="fancy-input" 
                style={{ color: '#fff' }}
                name="program"
                value={formData.program}
                onChange={handleChange}
              >
                <option value="" style={{ color: '#000' }}>Select Program Interest</option>
                <option value="Beginner" style={{ color: '#000' }}>Beginner</option>
                <option value="Intermediate" style={{ color: '#000' }}>Intermediate</option>
                <option value="Advanced" style={{ color: '#000' }}>Advanced</option>
                <option value="Competition" style={{ color: '#000' }}>Competition</option>
              </motion.select>
              <motion.textarea
                whileFocus={{ scale: 1.01, borderColor: 'rgba(201,168,76,0.85)', boxShadow: '0 0 0 3px rgba(201,168,76,0.16)' }}
                name="message"
                placeholder="Tell us about your goals or questions"
                className="fancy-input"
                rows="5"
                style={{ resize: 'vertical', minHeight: '120px' }}
                value={formData.message}
                onChange={handleChange}
              />
              <motion.button whileHover={{ y: -4, scale: 1.01 }} type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Send Application</motion.button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <motion.div className="glass motion-card" style={{ padding: '30px', flex: 1, position:'relative', overflow:'hidden' }} whileHover={{ y: -6 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', position:'relative', zIndex:1 }}>Location & Contact</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', position:'relative', zIndex:1 }}>
                <MapPin className="text-gold" />
                <p className="text-muted">Target Sports Shooting Academy, Safedar nagar Road, Pataudi, Haryana 122503, India</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px', position:'relative', zIndex:1 }}>
                {phoneNumbers.map((phone) => (
                  <div key={phone.display} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <Phone className="text-gold" />
                    <button
                      onClick={() => handlePhoneAction(phone.display, phone.whatsapp)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.78)',
                        padding: 0,
                        cursor: 'pointer',
                        fontSize: '1rem',
                        textAlign: 'left',
                        fontWeight: 500,
                      }}
                    >
                      {phone.display}
                    </button>
                    <button
                      onClick={() => window.open(`https://wa.me/${phone.whatsapp}`, '_blank', 'noopener,noreferrer')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '999px',
                        background: 'rgba(37, 211, 102, 0.16)',
                        border: '1px solid rgba(37,211,102,0.45)',
                        color: '#4ade80',
                        padding: '6px',
                        cursor: 'pointer',
                        lineHeight: 0,
                      }}
                      aria-label={`Chat on WhatsApp with ${phone.display}`}
                    >
                      <MessageCircle size={18} />
                    </button>
                    <a
                      href={`tel:${phone.display.replace(/\D/g, '')}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '999px',
                        background: 'rgba(201,168,76,0.16)',
                        border: '1px solid rgba(201,168,76,0.45)',
                        color: '#ffd76a',
                        padding: '6px',
                        lineHeight: 0,
                        textDecoration: 'none',
                      }}
                      aria-label={`Call ${phone.display}`}
                    >
                      <Phone size={18} />
                    </a>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position:'relative', zIndex:1 }}>
                <Mail className="text-gold" />
                <p className="text-muted">pataudishooting@gmail.com</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '18px', position:'relative', zIndex:1 }}>
                <p className="text-gold" style={{ margin: 0, fontSize: '0.72rem', letterSpacing: '1.3px', textTransform: 'uppercase' }}>Follow us</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        padding: '8px 10px',
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ffd76a' }}>{social.icon}</span>
                      <span>{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div className="glass motion-card" style={{ padding: '10px', height: '250px', overflow: 'hidden' }} whileHover={{ scale: 1.01 }}>
              <a href={academyDirectionsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe 
                  title="Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(academyAddress)}&z=15&output=embed`}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '8px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
