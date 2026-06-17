import React, { useEffect, useState } from 'react';
// 1. Import urlFor from your central config to fix the deprecation error
import { client, urlFor } from '../sanityClient'; 
import { Link } from 'react-router-dom';
import './bloglist.css'; 
import { Helmet } from 'react-helmet-async';

// REMOVED: imageUrlBuilder and local 'builder' definition

const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  "bodyPreview": pt::text(body)[0...120],
  "mainImage": mainImage.asset->{
    _id,
    url,
    metadata {
      lqip
    }
  }
}`;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    client.fetch(BLOG_POSTS_QUERY).then((data) => {
      setPosts(data || []);
      setLoading(false);
    });
  }, []);

  const handleImageLoad = (slug) => {
    setLoadedImages((prev) => ({ ...prev, [slug]: true }));
  };

  if (loading) return (
    <div className="loader-container">
      <div className="pulse"></div>
      <p>Discovering Ethiopia...</p>
    </div>
  );

  return (
    <section className="blog-section">
      <Helmet>
        <title>Ethiopia Chronicles | Travel Ethiopia Blog</title>
        <meta name="description" content="Explore stories of culture, history, and hidden landscapes. Your ultimate guide to authentic Ethiopian expeditions." />
        <link rel="canonical" href="https://travelethiopia.com/blog" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ethiopia Chronicles - Official Travel Blog" />
        <meta property="og:url" content="https://travelethiopia.com/blog" />
        
        {/* Correctly using the imported urlFor for the OG image */}
        {posts.length > 0 && posts[0].mainImage && (
          <meta property="og:image" content={urlFor(posts[0].mainImage._id).width(1200).height(630).url()} />
        )}
        
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="max-container">
        <header className="blog-header">
          <span className="subtitle">The Great Rift Valley & Beyond</span>
          <h1>Ethiopia Chronicles</h1>
          <div className="header-line"></div>
        </header>

        <div className="blog-grid">
          {posts.map((post) => {
            const currentSlug = post.slug.current;
            const isLoaded = loadedImages[currentSlug];

            return (
              <article key={currentSlug} className="post-card">
                <div 
                  className="image-container"
                  style={{
                    backgroundImage: `url(${post.mainImage?.metadata?.lqip})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <Link to={`/blog/${currentSlug}`}>
                    {post.mainImage && (
                      <img 
                        // Using the shared urlFor helper with optimization
                        src={urlFor(post.mainImage._id).width(800).quality(80).url()} 
                        alt={post.title}
                        className={`card-image ${isLoaded ? 'is-loaded' : 'is-loading'}`}
                        onLoad={() => handleImageLoad(currentSlug)}
                        loading="lazy"
                      />
                    )}
                  </Link>
                  <div className="card-date">
                     {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="card-content">
                  <span className="category-tag">Cultural Heritage</span>
                  <Link to={`/blog/${currentSlug}`} className="post-title">
                    {post.title}
                  </Link>
                  <p className="post-excerpt">{post.bodyPreview}...</p>
                  <Link to={`/blog/${currentSlug}`} className="read-more-link">
                    Continue Reading
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogList;