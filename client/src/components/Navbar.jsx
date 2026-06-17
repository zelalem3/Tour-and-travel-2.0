import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; 

const MyNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false); 

 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to close menu
  const closeMenu = () => setExpanded(false);

  return (
    <Navbar 
      expand="lg" 
      fixed="top"
      className={`custom-nav ${scrolled ? "nav-scrolled" : ""}`} 
      variant="dark"
      expanded={expanded} // Bind state to Navbar
      onToggle={(navExpanded) => setExpanded(navExpanded)} // Allow manual toggle (hamburger click)
    >
      <Container>
        {/* LOGO ON THE LEFT */}
        <Navbar.Brand as={Link} to="/" className="p-0" onClick={closeMenu}>
          <img 
            src="/static/images/logo.jpg" 
            alt="Logo" 
            className="nav-logo" 
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* ms-auto pushes the Nav items to the RIGHT side */}
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/Destinations" className="nav-item-link" onClick={closeMenu}>
              Expeditions
            </Nav.Link>
            <Nav.Link as={Link} to="/tours" className="nav-item-link" onClick={closeMenu}>
              Tours
            </Nav.Link>

            {/* NEW GALLERY LINK */}
            <Nav.Link as={Link} to="/gallery" className="nav-item-link" onClick={closeMenu}>
              Gallery
            </Nav.Link>

            <Nav.Link as={Link} to="/blog" className="nav-item-link" onClick={closeMenu}>
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-item-link" onClick={closeMenu}>
              About
            </Nav.Link>
              <Nav.Link as={Link} to="/chat" className="nav-item-link" onClick={closeMenu}>
              chat
            </Nav.Link>

           
            {/* CTA BUTTON */}
            <Nav.Link as={Link} to="/contact" className="p-0 ms-lg-4 mt-3 mt-lg-0" onClick={closeMenu}>
              <Button className="button-27">CONTACT US</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;