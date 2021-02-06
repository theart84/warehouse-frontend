import axios from './axios';

const login = (credentials) => axios.post('/auth/login', { credentials });

const register = (credentials) => axios.post('/auth/register', { credentials });

const getCurrentUser = () => axios.get('/auth/user');
export default {
  login,
  register,
  getCurrentUser,
};
