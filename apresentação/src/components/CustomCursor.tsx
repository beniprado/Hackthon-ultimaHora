import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Ambient Large Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl z-0"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
      />

      {/* Crisp Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full z-50 shadow-[0_0_15px_#00f0ff]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.2 }}
      />
    </>
  );
};
