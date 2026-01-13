import { useNavigate } from "react-router-dom";
import "../styles/home.css"
const Header = () => {
    const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="logo">Pixel</div>

      <nav>
        <a className="active">HOME</a>
        <a onClick={() => navigate("/dashboard")}>SHOP</a>
        <a>PRODUCTS</a>
        <a>ABOUT US</a>
        <a>CONTACT</a>
      </nav>

      <div className="header-actions">
        <input type="text" placeholder="Search Products" />
        <span className="icon">🛒</span>
        <span className="price">$0.00</span>
      </div>
    </header>
  );
};

export default Header;
