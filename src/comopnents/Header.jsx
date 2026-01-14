import "../styles/home.css"
import MegaMenu from "./menu";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, } from "react-icons/fa";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Login from "../comopnents/Login";
import { Dropdown, Space } from 'antd';
import Signup from "./signup";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../utils/authStorage";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [query, setQuery] = useState("");
      const { userId } = getAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);
  };
  const items = [
    {
      key: "login",
      label: "Login",
      onClick: () => setLoginOpen(true),
    },
    {
      key: "signup",
      label: "Signup",
      onClick: () => setSignupOpen(true),
    },
  ];
  return (
    <header className="main-header">
      <div className="logo">Pixel</div>

      <nav>
        <ul className="nav-list">
          <li>
            <a className="active" href="#">HOME</a>
          </li>
          <li>
            <Link to="/Shop">SHOP</Link>
          </li>
          <li>
            <MegaMenu />
          </li>
          <li>
            <a href="#">ABOUT US</a>
          </li>
          <li>
            <a href="#">CONTACT</a>
          </li>
        </ul>
      </nav>

      <div className="header-actions">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>  <p>{userId}</p>      <Dropdown menu={{ items }}>
          <span className="icon" style={{ marginRight: 10 }}><FaUserCircle size={25} /></span>
        </Dropdown>
        {/* Login Modal */}
        <Modal
          open={loginOpen}
          footer={null}
          centered
          onCancel={() => setLoginOpen(false)}
          destroyOnClose
        >
          <Login />
        </Modal>
        {/* Signup Modal */}
        <Modal
          open={signupOpen}
          footer={null}
          centered
          onCancel={() => setSignupOpen(false)}
          destroyOnClose
        >
          <Signup />
        </Modal>
        <span className="icon"><FaShoppingCart size={25} /></span>
        <span className="price">$0.00</span>
      </div>
    </header>
  );
};

export default Header;
