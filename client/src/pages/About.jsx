import React, { useEffect, useRef } from "react";
import "./About.css";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { Helmet } from "react-helmet-async"; 

const About = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { margin: "-100px" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        const stats = gsap.utils.toArray(".stat-num");
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"), 10);
          const count = { val: 0 };
          gsap.to(count, {
            val: target,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => {
              stat.textContent = Math.floor(count.val);
            }
          });
        });
      }, statsRef);
      return () => ctx.revert();
    } else {
      const stats = document.querySelectorAll(".stat-num");
      stats.forEach(s => s.textContent = "0");
    }
  }, [isInView]);

  // Framer Motion Variants...
  const sideReveal = (direction) => ({
    hidden: { opacity: 0, x: direction === "left" ? -80 : 80, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="about-page">
      {/* 2. SEO META DATA */}
      <Helmet>
        <title>About Us | Preserving the Soul of Ethiopia - TravelEthiopia</title>
        <meta 
          name="description" 
          content="Learn about TravelEthiopia's mission to provide authentic, sustainable travel. Meet our expert guides and explore our 10+ years of experience." 
        />
        <link rel="canonical" href="https://travelethiopia.com/about" />
        
        {/* Social Media Tags */}
        <meta property="og:title" content="Our Story | TravelEthiopia" />
        <meta property="og:description" content="We are more than a travel agency. We are storytellers and keepers of ancient history." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&w=800" />
      </Helmet>
      
      {/* --- HERO SECTION --- */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="about-hero-content"
        >
          <span className="subtitle">Our Story</span>
          <h1 className="title highlight" style={{ fontSize: '3.8rem', lineHeight: '1.2' }}>
            Preserving the <span className="highlight">Soul</span> of Ethiopia
          </h1>
          <p className="hero-desc highlight" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '20px auto' }}>
            We are more than a travel agency. We are storytellers, mountain guides, 
            and keepers of ancient history.
          </p>
        </motion.div>
      </section>

     
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <motion.div 
              variants={sideReveal("left")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="mission-text"
            >
              <h2 className="section-title">
                Why We Do <span className="highlight">What We Do</span>
              </h2>
              <p className="body-text">
                Founded in the heart of Addis Ababa, our <span className="highlight">Mission</span> is to provide 
                authentic, sustainable, and transformative travel experiences. 
              </p>
              
              <div className="stats-container" ref={statsRef}>
                <div className="stat-card">
                  <div className="stat-flex">
                    <span className="stat-num highlight" data-target="10">0</span>
                    <span className="plus highlight">+</span>
                  </div>
                  <span className="stat-label">Years Experience</span>
                </div>

                <div className="stat-card">
                  <div className="stat-flex">
                    <span className="stat-num highlight" data-target="500">0</span>
                    <span className="plus highlight">+</span>
                  </div>
                  <span className="stat-label">Guided Tours</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={sideReveal("right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="mission-image-wrapper"
            >
              <div className="image-border-accent"></div>
              <img 
                src="https://images.pexels.com/photos/30177512/pexels-photo-30177512/free-photo-of-addis-ababa-skyline-at-sunset.jpeg" 
                alt="Ethiopian Landscape - Authentic travel experience" 
                className="rounded-img"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="section-title centered"
          >
            Our <span className="highlight">Core</span> Values
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="values-grid"
          >
            {[
              { icon: "🌍", title: "Authenticity", desc: "No tourist traps. We take you to the real heart of the culture." },
              { icon: "🤝", title: "Community", desc: "We work directly with local tribes to ensure benefits for all." },
              { icon: "🛡️", title: "Safety First", desc: "Expert guides and 24/7 support for your peace of mind." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="value-card-premium"
              >
                <div className="icon-wrapper">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
                <div className="card-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;