import axios from 'axios';
import {getItem} from "@/helpers/persistanceStorage";

axios.defaults.baseURL = 'https://wh-backend-rest-mks.herokuapp.com/api';

axios.interceptors.request.use(config => {
  const token = getItem('accessToken');
  config.headers.Authorization = token ? token : '';
  return config;
})

export default axios;

