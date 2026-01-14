import React, { useState, useEffect } from 'react';
import '../styles/PixelProfile.css';
import { getwishlist } from '../services/Cart';
import { AddAddress } from '../services/Cart';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Get user data from localStorage
  const [profile, setProfile] = useState({
    name: localStorage.getItem('name') || 'Guest',
    email: localStorage.getItem('userName') || '',
    phone: localStorage.getItem('Mobile') || '',
    userId: localStorage.getItem('userId') || '',
    gst: localStorage.getItem('GST') || '',
    usertype: localStorage.getItem('usertype') || ''
  });

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  
  const [orders, setOrders] = useState([
    { id: 'ORD-001', date: '2024-03-01', total: 289.98, status: 'Delivered', items: 3 },
    { id: 'ORD-002', date: '2024-02-15', total: 149.99, status: 'Processing', items: 1 },
    { id: 'ORD-003', date: '2024-01-20', total: 459.97, status: 'Delivered', items: 4 },
  ]);

  const [addresses, setAddresses] = useState([]);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [addressError, setAddressError] = useState('');

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Updated to match API fields
  const [newAddress, setNewAddress] = useState({
    addressType: 'Home',
    name: localStorage.getItem('name') || '',
    altphone: '',
    area: '',
    city: '',
    country: 'India',
    email: localStorage.getItem('userName') || '',
    flathouse: '',
    gstno: localStorage.getItem('GST') || '',
    landmark: '',
    phone: localStorage.getItem('Mobile') || '',
    pincode: '',
    state: '',
    type: 'shipping',
    useSameAddressForBilling: true
  });

  // Fetch user data and addresses on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch wishlist when tab is active
  useEffect(() => {
    if (activeTab === 'wishlist') {
      fetchWishlist();
    }
  }, [activeTab]);

  // Fetch user data from localStorage
  const fetchUserData = () => {
    setLoading(true);
    try {
      const userData = {
        name: localStorage.getItem('name') || 'Guest',
        email: localStorage.getItem('userName') || '',
        phone: localStorage.getItem('Mobile') || '',
        userId: localStorage.getItem('userId') || '',
        gst: localStorage.getItem('GST') || '',
        usertype: localStorage.getItem('usertype') || ''
      };
      
      setProfile(userData);
      
      // Pre-fill address form with user data
      setNewAddress(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        gstno: userData.gst
      }));
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch wishlist from API
  const fetchWishlist = async () => {
    setWishlistLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
      
      const data = await getwishlist();
      console.log('Wishlist data:', data);
      
      if (Array.isArray(data)) {
        setWishlist(data);
      } else {
        console.warn('Unexpected wishlist format:', data);
        setWishlist([]);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
    } finally {
      setWishlistLoading(false);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  // Handle address form input changes
  const handleAddressChange = (field, value) => {
    setNewAddress({
      ...newAddress,
      [field]: value
    });
  };

  // Add address using API
  const addAddress = async () => {
    // Basic validation
    if (!newAddress.name || !newAddress.flathouse || !newAddress.city || !newAddress.pincode || !newAddress.phone) {
      alert('Please fill in all required fields (Name, Flat/House No, City, Pincode, Phone)');
      return;
    }

    setLoadingAddress(true);
    setAddressError('');

    try {
      // Get customer ID from localStorage
      const customerid = localStorage.getItem('userId');
      
      if (!customerid) {
        alert('Please login to add address');
        return;
      }

      // Get token for authentication
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Authentication required. Please login again.');
        return;
      }

      // Prepare address data for API
      const addressData = {
        addressType: newAddress.addressType,
        altphone: newAddress.altphone || '',
        area: newAddress.area || '',
        city: newAddress.city,
        country: newAddress.country,
        customerid: customerid,
        email: newAddress.email || profile.email,
        flathouse: newAddress.flathouse,
        gstno: newAddress.gstno || '',
        landmark: newAddress.landmark || '',
        name: newAddress.name,
        phone: newAddress.phone,
        pincode: newAddress.pincode,
        state: newAddress.state,
        type: newAddress.type,
        useSameAddressForBilling: newAddress.useSameAddressForBilling
      };

      console.log('Sending address data:', addressData);
      console.log('Auth token available:', !!token);
      console.log('addressdata:',addressData)

      const response = await AddAddress(addressData);

      
      console.log('Address added successfully:', response.data);
      
      // Reset form but keep user data
      setNewAddress({
        addressType: 'Home',
        name: profile.name,
        altphone: '',
        area: '',
        city: '',
        country: 'India',
        email: profile.email,
        flathouse: '',
        gstno: profile.gst || '',
        landmark: '',
        phone: profile.phone,
        pincode: '',
        state: '',
        type: 'shipping',
        useSameAddressForBilling: true
      });

      // Show success message
      alert('Address added successfully!');
      
      // Add to local state for immediate display
      const newAddressItem = {
        id: response.data.id || Date.now(),
        type: newAddress.addressType,
        name: newAddress.name,
        street: newAddress.flathouse + (newAddress.area ? `, ${newAddress.area}` : ''),
        city: newAddress.city,
        state: newAddress.state,
        zip: newAddress.pincode,
        country: newAddress.country,
        phone: newAddress.phone,
        altphone: newAddress.altphone,
        landmark: newAddress.landmark,
        gstno: newAddress.gstno,
        isDefault: addresses.length === 0
      };
      
      setAddresses([...addresses, newAddressItem]);

    } catch (error) {
      console.error('Error adding address:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to add address. Please try again.';
      
      setAddressError(errorMessage);
      alert(`Failed to add address: ${errorMessage}`);
    } finally {
      setLoadingAddress(false);
    }
  };

  const removeAddress = (id) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      alert('Address removed');
    } else {
      alert('You must have at least one address');
    }
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    alert('Default address updated');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.new === password.confirm) {
      alert('Password changed successfully!');
      setPassword({ current: '', new: '', confirm: '' });
    } else {
      alert('New passwords do not match!');
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('name');
    localStorage.removeItem('Mobile');
    localStorage.removeItem('GST');
    localStorage.removeItem('usertype');
    window.location.href = '/login'; // Redirect to login page
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'wishlist':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">My Wishlist ({wishlist.length})</h2>
              <button 
                className="btn btn-outline btn-sm"
                onClick={fetchWishlist}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            
            {wishlistLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading wishlist...</p>
              </div>
            ) : wishlist.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">❤️</div>
                <h3>Your wishlist is empty</h3>
                <p>Start adding items to your wishlist!</p>
                <button 
                  className="btn btn-primary mt-3"
                  onClick={() => window.location.href = '/products'}
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="wishlist-grid">
                {wishlist.map(item => (
                  <div key={item.id} className="wishlist-item">
                    <div className="wishlist-item-icon">
                      <span className="item-icon">📦</span>
                    </div>
                    <div className="wishlist-item-details">
                      <h4>{item.name || item.product_name || 'Unnamed Product'}</h4>
                      <p className="item-price">₹{(item.price || 0).toFixed(2)}</p>
                    </div>
                    <div className="wishlist-item-actions">
                      <button className="btn btn-primary">Add to Cart</button>
                      <button 
                        className="btn btn-outline"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'orders':
        return (
          <div className="content-section">
            <h2 className="section-title">My Orders</h2>
            <div className="orders-table">
              <div className="table-header">
                <div className="table-col">Order ID</div>
                <div className="table-col">Date</div>
                <div className="table-col">Items</div>
                <div className="table-col">Total</div>
                <div className="table-col">Status</div>
                <div className="table-col">Actions</div>
              </div>
              {orders.map(order => (
                <div key={order.id} className="table-row">
                  <div className="table-col">
                    <strong>{order.id}</strong>
                  </div>
                  <div className="table-col">{order.date}</div>
                  <div className="table-col">{order.items} items</div>
                  <div className="table-col">₹{order.total.toFixed(2)}</div>
                  <div className="table-col">
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="table-col">
                    <button className="btn btn-sm btn-outline">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'address':
        return (
          <div className="content-section">
            <h2 className="section-title">My Addresses ({addresses.length})</h2>
            
            {addressError && (
              <div className="alert alert-error">
                {addressError}
              </div>
            )}

            {!localStorage.getItem('token') && (
              <div className="alert alert-warning">
                Please login to manage addresses
              </div>
            )}

            {addresses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📍</div>
                <h3>No addresses saved yet</h3>
                <p>Add your first address below</p>
              </div>
            ) : (
              <div className="addresses-grid">
                {addresses.map(addr => (
                  <div key={addr.id} className="address-card">
                    <div className="address-header">
                      <h4>{addr.type} Address</h4>
                      {addr.isDefault && <span className="default-badge">Default</span>}
                    </div>
                    <div className="address-details">
                      <p><strong>{addr.name}</strong></p>
                      <p>{addr.street}</p>
                      {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                      <p>{addr.city}, {addr.state} {addr.zip}</p>
                      <p>{addr.country}</p>
                      <p>Phone: {addr.phone}</p>
                      {addr.altphone && <p>Alt Phone: {addr.altphone}</p>}
                      {addr.gstno && <p>GST: {addr.gstno}</p>}
                    </div>
                    <div className="address-actions">
                      {!addr.isDefault && (
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => setDefaultAddress(addr.id)}
                        >
                          Set as Default
                        </button>
                      )}
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => removeAddress(addr.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="add-address-form">
              <h3>Add New Address</h3>
              <p className="user-info-note">
                User: {profile.name} | Email: {profile.email} | Phone: {profile.phone}
              </p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Address Type *</label>
                  <select 
                    className="form-input"
                    value={newAddress.addressType}
                    onChange={(e) => handleAddressChange('addressType', e.target.value)}
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.name}
                    onChange={(e) => handleAddressChange('name', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel"
                    className="form-input"
                    value={newAddress.phone}
                    onChange={(e) => handleAddressChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Alternate Phone</label>
                  <input 
                    type="tel"
                    className="form-input"
                    value={newAddress.altphone}
                    onChange={(e) => handleAddressChange('altphone', e.target.value)}
                    placeholder="Enter alternate phone"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email"
                    className="form-input"
                    value={newAddress.email}
                    onChange={(e) => handleAddressChange('email', e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Flat/House No *</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.flathouse}
                    onChange={(e) => handleAddressChange('flathouse', e.target.value)}
                    placeholder="Enter flat/house number"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Area/Street</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.area}
                    onChange={(e) => handleAddressChange('area', e.target.value)}
                    placeholder="Enter area/street"
                  />
                </div>
                
                <div className="form-group">
                  <label>Landmark</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.landmark}
                    onChange={(e) => handleAddressChange('landmark', e.target.value)}
                    placeholder="Enter landmark"
                  />
                </div>
                
                <div className="form-group">
                  <label>City *</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    placeholder="Enter city"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>State</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
                
                <div className="form-group">
                  <label>Pincode *</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.pincode}
                    onChange={(e) => handleAddressChange('pincode', e.target.value)}
                    placeholder="Enter pincode"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Country</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.country}
                    onChange={(e) => handleAddressChange('country', e.target.value)}
                    placeholder="Enter country"
                  />
                </div>
                
                <div className="form-group">
                  <label>GST Number</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={newAddress.gstno}
                    onChange={(e) => handleAddressChange('gstno', e.target.value)}
                    placeholder="Enter GST number (if applicable)"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={newAddress.useSameAddressForBilling}
                      onChange={(e) => handleAddressChange('useSameAddressForBilling', e.target.checked)}
                    />
                    <span>Use same address for billing</span>
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  className="btn btn-primary"
                  onClick={addAddress}
                  disabled={loadingAddress || !localStorage.getItem('token')}
                >
                  {loadingAddress ? (
                    <>
                      <span className="spinner-small"></span>
                      Adding...
                    </>
                  ) : (
                    'Add Address'
                  )}
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => {
                    setNewAddress({
                      addressType: 'Home',
                      name: profile.name,
                      altphone: '',
                      area: '',
                      city: '',
                      country: 'India',
                      email: profile.email,
                      flathouse: '',
                      gstno: profile.gst || '',
                      landmark: '',
                      phone: profile.phone,
                      pincode: '',
                      state: '',
                      type: 'shipping',
                      useSameAddressForBilling: true
                    });
                  }}
                >
                  Reset Form
                </button>
              </div>
              
              <p className="form-note">* Required fields</p>
            </div>
          </div>
        );

      case 'password':
        return (
          <div className="content-section">
            <h2 className="section-title">Change Password</h2>
            <form className="password-form" onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Current Password</label>
                <input 
                  type="password"
                  className="form-input"
                  value={password.current}
                  onChange={(e) => setPassword({...password, current: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input 
                  type="password"
                  className="form-input"
                  value={password.new}
                  onChange={(e) => setPassword({...password, new: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  type="password"
                  className="form-input"
                  value={password.confirm}
                  onChange={(e) => setPassword({...password, confirm: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
                <button 
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setPassword({ current: '', new: '', confirm: '' })}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        );

      default: // Profile tab
        return (
          <div className="content-section">
            <h2 className="section-title">Profile Details</h2>
            <div className="profile-details">
              <div className="profile-info-card">
                <div className="profile-info-row">
                  <span className="info-label">Full Name:</span>
                  <span className="info-value">{profile.name}</span>
                </div>
                <div className="profile-info-row">
                  <span className="info-label">User ID:</span>
                  <span className="info-value">{profile.userId}</span>
                </div>
                <div className="profile-info-row">
                  <span className="info-label">Email Address:</span>
                  <span className="info-value">{profile.email}</span>
                </div>
                <div className="profile-info-row">
                  <span className="info-label">Phone Number:</span>
                  <span className="info-value">{profile.phone}</span>
                </div>
                <div className="profile-info-row">
                  <span className="info-label">GST Number:</span>
                  <span className="info-value">{profile.gst || 'Not provided'}</span>
                </div>
                <div className="profile-info-row">
                  <span className="info-label">User Type:</span>
                  <span className="info-value">{profile.usertype}</span>
                </div>
                <div className="profile-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      // You can implement profile edit functionality here
                      alert('Profile edit functionality to be implemented');
                    }}
                  >
                    Edit Profile
                  </button>
                  <button 
                    className="btn btn-outline logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Account</h1>
        <p>Manage your account settings and preferences</p>
        <div className="user-status">
          <span className="user-email">{profile.email}</span>
          <span className="user-type">({profile.usertype})</span>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <span className="avatar-icon">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="user-details">
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
              <p className="user-id">ID: {profile.userId}</p>
            </div>
          </div>

          <nav className="profile-nav">
            <button 
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon"></span>
              Profile Details
            </button>
            
            <button 
              className={`nav-link ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <span className="nav-icon"></span>
              My Wishlist
              <span className="nav-badge">{wishlist.length}</span>
            </button>
            
            <button 
              className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="nav-icon"></span>
              My Orders
              <span className="nav-badge">{orders.length}</span>
            </button>
            
            <button 
              className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
              onClick={() => setActiveTab('address')}
            >
              <span className="nav-icon"></span>
              My Addresses
              <span className="nav-badge">{addresses.length}</span>
            </button>
            
            <button 
              className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              <span className="nav-icon"></span>
              Change Password
            </button>
          </nav>
          
          <div className="logout-section">
            <button 
              className="btn btn-outline logout-btn-full"
              onClick={handleLogout}
            >
              <span className="nav-icon"></span>
              Logout
            </button>
          </div>
        </div>

        <div className="profile-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;