import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configs for different layers
  const ringSpringConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const blobSpringConfig = { damping: 15, stiffness: 100, mass: 0.8 };

  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);
  
  const blobX = useSpring(mouseX, blobSpringConfig);
  const blobY = useSpring(mouseY, blobSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* 1. Background Blob - Depth Pink (Green in current theme) */}
      <motion.div
        style={{
          left: blobX,
          top: blobY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed w-32 h-32 rounded-full blur-2xl opacity-20 bg-depth-pink"
      />

      {/* 2. Outer Ring - Lidar Cyan (Dim Green in current theme) */}
      <motion.div
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          borderColor: isHovering ? 'var(--color-depth-pink)' : 'var(--color-lidar-cyan)',
          borderWidth: isHovering ? 2 : 1,
        }}
        className="fixed rounded-full border border-lidar-cyan mix-blend-difference transition-colors duration-300"
      />

      {/* 3. Center Dot - White */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        className="fixed w-1.5 h-1.5 bg-white rounded-full z-10"
      />
    </div>
  );
};

export default CustomCursor;
