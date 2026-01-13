// Home.jsx
import "../styles/home.css";
import TopBar from "../comopnents/TopBar";
import Header from "../comopnents/Header";
import ProductPage from "./productdetail";
import HeroSection from "../comopnents/HeroSection";
import PromoCards from "../comopnents/PromoCards";
import BestsellerSection from "./bestseller";
import Footer from "../comopnents/Footer";

const Home = () => {
  return (
    <>
      <TopBar />
      <Header />
      
      <HeroSection />
      <PromoCards />
      <BestsellerSection />

      <div className="info-cards-wrapper" style={{ marginBottom: "60px" }}>
        <div className="info-card">
          <div className="icon">
            <i className="fa fa-headphones"></i>
          </div>
          <h3 className="title">ALWAYS BY YOUR SIDE</h3>
          <p className="desc">
            We take extensive measures to ensure all our products are made to
            the very highest standards and meet all relevant industry
            regulations.
          </p>
        </div>

        <div className="info-card">
          <div className="icon">
            <i className="fa fa-map-marker"></i>
          </div>
          <h3 className="title">FIND A LOCAL RETAILER</h3>
          <p className="desc">
            DEWALT® products and accessories are available online and at
            retailers nationwide. Search for retailers near you by postcode or
            city.
          </p>
        </div>

        <div className="info-card">
          <div className="icon">
            <i className="fa fa-comment"></i>
          </div>
          <h3 className="title">HOW CAN WE HELP?</h3>
          <p className="desc">
            If you want to contact us, now it's easier than ever to get in
            touch. Whatever you need, we are here for you.
          </p>
        </div>

        <div className="info-card">
          <div className="icon">
            <i className="fa fa-wrench"></i>
          </div>
          <h3 className="title">WARRANTY INFORMATION</h3>
          <p className="desc">
            We're confident in our products. We’ll repair any defects due to
            faulty materials or workmanship within the specified warranty.
          </p>
        </div>
      </div>
     

      {/* Product Detail Page
      <ProductPage />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
// import React from "react";
// import ProductPage from "./productdetail";

// const Home = () => {
//   return <ProductPage />;
// };

// export default Home;
