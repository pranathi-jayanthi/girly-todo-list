import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  hoverTarget: string;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    hoverTarget: '',
  });

  // Smooth cursor movement
  const cursorX = useSpring(useMotionValue(0), { damping: 20, stiffness: 300 });
  const cursorY = useSpring(useMotionValue(0), { damping: 20, stiffness: 300 });
  const cursorControls = useAnimation();
  const trailElements = Array.from({ length: 5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCursor(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
    };

    const handleMouseDown = () => {
      setCursor(prev => ({ ...prev, isClicking: true }));
      cursorControls.start({
        scale: 0.9,
        transition: { duration: 0.1 }
      });
    };

    const handleMouseUp = () => {
      setCursor(prev => ({ ...prev, isClicking: false }));
      cursorControls.start({
        scale: 1,
        transition: { duration: 0.1 }
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        setCursor(prev => ({
          ...prev,
          isHovering: true,
          hoverTarget: target.tagName.toLowerCase()
        }));
      }
    };

    const handleMouseLeave = () => {
      setCursor(prev => ({ ...prev, isHovering: false, hoverTarget: '' }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [cursorControls, cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference"
        animate={cursorControls}
        style={{
          x: cursorX,
          y: cursorY,
          width: cursor.isHovering ? '40px' : '20px',
          height: cursor.isHovering ? '40px' : '20px',
        }}
      >
        <div
          className={`relative w-full h-full rounded-full bg-[#0059ff] transition-all duration-200
            ${cursor.isHovering ? 'scale-150 opacity-70' : 'scale-100 opacity-100'}
          `}
          style={{
            background: `radial-gradient(circle at center,
              #0059ff,
              #4a00e0,
              #00b4d8
            )`,
            animation: 'rotate 4s linear infinite',
          }}
        />
      </motion.div>

      {/* Cursor trail */}
      {trailElements.map((_, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed top-0 left-0 z-40 w-2 h-2 rounded-full mix-blend-difference"
          style={{
            x: cursorX,
            y: cursorY,
            opacity: 1 - (index * 0.2),
            scale: 1 - (index * 0.1),
            background: `hsl(${220 + (index * 10)}, 100%, 50%)`,
            filter: 'blur(1px)',
            transition: `all 0.15s ease ${index * 0.05}s`,
          }}
        />
      ))}

      {/* Click ripple effect */}
      {cursor.isClicking && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-30 w-20 h-20 rounded-full"
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            x: cursor.x - 40,
            y: cursor.y - 40,
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      )}

      {/* Magnetic field for interactive elements */}
      <motion.div
        ref={cursorOuterRef}
        className="pointer-events-none fixed top-0 left-0 z-40 w-32 h-32 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursor.isHovering ? 0.2 : 0,
          scale: cursor.isHovering ? 1 : 0.5,
          background: 'radial-gradient(circle, rgba(0,89,255,0.2) 0%, rgba(0,89,255,0) 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
} 