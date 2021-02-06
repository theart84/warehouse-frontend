import {setItem} from '@/helpers/persistanceStorage';
import authApi from '../../api/auth';

const state = {
  currentUser: null,
  isSubmitting: false,
  isLoggedIn: false,
  validationErrors: null,
};

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isSubmitting: '[auth] isSubmitting',
  isLoggedIn: '[auth] isLoggedIn',
};

export const mutationTypes = {
  loginStart: '[auth] Login start',
  loginSuccess: '[auth] Login success',
  loginFailure: '[auth] Login failure',

  registerStart: '[auth] Register start',
  registerSuccess: '[auth] Register success',
  registerFailure: '[auth] Register failure',

  getCurrentUserStart: '[auth] Get current user start',
  getCurrentUserSuccess: '[auth] Get current user success',
  getCurrentUserFailure: '[auth] Get current user failure',

  logout: '[auth] logout',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  logout: '[auth] logout',
};

const getters = {
  [getterTypes.currentUser]: (state) => state.currentUser,
  [getterTypes.isSubmitting]: (state) => state.isSubmitting,
  [getterTypes.isLoggedIn]: (state) => state.isLoggedIn,
};

const mutations = {
  // LOGIN
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.currentUser = payload;
    state.isLoggedIn = true;
    state.isSubmitting = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  // REGISTER
  [mutationTypes.registerStart](state) {
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state) {
    state.currentUser = null;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.validationErrors = payload;
  },
  // GET CURRENT USER
  [mutationTypes.getCurrentUserStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
    state.isLoggedIn = true;
    state.isSubmitting = true;
  },
  [mutationTypes.getCurrentUserFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  //LOGOUT
  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
    state.isSubmitting = false;
  },
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
            commit(mutationTypes.loginFailure, result.response.data);
          });
    });
  },
  [actionTypes.register]({commit}, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.registerStart);
      authApi.register(credentials)
          .then((response) => {
            commit(mutationTypes.registerSuccess);
            resolve(response);
          })
          .catch((result) => {
            commit(mutationTypes.registerFailure, result.response.data);
          });
    });
  },
  [actionTypes.getCurrentUser]({commit}) {
    return new Promise((resolve) => {
      commit(mutationTypes.getCurrentUserStart);
      authApi.getCurrentUser()
          .then((response) => {
            commit(mutationTypes.getCurrentUserSuccess, response.data.user);
            resolve();
          })
          .catch((result) => {
            commit(mutationTypes.getCurrentUserFailure, result.response.data);
          });
    });
  },
  [actionTypes.logout]({commit}) {
    return new Promise((resolve) => {
      setItem('accessToken', '');
      commit(mutationTypes.logout);
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
