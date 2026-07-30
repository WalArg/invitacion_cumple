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

    if (!bear || !container || !pinSection) return;

    // Single Master Timeline for the Pinned Section (Fast, responsive pin duration for mobile)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection,
        start: "top top",
        end: "+=900",
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

  return (
    <div className="main-wrapper" ref={containerRef}>

      {/* Screen 1: Hero Header Section with luca.png background */}
      <div className="hero-header-wrapper">
        <div className="hero-typography-container">
          <h1 className="luca-title">Luca</h1>
          <p className="subtitle-primer-ano">Te invito a</p>
          <p className="subtitle-primer-ano">MI PRIMER AÑO</p>
        </div>
      </div>

      {/* Screen 2: Full-screen Date & AGENDAR Section with snap transition */}
      <div className="date-screen-wrapper">
        <div className="app-container">
          <div className="details-section-wrapper">
            <div className="details-month">NOVIEMBRE</div>

            <div className="details-date-grid">
              <div className="date-side-col">
                <div className="divider-line"></div>
                <span className="date-label">SÁBADO</span>
                <div className="divider-line"></div>
              </div>

              <div className="date-center-number">15</div>

              <div className="date-side-col">
                <div className="divider-line"></div>
                <span className="date-label">16:00 HRS</span>
                <div className="divider-line"></div>
              </div>
            </div>

            <div className="details-year">2026</div>

            {/* AGENDAR Button (Downloads calendar event) */}
            <a 
              href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:Cumple de Luca 1 añito 🎂%0ADESCRIPTION:¡Te esperamos para festejar el primer año de Luca!%0ALOCATION:Av. Vergara 5415, Hurling Club%0ADTSTART:20261115T190000Z%0ADTEND:20261115T230000Z%0AEND:VEVENT%0AEND:VCALENDAR" 
              download="cumple_luca.ics" 
              className="btn-agendar"
            >
              AGENDAR
            </a>
          </div>
        </div>
      </div>

      {/* Screen 3: Pinned Section for Baby, Bear, Rabbit, Bambi, Hedgehog, Fox Parade */}
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

      {/* Screen 4: Location, VER EN GOOGLE MAPS & RSVP Section */}
      <div className="app-container">
        <div className="content-overlay" style={{ gap: '30px', padding: '25px 16px' }}>

          {/* Location Pin Icon & Details */}
          <div className="details-section-wrapper">
            <div className="location-pin-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>

            <div className="location-title">LUGAR DEL CUMPLEAÑOS</div>
            <div className="location-address">AV. VERGARA 5415</div>
            <div className="location-address">HURLING CLUB</div>

            {/* VER EN GOOGLE MAPS Button (Links to Google Maps) */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Av.+Vergara+5415,+Hurling+Club" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-agendar btn-maps"
            >
              VER EN GOOGLE MAPS
            </a>
          </div>

          {/* Spacer before RSVP */}
          <div style={{ height: '2vh' }}></div>

          {/* RSVP Section */}
          <div className="glass-card rsvp-section">
            <h2>Confirmar Asistencia</h2>
            <p style={{ marginBottom: '20px' }}>Por favor, confirmanos tu presencia antes del 10 de Noviembre.</p>
            <a href="https://wa.me/?text=¡Hola!%20Confirmo%20mi%20asistencia%20al%20cumple%20de%20Luca" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Confirmar por WhatsApp
            </a>
          </div>

          {/* Ample bottom headroom */}
          <div style={{ height: '40vh' }}></div>

        </div>
      </div>

    </div>
  );
}

export default App;
