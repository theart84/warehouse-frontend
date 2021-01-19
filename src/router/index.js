import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Content from "@/views/Content";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Content,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

