import axios from './axios';

const getProducts = () => {
  return axios.get('product').then(response => response.data);
}

export default {
  getProducts
}
