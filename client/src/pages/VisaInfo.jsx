import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Globe, 
  AlertTriangle, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './TravelInfo.css';

export default function VisaInfo() {
  return (
    <div className="info-page-viewport">
      <Helmet>
        <title>Visa Requirements | Travel Ethiopia</title>
      </Helmet>

      <div className="info-container">

        {/* HEADER */}
        <header className="info-header">
          <span className="gold-label">Entry Requirements</span>
          <h1>Ethiopian <span className="highlight">Visa & Entry</span></h1>
          <p className="subtitle">Everything you need before your journey begins.</p>
        </header>

        {/* MAIN GRID */}
        <div className="visa-main-grid">

          {/* E-VISA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="visa-primary-card"
          >
            <Globe className="gold-text" size={48} />
            <h2>The E-Visa Process</h2>
            <p>Fast, secure, and recommended for most travelers.</p>

            <ul className="visa-list">
              <li>30 or 90-day tourist visa</li>
              <li>1–3 business days processing</li>
              <li>Approx. $82 USD fee</li>
              <li>Single entry (extendable locally)</li>
            </ul>

            <a 
              href="https://www.evisa.gov.et/" 
              target="_blank" 
              rel="noreferrer" 
              className="evisa-btn"
            >
              Official E-Visa Portal <ExternalLink size={16} />
            </a>
          </motion.div>

          {/* SIDEBAR */}
          <div className="visa-sidebar">

            <div className="requirement-box">
              <div className="req-head">
                <FileText size={20} />
                <h4>Passport</h4>
              </div>
              <p>Minimum 6 months validity and at least one blank page.</p>
            </div>

            <div className="requirement-box">
              <div className="req-head">
                <Clock size={20} />
                <h4>Processing Time</h4>
              </div>
              <p>Usually approved within 1–3 days.</p>
            </div>

            <div className="requirement-box warning">
              <div className="req-head">
                <AlertTriangle size={20} />
                <h4>Health Requirement</h4>
              </div>
              <p>Yellow Fever certificate required if from risk countries.</p>
            </div>

          </div>
        </div>

        {/* STEP BY STEP */}
        <section className="booking-steps">
          <h3 className="section-title">How to Apply</h3>

          <div className="step-card">
            <div className="step-icon-box"><Globe /></div>
            <div>
              <h4>1. Apply Online</h4>
              <p>Fill your application on the official e-visa website.</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon-box"><FileText /></div>
            <div>
              <h4>2. Upload Documents</h4>
              <p>Submit passport scan and personal details.</p>
            </div>
          </div>


          <div className="step-card">
            <div className="step-icon-box"><CheckCircle2 /></div>
            <div>
              <h4>4. Receive Visa</h4>
              <p>Get approval via email and print it before travel.</p>
            </div>
          </div>
        </section>

        {/* ENTRY INFO */}
        <section className="safety-grid">
          <div className="requirement-box">
            <div className="req-head">
              <MapPin size={18} />
              <h4>Entry Point</h4>
            </div>
            <p>Addis Ababa Bole International Airport is the main entry.</p>
          </div>

          <div className="requirement-box">
            <div className="req-head">
              <ShieldCheck size={18} />
              <h4>Security Check</h4>
            </div>
            <p>Expect standard immigration and customs checks.</p>
          </div>

          <div className="requirement-box">
            <div className="req-head">
              <CheckCircle2 size={18} />
              <h4>Visa Extension</h4>
            </div>
            <p>Available in Addis Ababa Immigration Office.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-mini">
          <h3>Common Questions</h3>

          <div className="faq-item">
            <strong>Can I get Visa on Arrival?</strong>
            <p>Limited availability. E-Visa is strongly recommended.</p>
          </div>

          <div className="faq-item">
            <strong>Can I extend my visa?</strong>
            <p>Yes, extensions are processed locally.</p>
          </div>

          <div className="faq-item">
            <strong>What if my visa is rejected?</strong>
            <p>You can reapply after correcting errors.</p>
          </div>
        </section>

        {/* SUPPORT */}
        <div className="emergency-contact-box">
          <h3>Need Help?</h3>
          <p>We assist travelers with visa guidance and documentation.</p>

          <div className="insurance-note">
            <AlertTriangle size={18} />
            <span>Always verify requirements before travel.</span>
          </div>
        </div>

      </div>
    </div>
  );
}