import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/authorization';
import product from "@/store/modules/product";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    product
  },
});
