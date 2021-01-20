import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Content from "@/views/Content";
import StartScreen from "@/components/StartScreen";

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
    component: Login,
  },
  {
    path: '/content',
    name: 'content',
    component: Content,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

