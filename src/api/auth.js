import axios from './axios';

const login = (credentials) => axios.post('/auth/login', { credentials });
const getCurrentUser = () => axios.get('/auth/user');
export default {
  login,
  getCurrentUser,
};
