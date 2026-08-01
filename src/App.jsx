import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RsvpModal from './RsvpModal';
import FallingLeaves from './FallingLeaves';
import './index.css';

const LeafSeparator = () => (
  <div style={{ margin: '40px 0', width: '100%', display: 'flex', justifyContent: 'center', opacity: 0.85 }}>
    <svg width="200" height="30" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="15" x2="80" y2="15" stroke="#97532A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="120" y1="15" x2="200" y2="15" stroke="#97532A" strokeWidth="1.5" strokeLinecap="round" />
      <g transform="translate(85, -1)">
        <path d="M14 20C14 20 2 18 2 8C2 8 14 10 14 20Z" fill="#7D8F69" />
        <path d="M16 20C16 20 28 17 28 5C28 5 16 7 16 20Z" fill="#557153" />
      </g>
    </svg>
  </div>
);

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  const audioRef = useRef(null);
  
  const babyRef = useRef(null);
  const babySpriteRef = useRef(null);
  const bearRef = useRef(null);
  const bearSpriteRef = useRef(null);
  const rabbitRef = useRef(null);
  const rabbitSpriteRef = useRef(null);
  const bambiRef = useRef(null);
  const bambiSpriteRef = useRef(null);
  const hedgehogRef = useRef(null);
  const hedgehogSpriteRef = useRef(null);
  const foxRef = useRef(null);
  const foxSpriteRef = useRef(null);
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const screen2Ref = useRef(null);
  const finalGreetingRef = useRef(null);

  useEffect(() => {
    // Ya no intentamos reproducir el audio inmediatamente al cargar,
    // esperamos a que el usuario toque 'Abrir Invitación'.

    const handleScroll = () => {
      // Si el usuario está a menos de 300px del final de la página, ocultar la flecha
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;
      setIsAtBottom(bottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Controlar el scroll de la página según el estado de la invitación
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden'; // Bloquea el scroll
      window.scrollTo(0, 0); // Fuerza a estar arriba
    } else {
      document.body.style.overflow = ''; // Restaura el scroll
      window.scrollTo(0, 0); // Asegura que empiece desde arriba al abrir
    }
    
    // Limpieza al desmontar
    return () => { document.body.style.overflow = ''; };
  }, [isOpened]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Error al reproducir audio");
      });
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        // Solo vuelve a reproducir si el estado indicaba que estaba activada
        if (audioRef.current && isPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  useEffect(() => {
    const baby = babyRef.current;
    const babySprite = babySpriteRef.current;
    const bear = bearRef.current;
    const bearSprite = bearSpriteRef.current;
    const rabbit = rabbitRef.current;
    const rabbitSprite = rabbitSpriteRef.current;
    const bambi = bambiRef.current;
    const bambiSprite = bambiSpriteRef.current;
    const hedgehog = hedgehogRef.current;
    const hedgehogSprite = hedgehogSpriteRef.current;
    const fox = foxRef.current;
    const foxSprite = foxSpriteRef.current;
    const container = containerRef.current;
    const pinSection = pinRef.current;
    const screen2 = screen2Ref.current;

    if (!bear || !container || !pinSection || !screen2) return;

    // Pin screen 2 but release it BEFORE the animation fully finishes
    ScrollTrigger.create({
      trigger: screen2,
      start: "top top",
      end: "+=1500", // Unpins when the fox is roughly in the middle of the screen
      pin: true,
      anticipatePin: 1,
    });

    // Single Master Timeline for the Parade (scrubs all the way to 1800px)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: screen2,
        start: "top top",
        end: "+=1800", // Continues animating while the page scrolls up
        scrub: 1,
      }
    });

    // 1. Baby Luca horizontal movement (Leading the parade)
    if (baby) {
      tl.to(baby, {
        x: "300vw",
        ease: "none",
      }, 0);

      // Baby sprite animation & bounce
      const babySpriteConfig = { frame: 0 };
      tl.to(babySpriteConfig, {
        frame: 18,
        ease: "none",
        onUpdate: () => {
          if (!babySprite) return;
          const currentFrame = Math.floor(babySpriteConfig.frame) % 6;
          const xPos = currentFrame * 20;
          const isUp = currentFrame % 2 !== 0;

          babySprite.style.backgroundPosition = `${xPos}% 0`;
          babySprite.style.transform = `translateY(${isUp ? -8 : 0}px)`;
        }
      }, 0);
    }

    // 2. Bear horizontal movement
    tl.to(bear, {
      x: "300vw",
      ease: "none",
    }, 0);

    // Bear sprite animation (legs & bounce)
    const bearSpriteConfig = { frame: 0 };
    tl.to(bearSpriteConfig, {
      frame: 18,
      ease: "none",
      onUpdate: () => {
        if (!bearSprite) return;
        const currentFrame = Math.floor(bearSpriteConfig.frame) % 6;
        const xPos = currentFrame * 20;
        const isUp = currentFrame % 2 !== 0;

        bearSprite.style.backgroundPosition = `${xPos}% 0`;
        bearSprite.style.transform = `translateY(${isUp ? -8 : 0}px)`;
      }
    }, 0);

    // 3. Rabbit horizontal movement (following behind bear)
    if (rabbit) {
      tl.to(rabbit, {
        x: "300vw",
        ease: "none",
      }, 0);

      // Rabbit sprite animation
      const rabbitSpriteConfig = { frame: 0 };
      tl.to(rabbitSpriteConfig, {
        frame: 24,
        ease: "none",
        onUpdate: () => {
          if (!rabbitSprite) return;
          const currentFrame = Math.floor(rabbitSpriteConfig.frame) % 6;
          const xPos = currentFrame * 20;
          const isUp = currentFrame % 2 !== 0;

          rabbitSprite.style.backgroundPosition = `${xPos}% 0`;
          rabbitSprite.style.transform = `translateY(${isUp ? -10 : 0}px)`;
        }
      }, 0);
    }

    // 4. Bambi (deer) horizontal movement (following behind rabbit)
    if (bambi) {
      tl.to(bambi, {
        x: "300vw",
        ease: "none",
      }, 0);

      // Bambi sprite animation
      const bambiSpriteConfig = { frame: 0 };
      tl.to(bambiSpriteConfig, {
        frame: 20,
        ease: "none",
        onUpdate: () => {
          if (!bambiSprite) return;
          const currentFrame = Math.floor(bambiSpriteConfig.frame) % 6;
          const xPos = currentFrame * 20;
          const isUp = currentFrame % 2 !== 0;

          bambiSprite.style.backgroundPosition = `${xPos}% 0`;
          bambiSprite.style.transform = `translateY(${isUp ? -6 : 0}px)`;
        }
      }, 0);
    }

    // 5. Hedgehog horizontal movement (behind bambi deer, in front of fox)
    if (hedgehog) {
      tl.to(hedgehog, {
        x: "300vw",
        ease: "none",
      }, 0);

      // Hedgehog sprite animation
      const hedgehogSpriteConfig = { frame: 0 };
      tl.to(hedgehogSpriteConfig, {
        frame: 24,
        ease: "none",
        onUpdate: () => {
          if (!hedgehogSprite) return;
          const currentFrame = Math.floor(hedgehogSpriteConfig.frame) % 6;
          const xPos = currentFrame * 20;
          const isUp = currentFrame % 2 !== 0;

          hedgehogSprite.style.backgroundPosition = `${xPos}% 0`;
          hedgehogSprite.style.transform = `translateY(${isUp ? -4 : 0}px)`;
        }
      }, 0);
    }

    // 6. Fox horizontal movement (following behind hedgehog)
    if (fox) {
      tl.to(fox, {
        x: "300vw",
        ease: "none",
      }, 0);

      // Fox sprite animation
      const foxSpriteConfig = { frame: 0 };
      tl.to(foxSpriteConfig, {
        frame: 22,
        ease: "none",
        onUpdate: () => {
          if (!foxSprite) return;
          const currentFrame = Math.floor(foxSpriteConfig.frame) % 6;
          const xPos = currentFrame * 20;
          const isUp = currentFrame % 2 !== 0;

          foxSprite.style.backgroundPosition = `${xPos}% 0`;
          foxSprite.style.transform = `translateY(${isUp ? -6 : 0}px)`;
        }
      }, 0);
    }

    // Fade-in animations for Screen 3 sections
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    if (finalGreetingRef.current) {
      ScrollTrigger.create({
        trigger: finalGreetingRef.current,
        start: 'top 80%',
        onEnter: () => {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.7 },
            colors: ['#7D8F69', '#97532A', '#E8DCC4', '#557153'] // Colores de la temática bosque
          });
        },
        once: true
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleDownloadCalendar = (e) => {
    e.preventDefault();
    
    // Descargar archivo .ics para todos los dispositivos
    // Esto asegura que se abra en el calendario predeterminado de cada persona (Apple Calendar, Samsung Calendar, Outlook, etc.)
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Luca//Cumple//ES',
      'BEGIN:VTIMEZONE',
      'TZID:America/Argentina/Buenos_Aires',
      'BEGIN:STANDARD',
      'DTSTART:19700101T000000',
      'TZOFFSETFROM:-0300',
      'TZOFFSETTO:-0300',
      'END:STANDARD',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      'SUMMARY:Cumple de Luca 1 añito 🎂',
      'DESCRIPTION:¡Te esperamos para festejar el primer año de Luca!',
      'LOCATION:Hurling Club - Paso Morales 620',
      'DTSTART;TZID=America/Argentina/Buenos_Aires:20260920T153000',
      'DTEND;TZID=America/Argentina/Buenos_Aires:20260920T190000',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cumple_luca.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />

      {/* Pantalla de bienvenida / Sobre */}
      <div className={`welcome-overlay ${isOpened ? 'opened' : ''}`}>
        <div className="welcome-content">
          <h2>¡ Estás <br /> invitado!</h2>
          <button className="open-btn" onClick={handleOpenInvitation}>
            Abrir Invitación
          </button>
        </div>
      </div>

      <div className="main-wrapper" ref={containerRef}>
        
        {/* Audio Element */}
        <audio ref={audioRef} src="/musica.mp3" loop preload="auto" />
      
      {/* Floating Audio Button */}
      <button 
        className="floating-audio-btn" 
        onClick={toggleAudio}
        aria-label="Toggle Audio"
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>

      {/* Indicador de Swipe */}
      <div className={`floating-scroll-indicator ${isAtBottom ? 'hidden' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>

      <FallingLeaves />

      {/* Screen 1: Hero Header Section with luca.png background */}
      <div className="hero-header-wrapper">
        <div className="hero-typography-container">
          <p className="subtitle-primer-ano">Te invito a</p>
          <p className="subtitle-primer-ano">MI PRIMER AÑO</p>
          <h1 className="luca-title">Luca</h1>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-wrapper fade-in-section">
        <h2 className="timeline-title">Un añito de aventuras</h2>
        
        <div className="swipe-hint">
          Deslizá para ver mis mejores momentos <span className="swipe-arrow">→</span>
        </div>

        <div className="timeline-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => (
            <div className="timeline-card" key={month}>
              <div className="polaroid-frame">
                <img 
                  src={`/galeria/mes-${month}.webp`} 
                  alt={`${month} Meses`} 
                  className="polaroid-img" 
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="timeline-label">{month} {month === 1 ? 'Mes' : 'Meses'}</div>
            </div>
          ))}
          <div className="timeline-card timeline-final-card">
            <div className="polaroid-frame final-message">
              <span>¡Y el mes 12 lo festejamos juntos! 🥳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen 2: Date, AGENDAR, Forest Parade, Location & VER EN GOOGLE MAPS */}
      <div className="screen-2-wrapper" ref={screen2Ref}>

        {/* Date & AGENDAR Section */}
        <div className="app-container">
          <div className="content-overlay" style={{ gap: '0px', padding: '10px 16px 0px 16px' }}>
            <div className="details-section-wrapper">
              
              {/* Date Box (No box, just floating text) */}
              <div className="details-month" style={{ marginBottom: '-5px' }}>SEPTIEMBRE</div>

              <div className="details-date-grid" style={{ gap: '10px' }}>
                <div className="date-side-col">
                  <div className="divider-line"></div>
                  <span className="date-label">DOMINGO</span>
                  <div className="divider-line"></div>
                </div>

                <div className="date-center-number">20</div>

                <div className="date-side-col">
                  <div className="divider-line"></div>
                  <span className="date-label">15:30 HRS</span>
                  <div className="divider-line"></div>
                </div>
              </div>

              <div className="details-year">2026</div>

              {/* AGENDAR Button (Downloads calendar event) */}
              <button
                onClick={handleDownloadCalendar}
                className="btn-agendar"
              >
                AGENDAR
              </button>
            </div>
          </div>
        </div>

        {/* Pinned Section for Baby, Bear, Rabbit, Bambi, Hedgehog, Fox Parade (Attached right below AGENDAR) */}
        <div className="bear-pin-section" ref={pinRef}>

          {/* Animated Baby Luca Sprite Container (leading in front) */}
          <div className="baby-container" ref={babyRef}>
            <div className="baby-sprite" ref={babySpriteRef}></div>
          </div>

          {/* Animated Bear Sprite Container */}
          <div className="bear-container" ref={bearRef}>
            <div className="bear-sprite" ref={bearSpriteRef}></div>
          </div>

          {/* Animated Rabbit Sprite Container (behind bear) */}
          <div className="rabbit-container" ref={rabbitRef}>
            <div className="rabbit-sprite" ref={rabbitSpriteRef}></div>
          </div>

          {/* Animated Bambi Deer Sprite Container (behind rabbit) */}
          <div className="bambi-container" ref={bambiRef}>
            <div className="bambi-sprite" ref={bambiSpriteRef}></div>
          </div>

          {/* Animated Hedgehog Sprite Container (behind bambi deer, in front of fox) */}
          <div className="hedgehog-container" ref={hedgehogRef}>
            <div className="hedgehog-sprite" ref={hedgehogSpriteRef}></div>
          </div>

          {/* Animated Fox Sprite Container (behind hedgehog) */}
          <div className="fox-container" ref={foxRef}>
            <div className="fox-sprite" ref={foxSpriteRef}></div>
          </div>

        </div>

        {/* Location & VER EN GOOGLE MAPS Section (Appears naturally right after the forest parade with 0 animation effects) */}
        <div className="app-container" style={{ marginTop: '25px', zIndex: 30 }}>
          <div className="content-overlay" style={{ gap: '10px', padding: '0px 16px 0px 16px' }}>

            <div className="details-section-wrapper">
              <div className="location-pin-icon" style={{ marginTop: '0px' }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>

              <div className="location-title">LUGAR DEL CUMPLEAÑOS</div>
              <div className="location-address">PASO MORALES 620</div>
              <div className="location-address">HURLING CLUB</div>

              {/* VER EN GOOGLE MAPS Button (Links to Google Maps) */}
              <a
                href="https://maps.app.goo.gl/xVqTXrm6RwWFeLcP8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-agendar btn-maps"
              >
                VER EN GOOGLE MAPS
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Screen 3: Final Details & RSVPs */}
      <div className="screen-3-wrapper">
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <LeafSeparator />

          {/* Código de vestimenta */}
          <div className="final-section fade-in-section">
            <div className="location-pin-icon" style={{ marginTop: '0px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2a8.59 8.59 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
              </svg>
            </div>
            <div className="location-title">CÓDIGO DE VESTIMENTA</div>
            <div className="location-address" style={{ textTransform: 'none' }}>Cómodo. Y si sos matero/a, ¡trae tu equipo de mate!</div>
          </div>

          <LeafSeparator />

          {/* Confirmar Asistencia */}
          <div className="final-section fade-in-section">
            <div className="location-pin-icon" style={{ marginTop: '0px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="location-title">CONFIRMAR ASISTENCIA</div>
            <div className="location-address" style={{ textTransform: 'none', marginBottom: '15px' }}>Nos haría muy felices que nos acompañes en este día tan especial.</div>
            <button onClick={() => setIsRsvpOpen(true)} className="btn-agendar">
              CONFIRMAR
            </button>
          </div>

          <LeafSeparator />

          {/* Compartir fotos */}
          <div className="final-section fade-in-section">
            <div className="location-pin-icon" style={{ marginTop: '0px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
            <div className="location-title">COMPARTIR FOTOS</div>
            <div className="location-address" style={{ textTransform: 'none', marginBottom: '15px' }}>Ayudanos a guardar los mejores recuerdos de este día ❤️</div>
            <a href="https://photos.app.goo.gl/C5Hzt9sT8H8c79M59" target="_blank" rel="noopener noreferrer" className="btn-agendar">
              SUBIR FOTOS
            </a>
          </div>

          <LeafSeparator />

          <div ref={finalGreetingRef} className="final-greeting fade-in-section" style={{ marginBottom: '15px', marginTop: '0px', lineHeight: '0.8' }}>
            Te esperamos!
          </div>

        </div>
      </div>

      {/* Final Family Photo (Full width, attached to bottom) */}
      <img 
        src="/anto_luca_wal.webp" 
        alt="Anto, Luca y Wal" 
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
      />

    </div>
    </>
  );
}

export default App;
