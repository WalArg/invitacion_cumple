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

    // Bear sprite animation tied strictly to scroll
    const spriteConfig = { frame: 0 };
    gsap.to(spriteConfig, {
      frame: 60, // Total frames to walk across the 3000px scroll (10 full walk cycles)
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=3000",
        scrub: 1, // Smooth matching to scroll speed
        onUpdate: () => {
          // Math.floor ensures it snaps perfectly to the frames (0 to 5)
          const currentFrame = Math.floor(spriteConfig.frame) % 6; 
          // Using exactly 20% steps for a 6-frame sprite sheet
          const xPos = currentFrame * 20; 
          
          // Bounce effect tied directly to the walk cycle
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
