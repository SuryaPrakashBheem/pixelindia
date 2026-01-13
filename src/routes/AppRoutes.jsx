import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home";
import ProductPage from "../pages/productdetail";
import Shop from "../pages/shop";
import About from"../pages/About";
import PrivacyPolicy from "../comopnents/PrivacyPolicy";
import TermsConditions from "../comopnents/Termsconditions";


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/productdetail" element={<ProductPage />} />
       <Route path="/Shop" element={<Shop/>} />
        <Route path="/About" element={<About/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" />} />
       <Route path="/privacypolicy" element={<PrivacyPolicy />} />
       <Route path="/T&C" element={<TermsConditions/>}/>

    </Routes>
  );
};

export default AppRoutes;
