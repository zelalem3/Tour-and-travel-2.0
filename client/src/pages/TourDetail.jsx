import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  Clock, MapPin, Users, ArrowLeft, 
  Sparkles, Compass, Globe, ShieldCheck
} from "lucide-react";
import "./tourdetail.css";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- SCROLL TO TOP LOGIC ---
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
          });
        });
      });
    }
  }, [loading, slug]);


  useEffect(() => {
   const query = `*[ _type == "tour" && slug.current == $slug ][0] {
    ...,
    "location": destination->location, 
    "destinationName": destination->name,
    "mainImage": mainImage.asset-> {
      ...,
      metadata {
        lqip,
        dimensions
      }
    }
  }`;
    client.fetch(query, { slug })
      .then((data) => { 
        setTour(data); 
        setLoading(false); 
      })
      .catch((err) => { 
        console.error("Sanity Fetch Error:", err); 
        setLoading(false); 
      });
  }, [slug]);


  const slideInLeft = {
    hidden: { opacity: 0, x: -60, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

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
  {/* Rotating Compass Icon */}
  <motion.div
    animate={{ 
      rotate: 360,
    }}
    transition={{ 
      repeat: Infinity, 
      duration: 4, 
      ease: "linear" 
    }}
    style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Compass size={64} strokeWidth={1} />
  </motion.div>

  {/* Text with localized glow effect */}
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
      
      {/* Subtle Progress Underline */}
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

  if (!tour) return <div className="error-screen text-white p-20 text-center">Tour Not Found</div>;


  const tourSchema = {
    "@context": "https://schema.org/",
    "@type": "TravelAgency",
    "name": tour.title,
    "description": tour.description,
    "image": tour.mainImage ? urlFor(tour.mainImage).url() : "",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": tour.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="tour-wrapper bg-[#020617] text-white min-h-screen">
      
     
      <Helmet>
        <title>{`${tour.title} | TravelEthiopia Expedition`}</title>
        <meta name="description" content={`Book a ${tour.duration} ${tour.title} in ${tour.location}. Join our professional expedition for $${tour.price}.`} />
        <link rel="canonical" href={`https://travelethiopia.com/tours/${slug}`} />
        
      
        <meta property="og:title" content={`${tour.title} - Official Expedition`} />
        <meta property="og:description" content={`Explore ${tour.location} on this curated journey. Price: $${tour.price}.`} />
        {tour.mainImage && <meta property="og:image" content={urlFor(tour.mainImage).width(1200).url()} />}
        
    
        <script type="application/ld+json">
          {JSON.stringify(tourSchema)}
        </script>
      </Helmet>

   
     
    
      <section className="hero-container relative overflow-hidden">
        <div 
    className="hero-image-wrapper absolute inset-0 bg-cover bg-no-repeat"
    style={{
  
      backgroundImage: `url(${tour.mainImage?.metadata?.lqip})`,
      backgroundSize: 'cover'
    }}
  >
    {tour.mainImage && (
      <img
      
        src={urlFor(tour.mainImage).width(1600).auto('format').quality(80).url()}
        className="hero-img w-full h-full object-cover"
        alt={tour.title}
        fetchpriority="high" 
        loading="eager"
      />
    )}
    <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-black/20" />
  </div>
        
                 <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-black/20" />
        

        <div className="hero-content-inner absolute bottom-20 left-4 md:left-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.span 
              animate={{ opacity: [0.7, 1, 0.7], y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="hero-badge flex items-center gap-2 text-[#fbbf24] font-bold text-sm tracking-widest uppercase mb-4"
            >
              <Sparkles size={14} /> Official Expedition Portfolio
            </motion.span>
            
            <h1 className="hero-title text-4xl md:text-7xl font-black uppercase leading-none">
              {tour.title?.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-outline-gold" : "text-white"}>
                  {word} {i === 1 && <br className="hidden md:block" />}
                </span>
              ))}
            </h1>
          </motion.div>
        </div>
      </section>


      <main className="tour-main-content container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="content-left lg:col-span-2">
          
      
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { icon: Clock, val: tour.duration, label: "Duration" },
              { icon: Users, val: tour.groupSize || 'Private', label: "Expedition Party" },
              { icon: MapPin, val: tour.location, label: "Territory" },
              { icon: Compass, val: "Professional", label: "Guide Grade" },
            ].map((stat, i) => (
              <motion.div key={i} variants={slideInLeft} className="stat-card p-6 bg-white/5 border border-white/10 rounded-2xl">
                <stat.icon size={20} className="text-[#fbbf24] mb-4" />
                <p className="stat-val font-bold text-xl">{stat.val}</p>
                <p className="stat-label text-gray-400 text-sm uppercase tracking-tighter">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

       
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={slideInLeft}
            className="narrative-section mb-16"
          >
            <h2 className="section-heading flex items-center gap-4 text-3xl font-bold mb-8">
              <div className="heading-line w-12 h-1 bg-[#fbbf24]" /> 
              The <span className="text-[#fbbf24]">Narrative</span>
            </h2>
            <div className="narrative-text text-gray-300 leading-relaxed text-lg space-y-4">
              {tour.description}
            </div>
          </motion.section>

       
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={slideInLeft}
            className="manifest-section bg-white/5 p-8 rounded-3xl border border-white/5"
          >
            
            <div className="manifest-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                {tour.includes?.map((item, i) => (
                <div key={i} className="manifest-item flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="manifest-text font-medium">{item}</span>
                    <ShieldCheck size={20} className="text-[#fbbf24]" />
                </div>
                ))}
            </div>
          </motion.section>
        </div>


        <aside className="content-right">
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.1 }}
    variants={slideInRight}
    className="booking-card-wrapper sticky top-28"
  >
    <div className="booking-card">

      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="globe-bg"
      >
        <Globe size={200} />
      </motion.div>

     

      <div className="price-display">

        <span className="price-amount">${tour.price}</span>
        <span className="price-currency">/ USD</span>
      </div>

      <p className="booking-disclaimer text-gray-400">
        Includes all permits, professional logistics, and private expedition management.
      </p>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    
        <Link 
          to="/contact" 
          state={{ tour: tour.title }}
          className="booking-btn"
        >
          Reserve Departure
        </Link>
      </motion.div>
    </div>
  </motion.div>
</aside>
      </main>
    </div>
  );
};

export default TourDetail;