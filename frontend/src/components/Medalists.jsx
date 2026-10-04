import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const shooters = [
  {
    name: 'Priyanka',
    achievement: 'State & National Medalist',
    image:
      'https://res.cloudinary.com/nap3orba/image/upload/v1790790986/shooter5.png',
    highlights: [
      '2023 • Rank 1st in inter-school state championship',
      '2023 • Gold medal in 25th All India KKSS Inter School National',
      '2023, 2024, 2025 • Participated in 66th, 67th & 68th National Shooting Championship conducted by NRAI'
    ]
  },
  {
    name: 'Mitansh Yadav',
    achievement: 'District & State Competitor',
    image:
      'https://res.cloudinary.com/nap3orba/image/upload/v1791106220/Screenshot_2026-10-04_145951.png',
    highlights: [
      '2025 • 3rd Rank in SGFI inter school District Championship (U-14 Boys)',
      '2025 • Participated in SGFI Haryana State Championship',
      '2025 • Participated in 68th National Shooting Championship',
      '2023 • Participated in 25th AKKSS Inter School National'
    ]
  },
  {
    name: 'Khushi',
    achievement: 'National Trials Qualified',
    image:
      'https://res.cloudinary.com/nap3orba/image/upload/v1790790987/shooter1.png',
    highlights: [
      '2024 & 2025 • Participated in 67th & 68th National Shooting Championship',
      '2025-26 • Qualified and Participated in National Team Trials',
      '2023 • Participated in 25th AKKSS Inter School National'
    ]
  },
  {
    name: 'Moksh',
    achievement: 'National Qualifier',
    image:
      'https://res.cloudinary.com/nap3orba/image/upload/v1791107297/Gemini_Generated_Image_khoph5khoph5khop.png',
    highlights: [
      '2024 • 13th rank in 26th All India KKSS Inter School Shooting Championship',
      '2025 • 27th Rank in 27th AKKSS Inter School',
      '2024 & 2025 • Participated in 67th & 68th National Shooting Championship'
    ]
  },
  {
    name: 'Riya',
    achievement: 'District Medalist',
    image:
      'https://res.cloudinary.com/nap3orba/image/upload/v1791107199/Gemini_Generated_Image_emex42emex42emex.png',
    highlights: [
      '2024 & 2025 • Participated in 67th & 68th National Shooting Championship',
      '2025 • 3rd Rank in SGFI Inter School District Championship (U-19 Girls)'
    ]
  }
];

const Medalists = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % shooters.length);
    }, 5200);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % shooters.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + shooters.length) % shooters.length);
  };

  return (
    <section id="medalists" className="section medalists-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="section-heading"
        >
          <span className="hero-elite-chip medalists-chip">Recent achievements</span>
          <h2 className="text-gold" style={{ fontSize: '3rem', marginTop: '16px' }}>
            Recent Achievements
          </h2>
          <p className="text-muted" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.05rem' }}>
            Our athletes continue to rise on the national stage, earning medals, qualification calls, and competitive experience through dedication, discipline, and consistent performance.
          </p>
        </motion.div>

        <div className="medalists-carousel">
          <button type="button" className="medalist-nav-btn" onClick={prevSlide} aria-label="Previous shooter">
            ‹
          </button>

          <div className="medalists-viewport">
            <motion.div
              className="medalists-track"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            >
              {shooters.map((shooter) => (
                <div className="medalist-slide" key={shooter.name}>
                  <div className="medalist-card glass">
                    <div className="medalist-image-wrap">
                      <img src={shooter.image} alt={shooter.name} className="medalist-image" />
                    </div>

                    <div className="medalist-content">
                      <span className="medalist-badge">{shooter.achievement}</span>
                      <h3>{shooter.name}</h3>

                      <ul className="medalist-achievements">
                        {shooter.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button type="button" className="medalist-nav-btn" onClick={nextSlide} aria-label="Next shooter">
            ›
          </button>
        </div>

        <div className="medalist-dots" aria-label="Shooter selection indicators">
          {shooters.map((shooter, index) => (
            <button
              key={shooter.name}
              type="button"
              className={index === activeIndex ? 'dot active' : 'dot'}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${shooter.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Medalists;
