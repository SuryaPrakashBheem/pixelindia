import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home";
import ProductPage from "../pages/productdetail";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/productdetail" element={<ProductPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
