import { useState } from "react";
import "../styles/Shop.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

import tool1 from "../assets/powertool.1.jpg";
import tool2 from "../assets/powertool.2.jpg";
import tool3 from "../assets/powertool.3.jpg";
import tool4 from "../assets/powertool.4.jpg";
import tool5 from "../assets/powertool.5.jpg";
import tool6 from "../assets/powertool.6.jpg";
import tool7 from "../assets/powertool.7.jpg";
import tool8 from "../assets/powertool.8.jpg";
import tool9 from "../assets/powertool.9.jpg";


// ===== DATA =====
const productsData = [
  { id:1, name:"Air Intake Pump (General Electric AIP-911-1)", price:100, originalPrice:null, category:"Brake System", image:tool1, isHot:true, discount:15, rating:5, reviews:0 },
  { id:2, name:"Airbag Replacement Center Mark Steering Wheel", price:500, originalPrice:550, category:"Engine Parts", image:tool2, isHot:true, discount:null, rating:5, reviews:0 },
  { id:3, name:"All Weather Terrain Braker Abs/PRO", price:400, originalPrice:null, category:"Engine Parts", image:tool3, isHot:false, discount:17, rating:5, reviews:0 },
  { id:4, name:"Power Drill Pro X2000", price:120, originalPrice:150, category:"Power Tools", image:tool4, isHot:false, discount:20, rating:4, reviews:5 },
  { id:5, name:"Angle Grinder Professional", price:95, originalPrice:120, category:"Power Tools", image:tool5, isHot:true, discount:21, rating:4, reviews:12 },
  { id:6, name:"Electric Saw Heavy Duty", price:150, originalPrice:180, category:"Power Tools", image:tool6, isHot:false, discount:17, rating:5, reviews:8 },
  { id:7, name:"Impact Wrench Set", price:180, originalPrice:200, category:"Power Tools", image:tool7, isHot:false, discount:10, rating:4, reviews:3 },
  { id:8, name:"Rotary Hammer Drill", price:200, originalPrice:250, category:"Power Tools", image:tool8, isHot:true, discount:20, rating:4, reviews:15 },
  { id:9, name:"Heat Gun Industrial", price:70, originalPrice:90, category:"Power Tools", image:tool9, isHot:false, discount:22, rating:3, reviews:7 },
];

const categories = [
  { name:"Air Filter", count:5 },
  { name:"Engine Parts", count:9 },
  { name:"Lighting Parts", count:10 },
  { name:"Oil & Fluids", count:9 },
  { name:"Suspension", count:6 },
  { name:"Tires & Wheels", count:5 },
];

const models = [
  { name:"A3", count:2 },
  { name:"A5", count:5 },
  { name:"A6", count:6 },
  { name:"A8", count:4 },
  { name:"Civic", count:2 },
  { name:"CR-H", count:2 },
];

function Shop() {
  const [selectedCategory,setSelectedCategory] = useState("All");
  const [maxPrice,setMaxPrice] = useState(1250);
  const [selectedModels,setSelectedModels] = useState([]);
  const [cartItems,setCartItems] = useState([]);
  const [wishlistItems,setWishlistItems] = useState([]);

  const toggleCartItem = (id) => setCartItems(cartItems.includes(id) ? cartItems.filter(i=>i!==id) : [...cartItems,id]);
  const toggleWishlistItem = (id) => setWishlistItems(wishlistItems.includes(id) ? wishlistItems.filter(i=>i!==id) : [...wishlistItems,id]);
  const toggleModel = (name) => setSelectedModels(selectedModels.includes(name) ? selectedModels.filter(i=>i!==name) : [...selectedModels,name]);

  const filteredProducts = productsData.filter(p => 
    (selectedCategory==="All"||p.category===selectedCategory) && p.price<=maxPrice
  );

  return (
    <div className="shop-container">
      <div className="filters">
        <h3>Product Categories</h3>
        <ul className="category-list">
          {categories.map((c,i)=>(
            <li key={i} className={selectedCategory===c.name?"active":""} onClick={()=>setSelectedCategory(c.name)}>
              <span>{c.name}</span>
              <span className="category-count">({c.count})</span>
            </li>
          ))}
        </ul>

        <div className="price-filter">
          <h4>Filter By Price</h4>
          <div className="price-range"><span>$30</span><span>$1250</span></div>
          <input type="range" className="price-slider" min="30" max="1250" step="10" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/>
          <button className="filter-button">Filter</button>
        </div>

        <div className="model-filter">
          <h4>Filter By Model</h4>
          <ul className="model-list">
            {models.map((m,i)=>(
              <li key={i} className={selectedModels.includes(m.name)?"active":""} onClick={()=>toggleModel(m.name)}>
                <span>{m.name}</span>
                <span className="model-count">({m.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="product-content">
        <div className="results-header">
          Showing 1-{filteredProducts.length} of {filteredProducts.length} items
        </div>

        <div className="shop-product-grid">
          {filteredProducts.map(product=>(
            <div className="shop-card" key={product.id}>
              <div className="shop-image-container">
                <img src={product.image} alt={product.name}/>
                <div className="hover-icons">
                  <div className="hover-icon" onClick={()=>toggleCartItem(product.id)}>
                    <FaShoppingCart className={`cart-icon ${cartItems.includes(product.id)?"added":""}`}/>
                  </div>
                  <div className="hover-icon" onClick={()=>toggleWishlistItem(product.id)}>
                    <FaHeart className={`wishlist-icon ${wishlistItems.includes(product.id)?"active":""}`}/>
                  </div>
                </div>
                {product.isHot && <div className="hot-badge">Hot</div>}
                {product.discount && <div className="discount-badge">-{product.discount}%</div>}
              </div>
              <div className="shop-info">
                <p className="category-tag">{product.category}</p>
                <h3 className="shop-name">{product.name}</h3>
                <div className="price-container">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && <span className="old-price">${product.originalPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
