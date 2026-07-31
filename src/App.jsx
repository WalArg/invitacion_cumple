import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
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

    // Single Master Timeline for the Pinned Section (Parade of 6 animals)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: screen2, /* Pin the entire screen 2 so Date and Location stay visible */
        start: "top top",
        end: "+=1800", /* Increased from 900 to 1800 to make the animation take more scrolling, thus appearing slower */
        pin: true,
        anticipatePin: 1,
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleDownloadCalendar = (e) => {
    e.preventDefault();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Cumple de Luca 1 añito 🎂
DESCRIPTION:¡Te esperamos para festejar el primer año de Luca!
LOCATION:Paso Morales 620
DTSTART:20260920T183000Z
DTEND:20260920T220000Z
END:VEVENT
END:VCALENDAR`;

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
    <div className="main-wrapper" ref={containerRef}>

      {/* Screen 1: Hero Header Section with luca.png background */}
      <div className="hero-header-wrapper">
        <div className="hero-typography-container">
          <p className="subtitle-primer-ano">Te invito a</p>
          <p className="subtitle-primer-ano">MI PRIMER AÑO</p>
          <h1 className="luca-title">Luca</h1>
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
          <div className="content-overlay" style={{ gap: '10px', padding: '0px 16px 20px 16px' }}>

            <div className="details-section-wrapper">
              <div className="location-pin-icon" style={{ marginTop: '0px' }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>

              <div className="location-title">LUGAR DEL CUMPLEAÑOS</div>
              <div className="location-address">PASO MORALES 620</div>

              {/* VER EN GOOGLE MAPS Button (Links to Google Maps) */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Paso+Morales+620"
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
          
          {/* Código de vestimenta */}
          <div className="final-section">
            <div className="location-pin-icon" style={{ marginTop: '0px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2a8.59 8.59 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
              </svg>
            </div>
            <div className="location-title">CÓDIGO DE VESTIMENTA</div>
            <div className="location-address" style={{ textTransform: 'none' }}>Cómo te sientas cómodo/a</div>
            <div className="location-address" style={{ textTransform: 'none' }}>y recordá traer tu equipo de mate.</div>
          </div>

          {/* Confirmar Asistencia */}
          <div className="final-section">
            <div className="location-pin-icon" style={{ marginTop: '0px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="location-title">CONFIRMAR ASISTENCIA</div>
            <div className="location-address" style={{ textTransform: 'none', marginBottom: '15px' }}>Tu presencia es muy importante para nosotros.</div>
            <a href="https://forms.gle/7HedJ1VvKDJSKKR1A" target="_blank" rel="noopener noreferrer" className="btn-agendar">
              CONFIRMAR
            </a>
          </div>

          {/* Compartir fotos */}
          <div className="final-section">
            <div className="location-pin-icon" style={{ marginTop: '0px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
            <div className="location-title">COMPARTIR FOTOS</div>
            <div className="location-address" style={{ textTransform: 'none', marginBottom: '15px' }}>Compartí las fotos y/o videos de este día especial.</div>
            <a href="https://photos.app.goo.gl/C5Hzt9sT8H8c79M59" target="_blank" rel="noopener noreferrer" className="btn-agendar">
              SUBIR FOTOS
            </a>
          </div>

          <div className="final-greeting" style={{ marginBottom: '40px' }}>
            Te esperamos!
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
