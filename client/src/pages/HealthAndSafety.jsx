import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Stethoscope, 
  Droplets, 
  Mountain, 
  PhoneCall, 
  AlertCircle 
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './TravelInfo.css'; // Uses the same CSS file as before

const safetyCards = [
  {
    icon: <Mountain className="gold-text" size={32} />,
    title: "Altitude & Climate",
    desc: "Addis Ababa and the Highlands are at high elevation. We recommend staying hydrated and avoiding strenuous activity on your first day to acclimate."
  },
  {
    icon: <Droplets className="gold-text" size={32} />,
    title: "Food & Water",
    desc: "Stick to bottled or treated water (even for brushing teeth). Our guided tours only use vetted restaurants known for high hygiene standards."
  },
  {
    icon: <Stethoscope className="gold-text" size={32} />,
    title: "Medical Prep",
    desc: "Malaria is low-risk in the highlands but present in southern lowlands. Consult your doctor about prophylaxis and Tetanus/Hepatitis A boosters."
  },
  {
    icon: <ShieldCheck className="gold-text" size={32} />,
    title: "General Safety",
    desc: "Ethiopians are world-renowned for hospitality. Like any major city, keep valuables secure in Addis. Our guides stay updated on regional travel advisories daily."
  }
];

export default function HealthSafety() {
  return (
    <div className="info-page-viewport">
      <Helmet><title>Health & Safety | Travel Ethiopia</title></Helmet>

      <div className="info-container">
        <header className="info-header">
          <span className="gold-label">Traveler Wellbeing</span>
          <h1>Your <span className="highlight">Safety</span> is Our Priority</h1>
          <p className="subtitle">Expert guidance for a secure and healthy Ethiopian adventure.</p>
        </header>

        <div className="safety-grid">
          {safetyCards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="policy-card" /* Reusing policy-card class from previous CSS */
              style={{ textAlign: 'left', padding: '40px' }}
            >
              <div style={{ marginBottom: '20px' }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>{card.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem' }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="emergency-contact-box">
          <div className="emergency-content">
            <div className="flex-head">
              <PhoneCall size={24} className="gold-text" />
              <h3>24/7 Ground Support</h3>
            </div>
            <p>All our guests are provided with a local emergency contact number active 24/7. In the event of a medical emergency, we coordinate directly with AMREF Flying Doctors for specialized evacuation if required.</p>
          </div>
        </div>

        <div className="insurance-note">
          <AlertCircle size={20} />
          <span><strong>Note:</strong> Comprehensive travel insurance including medical evacuation is <strong>mandatory</strong> for all our expeditions.</span>
        </div>
      </div>
    </div>
  );
}