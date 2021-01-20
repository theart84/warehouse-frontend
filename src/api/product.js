import axios from './axios';

const getProducts = () => {
  return axios.get('/product').then(response => response.data);
}

const addProduct = products => axios.post('/product', products).then(response => response.data)

export default {
  getProducts,
  addProduct
}
