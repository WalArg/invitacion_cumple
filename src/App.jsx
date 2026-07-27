import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const bearRef = useRef(null);
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const bear = bearRef.current;
    const container = containerRef.current;
    const bg = bgRef.current;

    if (!bear || !container) return;

    // Parallax background
    gsap.to(bg, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // Bear horizontal movement
    gsap.to(bear, {
      x: "130vw", // Move across the screen
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=3000", // Spread the movement over 3000px of scrolling (approx 3 viewports)
        scrub: 1,
      }
    });

    // Bear sprite animation (Infinite walking legs)
    gsap.to(bear, {
      backgroundPosition: "100% 0",
      ease: "steps(5)",
      repeat: -1,
      duration: 0.8 // Normal walking speed
    });

    // Bear subtle bounce
    gsap.to(bear, {
      y: "-=16px",
      duration: 0.4,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
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
        
        {/* Spacer to allow scrolling and testing animations */}
        <div style={{ height: '300vh' }}></div>

        </div>
      </div>

      {/* Animated Bear Sprite Container */}
      <div className="bear-container" ref={bearRef}></div>
      
    </div>
  );
}

export default App;
