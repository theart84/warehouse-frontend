import productApi from "@/api/product";
const state = {
  data: null,
  isLoading: false,
  error: null,
  filter: {},
  filterData: []
}

export const mutationTypes = {
  getProductStart: '[product] Get product start',
  getProductSuccess: '[product] Get product success',
  getProductFailure: '[product] Get product failure',

  addProductStart: '[product] Add product start',
  addProductSuccess: '[product] Add product success',
  addProductFailure: '[product] Add product failure',

  filterData: '[product] Filter data'
}

export const getterTypes = {
  filterData: '[product] Filter data'
}

export const actionTypes = {
  getProducts: '[product] Get products',
  addProduct: '[product] Add product',
  filterData: '[product] Filter data'
}

const getters = {
  [getterTypes.filterData]: state => {
    if (!state.data) {
      return [];
    }
    if (state.filter.isShipped === null) {
      return state.data
    }
    if (state.filter.isShipped) {
      return state.data.filter(item => item.isShipped)
    }
    const inStock = state.data.filter(item => !item.isShipped)
    return inStock.filter(item => {
      if (state.filter.type === 'All') {
        return true;
      } else {
        return  item.type === state.filter;
      }
    })
  }
}

const mutations = {
  [mutationTypes.getProductStart](state) {
    state.isLoading = true;
    state.data = null;
    state.filterData = []
  },
  [mutationTypes.getProductSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getProductFailure](state) {
    state.isLoading = false;
  },
  [mutationTypes.addProductStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.addProductSuccess](state, payload) {
    state.isLoading = false;
    state.data.push(payload);
  },
  [mutationTypes.addProductFailure](state) {
    state.isLoading = false;
  },
  [mutationTypes.filterData](state, payload) {
    state.filter = payload;
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
  },
  [actionTypes.addProduct]({commit}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.addProductStart);
      productApi.addProduct(payload)
          .then(response => {
            commit(mutationTypes.addProductSuccess, response.data);
            resolve(response.data);
          })
          .catch(() => {
            commit(mutationTypes.addProductFailure)
          })
    })
  },
  [actionTypes.filterData]({commit}, payload) {
    commit(mutationTypes.filterData, payload)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
