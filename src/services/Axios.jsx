
import axios from 'axios';

// Base URL for API request
  const API_BASE_URL = 'http://192.168.0.223:8000';

// Create an Axios instance
const Axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    
  },
});

// Add request interceptor to include token
// Axios.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('accessid');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default Axios;
