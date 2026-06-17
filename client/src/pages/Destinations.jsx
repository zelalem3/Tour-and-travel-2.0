import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// 1. Import urlFor from your central config to fix the deprecation error
import { client, urlFor } from '../sanityClient'; 
import { motion } from 'framer-motion';
import './Destinations.css';
import { MapPin, Compass } from 'lucide-react';

// REMOVED: imageUrlBuilder and local 'builder' definitions

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const query = `*[_type == "destination" ] | order(_createdAt asc) {
         name,
         "desc": description,
         "slug": slug.current,
         "location": location,
         "mainImage": mainImage.asset->{
           _id,
           url,
           metadata { lqip }
         }
       }`;
   
    client.fetch(query).then((data) => {
      setDestinations(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return (
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
  );

  return (
    <div className="destinations-page">
      <header className="dest-header">
        <span className="dest-subtitle">Explore the Horn of Africa</span>
        <h1>Our Destinations</h1>
      </header>

      <div className="dest-grid">
        {destinations.map((dest, i) => {
          const currentSlug = dest.slug;
          const isLoaded = loadedImages[currentSlug];

          return (
            <motion.div
              key={currentSlug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/destinations/${currentSlug}`} className="dest-card">
                <div className="dest-image-container">
                  <div 
                    className="dest-placeholder"
                    style={{ backgroundImage: `url(${dest.mainImage?.metadata?.lqip})` }}
                  />
                  
                  <img
                    // Using the shared urlFor with width constraint for better performance
                    src={urlFor(dest.mainImage?._id).width(800).url()}
                    alt={dest.name}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [currentSlug]: true }))}
                    className={`dest-main-img ${isLoaded ? 'is-loaded' : 'is-loading'}`}
                  />
                  
                  <div className="dest-overlay-gradient" />
                  
                  <div className="dest-card-content">
                    <span className="dest-tag"> <MapPin size={14} /> {dest.location || "Ethiopia"}</span>
                    <h3 className="dest-card-title">{dest.name}</h3>
                    <div className="dest-footer-info">
                      <span className="dest-btn">Explore →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Destinations;