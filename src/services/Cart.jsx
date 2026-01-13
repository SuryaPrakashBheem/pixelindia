
import Axios from './Axios';
import axios from 'axios';

export const AddItemToCart = async ({customerid, productid, qty}) => {
  try {
    const response = await Axios.post('/addtocard/', {
      customerid,
      productid,
      qty,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCartCount = async () => {
  try {
    const userId = await AsyncStorage.getItem('userid');
    const response = await Axios.get(
      `/getcartcount/?userid=${encodeURIComponent(userId)}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteFromCart = async ({customerid, productid}) => {
  try {
    const response = await Axios.delete('/addtocard/', {
      data: {
        customerid,
        productid,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    const userId = await AsyncStorage.getItem('userid');
    const response = await Axios.get(
      `/addtocard/?customerid=${encodeURIComponent(userId)}`,
    );
    console.log(userId);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductQty = async ({user_id, productid, qty}) => {
  try {
    const response = await Axios.get('/Test/', {
      params: {
        user_id,
        productid,
        qty,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShippingCost = async ({cgm, d_pin}) => {
  try {
    const response = await Axios.get(
      `Calculateshippingcost/?md=S&cgm=${cgm}&o_pin=500077&d_pin=${d_pin}&ss=Delivered`,
      {
        params: {
          cgm,
          d_pin,
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAddress = async () => {
  try {
    const userId = await AsyncStorage.getItem('userid');
    const response = await Axios.get(
      `/customeraddress/?customerid=${encodeURIComponent(userId)}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddAddress = async ({
  addressType,
  altphone,
  area,
  city,
  country,
  customerid,
  email,
  flathouse,
  gstno,
  landmark,
  name,
  phone,
  pincode,
  state,
  type,
  useSameAddressForBilling,
}) => {
  try {
    const response = await Axios.post('/customeraddress/', {
      addressType,
      altphone,
      area,
      city,
      country,
      customerid,
      email,
      flathouse,
      gstno,
      landmark,
      name,
      phone,
      pincode,
      state,
      type,
      useSameAddressForBilling,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const EditAddress = async ({
  id,
  addressType,
  altphone,
  area,
  city,
  country,
  customerid,
  email,
  flathouse,
  gstno,
  landmark,
  name,
  phone,
  pincode,
  state,
  type,
  useSameAddressForBilling,
}) => {
  console.log(phone);

  try {
    const response = await Axios.put('/customeraddress/', {
      id,
      addressType,
      altphone,
      area,
      city,
      country,
      customerid,
      email,
      flathouse,
      gstno,
      landmark,
      name,
      phone,
      pincode,
      state,
      type,
      useSameAddressForBilling,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteAddress = async ({id}) => {
  try {
    const response = await Axios.delete(`/customeraddress/?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const SetDefaultAddress = async ({customerid, type, id}) => {
  try {
    const response = await Axios.patch('/customeraddress/', {
      customerid,
      type,
      id,
      default: '0',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCoupons = async () => {
  try {
    const response = await Axios.get('/Coupons/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ValidateCoupon = async ({id, customerid, ordervalue}) => {
  try {
    const response = await Axios.get('/getcoupons/', {
      params: {
        id,
        customerid,
        ordervalue,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getordertrackingfilter = async ({year, uid}) => {
  try {
    const response = await Axios.get('/ordertrackingfilter/', {
      params: {year, uid},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckStockAtPayment = async ({
  billingaddressid,
  billingstatecode,
  cgst,
  cgstamount,
  disamount,
  dispatchqty,
  dispercent,
  exdisamount,
  gstamount,
  gstpercent,
  igst,
  igstamount,
  mrp,
  mrptotal,
  orderqty,
  packingqty,
  productid,
  rate,
  sdisamount,
  sdispercent,
  sgst,
  sgstamount,
  shippingaddressid,
  shippingstatecode,
  totalamount,
}) => {
  try {
    const response = await Axios.post('/chekstockatpayment/', {
      dtl: [
        {
          billingaddressid,
          billingstatecode,
          cgst,
          cgstamount,
          disamount,
          dispatchqty,
          dispercent,
          exdisamount,
          gstamount,
          gstpercent,
          igst,
          igstamount,
          mrp,
          mrptotal,
          orderqty,
          packingqty,
          productid,
          rate,
          sdisamount,
          sdispercent,
          sgst,
          sgstamount,
          shippingaddressid,
          shippingstatecode,
          totalamount,
        },
      ],
    });
    // console.log('stock',response)
    return response; // Return only data unless you need full Axios object
  } catch (error) {
    console.error('Error checking stock at payment:', error);
    throw error.response?.data || error;
  }
};

export const razorpayOrder = async ({amount, currency, payment_capture}) => {
  try {
    const response = await Axios.post('/create_Razorpay_order/', {
      amount,
      currency,
      payment_capture,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 4. Get Wishlist
export const getwishlist = async () => {
  try {
    const userId = await AsyncStorage.getItem('userid');
    const response = await Axios.get(
      `/wishlist/?customerid=${encodeURIComponent(userId)}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 5. Add Item to Wishlist (params must go in the request body, not inside `params`)
export const AddItemToWishList = async ({customerid, productid}) => {
  try {
    const response = await Axios.post('/wishlist/', {
      customerid,
      productid,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const cancelOrder = async ({orderid, desc}) => {
  try {
    const response = await Axios.post('/cancelorder/', {orderid, desc});
    console.log(response);
    return response; 
  } catch (error) {
    
    throw error;
  }
};

export const Purchaseorder = async ({hdr, dtl}) => {
  console.log("dtl:",dtl)
  console.log("hdr:",hdr)

  try {
    const response = await Axios.post('/Purchaseorder/', {
      hdr,
      dtl,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const DeleteFromWishList = async ({customerid, productid}) => {
  try {
    const response = await Axios.delete('/wishlist/', {
      data: {customerid, productid}, // or use 'data' based on backend
    });

    return response; // ✅ not just response.data
  } catch (error) {
    console.error(
      '❌ DeleteFromWishList Error:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};

export const updateGST = async gstNumber => {
  try {
    const userId = await AsyncStorage.getItem('userid');
    const token = await AsyncStorage.getItem('accessid');

    const response = await Axios.get(`/becomedealer/`, {
      params: {
        id: userId,
        gst: gstNumber,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to update GST', error);
    throw error;
  }
};

export const stateList = () => {
  try {
    const Response = axios.get('/states_list/');
    console.log('Response:', Response);
    return Response;
  } catch (error) {
    console.error('failed to fetch states list', error);
    throw error;
  }
};
