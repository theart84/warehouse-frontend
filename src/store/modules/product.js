import productApi from "@/api/product";
const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getProductStart: '[product] Get product start',
  getProductSuccess: '[product] Get product success',
  getProductFailure: '[product] Get product failure',
}

export const getterTypes = {}

export const actionTypes = {
  getProducts: '[product] Get products',
}

const getters = {}

const mutations = {
  [mutationTypes.getProductStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getProductSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getProductFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  [actionTypes.getProducts]({commit}) {
    return new Promise(resolve => {
      commit(mutationTypes.getProductStart);
      productApi.getProducts()
          .then(response => {
            commit(mutationTypes.getProductSuccess, response.data);
            resolve(response.data)
          })
          .catch(() => {
            commit(mutationTypes.getProductFailure);
          })
    })
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
