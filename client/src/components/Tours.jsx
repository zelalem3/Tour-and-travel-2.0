import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { client, urlFor } from '../sanityClient'; 
import { motion } from 'framer-motion'; 

const letterVariants = {
  hidden: { y: -100, opacity: 0, rotate: -15 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      delay: Math.random() * 0.8, 
      type: "spring",
      damping: 12,
      stiffness: 100,
    }
  })
};


const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -100 : 100,
    rotate: i % 2 === 0 ? -5 : 5,
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 40, damping: 20, duration: 1 }
  },
  hover: {
    y: -15,
    scale: 1.02,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  tap: { scale: 0.98, y: -5 }
};

export default function Tours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
   
    const query = '*[_type == "tour" && Priority == 1] | order(_createdAt asc)';
    client.fetch(query).then((data) => {
      setTours(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <motion.div 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ repeat: Infinity, duration: 1 }} 
        className="text-[#fbbf24] font-black tracking-widest text-xs"
      >
        LOADING EXPEDITIONS...
      </motion.div>
    </div>
  );

  return (
    <div style={{ 
      padding: '120px 20px', 
      backgroundColor: '#020617', 
      minHeight: '100vh', 
      overflowX: 'hidden' 
    }}>
      
  
      <header style={{ 
        maxWidth: '1400px', 
        margin: '0 auto 80px auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center' 
      }}>
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          className="highlight"
          viewport={{ once: false, margin: "-100px" }}
          style={{
            fontSize: "clamp(40px, 9vw, 75px)",
            fontWeight: '900',
            color: '#ffffff',
            textTransform: 'uppercase',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center', 
            lineHeight: '1',
            marginBottom: '25px',
            width: '100%' 
          }}
        >
         <Link 
  to="/tours" 
  style={{ 
    display: 'flex', 
    textDecoration: 'none', 
    alignItems: 'center' 
  }}
>
  {"Our Tours".split(" ").map((word, wordIdx) => (
    <span 
      key={wordIdx} 
      style={{ display: 'flex', whiteSpace: 'pre' }}
    >
      {word.split("").map((char, charIdx) => (
        <span 
          key={charIdx} 
          style={{ overflow: 'hidden', display: 'inline-block' }}
        >
          <motion.span 
            custom={charIdx} 
            variants={letterVariants}
            style={{ 
              display: 'inline-block',
              color: word === "Tours" ? '#fbbf24' : '#ffffff',
              fontStyle: word === "Tours" ? 'italic' : 'normal',
              paddingRight: '0.02em'
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
      {/* Adds space after "Our" but not after "Tours" */}
      {wordIdx === 0 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
    </span>
  ))}
</Link>
          
        </motion.h2>

        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 1, ease: "circOut" }}
          style={{ height: '6px', width: '140px', backgroundColor: '#fbbf24', borderRadius: '4px' }}
        />
      </header>


      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '50px',
        maxWidth: '1400px',
        margin: '0 auto',

        
      }}>
        {tours.map((tour, i) => (
          <Link 
            key={tour._id} 
            to={`/tours/${tour.slug?.current}`} 
            style={{ textDecoration: 'none' }}
            
          >
            <motion.div
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="tap"
              viewport={{ once: false, amount: 0.1 }}
              style={{
                backgroundColor: '#0f172a',
                borderRadius: '48px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.03)',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease'
              }}
            >
              <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  transition={{ duration: 0.8 }} 
                  style={{ height: '100%', width: '100%' }}
                >
                  {tour.mainImage && (
                    <img
  src={urlFor(tour.mainImage)
    .width(600)           
    .auto('format')       
    .fit('max')           
    .quality(80)         
    .url()}
  alt={tour.title}
  loading="lazy"          
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
                  )}
                </motion.div>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, #0f172a 5%, transparent 40%)' 
                }} />
              </div>

              <div style={{ padding: '45px 40px' }}>
                <h3 className="highlight" style={{ 
                  fontSize: '2.2rem', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  marginBottom: '12px', 
                  letterSpacing: '-1.5px',
                  lineHeight: '1.1',
                  
              
                }} >
                  {tour.title}
                </h3>
                
                <p  style={{ 
                  color: '#f0f1f3', 
                  fontSize: '1rem', 
                  lineHeight: '1.7', 
                  marginBottom: '35px'
                }}>
                  {tour.description ? tour.description.substring(0, 110) + "..." : "Embark on an unparalleled journey through history."}
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderTop: '1px solid rgba(255,255,255,0.08)', 
                  paddingTop: '35px' 
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>
                      ${tour.price}
                    </span>
                    <span style={{ 
                      fontSize: '11px', 
                      color: '#fbbf24', 
                      fontWeight: '800', 
                      textTransform: 'uppercase'
                    }}>
                      Per Explorer
                    </span>
                  </div>
                  
                  <button
                    style={{
                      backgroundColor: '#fbbf24',
                      color: '#020617',
                      padding: '18px 36px',
                      borderRadius: '26px',
                      fontWeight: '900',
                      border: 'none',
                      fontSize: '13px',
                      letterSpacing: '1px',
                      boxShadow: '0 15px 30px rgba(251,191,36,0.15)',
                      cursor: 'pointer'
                    }}
                  >
                    VIEW MISSION
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}