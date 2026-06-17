import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/hero"; 
import BlogList from "../components/blog";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

// Lazy loaded sections
const WhyChooseUs = lazy(() => import("../components/Whychooeuse"));
const Tours = lazy(() => import("../components/Tours"));
const Destinations = lazy(() => import("../components/Destinations"));
const Cta = lazy(() => import("../components/Cta"));
const ReviewCarousel = lazy(() => import("../components/review"));

const SectionLoader = () => (
  <div className="flex flex-col items-center justify-center py-32 bg-[#020617]">
    <div className="w-10 h-10 border-2 border-[#fbbf24]/20 border-t-[#fbbf24] rounded-full animate-spin"></div>
    <p className="mt-4 text-[10px] tracking-[0.3em] text-gray-500 uppercase font-bold">Loading Experience</p>
  </div>
);

const Home = () => {
  const siteUrl = "https://travelethiopia.com";
  const siteTitle = "Travel Ethiopia | Discover the Cradle of Humanity";
  const siteDesc = "Join Travel Ethiopia for an unforgettable odyssey. From the rock-hewn churches of Lalibela to the volcanic landscapes of Danakil.";
  const siteImg = "https://travelethiopia.com/icon.svg"; 

  return (
    <div className="flex flex-col min-h-screen bg-[#020617]">
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:image" content={siteImg} />
        <meta name="theme-color" content="#020617" />
      </Helmet>

      <main className="flex-grow">
        {/* 1. HERO - Keep at top, no lazy load */}
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          {/* 2. DESTINATIONS - Spark immediate interest */}
          <section id="destinations">
            <Destinations />
          </section>

          {/* 3. TOURS - Show them the products while they are excited */}
          <section id="tours">
            <Tours />
          </section>

          {/* 4. WHY CHOOSE US - Answer "Why book with this specific company?" */}
          <section id="why-us">
            <WhyChooseUs />
          </section>

          {/* 5. REVIEWS - Back up your "Why Us" claims with real social proof */}
          <section id="reviews">
             <ReviewCarousel />
          </section>

          {/* 6. BLOG - Provide extra value and travel tips */}
          <section id="blog" className="py-12">
            <BlogList />
          </section>

          {/* 7. CTA - The final "Call to Action" */}
          <section id="contact">
            <Cta />
          </section>
        </Suspense>

        {/* Floating WhatsApp Button - Removed duplicate, added logic */}
        <motion.a 
          href="https://wa.me/251911223344"
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0, y: 20 }} 
          animate={{ scale: 1, y: 0 }} 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="whatsapp-float fixed bottom-7 right-7 bg-[#25D366] p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] z-50 text-white"
        >
          <MessageSquare size={24} />
        </motion.a>
      </main>
    </div>
  );
};

export default Home;