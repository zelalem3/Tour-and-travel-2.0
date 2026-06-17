import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom'; // 1. Import useLocation

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation(); // 2. Initialize location

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. Logic: If we are on the contact page, don't render this bar at all
  // This prevents the "Double Bar" overlap issue.
  if (location.pathname === "/contact") {
    return null;
  }

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: '#fbbf24',
        transformOrigin: '0%',
        zIndex: 9999,
      }}
    />
  );
};

export default ScrollProgress;