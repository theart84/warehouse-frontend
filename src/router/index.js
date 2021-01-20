import Vue from 'vue';
import VueRouter from 'vue-router';
import WhLogin from '../views/Login.vue';
import WhContent from "@/views/Content";
import StartScreen from "@/components/StartScreen";
import WhInformation from '@/views/Information'

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
    path: '/content',
    name: 'content',
    component: WhContent,
  },
  {
    path: '/information',
    name: 'information',
    component: WhInformation,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

