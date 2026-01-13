import React, { useEffect, useState } from "react";
import { getMenu } from "../services/apiService";
import "../styles/menu.css";
import { Link } from "react-router-dom";

const MegaMenu = () => {
  const [categories, setCategories] = useState([]); // always array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        setCategories(data?.Data || []); // ensure array
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <nav className="mega-menu">
        <ul className="menu">
          <li className="menu-item">Loading menu...</li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="mega-menu">
      <ul className="menu">
        <li className="menu-item">
          <span>PRODUCTS</span>
          <div className="mega-dropdown">
            {categories.map((cat) => (
              <div className="mega-column" key={cat.category}>
                <h4>{cat.category}</h4>
                <ul>
                  {cat.Subcategory.map((sub) => (
                    <li key={sub.subcategory}>
                      <Link to={`/${sub.subcategory_slug}`}>
                        {sub.subcategory}
                      </Link>
                      {/* {sub.dtls && sub.dtls.length > 0 && (
                        <ul className="sub-subcategory">
                          {sub.dtls.map((item) => (
                            <li key={item.productid}>
                              <Link to={`/product/${item.productid}`}>
                                {item.modelno}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )} */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default MegaMenu;
