import gsap from 'gsap';
import { useRef } from 'react';
import Letter from './Letter';

export default function FloatLetter() {
  const contRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!contRef.current) return;

    const bounds = contRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };

    const x = center.x * 2 + bounds.width / 2;
    const y = center.y * 2 + bounds.height / 2;

    const maxRotation = 30;
    const rotationX = -(center.y / bounds.height) * maxRotation; // Rotación en el eje X (máximo ±15 grados)
    const rotationY = (center.x / bounds.width) * maxRotation; // Rotación en el eje Y (máximo ±15 grados)

    gsap.to(contRef.current, {
      duration: 0.5,
      rotationY,
      rotationX,
      '--x': `${x}px`,
      '--y': `${y}px`,
      ease: 'power2.out',
      boxShadow: 'var(--default-shadow)',
      scale: 1.05,
    });
  };

  const handleMouseLeave = () => {
    if (!contRef.current) return;

    gsap.to(contRef.current, {
      duration: 2,
      rotationY: 0,
      rotationX: 0,
      '--x': '50%',
      '--y': '10%',
      ease: 'elastic.out(1, 0.3)',
      boxShadow: 'var(--default-shadow)',
      scale: 1,
    });
  };

  return (
    <Letter
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={contRef}
      className='float-letter-container'
      contentLetter={
        <div className='float-letter' style={{}}>
          Hola
        </div>
      }
      titleLetter={<div className='float-letter'>Hola</div>}
      style={
        {
          position: 'fixed',
          inset: '0',
          margin: 'auto',
          zIndex: 1,
          perspective: '1500px',
          willChange: 'transform',
        } as React.CSSProperties
      }
    />
  );
}
