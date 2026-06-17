import React, { useState, useEffect } from 'react';
import { Play, Image as ImageIcon, ArrowUpRight, Loader2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import './mediashowcase.css';

const MediaShowcase = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `{
      "galleries": *[_type == "gallery"] | order(_createdAt desc) { 
        _id, 
        title, 
        "slug": slug.current, 
        "url": mainImage.asset->url,
        location,
        description
      },
      "videos": *[_type == "youtubeVideo"] | order(_createdAt desc) { 
        _id, 
        title, 
        videoId,
        location
      }
    }`;

    client.fetch(query).then((data) => {
      setPhotos(data.galleries);
      setVideos(data.videos);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="media-loader">
        <Loader2 className="spinner" size={48} />
        <p>Unfolding Ethiopia's Epic Story...</p>
      </div>
    );
  }

  return (
    <div className="media-page">
      {/* Hero Header */}
      <header className="media-header">
        <span className="eyebrow">Visual Expeditions</span>
        <h1>Ethiopia Through <span className="highlight">The Lens</span></h1>
        <p className="header-desc">
          From the otherworldly sulfur lakes of the Danakil Depression to the mist-shrouded peaks of the Simien Mountains — 
          experience the raw beauty of Ethiopia in cinematic detail.
        </p>
       
      </header>

      {/* Photographic Albums */}
      <section className="gallery-section">
        <div className="section-header">
          <div>
            <h2 className="section-subtitle">Photographic Albums</h2>
            <p className="section-tagline">Timeless moments captured across the Ethiopian highlands and beyond</p>
          </div>
          <div className="accent-line"></div>
        </div>

        <div className="photo-grid">
          {photos.map((photo) => (
            <Link to={`/gallery/${photo.slug}`} key={photo._id} className="photo-card">
              <div className="image-wrapper">
                <img src={photo.url} alt={photo.title} loading="lazy" />
                <div className="image-overlay"></div>
              </div>

              <div className="photo-content">
                <div className="location">
                  <MapPin size={16} />
                  <span>{photo.location || "Ethiopia"}</span>
                </div>
                
                <h3 className="photo-title">{photo.title}</h3>
                {photo.description && <p className="photo-desc">{photo.description}</p>}

                <div className="card-footer">
                  <div className="explore-btn">
                    <ImageIcon size={18} />
                    <span>Explore Album</span>
                  </div>
                  <ArrowUpRight className="arrow" size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cinematic Expeditions */}
      <section className="video-section" >
        <div className="section-header" >
          <div>
            <h2 className="section-subtitle"style={{ margin: "20px" }}>Cinematic Expeditions</h2>
            <p className="section-tagline">Immerse yourself in the movement and soul of Ethiopia</p>
          </div>
          <div className="accent-line"></div>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <div className="iframe-container">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1&playsinline=1`}
                  title={video.title}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              <div className="video-info">
                <div className="play-badge">
                  <Play size={20} fill="#fbbf24" />
                </div>
                <div>
                  <h3>{video.title}</h3>
                  {video.location && (
                    <div className="video-location">
                      <MapPin size={14} /> {video.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MediaShowcase;