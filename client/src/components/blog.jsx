import React, { useEffect, useState } from 'react';
// 1. Import 'client' AND 'urlFor' from your central config
import { client, urlFor } from '../sanityClient'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import './bloglist.css';

// REMOVED: imageUrlBuilder and the local 'const builder' line that caused the error

const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...3] {
  title,
  slug,
  "mainImage": mainImage.asset->{
    _id,
    metadata { lqip }
  },
  publishedAt,
  "bodyPreview": pt::text(body)[0...120]
}`;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (slug) => {
    setLoadedImages(prev => ({ ...prev, [slug]: true }));
  };

  useEffect(() => {
    client.fetch(BLOG_POSTS_QUERY).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
    }
  };

  if (loading) return (
    <div className="loader-container">
      <div className="pulse"></div>
      <p>Discovering Ethiopia...</p>
    </div>
  );

  return (
    <section className="blog-section">
      <div className="max-container">
        <motion.header 
          className="blog-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
<Link 
  to="/blog" 
  style={{ textDecoration: 'none' }}
>
  <h1 className="guide-title">
    Traveler's Guide to Ethiopia
  </h1>
</Link>
          <p className="font-inter uppercase tracking-widest text-xs opacity-60">
            Expert insights and cultural stories for your next journey.
          </p>
        </motion.header>

        <motion.div 
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} 
        >
          {posts.map((post) => {
            const slug = post.slug.current;
            const isLoaded = loadedImages[slug];

            return (
              <motion.article 
                key={slug} 
                className="post-card group"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                <Link to={`/blog/${slug}`} className="image-wrapper">
                  {post.mainImage && (
                    <div className="progressive-img-container">
                      <img 
                        src={post.mainImage.metadata.lqip} 
                        alt="" 
                        className={`placeholder-img ${isLoaded ? 'is-hidden' : ''}`}
                      />
                      
                      <motion.img 
                        // Now using the shared urlFor with auto('format') as defined in sanityClient.js
                        src={urlFor(post.mainImage._id).width(600).url()} 
                        alt={post.title}
                        onLoad={() => handleImageLoad(slug)}
                        className={`card-image ${isLoaded ? 'is-visible' : ''}`}
                      />
                    </div>
                  )}
                </Link>
                
                <div className="card-content">
                  <span className="category-tag">Destination Guide</span>
                  <Link to={`/blog/${slug}`} className="post-title font-inter font-bold">
                    {post.title}
                  </Link>
                  <p className="post-excerpt">{post.bodyPreview}...</p>
                  <Link to={`/blog/${slug}`} className="read-more-btn font-bold">
                    Read Article <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogList;