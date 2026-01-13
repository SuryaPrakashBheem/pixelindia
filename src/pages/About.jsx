import React from 'react';
import '../styles/About.css';
import { FaLeaf, FaAward, FaUsers, FaIndustry, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section - Compact */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p className="hero-tagline">
            Committed to excellence in quality and sustainable manufacturing
          </p>
        </div>
      </section>

      <div className="about-container">
        {/* Mission Statement - Compact */}
        <section className="about-section">
          <h2 className="section-title">Mission Statement</h2>
          <div className="content-box">
            <p className="content-text">
              Our mission is to provide <span className="highlight">high-quality products</span> to our customers 
              while maintaining <span className="highlight">ethical and sustainable manufacturing practices</span>.
            </p>
          </div>
        </section>

        {/* Manufacturing Process - Compact */}
        <section className="about-section">
          <h2 className="section-title">Our Manufacturing Process</h2>
          <div className="content-box">
            <p className="content-text">
              We use <span className="highlight">state-of-the-art technology</span> to ensure precision and 
              consistency in every product. We maintain the highest standards of safety, compliance, 
              and sustainable practices.
            </p>
          </div>
        </section>

        {/* Values Section - Compact */}
        <section className="values-section">
          <h2 className="section-title text-center">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h3 className="value-title">Sustainability</h3>
              <p className="value-description">
                Environmentally responsible manufacturing
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaAward />
              </div>
              <h3 className="value-title">Quality</h3>
              <p className="value-description">
                Uncompromising standards in every product
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h3 className="value-title">Teamwork</h3>
              <p className="value-description">
                Collaborative environment empowering employees
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section - Compact */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Products</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Team Members</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Customer Satisfaction</p>
            </div>
          </div>
        </section>

        {/* Features - Compact */}
        <section className="about-section">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="content-box">
            <div className="features-grid">
              <div className="feature-item">
                <FaIndustry style={{ fontSize: '35px', color: '#0068B4', marginBottom: '12px' }} />
                <h3>Advanced Technology</h3>
                <p>Cutting-edge manufacturing equipment</p>
              </div>
              
              <div className="feature-item">
                <FaShieldAlt style={{ fontSize: '35px', color: '#0068B4', marginBottom: '12px' }} />
                <h3>Safety First</h3>
                <p>Highest safety standards</p>
              </div>
              
              <div className="feature-item">
                <FaChartLine style={{ fontSize: '35px', color: '#0068B4', marginBottom: '12px' }} />
                <h3>Continuous Improvement</h3>
                <p>Evolving to meet industry demands</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Compact */}
        <div className="text-center mt-40">
          <a href="/contact" className="cta-button">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;