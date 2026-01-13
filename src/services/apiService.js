import axios from "axios";

// -------------------- AXIOS INSTANCE --------------------
const API_BASE_URL = "http://192.168.0.223:8000"; // Replace with your backend URL

const Axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add token from localStorage
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // replace with your auth token key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- HELPER FUNCTIONS --------------------
const getRequest = async (url, params = {}) => {
  try {
    const response = await Axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`GET ${url} failed:`, error?.message || error);
    throw error;
  }
};

const postRequest = async (url, body = {}) => {
  try {
    const response = await Axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error(`POST ${url} failed:`, error?.message || error);
    throw error;
  }
};

// -------------------- API METHODS --------------------

// Menu (Categories & Subcategories)
export const getMenu = () => getRequest("/menu/");

// Banners
export const getBanners = () => getRequest("/banner/");

// Brands
export const getBrands = () => getRequest("/brand/");

// Brand page products
export const getBrandPage = (brand) =>
  getRequest("Brandcatagorylist/?brand", { brand });

// Brand product list by type & subcategory
export const getBrandProductList = ({ type, subcategory }) =>
  getRequest("lodingpageproductlist/?", { type, subcategory });

// Subcategory details
export const getSubcategoryDetails = (subcategory) =>
  getRequest("lodingpageproductlist/", { type: "subcategory", subcategory });

// Shop by Spares
export const shopBySpares = () => getRequest("/Shopbyspares/");

// Shop by Brand
export const shopByBrand = () => getRequest("/brand/");

// Essential spares
export const getEssentialSpares = () => getRequest("/Essentialspares/");

// Product details
export const getProductDetails = (productid) =>
  getRequest("/lodingpageproductlist/?type=modelno&productid", { productid });

// Add to Recently Viewed
export const addToRecent = ({ customerid, productid }) =>
  postRequest("/Recentlyviewedlist/", { customerid, productid });

// Similar products
export const getSimilarProducts = (productid) =>
  getRequest("/similarproducts/?productid", { productid });

// Product spares
export const getProductSpares = (productid) =>
  getRequest("produsapreparts/?productid", { productid });

// Product ratings
export const getRatings = (productid) =>
  getRequest("/productrating/?productid", { productid });

// New arrivals
export const newArrivals = () => getRequest("/Newarrivals/");

// Recently viewed products (using localStorage for userId)
export const getRecentlyViewed = () => {
  const userId = localStorage.getItem("userid");
  if (!userId) return [];
  return getRequest(`/Recentlyviewedlist/?customerid=${encodeURIComponent(userId)}`);
};

// Order invoice
export const orderInvoice = (orderid) =>
  postRequest("/Purchaseordergetdtl/", [{ orderid }]);

// Wallet
export const getWallet = () => getRequest("/wallet_get/");

// Dashboard cards
export const getDashboardCards = () => getRequest("/dashboardcards/");

// Most viewed products
export const getMostViewed = () => getRequest("/most_viewed_list/");

// Professions
export const getProfessions = () => getRequest("/ShopProfessionList/");

// Products by profession
export const getShopProfession = (profession) =>
  getRequest(`/ShopProfession/?profession=${profession}`);

// Special discount products
export const getSpecialProducts = () => getRequest("/SpecialDiscountList/");

// -------------------- EXPORT AXIOS --------------------
export default Axios;
