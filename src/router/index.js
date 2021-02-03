import Vue from 'vue';
import VueRouter from 'vue-router';
import WhRegister from '@/views/Register';
import WhContent from '@/views/Content';
import StartScreen from '@/components/StartScreen';
import WhInformation from '@/views/Information';
import WhProductInfo from '@/views/ProductInfo';
import WhSearch from '@/views/Search';
import WhLogin from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: StartScreen,
  },
  {
    path: '/login',
    name: 'login',
    component: WhLogin,
  },
  {
    path: '/register',
    name: 'register',
    component: WhRegister,
  },
  {
    path: '/content',
    name: 'content',
    component: WhContent,
  },
  {
    path: '/information',
    name: 'information',
    component: WhInformation,
  },
  {
    path: '/product',
    name: 'productInfo',
    component: WhProductInfo,
  },
  {
    path: '/search',
    name: 'search',
    component: WhSearch,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
