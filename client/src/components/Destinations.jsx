import React, { useEffect, useState, useRef } from 'react';
import './Destinations.css';
import { client } from '../sanityClient';
import { motion, useScroll, useTransform } from 'framer-motion';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    // Ensuring we fetch 'name' as defined in your CMS
    const query = `*[_type == "destination"] | order(_createdAt asc) {
      name,
      "desc": description,
      "slug": slug.current,
      "mainImage": mainImage.asset->{
        _id,
        url,
        metadata { lqip }
      }
    }`;

    client.fetch(query)
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Sanity error:", err));
  }, []);

  const handleImageLoad = (slug) => {
    setLoadedImages((prev) => ({ ...prev, [slug]: true }));
  };

  // PARALLAX LOGIC
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // ZOOM VARIANTS
  const imageZoomVariants = {
    initial: { scale: 1.3 },
    hover: { 
      scale: 1.5, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="destinations" ref={containerRef} className="dest-section">
      <div className="dest-container">
        
        <header className="dest-header">
          <motion.h2 
            className="dest-title font-black uppercase italic"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
            <span className="word-wrapper">
              {"Explore".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </span>

            <span className="word-wrapper font-playfair highlight normal-case" >
              {"Ethiopia".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants} style={{ display: 'inline-flex' }}>
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ delay: 0.8 }}
            className="dest-subtitle"
          >
            Curated territories for the modern explorer.
          </motion.p>
        </header>

        <div className="dest-dual-grid">
          {destinations.map((dest) => (
            <motion.a
              href={`/destinations/${dest.slug}`}
              key={dest.slug}
              className="dest-item-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              whileHover="hover" // This triggers the zoom variant in the child
              viewport={{ once: false, amount: 0.1 }}
            >
              <div className="dest-img-container">
                <div 
                  className="blur-up-layer"
                  style={{ 
                    backgroundImage: `url(${dest.mainImage?.metadata?.lqip})`,
                    opacity: loadedImages[dest.slug] ? 0 : 1
                  }}
                />

                {dest.mainImage && (
                  <motion.img 
                    variants={imageZoomVariants}
                    style={{ y: yParallax }} 
                    src={`${dest.mainImage.url}?w=1200&q=80&auto=format`} 
                    alt={dest.name} 
                    onLoad={() => handleImageLoad(dest.slug)}
                    className={`dest-parallax-img ${loadedImages[dest.slug] ? 'is-loaded' : 'is-loading'}`} 
                  />
                )}
                
                <div className="dest-content-overlay">
                  <div className="dest-text-box">
                    <span className="dest-slug-tag">/ {dest.slug}</span>
                    <h3 className="dest-display-name highlight">
                      {dest.name}
                    </h3>
                    <div className="dest-link-action">
                      Explore Territory →
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;