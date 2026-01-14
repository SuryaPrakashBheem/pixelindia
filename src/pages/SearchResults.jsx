import { useEffect, useState } from "react";
import "../styles/Shop.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import tool1 from "../assets/powertool.1.jpg";
import tool2 from "../assets/powertool.2.jpg";
import tool3 from "../assets/powertool.3.jpg";
import tool4 from "../assets/powertool.4.jpg";
import tool5 from "../assets/powertool.5.jpg";
import tool6 from "../assets/powertool.6.jpg";
import tool7 from "../assets/powertool.7.jpg";
import tool8 from "../assets/powertool.8.jpg";
import tool9 from "../assets/powertool.9.jpg";
import { fetchSearchResultsAPI } from "../services/Tools";


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

function SearchResults() {
  const [selectedCategory,setSelectedCategory] = useState("All");
  const [maxPrice,setMaxPrice] = useState(1250);
  const [selectedModels,setSelectedModels] = useState([]);
  const [cartItems,setCartItems] = useState([]);
  const [wishlistItems,setWishlistItems] = useState([]);
 const [params] = useSearchParams();
  const query = params.get("query");
  const toggleCartItem = (id) => setCartItems(cartItems.includes(id) ? cartItems.filter(i=>i!==id) : [...cartItems,id]);
  const toggleWishlistItem = (id) => setWishlistItems(wishlistItems.includes(id) ? wishlistItems.filter(i=>i!==id) : [...wishlistItems,id]);
  const toggleModel = (name) => setSelectedModels(selectedModels.includes(name) ? selectedModels.filter(i=>i!==name) : [...selectedModels,name]);
 const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const filteredProducts = products.filter(p => 
    (selectedCategory==="All"||p.category===selectedCategory) && p.price<=maxPrice
  );

   const fetchSearchResults = async (customQuery) => {
    // const queryToSearch = customQuery ?? query;

    // if (!queryToSearch.trim()) {
    //   setProducts([]);
    //   setFilteredProducts([]);
    //   return;
    // }

    try {
      setLoading(true);

      // ✅ payload-based API call
      const data = await fetchSearchResultsAPI(query);
     console.log(data)
      setProducts(data);
      applyFilters(data, sortOption, filterOption);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    fetchSearchResults();
  }, [query, sortOption, filterOption]);


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
            <div className="shop-card" key={product.productid}>
              <div className="shop-image-container">
                <img src={product.image1} alt={product.name}/>
                <div className="hover-icons">
                  <div className="hover-icon" onClick={()=>toggleCartItem(product.productid)}>
                    <FaShoppingCart className={`cart-icon ${cartItems.includes(product.productid)?"added":""}`}/>
                  </div>
                  <div className="hover-icon" onClick={()=>toggleWishlistItem(product.productid)}>
                    <FaHeart className={`wishlist-icon ${wishlistItems.includes(product.productid)?"active":""}`}/>
                  </div>
                </div>
                {product.isHot && <div className="hot-badge">Hot</div>}
                {product.discount && <div className="discount-badge">-{product.discount}%</div>}
              </div>
              <div className="shop-info">
                <p className="category-tag">{product.category}</p>
                <h3 className="shop-name">{product.modelno}</h3>
                <div className="price-container">
                  <span className="current-price">${product.mrp}</span>
                  {/* {product.originalPrice && <span className="old-price">${product.originalPrice}</span>} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
