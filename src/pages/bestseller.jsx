import "../styles/bestseller.css";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png"; // add more product images
import product3 from "../assets/product3.png";
import banner from"../assets/banner.png";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "DISC By ATDinto Neo Gen Tire 20540ZR18XL",
    category: "ENGINE PARTS",
    price: "$30.00 – $40.00",
    discount: "43%",
    rating: 5,
    reviews: 0,
    image: product1,
  },
  {
    id: 2,
    name: "Engine Oil Premium 5W-40",
    category: "OIL & FLUIDS",
    price: "$20.00 – $25.00",
    discount: "20%",
    rating: 4,
    reviews: 12,
    image: product2,
  },
  {
    id: 3,
    name: "Shock Absorber Set - HD Series",
    category: "SUSPENSION",
    price: "$50.00 – $60.00",
    discount: "15%",
    rating: 5,
    reviews: 8,
    image: product3,
  },
   {
    id: 4,
    name: "DISC By ATDinto Neo Gen Tire 20540ZR18XL",
    category: "ENGINE PARTS",
    price: "$30.00 – $40.00",
    discount: "43%",
    rating: 5,
    reviews: 0,
    image: product1,
  },
  {
    id: 5,
    name: "Engine Oil Premium 5W-40",
    category: "OIL & FLUIDS",
    price: "$20.00 – $25.00",
    discount: "20%",
    rating: 4,
    reviews: 12,
    image: product2,
  },
 
];

const BestsellerSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bestseller">
      {/* HEADER */}
      <div className="bestseller-header">
        <h2>BEST SELLERS</h2>
{/* 
        <ul className="bestseller-tabs">
          <li className="active">Engine Parts</li>
          <li>Oil & Fluids</li>
          <li>Suspension</li>
          <li>Tires & Wheels</li>
        </ul> */}

        <a href="#" className="view-all">
          View All →
        </a>
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.discount && <span className="discount">-{product.discount}</span>}

            <div className="product-actions">
              <span>♡</span>
              <span>🛒</span>
              <span>🔍</span>
            </div>

       <img
      src={product.image}
      alt={product.name}
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/productdetail")}
    />

            <p className="category">{product.category}</p>
            <h4>{product.name}</h4>

            <div className="rating">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}{" "}
              <span>({product.reviews} Reviews)</span>
            </div>

            <div className="price">{product.price}</div>
          </div>
        ))}
      </div>
    <div className="bestseller-banner">
  <img src={banner} alt="Promotion Banner" />

  {/* HOT DEAL badge at top-left */}
  <span className="hot-deal-badge">HOT DEAL</span>

  {/* Overlay content */}
  <div className="banner-overlay">
    <h2>Up to 50% Off on Engine Parts</h2>
    <p>Grab the best deals before they run out!</p>
    <a href="#" className="shop-now-btn">Shop Now →</a>
  </div>
</div>
 <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.discount && <span className="discount">-{product.discount}</span>}

            <div className="product-actions">
              <span>♡</span>
              <span>🛒</span>
              <span>🔍</span>
            </div>
  <img
      src={product.image}
      alt={product.name}
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/productdetail")}
    />

            <p className="category">{product.category}</p>
            <h4>{product.name}</h4>

            <div className="rating">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}{" "}
              <span>({product.reviews} Reviews)</span>
            </div>

            <div className="price">{product.price}</div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default BestsellerSection;
