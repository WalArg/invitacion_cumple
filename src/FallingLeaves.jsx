import React, { useMemo } from 'react';
import './index.css';

const FallingLeaves = () => {
  // Generamos una cantidad fija de hojas con propiedades aleatorias para la animación
  const leaves = useMemo(() => {
    const leafCount = 15; // Cantidad de hojas en pantalla
    const newLeaves = [];
    
    const colors = [
      '%23c28b5a', // Marrón otoño
      '%238a9a5b', // Verde musgo
      '%23d4a373'  // Arena/Dorado
    ];

    for (let i = 0; i < leafCount; i++) {
      const left = Math.random() * 100; // Posición horizontal 0-100%
      const animationDuration = 10 + Math.random() * 15; // Entre 10s y 25s cayendo
      const animationDelay = Math.random() * 15; // Retardo inicial
      const size = 15 + Math.random() * 20; // Tamaño entre 15px y 35px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // SVG básico de una hoja
      const leafSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" opacity="0.6"><path d="M17.66 11.2c-.23-3.15-2.2-6.53-5.22-8.87a1 1 0 0 0-1.2 0c-3.03 2.34-5 5.72-5.23 8.87-.1 1.48.16 2.97.77 4.29 1.45 3.16 4.34 5.3 4.8 5.62a1 1 0 0 0 1.13 0c.45-.31 3.34-2.45 4.79-5.61.6-1.32.86-2.81.76-4.3z"/></svg>`;

      newLeaves.push({
        id: i,
        left: `${left}%`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${animationDelay}s`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url('${leafSvg}')`
      });
    }
    return newLeaves;
  }, []);

  return (
    <div className="falling-leaves-container">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf"
          style={{
            left: leaf.left,
            animationDuration: `${leaf.animationDuration}, 4s`,
            animationDelay: `${leaf.animationDelay}, ${leaf.animationDelay}`,
            width: leaf.width,
            height: leaf.height,
            backgroundImage: leaf.backgroundImage
          }}
        />
      ))}
    </div>
  );
};

export default FallingLeaves;
