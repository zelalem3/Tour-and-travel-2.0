import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../sanityClient'; 
import { Compass } from 'lucide-react';

export default function Tours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "tour"] | order(_createdAt asc) {
      _id,
      title,
      price,
      description,
      "slug": slug.current,
      mainImage {
        asset-> {
          _id,
          url,
          metadata {
            lqip
          }
        }
      }
    }`;

    client.fetch(query)
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // Animation Variants
  const pageRenderProps = {
    initial: { opacity: 0, filter: "blur(20px)", scale: 1.05 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    transition: { duration: 1.2, ease: "easeOut" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      rotateX: 45, 
      scale: 0.9,
      filter: "blur(10px)"
    },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 20,
        duration: 1 
      }
    }
  };

  const imageHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1, 
      transition: { duration: 1.5, ease: "easeOut" } 
    }
  };

  return (
    <>
      <Helmet>
        <title>Premium Expeditions | Explore Ethiopia's Legacy</title>
        <meta name="description" content="Discover unrivaled guided tours through Ethiopia. Experience ancient history, breathtaking landscapes, and luxury expeditions." />
        <meta name="keywords" content="Ethiopia tours, luxury travel, Danakil Depression, Lalibela, Simien Mountains, African safari" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Unrivaled Expeditions | Choose Your Legacy" />
        <meta property="og:description" content="Book your next journey through the heart of Ethiopia with our curated tour packages." />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Ethiopian Expeditions" />
        <meta name="twitter:description" content="Explore ancient landscapes and hidden gems." />
      </Helmet>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 0.8 } }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '100vh', 
              backgroundColor: '#020617',
              gap: '30px'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Compass size={64} strokeWidth={1} />
            </motion.div>
          
            <div style={{ textAlign: 'center' }}>
              <motion.div 
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: '900', 
                  color: '#fbbf24', 
                  letterSpacing: '6px',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                Expedition Intelligence
              </motion.div>
              
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#ffffff', 
                letterSpacing: '1px',
                position: 'relative'
              }}>
                MAPPING YOUR <span style={{ color: '#fbbf24' }}>ROUTE...</span>
                <motion.div 
                  initial={{ width: 0, left: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  style={{ 
                    height: '2px', 
                    backgroundColor: '#fbbf24', 
                    marginTop: '8px',
                    boxShadow: '0 0 10px #fbbf24'
                  }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            {...pageRenderProps}
            style={{ 
              padding: '120px 20px', 
              backgroundColor: '#020617', 
              minHeight: '100vh',
              perspective: '1200px'
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              style={{ textAlign: 'center', marginBottom: '80px' }}
            >
              <span style={{ color: '#fbbf24', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '6px', fontSize: '0.7rem' }}>
                Unrivaled Expeditions
              </span>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: '900', color: '#ffffff', marginTop: '10px', letterSpacing: '-4px', lineHeight: 0.9 }}>
                CHOOSE YOUR <span style={{ color: '#fbbf24' }}>LEGACY</span>
              </h1>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: '50px',
                maxWidth: '1400px',
                margin: '0 auto'
              }}
            >
              {tours.map((tour) => (
                <motion.div
                  key={tour._id}
                  variants={cardVariants}
                  whileHover="hover"
                  initial="rest"
                  style={{
                    backgroundColor: '#0f172a',
                    borderRadius: '40px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(255,255,255,0.05)',
                    position: 'relative'
                  }}
                >
                  <Link to={`/tours/${tour.slug}`} aria-label={`View details for ${tour.title}`} style={{ textDecoration: 'none', display: 'block', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '320px', 
                      width: '100%', 
                      position: 'relative', 
                      overflow: 'hidden',
                      backgroundColor: '#020617',
                      backgroundImage: `url(${tour.mainImage?.asset?.metadata?.lqip})`,
                      backgroundSize: 'cover'
                    }}>
                      {tour.mainImage && (
                        <motion.img
                          variants={imageHover}
                          src={urlFor(tour.mainImage).width(800).auto('format').quality(80).url()}
                          alt={tour.title}
                          loading="lazy" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                      <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(to top, #0f172a 5%, transparent 60%)' 
                      }}></div>
                      
                      <div style={{ 
                        position: 'absolute', top: '25px', right: '25px', 
                        background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(10px)',
                        padding: '8px 20px', borderRadius: '50px', border: '1px solid #fbbf24'
                      }}>
                        <span style={{ color: '#fbbf24', fontWeight: '900' }}>${tour.price}</span>
                      </div>
                    </div>
                  </Link>

                  <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Link to={`/tours/${tour.slug}`} style={{ textDecoration: 'none' }}>
                      <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#ffffff', marginBottom: '15px', letterSpacing: '-1px' }}>
                        {tour.title}
                      </h2>
                    </Link>
                    
                    <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.8', marginBottom: '30px', flexGrow: 1 }}>
                      {tour.description ? tour.description.substring(0, 120) + "..." : "Unlock the secrets of Ethiopia's ancient landscapes."}
                    </p>

                    <div style={{ 
                      marginTop: 'auto', 
                      paddingTop: '30px', 
                      borderTop: '1px solid rgba(255,255,255,0.05)', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}>
                      <Link to={`/tours/${tour.slug}`} style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none' }}>
                        View Details →
                      </Link>

                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          backgroundColor: '#fbbf24',
                          color: '#020617',
                          padding: '18px 35px',
                          borderRadius: '20px',
                          fontWeight: '900',
                          border: 'none',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          fontSize: '0.8rem'
                        }}
                        onClick={() => navigate("/contact", { state: { tour: tour.title } })}
                      >
                        Reserve Spot
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}