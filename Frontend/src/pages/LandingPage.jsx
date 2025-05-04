import React, { useState, useEffect } from "react";
import Chatbot from "../components/Chatbot";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/logo.png";
import phone from "../assets/phone.png";
import aboutPhone from "../assets/aboutPhone.png";
import User1 from "../assets/user1.jpeg";
import User2 from "../assets/user2.jpeg";
import User3 from "../assets/user3.jpeg";
import User4 from "../assets/user4.jpeg";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image8 from "../assets/image8.jpg";

const testimonialsData = [
  {
    name: "Carlunce Michel",
    role: "Happy User",
    text: "I've been using FinTrack frequently these days. This app has simplified my life as I handle every kind of transaction!",
    avatar: User1,
  },
  {
    name: "Jane Doe",
    role: "Satisfied Customer",
    text: "FinTrack has been a game-changer! I love how easy it is to manage my transactions and keep track of my expenses. Highly recommend!",
    avatar: User2,
  },
  {
    name: "John Smith",
    role: "Loyal User",
    text: "Using FinTrack has made budgeting and financial tracking effortless. I appreciate the detailed reports and insights!",
    avatar: User3,
  },
  {
    name: "Eduard Rey",
    role: "Frequent User",
    text: "A fantastic app! It saves me so much time, and the deals I get are amazing! I wouldn't go without it.",
    avatar: User4,
  },
];

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const homeSection = document.getElementById("home");

      if (homeSection) {
        const homeHeight = homeSection.offsetHeight;

        if (scrollPosition < homeHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(scrollPosition < lastScrollPosition);

          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          const newTimeoutId = setTimeout(() => {
            setIsVisible(false);
          }, 2000);

          setTimeoutId(newTimeoutId);
        }
      }

      setLastScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollPosition, timeoutId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Close menu on link click
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_hd8rnjf",
        "template_vdjvhlr",
        formData,
        "gi0bWZ9YJNyEjsEHa"
      )
      .then(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Message sent successfully!",
            confirmButtonColor: "#6C63FF",
            customClass: { popup: "custom-swal-popup" },
          });
          setFormData({
            name: "",
            email: "",
            business: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again!",
            confirmButtonColor: "#ff4b4b",
          });
        }
      );
  };

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [customers, setCustomers] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [reviews, setReviews] = useState(0);

  const animateValue = (start, end, duration, setter) => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const runAnimation = () => {
      setCustomers(0);
      setDownloads(0);
      setReviews(0);
      animateValue(0, 120, 3000, setCustomers);
      animateValue(0, 40, 3000, setDownloads);
      animateValue(0, 10, 3000, setReviews);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
      <header className={`navbar ${isVisible ? "" : "hidden"} ${menuOpen ? "menu-open" : ""}`}>
        <div className="logo-container">
          <span className="brand" onClick={scrollToTop}>FinTrack</span>
        </div>
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
        <nav className="nav-links">
          <a onClick={() => scrollToSection("home")}>Home</a>
          <a onClick={() => scrollToSection("about")}>About Us</a>
          <a onClick={() => scrollToSection("features")}>Features</a>
          <a onClick={() => scrollToSection("pricing")}>Pricing</a>
          <a onClick={() => scrollToSection("testimonials")}>Testimonials</a>
          <a onClick={() => scrollToSection("contact")}>Contact Us</a>
          <Link to="/login" id="login">Log in</Link>
          <Link to="/signup" className="btn-primary" id="btn-top">Get started</Link>
        </nav>
      </header>
      <main className="hero-section" id="home">
        <div className="hero-text">
          <h1>Manage Your Money In the Best Possible Way</h1>
          <p>Take control of your finances, track expenses, and maximize savings effortlessly.</p>
          <div className="hero-buttons">
            <Link to="/signup">
              <button className="btn-primary">Get started</button>
            </Link>
            <button className="btn-secondary">Talk to AI</button>
          </div>
        </div>
        <div className="animated-phone">
          <img src={phone} alt="Animated Phone" className="phone" />
        </div>
      </main>

      <div className="landing-below">
        <section id="about" className="about-section">
          <h2 className="section-title">Learn More About Us</h2>
          <p className="section-subtitle">Discover our journey, values, and commitment to excellence.</p>
          <div className="about-content">
            <div className="about-text">
              <h2>Keep track of your transactions <span className="highlight">easily</span> with FinTrack</h2>
              <p>With FinTrack, you will be getting details of your weekly transactions in a detailed manner so that you can keep a record of your money spent.</p>
              <button className="btn-primary-about">Read More</button>
            </div>
            <div className="about-images">
              <img src={aboutPhone} alt="Phone Screenshot" className="about-phone" />
            </div>
          </div>
          <div className="about-stats">
            <p className="animated-number">Trusted By More Than<br/><span className="highlight" id="highlight"><span>1</span><span>0</span><span>0</span><span>0</span></span> Companies</p>
            <div className="stats-grid">
              <div>
                <i className="fa-solid fa-user"></i>
                <div><span className="stat-number">{customers}M</span><br /> Customers</div>
              </div>
              <div>
                <i className="fa-solid fa-arrow-down"></i>
                <div><span className="stat-number">{downloads}M</span><br />Total Downloads</div>
              </div>
              <div>
                <i className="fa-solid fa-star"></i>
                <div><span className="stat-number">{reviews}M</span><br />Five-Star Reviews</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="features-header">
            <h2>More than just a tool</h2>
            <p>Explore what else we can do for you</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon feature-icon-blue">📋</div>
              <h3>Project Management</h3>
              <p>Create tasks, track time, and update progress all in one place.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon feature-icon-pink">⏳</div>
              <h3>Time Tracking</h3>
              <p>Discover how much time your team is spending on their work.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon feature-icon-red">📅</div>
              <h3>Resource Planning</h3>
              <p>Monitor how your resources are utilized across projects.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon feature-icon-green">💲</div>
              <h3>Invoicing</h3>
              <p>Save time by invoicing based on reported time for accurate billing.</p>
            </div>
          </div>
          <div className="features-button">
            <button className="btn-primary">View all features</button>
          </div>
        </section>

        <section id="pricing" className="pricing-section">
          <h2 className="section-title">Choose the plan that fits your needs.</h2>
          <p className="section-subtitle">Find the right plan that works best for you.</p>
          <div className="pricing-cards">
            <div className="pricing-card">
              <span className="plan-type">Personal</span>
              <h3 className="price">Free</h3>
              <p className="plan-description">To discover our product and its features</p>
              <ul className="features-list">
                <li>✔ Unlimited Projects</li>
                <li>✔ Share with 5 team members</li>
                <li>✔ Sync across devices</li>
                <li>✔ 20GB individual data each user</li>
              </ul>
              <button className="btn-primary">Learn More</button>
            </div>
            <div className="pricing-card featured">
              <span className="plan-type">Personal Pro</span>
              <h3 className="price">$10<span>/month</span></h3>
              <p className="plan-description">Best option for individual notetakers</p>
              <ul className="features-list">
                <li>✔ Unlimited Projects</li>
                <li>✔ Share with 25 team members</li>
                <li>✔ Sync across devices</li>
                <li>✔ 50GB individual data each user</li>
              </ul>
              <button className="btn-highlight">Try for Free</button>
            </div>
            <div className="pricing-card">
              <span className="plan-type">Team</span>
              <h3 className="price">$20<span>/month</span></h3>
              <p className="plan-description">Best suited for larger notetakers</p>
              <ul className="features-list">
                <li>✔ Unlimited Projects</li>
                <li>✔ Unlimited team members</li>
                <li>✔ Sync across devices</li>
                <li>✔ Unlimited individual data each user</li>
              </ul>
              <button className="btn-primary">Try for Free</button>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials-section">
          <h2 className="section-title">What Our Users Say?</h2>
          <p className="section-subtitle">Hear the words of appreciation from our users!</p>
          <div className="testimonial-container">
            <div className="testimonial-card">
              <div className="testimonial-quote">“</div>
              <p className="testimonial-text">{testimonialsData[currentTestimonial].text}</p>
              <div className="testimonial-quote" id="quote-2">”</div>
              <div className="testimonial-user">
                <img src={testimonialsData[currentTestimonial].avatar} alt="User" className="user-avatar" />
                <div>
                  <h4 className="user-name">{testimonialsData[currentTestimonial].name}</h4>
                  <p className="user-role">{testimonialsData[currentTestimonial].role}</p>
                </div>
              </div>
              <div className="testimonial-rating">★ ★ ★ ★ ★</div>
            </div>
            <div className="testimonial-users">
              {testimonialsData.map((user, index) => (
                <img
                  key={index}
                  src={user.avatar}
                  alt={`User ${index + 1}`}
                  className={`floating-user ${index === currentTestimonial ? "active" : ""}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
          <div className="testimonial-navigation">
            {testimonialsData.map((_, index) => (
              <span
                key={index}
                className={`nav-dot ${index === currentTestimonial ? "active" : ""}`}
                onClick={() => setCurrentTestimonial(index)}
              ></span>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2 className="section-title">We've been waiting for you.</h2>
          <p className="section-subtitle">We want to hear from you. Let us know how we can help.</p>
          <div className="contact-form-container">
            <div className="contact-bg"></div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Send us a Message</h3>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="business"
                placeholder="Business name"
                value={formData.business}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </section>

        <section id="scroll" className="scrolling-section">
          <div className="scrolling-wrapper">
            <div className="scrolling-content">
              {[image1, image2, image3, image4, image5, image6, image8].map((img, index) => (
                <img key={index} src={img} alt={`Visual ${index + 1}`} className="scrolling-image" />
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="newsletter-section">
          <div className="newsletter-text">
            <h2 className="newsletter-title">Sign Up For Our <span>Newsletters</span></h2>
            <p className="newsletter-description">
              By entering your email, you will get notified about our latest updates and features
            </p>
          </div>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email here" />
            <button>Submit</button>
          </div>
        </div>
        <div className="footer-content">
          <div className="footer-brand">
            <h3>FintTrack</h3>
            <p>Better way to handle your transactions.</p>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h4>About Product</h4>
              <ul>
                <li>Patch</li>
                <li>Updates</li>
                <li>Beta Test</li>
                <li>Pricing Product</li>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Account Information</li>
                <li>About Us</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4>Help and Solutions</h4>
              <ul>
                <li>Talk to Support</li>
                <li>Support Docs</li>
                <li>System Status</li>
                <li>More info</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© Copyright 2025 FinTrack. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Terms and Conditions</a>
            <span className="separator">|</span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
      <Chatbot />
    </div>
  );
};

export default LandingPage;