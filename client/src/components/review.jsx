import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Loader2 } from 'lucide-react';
import { client } from '../sanityClient'; // Adjust path based on your setup
import imageUrlBuilder from '@sanity/image-url';
import './ReviewCarousel.css';

// Initialize Sanity Image Builder
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Testimonials from Sanity
  useEffect(() => {
    const query = `*[_type == "testimonial"] | order(order asc) {
      _id,
      name,
      role,
      quote,
      rating,
      image
    }`;

    client.fetch(query)
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Testimonial fetch error:", err);
        setLoading(false);
      });
  }, []);

  const nextSlide = useCallback(() => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, [reviews.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Auto-play Logic
  useEffect(() => {
    if (!isPaused && reviews.length > 0) {
      const interval = setInterval(nextSlide, 5000); 
      return () => clearInterval(interval);
    }
  }, [nextSlide, isPaused, reviews.length]);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-[#fbbf24]" size={32} />
    </div>
  );

  if (reviews.length === 0) return null;

  return (
    <div className="carousel-root">
      <h1 className="contact-title text-3xl font-bold mg" style={{ textAlign: 'center', width: '100%', marginBottom: '40px' }}>
        Traveler <span className="highlight">Testimonials</span>
      </h1>
      
      <div 
        className="carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button onClick={prevSlide} className="nav-arrow left">
          <ChevronLeft size={24} />
        </button>
        
        <button onClick={nextSlide} className="nav-arrow right">
          <ChevronRight size={24} />
        </button>

        <div className="carousel-window">
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review._id} className="carousel-slide">
                <div className="review-glass-card">
                  <Quote className="quote-icon" size={40} />
                  <p className="review-body">"{review.quote}"</p>
                  
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < (review.rating || 5) ? "#fbbf24" : "none"} 
                        color="#fbbf24" 
                      />
                    ))}
                  </div>

                  <div className="user-meta">
                    {review.image ? (
                      <img 
                        src={urlFor(review.image).width(100).height(100).fit('crop').url()} 
                        alt={review.name} 
                        className="user-avatar" 
                      />
                    ) : (
                      <div className="user-avatar-placeholder" />
                    )}
                    <div className="user-details">
                      <h4 className="user-name">{review.name}</h4>
                      <p className="user-role">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dots-container">
        {reviews.map((_, i) => (
          <div 
            key={i} 
            className={`dot ${currentIndex === i ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;