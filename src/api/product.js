import axios from './axios';

const getProducts = () => axios.get('/product').then(response => response.data);

const addProduct = product => axios.post('/product', product).then(response => response.data);

const deleteProduct = productId => axios.delete(`/product/${productId}`);

const patchProduct = productData => axios.patch(`/product/${productData.productId}`, productData.changedData).then(response => response.data);

const getOneProduct = productId => axios.get(`/product/${productId.id}`).then(response => response.data);


export default {
  getProducts,
  addProduct,
  deleteProduct,
  patchProduct,
  getOneProduct
}
