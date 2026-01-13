import React from "react";
import "../styles/Footer.css"; // Make sure this path is correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top section */}
        <div className="footer-top">
          
          {/* About Section */}
          <div className="footer-section">
            <h2>About Us</h2>
            <p>
              We provide high-quality automotive components for lasting performance. 
              Explore our complete range of parts and stay updated with the latest products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/T&C">Terms & Conditions</a></li>
              <li><a href="/privacypolicy">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h2>Contact Us</h2>
            <p>
              Address: 123 Auto Street, City, Country <br/>
              Phone: +91 12345 67890 <br/>
              Email: info@example.com
            </p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
            </div>
          </div>

        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
