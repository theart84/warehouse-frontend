import {setItem} from '@/helpers/persistanceStorage';
import authApi from '../../api/auth';

const state = {
  currentUser: null,
  isSubmitting: false,
  isLoggedIn: false,
  errors: null
};

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isSubmitting: '[auth] isSubmitting',
  isLoggedIn: '[auth] isLoggedIn',
};

export const mutationTypes = {
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStar',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',

  logout: '[auth] logout'
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  logout: '[auth] logout'
};

const getters = {
  [getterTypes.currentUser]: (state) => state.currentUser,
  [getterTypes.isSubmitting]: (state) => state.isSubmitting,
  [getterTypes.isLoggedIn]: (state) => state.isLoggedIn,
};

const mutations = {
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.errors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.currentUser = payload;
    state.isLoggedIn = true;
    state.isSubmitting = true;
  },
  [mutationTypes.loginFailure](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isSubmitting = true;
    state.errors = null;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
    state.isLoggedIn = true;
    state.isSubmitting = true;
  },
  [mutationTypes.getCurrentUserFailure](state, payload) {
    state.isSubmitting = false;
    state.errors = payload

  },
  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
    state.isSubmitting = false;
  }
};

const actions = {
  [actionTypes.login]({commit}, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.loginStart);
      authApi.login(credentials)
          .then((response) => {
            commit(mutationTypes.loginSuccess, response.data.user);
            setItem('accessToken', response.data.token);
            resolve(response.data.user);
          })
          .catch((result) => {
            commit(mutationTypes.loginFailure, result);
          });
    });
  },
  [actionTypes.getCurrentUser]({commit}) {
    return new Promise(resolve => {
      commit(mutationTypes.getCurrentUserStart)
      authApi.getCurrentUser()
          .then(response => {
            commit(mutationTypes.getCurrentUserSuccess, response.data.user)
            resolve()
          })
          .catch((result) => {
            commit(mutationTypes.getCurrentUserFailure, result)
          })
    })
  },
  [actionTypes.logout]({commit}) {
    return new Promise(resolve => {
      setItem('accessToken', '');
      commit(mutationTypes.logout);
      resolve();
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
