// ProductPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/productdetail.css";

import product1Img from "../assets/p1.png";
import TopBar from "../comopnents/TopBar";
import Header from "../comopnents/Header";


const ProductPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);

  const relatedProducts = [
    { id: 1, name: "Performance Oil Filter", price: "$45.00", image: product1Img },
    { id: 2, name: "High Flow Fuel Pump", price: "$120.00", image: product1Img },
    { id: 3, name: "Racing Spark Plug Set", price: "$60.00", image: product1Img },
    { id: 4, name: "Heavy Duty Timing Chain", price: "$85.00", image: product1Img },
  ];

  return (
    <>
      <TopBar/>
      <Header/>

      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          Home / Shop / Engine Parts /{" "}
          <span>Chevy 305 327 350 400 Ultimate Cam Kit</span>
        </div>

        {/* Product Section */}
        <div className="product-wrapper">
          {/* Images */}
          <div className="product-images">
            <img src={product1Img} className="main-img" alt="Product" />
            <div className="thumbs">
              {[1,2,3,4].map(i => (
                <img key={i} src={product1Img} alt="thumb" />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1>Chevy 305 327 350 400 Ultimate Cam Kit</h1>

            <div className="rating">⭐⭐⭐⭐⭐ <span>(2 reviews)</span></div>

            <div className="price">
              <span className="old">$120.00</span>
              <span className="new">$100.00</span>
              <span className="discount">-17%</span>
            </div>

            <p className="viewing">👁 40 people are viewing this right now</p>

            <p className="desc">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur.
            </p>

            <div className="features">
              <p>🚚 Free worldwide shipping</p>
              <p>⏱ Delivery in 3–7 working days</p>
            </div>

            {/* Cart */}
            <div className="cart">
              <div className="qty">
                <button onClick={decreaseQty}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
              </div>
              <button className="add-cart">Add To Cart</button>
            </div>
          </div>
        </div>

        {/* Specifications & Reviews */}
        <div className="product-extra">
          <div className="specifications">
            <h3>Specifications</h3>
            <ul>
              <li><strong>Brand:</strong> Chevy</li>
              <li><strong>Material:</strong> Steel</li>
              <li><strong>Warranty:</strong> 1 Year</li>
            </ul>
          </div>

          <div className="reviews">
            <h3>Customer Reviews</h3>
            <p>⭐⭐⭐⭐⭐ John D. – Excellent quality</p>
            <p>⭐⭐⭐⭐ Mike R. – Perfect fit</p>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>Related Products</h2>

          <div className="related-grid">
            {relatedProducts.map(item => (
              <div
                key={item.id}
                className="related-card"
                onClick={() => navigate("/productdetail")}
              >
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <div className="price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
