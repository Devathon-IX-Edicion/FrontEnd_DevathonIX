import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'motion/react';
import { MoveLeft, MoveRight } from 'lucide-react';

const START_INDEX = 1;
const DRAG_THRESHOLD = 150;
const CARD_COUNT = 5;

export default function Carousel() {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(START_INDEX);
  const canScrollPrev = activeSlide > 0;
  const canScrollNext = activeSlide < CARD_COUNT - 1;
  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150,
  });
  const [isDragging, setIsDragging] = useState(false);
  console.log('activeSlide', isDragging);
  function handleDragSnap(
    _: MouseEvent,
    { offset: { x: dragOffset } }: PanInfo
  ) {
    setIsDragging(false);
    animatedX.stop();
    const currentOffset = offsetX.get();
    if (
      Math.abs(dragOffset) < DRAG_THRESHOLD ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      return;
    }
    const newIndex = dragOffset > 0 ? activeSlide - 1 : activeSlide + 1;
    if (newIndex >= 0 && newIndex < CARD_COUNT) {
      setActiveSlide(newIndex);
    }
  }

  function scrollPrev() {
    if (!canScrollPrev) return;
    setActiveSlide((prev) => prev - 1);
  }
  function scrollNext() {
    if (!canScrollNext) return;
    setActiveSlide((prev) => prev + 1);
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
      <ul
        ref={containerRef}
        style={{
          display: 'flex',
          gap: '16px',
          padding: 0,
          margin: 0,
          listStyle: 'none',
          touchAction: 'pan-x',
          transform: `translateX(calc(-${activeSlide} * (300px * 16 / 9 + 16px)))`,
          transition: 'transform 0.3s cubic-bezier(.4,1,.4,1)',
        }}
      >
        {Array(CARD_COUNT)
          .fill(null)
          .map((_, i) => (
            <motion.li
              key={i}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragSnap}
              style={{
                x: animatedX,
                aspectRatio: '9/16',
                height: '300px',
                width: 'calc(300px * 9 / 16)',
                flexShrink: 0,
                background: '#e5e7eb',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ))}
      </ul>
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#fff',
          borderRadius: '9999px',
          padding: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: 'none',
          cursor: canScrollPrev ? 'pointer' : 'not-allowed',
          zIndex: 1,
        }}
      >
        <MoveLeft />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#fff',
          borderRadius: '9999px',
          padding: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: 'none',
          cursor: canScrollNext ? 'pointer' : 'not-allowed',
          zIndex: 1,
        }}
      >
        <MoveRight />
      </button>
    </div>
  );
}
