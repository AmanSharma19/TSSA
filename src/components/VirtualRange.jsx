import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, RotateCcw, Award, Target, Zap, Volume2, VolumeX, Eye, Compass, Trophy } from 'lucide-react';

const VirtualRange = () => {
  const [shots, setShots] = useState([]);
  const [score, setScore] = useState(0);
  const [lastShotScore, setLastShotScore] = useState(null);
  const [totalShots, setTotalShots] = useState(0);
  
  // Advanced Features
  const [gameMode, setGameMode] = useState('free'); // 'free', 'challenge', 'reaction'
  const [isMuted, setIsMuted] = useState(false);
  const [scopeZoom, setScopeZoom] = useState(1); // 1 = 1x, 1.5 = 1.5x telescopic zoom
  const [wind, setWind] = useState({ angle: 0, speed: 0 }); // wind vector
  const [highScore, setHighScore] = useState(() => {
    return parseFloat(localStorage.getItem('tssa_highscore') || '0.0');
  });

  // Reaction Game State
  const [reactionActive, setReactionActive] = useState(false);
  const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });
  const [reactionTimer, setReactionTimer] = useState(1.5); // seconds to hit
  const [reactionInterval, setReactionInterval] = useState(null);
  const [reactionScore, setReactionScore] = useState(0);
  const [reactionTotal, setReactionTotal] = useState(0);
  
  const targetRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Generate wind speed/angle dynamically on mount and after each shot
  const generateWind = () => {
    if (gameMode === 'free') {
      setWind({ angle: 0, speed: 0 });
      return;
    }
    const speed = parseFloat((Math.random() * 8).toFixed(1)); // 0 to 8 mph
    const angle = Math.floor(Math.random() * 360); // 0 to 360 degrees
    setWind({ angle, speed });
  };

  useEffect(() => {
    generateWind();
  }, [gameMode]);

  // Audio Synthesizer
  const playSound = (isHit, ringScore) => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      
      // Resumes state if browser suspended
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // --- 1. GUNSHOT SYNTH ---
      const bufferSize = ctx.sampleRate * 0.12; 
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const gunshotFilter = ctx.createBiquadFilter();
      gunshotFilter.type = 'bandpass';
      gunshotFilter.frequency.setValueAtTime(320, ctx.currentTime);
      gunshotFilter.Q.setValueAtTime(1.8, ctx.currentTime);

      const lowFilter = ctx.createBiquadFilter();
      lowFilter.type = 'lowpass';
      lowFilter.frequency.setValueAtTime(130, ctx.currentTime);

      const gunshotGain = ctx.createGain();
      gunshotGain.gain.setValueAtTime(0.35, ctx.currentTime);
      gunshotGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);

      noise.connect(gunshotFilter);
      gunshotFilter.connect(gunshotGain);
      gunshotGain.connect(ctx.destination);
      noise.start();

      // Gun low-end thump
      const oscLow = ctx.createOscillator();
      const oscLowGain = ctx.createGain();
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(95, ctx.currentTime);
      oscLow.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.08);
      oscLowGain.gain.setValueAtTime(0.45, ctx.currentTime);
      oscLowGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      oscLow.connect(lowFilter);
      lowFilter.connect(oscLowGain);
      oscLowGain.connect(ctx.destination);
      oscLow.start();
      oscLow.stop(ctx.currentTime + 0.09);

      // --- 2. STEEL RING SYNTH ---
      if (isHit && ringScore >= 7) {
        setTimeout(() => {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const ringGain = ctx.createGain();

          const baseFreq = 1500 + (ringScore * 120); 
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
          
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(baseFreq * 1.61, ctx.currentTime);

          const ringDecay = 0.35 + (ringScore * 0.05);

          ringGain.gain.setValueAtTime(0.12, ctx.currentTime);
          ringGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ringDecay);

          osc1.connect(ringGain);
          osc2.connect(ringGain);
          ringGain.connect(ctx.destination);

          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + ringDecay + 0.05);
          osc2.stop(ctx.currentTime + ringDecay + 0.05);
        }, 40); 
      }
    } catch (error) {
      console.warn("Audio Synthesizer suspended: ", error);
    }
  };

  // --- REACTION MODE TRIGGER ---
  const spawnReactionTarget = () => {
    if (gameMode !== 'reaction') return;
    
    // Random position offset (within 60% of target board bounds)
    const range = 25; 
    const randomX = (Math.random() * range * 2) - range;
    const randomY = (Math.random() * range * 2) - range;
    
    setTargetOffset({ x: randomX, y: randomY });
    setReactionTimer(1.4 - Math.min(reactionTotal * 0.05, 0.7)); // speed up as score rises
  };

  useEffect(() => {
    let timerId;
    if (gameMode === 'reaction' && reactionActive) {
      spawnReactionTarget();
      timerId = setInterval(() => {
        // Registered as a miss
        setReactionTotal(prev => prev + 1);
        playSound(false, 0);
        spawnReactionTarget();
      }, reactionTimer * 1000);
    }
    return () => clearInterval(timerId);
  }, [gameMode, reactionActive, reactionTotal]);

  const handleTargetClick = (e) => {
    if (!targetRef.current) return;
    if (gameMode === 'challenge' && totalShots >= 10) return; // limit challenge to 10 shots

    const rect = targetRef.current.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    let clickY = e.clientY - rect.top;

    // Calculate center relative to zoomed target center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate wind push displacement (advanced ballistics logic)
    // Wind drift increases with wind speed and direction angle
    if (wind.speed > 0) {
      const radians = (wind.angle * Math.PI) / 180;
      const driftMagnitude = wind.speed * 1.8; // scaling factor
      const driftX = Math.cos(radians) * driftMagnitude;
      const driftY = Math.sin(radians) * driftMagnitude;
      
      // Apply wind offset to bullet coordinate simulation
      clickX += driftX;
      clickY += driftY;
    }

    let dx, dy;
    if (gameMode === 'reaction') {
      // Calculate dx, dy relative to flashing moving sub-target center
      const offsetPixelsX = (targetOffset.x / 100) * rect.width;
      const offsetPixelsY = (targetOffset.y / 100) * rect.height;
      dx = clickX - (centerX + offsetPixelsX);
      dy = clickY - (centerY + offsetPixelsY);
    } else {
      dx = clickX - centerX;
      dy = clickY - centerY;
    }

    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Zoom factor compensation: target is physically larger when zoomed,
    // so we scale the hit accuracy distance check
    const compensatedMaxRadius = (rect.width * 0.45) * scopeZoom;
    let shotScore = 0;
    let label = "MISS";

    if (distance <= compensatedMaxRadius) {
      const scoreFraction = 1 - (distance / compensatedMaxRadius);
      const calculated = 5.0 + (scoreFraction * 5.9);
      shotScore = parseFloat(calculated.toFixed(1));
      
      if (shotScore >= 10.5) label = "BULLSEYE!";
      else if (shotScore >= 9.2) label = "EXCELLENT";
      else if (shotScore >= 7.8) label = "GOOD SHOT";
      else label = "OUTER RANGE";
    }

    const isHit = shotScore > 0;
    playSound(isHit, shotScore);

    const newShot = {
      id: Date.now() + Math.random(),
      x: ((clickX) / rect.width) * 100, 
      y: ((clickY) / rect.height) * 100,
      score: shotScore,
      label: label,
    };

    setShots((prev) => [...prev, newShot]);
    
    if (gameMode === 'reaction') {
      setReactionTotal(prev => prev + 1);
      if (isHit) {
        setReactionScore(prev => prev + 1);
        setScore(prev => parseFloat((prev + shotScore).toFixed(1)));
        setLastShotScore(newShot);
      } else {
        setLastShotScore({ ...newShot, score: 0, label: "MISS" });
      }
      spawnReactionTarget(); // immediately spawn next on click
    } else {
      setTotalShots((prev) => prev + 1);
      if (isHit) {
        const newTotalScore = parseFloat((score + shotScore).toFixed(1));
        setScore(newTotalScore);
        setLastShotScore(newShot);

        // Check and set highscore in 10-shot challenge
        if (gameMode === 'challenge') {
          const nextShotsCount = totalShots + 1;
          if (nextShotsCount === 10) {
            if (newTotalScore > highScore) {
              setHighScore(newTotalScore);
              localStorage.setItem('tssa_highscore', newTotalScore.toString());
            }
          }
        }
      } else {
        setLastShotScore({ ...newShot, score: 0, label: "MISS" });
      }
      generateWind(); // shift wind for next shot
    }
  };

  const handleReset = () => {
    setShots([]);
    setScore(0);
    setTotalShots(0);
    setLastShotScore(null);
    setReactionScore(0);
    setReactionTotal(0);
    generateWind();
  };

  const toggleMode = (mode) => {
    setGameMode(mode);
    setShots([]);
    setScore(0);
    setTotalShots(0);
    setLastShotScore(null);
    setReactionScore(0);
    setReactionTotal(0);
    setReactionActive(false);
  };

  const avgScore = totalShots > 0 ? (score / totalShots).toFixed(1) : "0.0";

  return (
    <section id="virtual-range" className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* Background grids and glowing assets */}
      <div className="glow-bg" style={{ bottom: '15%', left: '5%', background: 'rgba(201, 168, 76, 0.15)' }}></div>
      <div className="glow-bg" style={{ top: '15%', right: '5%', background: 'rgba(0, 119, 255, 0.1)' }}></div>
      
      <div className="container">
        {/* Interactive Title & Header Controllers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '3rem', margin: 0 }}>VIRTUAL <span className="text-gold">PRECISION RANGE</span></h2>
            <p className="text-muted" style={{ margin: '5px 0 0 0' }}>Simulated ballistic and target training line with spring micro-interactions.</p>
          </div>
          
          {/* Sounds and Zoom scope Controls */}
          <div className="flex gap-4" style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="glass"
              onClick={() => setScopeZoom(prev => prev === 1 ? 1.4 : 1)}
              style={{
                background: scopeZoom > 1 ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                border: scopeZoom > 1 ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.05)',
                color: scopeZoom > 1 ? 'var(--accent-gold)' : '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px',
                transition: 'all 0.3s'
              }}
            >
              <Eye size={16} /> Scope {scopeZoom > 1 ? '1.4x Zoom' : '1.0x'}
            </button>

            <button 
              className="glass"
              onClick={() => setIsMuted(prev => !prev)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {isMuted ? <VolumeX className="text-muted" size={18} /> : <Volume2 className="text-gold" size={18} />}
            </button>
          </div>
        </div>

        {/* Tab Selection Switcher (User Friendly Tabs) */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '35px', background: 'rgba(255,255,255,0.02)', padding: '6px', borderRadius: '10px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.03)' }}>
          <button 
            onClick={() => toggleMode('free')}
            style={{
              background: gameMode === 'free' ? 'var(--accent-gold)' : 'transparent',
              color: gameMode === 'free' ? 'var(--bg-primary)' : '#fff',
              border: 'none',
              padding: '10px 25px',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Free Play
          </button>
          <button 
            onClick={() => toggleMode('challenge')}
            style={{
              background: gameMode === 'challenge' ? 'var(--accent-gold)' : 'transparent',
              color: gameMode === 'challenge' ? 'var(--bg-primary)' : '#fff',
              border: 'none',
              padding: '10px 25px',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            10-Shot Challenge
          </button>
          <button 
            onClick={() => toggleMode('reaction')}
            style={{
              background: gameMode === 'reaction' ? 'var(--accent-gold)' : 'transparent',
              color: gameMode === 'reaction' ? 'var(--bg-primary)' : '#fff',
              border: 'none',
              padding: '10px 25px',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Reaction Speed Test
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 items-center" style={{ gridTemplateColumns: 'minmax(320px, 1fr) minmax(380px, 1.2fr)' }}>
          
          {/* DASHBOARD AND CONTROL WIDGET */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="glass" style={{ padding: '30px', position: 'relative' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Crosshair className="text-gold" size={28} /> 
                {gameMode === 'free' ? 'TRAINING RANGE' : gameMode === 'challenge' ? '10-SHOT CHALLENGE' : 'REACTION SPEED HUD'}
              </h3>
              
              {/* Dynamic stats layout based on mode */}
              <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {gameMode === 'reaction' ? 'Reaction Score' : 'Total Session Score'}
                  </p>
                  <h4 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: '5px 0 0 0' }}>
                    {gameMode === 'reaction' ? `${reactionScore}/${reactionTotal}` : score.toFixed(1)}
                  </h4>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {gameMode === 'challenge' ? 'Remaining Shots' : 'Shots Fired'}
                  </p>
                  <h4 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: '5px 0 0 0' }}>
                    {gameMode === 'challenge' ? `${10 - totalShots}` : totalShots}
                  </h4>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Average Hit Ring</p>
                  <h4 style={{ fontSize: '2.2rem', color: 'var(--accent-gold)', margin: '5px 0 0 0' }}>{avgScore}</h4>
                </div>

                {/* Highscore HUD for Challenge Mode */}
                {gameMode === 'challenge' ? (
                  <div style={{ background: 'rgba(201,168,76,0.03)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p className="text-gold" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Trophy size={12} /> Personal High
                    </p>
                    <h4 style={{ fontSize: '2.1rem', color: 'var(--text-primary)', margin: '3px 0 0 0' }}>
                      {highScore.toFixed(1)}
                    </h4>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Classification</p>
                    <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: '14px 0 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {parseFloat(avgScore) >= 10.0 ? "Marksman" : parseFloat(avgScore) >= 8.5 ? "Expert" : parseFloat(avgScore) >= 6.0 ? "Sharpshooter" : "Recruit"}
                    </h4>
                  </div>
                )}
              </div>

              {/* Progress indicators for challenges */}
              {gameMode === 'challenge' && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    <span>CHALLENGE PROGRESS</span>
                    <span>{totalShots}/10 SHOTS</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(totalShots / 10) * 100}%` }}
                      transition={{ duration: 0.3 }}
                      style={{ height: '100%', background: 'var(--accent-gold)' }}
                    />
                  </div>
                </div>
              )}

              {/* Ballistic/Wind Dashboard Indicator (Advanced Physics) */}
              {gameMode !== 'free' && (
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
                    <Compass size={22} className="spin-slow" />
                    <div>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Crosswind</p>
                      <h5 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>
                        {wind.speed > 0 ? `${wind.speed} MPH @ ${wind.angle}°` : 'CALM'}
                      </h5>
                    </div>
                  </div>
                  {wind.speed > 0 && (
                    <div style={{ display: 'flex', gap: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span>Compensation Advised</span>
                    </div>
                  )}
                </div>
              )}

              {/* Last Impact visual feedback */}
              <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(201, 168, 76, 0.05)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(201, 168, 76, 0.12)', marginBottom: '20px' }}>
                <div style={{ background: 'var(--accent-gold)', color: 'var(--bg-primary)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 10px rgba(201, 168, 76, 0.3)' }}>
                  {lastShotScore ? lastShotScore.score : "—"}
                </div>
                <div>
                  <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Last Shot Impact</p>
                  <h4 style={{ fontSize: '1.3rem', margin: '3px 0 0 0', color: lastShotScore && lastShotScore.score >= 10.0 ? '#2ecc71' : 'var(--text-primary)' }}>
                    {lastShotScore ? lastShotScore.label : "Awaiting trigger pull..."}
                  </h4>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4" style={{ display: 'flex', gap: '15px' }}>
                <button className="btn btn-primary" onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', padding: '10px 20px', flex: 1, justifyContent: 'center' }}>
                  <RotateCcw size={16} /> Reset Range
                </button>
                {gameMode === 'reaction' && (
                  <button 
                    className="btn" 
                    onClick={() => setReactionActive(prev => !prev)} 
                    style={{ 
                      flex: 1, 
                      padding: '10px 20px', 
                      fontSize: '0.85rem',
                      justifyContent: 'center',
                      background: reactionActive ? 'rgba(231, 76, 60, 0.1)' : 'transparent',
                      borderColor: reactionActive ? '#e74c3c' : 'var(--accent-gold)',
                      color: reactionActive ? '#e74c3c' : '#fff'
                    }}
                  >
                    {reactionActive ? 'Pause Trainer' : 'Start Trainer'}
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', padding: '10px' }}>
              <Zap className="text-gold" size={24} style={{ flexShrink: 0 }} />
              <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                {gameMode === 'free' 
                  ? "Free play mode allows you to practice without restrictions. Hover inside target circles for micro-laser precision focus alignment." 
                  : gameMode === 'challenge' 
                  ? "Test your maximum potential over 10 shots. A sliding crosswind will deflect your bullets; adjust your alignment indicator to compensate!" 
                  : "Test your reflex capabilities! Click the golden sub-target before the shrinking countdown timer expires."}
              </p>
            </div>
          </motion.div>

          {/* INTERACTIVE TELESCOPIC TARGET BOARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div 
              ref={targetRef}
              onClick={handleTargetClick}
              animate={{ scale: scopeZoom }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="glass target-board-container"
              style={{
                width: '100%',
                maxWidth: '430px',
                aspectRatio: '1',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'crosshair',
                overflow: 'hidden',
                borderRadius: '50%',
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.95), 0 15px 35px rgba(0,0,0,0.6)',
                border: '2px solid rgba(201,168,76,0.15)'
              }}
            >
              {/* Scope Lens Circular Gradients when zoom is on */}
              {scopeZoom > 1 && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: '15px solid #000',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 20,
                  boxShadow: 'inset 0 0 30px rgba(201,168,76,0.25)',
                  background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.85) 95%)'
                }}/>
              )}

              {/* Concentric rings using SVG */}
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                  <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(201,168,76,0.06)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                
                {/* Background soft glowing fill */}
                <circle cx="50" cy="50" r="48" fill="url(#targetGlow)" />

                {/* Outer Ring 5 */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <text x="50" y="9.5" fill="rgba(255,255,255,0.2)" fontSize="2.5" textAnchor="middle">5</text>
                <text x="50" y="92.5" fill="rgba(255,255,255,0.2)" fontSize="2.5" textAnchor="middle">5</text>

                {/* Ring 6 */}
                <circle cx="50" cy="50" r="37.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <text x="50" y="16.5" fill="rgba(255,255,255,0.3)" fontSize="2.5" textAnchor="middle">6</text>
                <text x="50" y="86" fill="rgba(255,255,255,0.3)" fontSize="2.5" textAnchor="middle">6</text>

                {/* Ring 7 */}
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <text x="50" y="23.5" fill="rgba(255,255,255,0.4)" fontSize="2.5" textAnchor="middle">7</text>
                <text x="50" y="79" fill="rgba(255,255,255,0.4)" fontSize="2.5" textAnchor="middle">7</text>

                {/* Ring 8 */}
                <circle cx="50" cy="50" r="22.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                <text x="50" y="30.5" fill="rgba(255,255,255,0.5)" fontSize="2.5" textAnchor="middle">8</text>
                <text x="50" y="71.5" fill="rgba(255,255,255,0.5)" fontSize="2.5" textAnchor="middle">8</text>

                {/* Ring 9 */}
                <circle cx="50" cy="50" r="15" fill="none" stroke="var(--accent-gold)" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.4" />
                <text x="50" y="38" fill="var(--accent-gold)" fontSize="2.5" fontWeight="bold" textAnchor="middle" opacity="0.6">9</text>
                <text x="50" y="64.5" fill="var(--accent-gold)" fontSize="2.5" fontWeight="bold" textAnchor="middle" opacity="0.6">9</text>

                {/* Bullseye Ring 10 */}
                <circle cx="50" cy="50" r="7.5" fill="rgba(201,168,76,0.08)" stroke="var(--accent-gold)" strokeWidth="1" />
                <circle cx="50" cy="50" r="1.2" fill="var(--accent-gold)" />
                <circle cx="50" cy="50" r="7.5" fill="none" stroke="var(--accent-gold)" strokeWidth="0.5" />

                {/* Aligning Hairlines */}
                <line x1="50" y1="2" x2="50" y2="40" stroke="rgba(201,168,76,0.15)" strokeWidth="0.3" />
                <line x1="50" y1="60" x2="50" y2="98" stroke="rgba(201,168,76,0.15)" strokeWidth="0.3" />
                <line x1="2" y1="50" x2="40" y2="50" stroke="rgba(201,168,76,0.15)" strokeWidth="0.3" />
                <line x1="60" y1="50" x2="98" y2="50" stroke="rgba(201,168,76,0.15)" strokeWidth="0.3" />
              </svg>

              {/* MOVING REACTION TARGET (Appears in reaction speed test mode) */}
              <AnimatePresence>
                {gameMode === 'reaction' && reactionActive && (
                  <motion.div
                    key="reaction-subtarget"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${targetOffset.x}%)`,
                      top: `calc(50% + ${targetOffset.y}%)`,
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(241,196,15,0.9) 0%, rgba(201,168,76,0.3) 70%, transparent 100%)',
                      border: '2px solid var(--accent-gold)',
                      boxShadow: '0 0 15px var(--accent-gold), inset 0 0 10px rgba(0,0,0,0.5)',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none' // Click passes through to board click
                    }}
                  >
                    {/* Ring Countdown visualization */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <motion.circle 
                        cx="20" cy="20" r="18" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="1.5"
                        strokeDasharray="113"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 113 }}
                        transition={{ duration: reactionTimer, ease: 'linear' }}
                      />
                    </svg>
                    <Target size={16} className="text-gold" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bullet Hole Markers */}
              <AnimatePresence>
                {shots.map((shot) => (
                  <motion.div
                    key={shot.id}
                    initial={{ scale: 2.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                    style={{
                      position: 'absolute',
                      left: `${shot.x}%`,
                      top: `${shot.y}%`,
                      width: '10px',
                      height: '10px',
                      background: shot.score >= 10.0 ? 'radial-gradient(circle, #fff 0%, #2980b9 35%, #000 90%)' : 'radial-gradient(circle, #777 0%, #333 45%, #000 90%)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      boxShadow: shot.score >= 10.0 ? '0 0 10px #3498db, 0 0 3px #fff' : '0 0 5px rgba(0,0,0,0.8)',
                      pointerEvents: 'none',
                      zIndex: 18
                    }}
                  >
                    {/* Glowing expand rings */}
                    <motion.div
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 4.5, opacity: 0 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        border: shot.score >= 10.0 ? '2px solid #3498db' : '2px solid var(--accent-gold)',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />

                    {/* Floating precision score label */}
                    <motion.div
                      initial={{ y: -5, opacity: 1, scale: 0.5 }}
                      animate={{ y: -32, opacity: 0, scale: 1.25 }}
                      transition={{ duration: 1.3, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        color: shot.score >= 10.0 ? '#2ecc71' : 'var(--accent-gold)',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-heading)',
                        textShadow: '0 2px 4px rgba(0,0,0,0.9)'
                      }}
                    >
                      {shot.score > 0 ? `+${shot.score}` : "MISS"}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VirtualRange;
