import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";

// This creates an animatable version of the React Router Link component
const MotionLink = motion.create(Link);

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Parallax effect: moves the background slower than the scroll
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="hero-viewport">
      {/* Background Layer */}
      <motion.div style={{ y: yParallax }} className="hero-background-container">
        <img
          src="https://t4.ftcdn.net/jpg/01/35/16/37/360_F_135163711_hRXMeVFwA20ddhBUFE9yiyirf7MhPWpw.jpg"
          alt="Ethiopian Landscape"
          className="hero-image-media"
        />
        <div className="overlay-vignette"></div>
        <div className="overlay-texture-grid"></div>
      </motion.div>

      {/* Content Layer */}
      <div className="hero-content">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hero-subtitle"
        >
          Discover the Cradle of Humanity
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title"
        >
          Where <span className="highlight">History</span><br />
          <span className="outline-text">Meets</span> Adventure
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="hero-text"
        >
          Experience authentic journeys through Ethiopia's ancient wonders, 
          dramatic landscapes, and vibrant cultures.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <MotionLink 
            to="/tours" 
            className="hero-btn-premium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="btn-text">Start Your Journey</span>
            <div className="btn-icon-wrapper">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="btn-icon" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </div>
          </MotionLink>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="scroll-indicator"
      >
        {/* You can add a mouse icon or arrow here if needed */}
      </motion.div>
    </section>
  );
};

export default Hero;