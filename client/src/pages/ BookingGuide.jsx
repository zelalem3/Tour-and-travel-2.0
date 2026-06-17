import React from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  CreditCard, 
  CheckCircle2, 
  PlaneTakeoff, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './TravelInfo.css';

const steps = [
  {
    icon: <Map size={32} />,
    title: "1. Select & Inquire",
    desc: "Choose from our curated expeditions—Lalibela, Simien Mountains, Danakil Depression or request a custom itinerary."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "2. Refine & Confirm",
    desc: "We finalize your route with 4x4 vehicles and expert guides, then send your booking quote."
  },
  {
    icon: <CreditCard size={32} />,
    title: "3. Secure Your Spot",
    desc: "Pay 30% deposit to secure bookings. Ethiopian Airlines travelers may get up to 50% discount on domestic flights."
  },
  {
    icon: <PlaneTakeoff size={32} />,
    title: "4. Final Prep & Visas",
    desc: "Receive welcome pack, visa instructions, packing list, and travel guidelines."
  }
];

export default function BookingGuide() {
  return (
    <div className="info-page-viewport">
      <Helmet>
        <title>Booking Guide | Travel Ethiopia</title>
      </Helmet>

      <div className="info-container">
        
        {/* HEADER */}
        <header className="info-header">
          <span className="gold-label">Seamless Experience</span>
          <h1>How to Book Your <span className="highlight">Ethiopian Expedition</span></h1>
          <p className="subtitle">Simple, transparent, and guided every step of the way.</p>
        </header>

        {/* STEPS */}
        <section className="booking-steps">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="step-card"
            >
              <div className="step-icon-box">{step.icon}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* VISA SECTION */}
        <section className="visa-main-grid">
          <div className="visa-primary-card">
            <h3>Visa & Entry Process</h3>
            <p>Apply easily online before arrival.</p>

            <ul className="visa-list">
              <li>Online e-Visa application</li>
              <li>1–3 days processing</li>
              <li>Passport validity 6+ months</li>
              <li>Single & multiple entry options</li>
            </ul>

            <a
              href="https://www.evisa.gov.et"
              target="_blank"
              rel="noreferrer"
              className="evisa-btn"
            >
              Apply for e-Visa →
            </a>
          </div>

          <div>
            <div className="requirement-box">
              <div className="req-head">
                <ShieldCheck size={18} />
                <h4>Documents</h4>
              </div>
              <p>Passport copy, photo, travel details.</p>
            </div>

            <div className="requirement-box warning">
              <div className="req-head">
                <AlertTriangle size={18} />
                <h4>Health</h4>
              </div>
              <p>Yellow Fever vaccination may be required.</p>
            </div>
          </div>
        </section>

        {/* POLICY */}
        <section className="policy-grid">
          <div className="policy-card">
            <CheckCircle2 className="gold-text" size={24} />
            <div>
              <h4>Cancellation</h4>
              <p>Free up to 45 days. Partial refund afterward.</p>
            </div>
          </div>

          <div className="policy-card">
            <CheckCircle2 className="gold-text" size={24} />
            <div>
              <h4>Payments</h4>
              <p>Secure bank transfer & credit card supported.</p>
            </div>
          </div>

          <div className="policy-card warning-card">
            <AlertTriangle className="gold-text" size={24} />
            <div>
              <h4>Requirements</h4>
              <p>e-Visa & health requirements must be completed.</p>
            </div>
          </div>
        </section>

        {/* EXTRA INFO */}
        <section className="safety-grid">
          <div className="requirement-box">
            <div className="req-head">
              <ShieldCheck size={18} />
              <h4>Safety</h4>
            </div>
            <p>Guides ensure safe routes and monitored travel.</p>
          </div>

          <div className="requirement-box">
            <div className="req-head">
              <CheckCircle2 size={18} />
              <h4>Best Time</h4>
            </div>
            <p>October – March is ideal for travel.</p>
          </div>

          <div className="requirement-box">
            <div className="req-head">
              <Map size={18} />
              <h4>Top Destinations</h4>
            </div>
            <p>Lalibela, Simien Mountains, Danakil, Omo Valley.</p>
          </div>
        </section>

        {/* EMERGENCY */}
        <div className="emergency-contact-box">
          <div className="flex-head">
            <AlertTriangle />
            <h3>Emergency Support</h3>
          </div>

          <p>24/7 assistance available during your trip.</p>

          <div className="insurance-note">
            <AlertTriangle size={18} />
            <span>Travel insurance recommended.</span>
          </div>
        </div>

      </div>
    </div>
  );
}