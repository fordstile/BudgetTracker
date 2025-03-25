import React from "react";
import "./LandingPage.css";
import logo from "../assets/logo.png"; // Ensure the logo is in src/assets
import phone from "../assets/phone.png"; // Ensure the coin image is in src/assets
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="navbar">
        <div className="logo-container">
          <img src={logo} alt="MyFin Logo" className="logo" />
          <span className="brand">MyFin</span>
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact Us</a>
          <Link to="/login" id="login">Log in</Link>
          <button className="btn-primary"><Link to="/Signup">Get started</Link></button>
        </nav>
      </header>
      <main className="hero-section">
        <div className="hero-text">
          <h1>Unlock growth with every payment</h1>
          <p>Run payments, extend net terms and automate collections compliance.</p>
          <div className="hero-buttons">

          <Link to="/signup">
            <button className="btn-primary">Get started</button>
          </Link>
          
            <button className="btn-secondary">Talk to AI</button>
          
          </div>
        </div>
        <div className="animated-phone">
          <img src={phone} alt="Animated Coin" className="phone" />
        </div>
      </main>

      <div className="landing-below">
        <section id="about" className="about-section">
          <h2>About Us</h2>
          <p>We are a leading financial technology company focused on seamless payments...</p>
        </section>

        <section id="features" className="features-section">
          <h2>Features</h2>
          <p>We are a leading financial technology company focused on seamless payments...</p>
        </section>

        <section id="pricing" className="pricing-section">
          <h2>Pricing</h2>
          <p>Choose a pricing plan that suits your needs.</p>
        </section>

        <section id="testimonials" className="testimonials-section">
          <h2>Testimonials</h2>
          <p>Choose a pricing plan that suits your needs.</p>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <p>Get in touch with us through email or phone.</p>
        </section>

        <section id="footer" className="footer-section">
          <footer>
            <h2>Footer</h2>
            <p>Get in touch with us through email or phone.</p>
          </footer>
        </section>

      </div>

    </div>
  );
};

export default LandingPage;
