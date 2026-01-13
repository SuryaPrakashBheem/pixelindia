import "../styles/home.css"
import MegaMenu from "./menu";
import { Link } from "react-router-dom";
import { FaUserCircle,FaShoppingCart, } from "react-icons/fa";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Login from "../comopnents/Login";

const Header = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <input type="text" placeholder="Search Products" />
        <span className="icon" onClick={showModal} style={{marginRight:10}}><FaUserCircle  size={25}/></span>
         <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
          footer={null}        // ✅ removes OK & Cancel buttons
      >
        <Login />
      </Modal>
        <span className="icon"><FaShoppingCart size={25}/></span>
        <span className="price">$0.00</span>
      </div>
    </header>
  );
};

export default Header;
