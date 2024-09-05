import axiosClient from './../_utils/axiosClient';


const createOrder = (data) => axiosClient.post('/orders', data);


export default {
  createOrder
}