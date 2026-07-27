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
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const pinRef = useRef(null);
  const detailsCardRef = useRef(null);

  useEffect(() => {
    const baby = babyRef.current;
    const babySprite = babySpriteRef.current;
    const bear = bearRef.current;
    const bearSprite = bearSpriteRef.current;
    const rabbit = rabbitRef.current;
    const rabbitSprite = rabbitSpriteRef.current;
    const container = containerRef.current;
    const bg = bgRef.current;
    const pinSection = pinRef.current;
    const detailsCard = detailsCardRef.current;

    if (!bear || !container || !pinSection) return;

    // Pin background image at the exact same time as bear pin section
    if (bg) {
      ScrollTrigger.create({
        trigger: pinSection,
        start: "top top",
        end: "+=1200",
        pin: bg,
        pinSpacing: false
      });
    }

    // Single Master Timeline for the Pinned Section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection,
        start: "top top",
        end: "+=1200",
        pin: true,
        scrub: 1,
      }
    });

    // 1. Baby Luca horizontal movement (Leading the parade)
    if (baby) {
      tl.to(baby, {
        x: "150vw",
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
      x: "150vw",
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
        x: "150vw",
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

    // 4. Event Details card fade-in animation
    if (detailsCard) {
      tl.fromTo(detailsCard, 
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="main-wrapper" ref={containerRef}>

      {/* Full-width continuous woodland background visible from the very top */}
      <div className="woodland-bg" ref={bgRef}></div>

      <div className="app-container">
        <div className="content-overlay">

          {/* Header Section */}
          <div className="glass-card header-section">
            <h1>¡Luca cumple 1 añito!</h1>
            <p className="subtitle">Acompáñanos a celebrar en el bosque 🌿</p>
            <div className="scroll-indicator">Deslizá hacia abajo 👇</div>
          </div>

          {/* Spacer before bear pin */}
          <div style={{ height: '20vh' }}></div>

        </div>
      </div>

      {/* Pinned Section for Baby, Bear, Rabbit & Event Details */}
      <div className="bear-pin-section" ref={pinRef}>
        
        {/* Event Details Section positioned at the top of the mobile screen */}
        <div className="glass-card details-section" ref={detailsCardRef} style={{ width: '90%', maxWidth: '440px', zIndex: 15 }}>
          <h2>Detalles del evento</h2>
          <ul className="details-list">
            <li>📅 <strong>Fecha:</strong> Sábado 15 de Noviembre</li>
            <li>⏰ <strong>Hora:</strong> 16:00 hs</li>
            <li>📍 <strong>Lugar:</strong> Salón El Bosque</li>
          </ul>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Ver en Google Maps
          </a>
        </div>

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

      </div>

      <div className="app-container">
        <div className="content-overlay">

          {/* Spacer after bear pin */}
          <div style={{ height: '20vh' }}></div>

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

          {/* Spacer */}
          <div style={{ height: '20vh' }}></div>

        </div>
      </div>

    </div>
  );
}

export default App;
