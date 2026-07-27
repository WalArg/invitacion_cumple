import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const bearRef = useRef(null);
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const bear = bearRef.current;
    const container = containerRef.current;
    const bg = bgRef.current;
    const pinSection = pinRef.current;

    if (!bear || !container || !pinSection) return;

    // Background Parallax Phase 1 (Before Pin: 0% -> 35%)
    gsap.fromTo(bg, 
      { backgroundPositionY: "0%" },
      {
        backgroundPositionY: "35%",
        ease: "none",
        scrollTrigger: {
          trigger: pinSection,
          start: "top bottom",
          end: "top top",
          scrub: true
        }
      }
    );

    // Background Parallax Phase 2 (After Pin: 35% -> 100%)
    // Notice during the 2000px pin duration, backgroundPositionY remains frozen at 35%!
    gsap.fromTo(bg, 
      { backgroundPositionY: "35%" },
      {
        backgroundPositionY: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: pinSection,
          start: "top top+=2000",
          end: "bottom bottom",
          scrub: true
        }
      }
    );

    // Bear horizontal movement (Pinned Section)
    gsap.to(bear, {
      x: "150vw", // Move completely across the screen
      ease: "none",
      scrollTrigger: {
        trigger: pinSection,
        start: "top top", // Pin when this section hits the top of the viewport
        end: "+=2000", // Pins for about 2 scrolls
        pin: true,
        scrub: 1,
      }
    });

    // Bear sprite animation tied strictly to the same pin scroll
    const spriteConfig = { frame: 0 };
    gsap.to(spriteConfig, {
      frame: 45, // Number of total walk cycles over the 2000px pin
      ease: "none",
      scrollTrigger: {
        trigger: pinSection,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        onUpdate: () => {
          const currentFrame = Math.floor(spriteConfig.frame) % 6; 
          const xPos = currentFrame * 20; 
          const isUp = currentFrame % 2 !== 0; 
          
          gsap.set(bear, {
            backgroundPosition: `${xPos}% 0`,
            y: isUp ? -12 : 0
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="main-wrapper" ref={containerRef}>
      <div className="woodland-bg" ref={bgRef}></div>
      
      <div className="app-container">
        <div className="content-overlay">
        
        {/* Header Section */}
        <div className="glass-card header-section">
          <h1>¡Luca cumple 1 añito!</h1>
          <p className="subtitle">Acompáñanos a celebrar en el bosque encantado 🌿🐻</p>
          <div className="scroll-indicator">Deslizá hacia abajo 👇</div>
        </div>

        {/* Spacer before bear pin */}
        <div style={{ height: '20vh' }}></div>

        </div>
      </div>

      {/* Pinned Section for Bear */}
      <div className="bear-pin-section" ref={pinRef} style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <div className="bear-container" ref={bearRef}></div>
      </div>

      <div className="app-container">
        <div className="content-overlay">

        {/* Spacer after bear pin */}
        <div style={{ height: '20vh' }}></div>

        {/* Event Details Section */}
        <div className="glass-card details-section">
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

        {/* Spacer */}
        <div style={{ height: '20vh' }}></div>

        {/* RSVP Section */}
        <div className="glass-card rsvp-section">
          <h2>Confirmar Asistencia</h2>
          <p style={{ marginBottom: '20px' }}>Por favor, confirmanos tu presencia antes del 10 de Noviembre.</p>
          <a href="https://wa.me/?text=¡Hola!%20Confirmo%20mi%20asistencia%20al%20cumple%20de%20Luca" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
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
