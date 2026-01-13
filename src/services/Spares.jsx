
import Axios from "./Axios";

export const getBanners  = async () => {
    try {
      const response = await Axios.get('/banner/'); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

  export const getBrands  = async () => {
    try {
      const response = await Axios.get('/brand/'); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

  export const getBrandPage  = async (values) => {
    try {
      const response = await Axios.get('Brandcatagorylist/?brand', {
        params: {
          brand: values,
        },}); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error;
    }
  };
  export const getBrandProductList  = async ({type,subcategory}) => {
    try {
      const response = await Axios.get('lodingpageproductlist/?', {
        params: {
          type,
          subcategory,
        },}); 
      return response.data; // Return fetched data
    } catch (error) {
      throw error;
    }
  };

  export const getMenu  = async () => {
    try {
      const response = await Axios.get('/menu/'); // API 
      console.log(response)
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

   export const getSubcategoryDetails = async ({ subcategory }) => {
  try {
    const response = await Axios.get('lodingpageproductlist/', {
      params: {
        type: 'subcategory',   // fixed value
        subcategory,           // dynamic
      },
    });
    console.log('catResponse',response)
    return response.data;
  } catch (error) {
    throw error;
  }
};



  export const shopbySpares  = async () => {
    try {
      const response = await Axios.get('/Shopbyspares/'); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

  export const shopbyBrand  = async () => {
    try {
      const response = await Axios.get('/brand/'); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

  export const getEssentialSpares  = async () => {
    try {
      const response = await Axios.get('/Essentialspares/'); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

  export const getProductDeteails  = async (values) => {
    try {
      const response = await Axios.get('/lodingpageproductlist/?type=modelno&productid', {
        params: {
          productid: values,
        },}); // API 
        // console.log(response.data)
      return response.data; // Return fetched data
    } catch (error) {
      throw error;
    }
  };

 export const addtoRecent = async ({ customerid, productid }) => {
  console.log("➡️ addtoRecent called with:", customerid, productid);

  try {
    const response = await Axios.post('/Recentlyviewedlist/', {
      customerid,
      productid,
    });
    console.log("✅ addtoRecent API response:", response);
    return response.data;
  } catch (error) {
    console.error("❌ addtoRecent API error:", error?.message || error);
    throw error;
  }
};


  export const getSimilarProducts  = async (values) => {
    try {
      const response = await Axios.get('/similarproducts/?productid', {
        params: {
          productid: values,
        },}); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error;
    }
  };

  export const getProductSpares  = async (values) => {
    try {
      const response = await Axios.get('produsapreparts/?productid', {
        params: {
          productid: values,
        },}); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error;
    }
  };

  export const getRatings  = async (values) => {
    try {
      const response = await Axios.get('/productrating/?productid', {
        params: {
          productid: values,
        },}); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error;
    }
  };

   export const newarrivals  = async () => {
    try {
      const response = await Axios.get('/Newarrivals/'); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

  export const getRecentlyViewed  = async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      const response = await Axios.get(`/Recentlyviewedlist/?customerid=${encodeURIComponent(userId)}`); // API ${encodeURIComponent(userId)}
      return response.data; // Return fetched data
    } catch (error) {
      throw error; 
    }
  };

 export const orderInvoice = async ({orderid}) => {
  try {
    console.log('🛰 Sending request with:', orderid);
    const response = await Axios.post('/Purchaseordergetdtl/',[{orderid}] );
     console.log('✅ API response:', response);
    return response;
  } catch (error) {
    console.error('❌ API call failed:', error);
    throw error;
  }
};



export const getWallet  = async () => {
    try {
      const response = await Axios.get('/wallet_get/'); 
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };

  export const getDashBordCards = async()=>{
    try{
      const response=await Axios.get('/dashboardcards/')
      console.log('API from dashbord:',response)
      return response;
    }catch(error){
      throw error
    }
  };

  export const getMostViewed =async()=>{
    try{
      const response=await Axios.get('/most_viewed_list/')
      console.log('mostViewed items:',response?.data)
      return response;
    }catch(error){
      console.log('mostviewer:',error)
      throw error
    }
  }
  
  export const getProfessions =async()=>{
    try{
      const response=await Axios.get('/ShopProfessionList/')
      console.log('mostViewed items:',response?.data)
      return response;
    }catch(error){
      console.log('mostviewer:',error)
      throw error
    }
  }

  export const getShopProfession =async(prof)=>{
    console.log('apihitting',prof)
    try{
      const response=await Axios.get(`/ShopProfession/?profession=${prof}`)
      console.log('profession items:',response)
      return response;
    }catch(error){
      console.log('prof:',error)
      throw error
    }
  }
  
   export const getSpecialProducts =async()=>{
    try{
      const response=await Axios.get('/SpecialDiscountList/')
      console.log('mostViewed items:',response?.data)
      return response;
    }catch(error){
      console.log('mostviewer:',error)
      throw error
    }
  }