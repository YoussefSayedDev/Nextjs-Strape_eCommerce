const { default: axiosClient } = require("../_utils/axiosClient");


// Get All Products
const getLatestProducts = () => axiosClient.get('/products?populate=*');

// Get Product By Id
const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);

// Get Product By Category
const getProductByCategory = (category) => axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);



export default {
  getLatestProducts,
  getProductById,
  getProductByCategory,
}