import React from "react";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
    BottomRow,
    MottoBar,
    SocialGrid,
    SocialIcon
} from "./FooterStyle";

import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaTiktok, 
  FaTelegramPlane,
  FaPhoneAlt,
  FaEnvelope 
} from "react-icons/fa";

const Footer = () => {
    return (
        <Box>
            <div style={{
                width: '100px',
                height: '2px',
                background: '#fbbf24',
                margin: '-20px auto 60px auto', 
                borderRadius: '10px',
                opacity: '0.6'
            }}></div>
            <FooterContainer>
                <MottoBar>
                    <p>Authentic • Responsible • Unforgettable</p>
                </MottoBar>

                {/* --- NEW CONTACT ROW START --- */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    padding: '20px 0 40px 0',
                    flexWrap: 'wrap', // Ensures it stacks on mobile
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '40px'
                }}>
                    {/* Call Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Call us anytime
                        </span>
                        <a href="tel:+251911234567" style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaPhoneAlt size={14} /> +251 911 23 45 67
                        </a>
                    </div>

                    {/* Divider for Desktop (Optional) */}
                    <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)', display: 'none' }}></div>

                    {/* Message Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Send us a message
                        </span>
                        <a href="/contact" style={{ 
                            background: 'transparent', 
                            color: '#fff', 
                            border: '1px solid #fbbf24',
                            padding: '8px 24px', 
                            borderRadius: '30px', 
                            textDecoration: 'none', 
                            fontSize: '13px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {e.target.style.background = '#fbbf24'; e.target.style.color = '#1a1a1a'}}
                        onMouseOut={(e) => {e.target.style.background = 'transparent'; e.target.style.color = '#fff'}}
                        >
                            <FaEnvelope /> Contact Us
                        </a>
                    </div>
                </div>
                {/* --- NEW CONTACT ROW END --- */}

                <Row>
                    <Column>
                        <Heading>Travel Ethiopia</Heading>
                        <p style={{ 
                            color: "rgba(255,255,255,0.7)", 
                            fontSize: "14px", 
                            lineHeight: "1.6",
                            textAlign: "inherit" 
                        }}>
                            Discover the soul of the Abyssinian highlands with the locals who know it best.
                        </p>
                    </Column>

                    <Column>
                        <Heading>Quick Links</Heading>
                        <FooterLink href="/tours">Popular Tours</FooterLink>
                        <FooterLink href="/destinations">Destinations</FooterLink>
                        <FooterLink href="/about">Our Story</FooterLink>
                    </Column>

                    <Column>
                        <Heading>Traveler Tools</Heading>
                        <FooterLink href="/booking-guide">Booking Guide</FooterLink>
                        <FooterLink href="/visa-info">Visa Info</FooterLink>
                        <FooterLink href="/healthandsafety">Health & Safety</FooterLink>
                    </Column>

                    <Column>
                        <Heading>Follow Our Journey</Heading>
                        <SocialGrid>
                            <SocialIcon href="https://facebook.com/travelethiopia" target="_blank" aria-label="Facebook">
                                <FaFacebookF size={18} />
                            </SocialIcon>
                            <SocialIcon href="https://instagram.com/travelethiopia" target="_blank" aria-label="Instagram">
                                <FaInstagram size={18} />
                            </SocialIcon>
                            <SocialIcon href="https://twitter.com/travelethiopia" target="_blank" aria-label="Twitter">
                                <FaTwitter size={18} />
                            </SocialIcon>
                           
                            <SocialIcon href="https://tiktok.com/@travelethiopia" target="_blank" aria-label="TikTok">
                                <FaTiktok size={18} />
                            </SocialIcon>
                            <SocialIcon href="https://t.me/travelethiopia" target="_blank" aria-label="Telegram">
                                <FaTelegramPlane size={18} />
                            </SocialIcon>
                        </SocialGrid>
                    </Column>
                </Row>

                <BottomRow>
                    &copy; {new Date().getFullYear()} Travel Ethiopia. All Rights Reserved.
                </BottomRow>
            </FooterContainer>
        </Box>
    );
};

export default Footer;