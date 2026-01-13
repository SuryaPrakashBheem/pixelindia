// src/services/Auth.js
import Axios from './Axios';

export const login = async (values) => {
  try {
    const response = await Axios.post('/api/login/', values);
    return response.data;
  } catch (error) {
    console.error('Login API error:', error.response?.data || error.message);
    throw error;
  }
};


export const checkUserExists = async (values) => {
  try {
    const response = await Axios.post('/Checkusername/', values);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOtp = async ({ mobile }) => {
  try {
    const response = await Axios.post('/otp/', {
      mobile
    }); // API 
    console.log(response)
    return response; // Return fetched data
  } catch (error) {
    throw error; // Forward the error to be handled in the component
  }
};

export const ValidateOtp = async ({ mobile, otp }) => {
  try {
    const response = await Axios.post('/validateotp/', {
      mobile,
      otp
    }); // API 
    console.log(response)
    return response; // Return fetched data
  } catch (error) {
    throw error; // Forward the error to be handled in the component
  }
};

export const ChangePassword = async ({ userid, password, password2 }) => {
  try {
    const response = await Axios.post('/Changepassword/', {
      userid,
      password,
      password2
    }); // API 
    console.log(response)
    return response; // Return fetched data
  } catch (error) {
    throw error; // Forward the error to be handled in the component
  }
};
export const RegisterNewUser = async ({ first_name, username, mobile, email, password, clientid, usertype, module_assign, }) => {
  try {
    const response = await Axios.post('/api/register/', {
      first_name,
      username,
      mobile,
      email,
      password,
      clientid,
      usertype,
      module_assign,
    }); // API 
    console.log(response)
    return response; // Return fetched data
  } catch (error) {
    throw error; // Forward the error to be handled in the component
  }
};

export const deviceIdwithoutLogin = async (token) => {
  console.log("api:", token)
  const userId = await AsyncStorage.getItem('userid');
  console.log("userid:", userId)
    try {
      const response = await Axios.post('/mobile_divice_id/', {
        user: userId ? userId : "",
        token: token
      }); // API 
      // console.log("api without login response:", response)
      return response; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
}

export const Notifyed = async ({ customerid, productid }) => {
  try {
    const response = await Axios.post('/Notifiedme/', {
      customerid: customerid,
      productid: productid,
    });

    return response.data; // optional
  } catch (error) {
    throw error;
  }
};


export const deviceIdwithLogin = async (token) => {
  console.log("api hitting:", token)
  try {
    const userId = await AsyncStorage.getItem('userid');
      const usertype = await AsyncStorage.getItem('usertype');
    console.log("UserId:", String(usertype));
      console.log("No userId found, skipping API call.");
    // Call API if userId exists
    const response = await Axios.patch('/mobile_divice_id/', {
      user: String(userId),
      token: token,
      usertype:usertype
    });
    console.log("API token patch with loginId response:", response);
    return response; // Return only the response data
  } catch (error) {
    console.error("Error in deviceIdwithLogin:", error);
    throw error;
  
}}

export const getPurchaseOrderDashboard = async () => {
  try {
    const response = await Axios.get('/Purchaseorderget/');
            console.log("purorder",response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getpendingShipment = async () => {
  try {
    const response = await Axios.get('/pendingshipmentcreation/');
        console.log("shipment",response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPackinglist = async () => {
  try {
    const response = await Axios.get('/packinglist/');
    console.log("list",response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};