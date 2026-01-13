import heroImg from "../assets/hero.png";

const HeroSection = () => {
  return (
    
    <section
      className="hero"
      style={{
        background: `url(${heroImg}) center/cover no-repeat`,
        height: "420px",
      }}
    >
      <div className="hero-overlay">
        <h1>
          Parts For Lasting <span>Performance</span>
        </h1>
        <p>Complete Range Of Automotive Components</p>
      </div>
    </section>
  );
};

export default HeroSection;
