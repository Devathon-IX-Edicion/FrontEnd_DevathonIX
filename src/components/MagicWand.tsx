import { useEffect, useRef } from 'react';

interface MagicWandProps {
  trigger?: 'mousemove' | 'click';
}

export default function MagicWand({ trigger = 'mousemove' }: MagicWandProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let stars: Star[] = [];
    let lastTime = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Star {
      x: number;
      y: number;
      size: number;
      finalSize: number;
      alpha: number;
      velocityX: number;
      velocityY: number;
      gravity: number;
      drag: number;
      timeElapsed: number;
      constructor(x: number, y: number, vx: number, vy: number) {
        this.x = x;
        this.y = y;
        this.finalSize = Math.random() * 2;
        this.size = this.finalSize * 2;
        this.alpha = 1;
        this.velocityX = vx * 0.05;
        this.velocityY = 1 + Math.random() + vy * 0.05;
        this.gravity = 0.02;
        this.drag = 0.97;
        this.timeElapsed = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update(deltaTime: number) {
        this.x += this.velocityX + (Math.random() * 0.5 - 0.25);
        this.velocityX *= this.drag;
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        this.alpha = Math.max(0, this.alpha - 0.005);
        this.timeElapsed += deltaTime;
        if (this.timeElapsed < 2000) {
          this.size =
            this.finalSize * 2 - (this.finalSize * this.timeElapsed) / 2000;
        } else {
          this.size = this.finalSize;
        }
      }
    }

    function addStar(e: MouseEvent) {
      mouseVelocityX = e.clientX - lastMouseX;
      mouseVelocityY = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      const randomOffsetX = (Math.random() - 0.5) * 100;
      const randomOffsetY = (Math.random() - 0.5) * 100;
      stars.push(
        new Star(
          e.clientX,
          e.clientY,
          mouseVelocityX + randomOffsetX,
          mouseVelocityY + randomOffsetY
        )
      );
    }

    window.addEventListener(trigger, addStar);

    function update(time = 0) {
      const deltaTime = time - lastTime;
      lastTime = time;
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.update(deltaTime);
        star.draw();
      });
      stars = stars.filter(
        (star) =>
          star.alpha > 0 && star.y < height && star.x > 0 && star.x < width
      );
      requestAnimationFrame(update);
    }

    update();

    return () => {
      window.removeEventListener(trigger, addStar);
    };
  }, [trigger]);


  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'transparent',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
