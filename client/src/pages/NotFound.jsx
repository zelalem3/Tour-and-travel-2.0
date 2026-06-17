import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#020617',
      color: 'white',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '8rem', margin: 0, color: '#fbbf24', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Oops! You've Wandered Off the Map</h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', marginBottom: '40px' }}>
        Even the best explorers get lost sometimes. The page you are looking for doesn't exist 
        or has been moved to a new destination.
      </p>
      
      <Link to="/" style={{
        backgroundColor: '#fbbf24',
        color: '#020617',
        padding: '15px 40px',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: '0.3s'
      }}>
        Back to Basecamp (Home)
      </Link>
    </div>
  );
};

export default NotFound;