import Axios from "./Axios";

// 🔍 Search API
export const fetchSearchResultsAPI = async (queryParam) => {
  try {
    const response = await Axios.get(`/search/?search=${queryParam}`);
    console.log("Search Results API:", response.data);
    return response.data;
  } catch (error) {
    console.log("Search API Error:", error?.response?.data || error);
    throw error;
  }
};

// 🟦 Categories API
export const getCategories = async () => {
  try {
    const response = await Axios.get('/menu/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 📤 File Upload API
export const getImage = async ({ filename, image, userid, processes }) => {
  const payload = { filename, image, userid, processes };
  console.log("📦 Upload Payload:", payload);

  try {
    const response = await Axios.post('/fileuploadview/', payload);
    console.log("✅ Upload Success:", response.data);
    return response.data;
  } catch (error) {
    console.log("❌ Upload Failed:", error.response?.data || error);
    throw error;
  }
};

// 🛠 Warranty Details
export const warrantyDetails = async () => {
  try {
    const response = await Axios.get('/get_warrant_details/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🛠 Extend Warranty
export const warrantyExtend = async ({
  userid,
  orderno,
  category,
  modelno,
  invoiceimage,
  productimage,
  warrantydays,
  startdate,
  enddate,
}) => {
  const payload = {
    userid,
    orderno,
    category,
    modelno,
    invoiceimage,
    productimage,
    warrantydays,
    startdate,
    enddate,
  };

  console.log("📦 Warranty Payload:", payload);

  try {
    const response = await Axios.post('/warranty/', payload);
    console.log("Warranty Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("❌ Warranty API Error:", error.response?.data || error);
    throw error;
  }
};
