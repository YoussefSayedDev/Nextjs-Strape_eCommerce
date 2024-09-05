const { default: axiosClient } = require("../_utils/axiosClient");

// Add A Item To Cart
const addToCart = (payload) => axiosClient.post('/carts', payload);

// Get All Items For User
const getUserCartItems = (email) => axiosClient.get(`/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`);

// Delete A Item From The Cart
const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`);


export default {
  addToCart,
  getUserCartItems,
  deleteCartItem,
}