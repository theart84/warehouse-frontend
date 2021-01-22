import productApi from "@/api/product";

const state = {
  data: null,
  isLoading: false,
  errors: null,
  filter: {},
  filterData: [],
  selectedProduct: null,
  product: null
}

export const mutationTypes = {
  getProductStart: '[product] Get product start',
  getProductSuccess: '[product] Get product success',
  getProductFailure: '[product] Get product failure',

  addProductStart: '[product] Add product start',
  addProductSuccess: '[product] Add product success',
  addProductFailure: '[product] Add product failure',

  deleteProductStart: '[product] Delete product start',
  deleteProductSuccess: '[product] Delete product success',
  deleteProductFailure: '[product] Delete product failure',

  soldProductStart: '[product] Sold product start',
  soldProductSuccess: '[product] Sold product success',
  soldProductFailure: '[product] Sold product failure',

  editProductStart: '[product] Edit product start',
  editProductSuccess: '[product] Edit product success',
  editProductFailure: '[product] Edit product failure',

  filterData: '[product] Filter data',

  selectedProductStart: '[product] Selected product start',
  selectedProductSuccess: '[product] Selected product success',
  selectedProductFailure: '[product] Selected product failure',
}

export const getterTypes = {
  filterData: '[product] Filter data'
}

export const actionTypes = {
  getProducts: '[product] Get products',
  addProduct: '[product] Add product',
  deleteProduct: '[product] Delete product',
  soldProduct: '[product] Sold product',
  editProduct: '[product] Edit product',

  filterData: '[product] Filter data',

  selectedProduct: '[product] Selected product',
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
        return item.type === state.filter;
      }
    })
  }
}

const mutations = {
  // GET PRODUCT
  [mutationTypes.getProductStart](state) {
    state.isLoading = true;
    state.data = null;
    state.filterData = []
    state.errors = null;
  },
  [mutationTypes.getProductSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getProductFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
  // ADD PRODUCT
  [mutationTypes.addProductStart](state) {
    state.isLoading = true;
    state.errors = null;
  },
  [mutationTypes.addProductSuccess](state, payload) {
    state.isLoading = false;
    state.data.push(payload);
  },
  [mutationTypes.addProductFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
  // DELETE PRODUCT
  [mutationTypes.deleteProductStart](state) {
    state.isLoading = true;
    state.errors = null;
  },
  [mutationTypes.deleteProductSuccess](state, payload) {
    state.isLoading = false;
    const findProduct = state.data.findIndex(item => item._id === payload)
    state.data.splice(findProduct, 1);
    state.selectedProduct = null;
  },
  [mutationTypes.deleteProductFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
  // SOLD PRODUCT
  [mutationTypes.soldProductStart](state) {
    state.isLoading = true;
    state.errors = null;
  },
  [mutationTypes.soldProductSuccess](state, payload) {
    state.isLoading = false;
    const findProduct = state.data.findIndex(item => item._id === payload.product._id)
    state.data.splice(findProduct, 1);
    state.data.push(payload.product)
    state.selectedProduct = null;
  },
  [mutationTypes.soldProductFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
  [mutationTypes.editProductStart](state) {
    state.isLoading = true;
    state.errors = null;
  },
  // EDIT MUTATIONS
  [mutationTypes.editProductSuccess](state, payload) {
    state.isLoading = false;
    state.product = payload.product
  },
  [mutationTypes.editProductFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
  // FILTER DATA
  [mutationTypes.filterData](state, payload) {
    state.filter = payload;
  },
  // SELECTED PRODUCT
  [mutationTypes.selectedProductStart](state) {
    state.isLoading = true
    state.selectedProduct = null;
  },
  [mutationTypes.selectedProductSuccess](state, payload) {
    state.isLoading = false
    state.selectedProduct = payload;
  },
  [mutationTypes.selectedProductFailure](state, payload) {
    state.isLoading = false
    state.errors = payload;
  },

};

const actions = {
  [actionTypes.getProducts]({commit}) {
    return new Promise(resolve => {
      commit(mutationTypes.getProductStart);
      productApi
          .getProducts()
          .then(response => {
            commit(mutationTypes.getProductSuccess, response.data);
            resolve(response.data)
          })
          .catch((result) => {
            commit(mutationTypes.getProductFailure, result);
          })
    })
  },
  [actionTypes.addProduct]({commit}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.addProductStart);
      productApi
          .addProduct(payload)
          .then(response => {
            commit(mutationTypes.addProductSuccess, response.data);
            resolve(response.data);
          })
          .catch((result) => {
            commit(mutationTypes.addProductFailure, result)
          })
    })
  },

  [actionTypes.deleteProduct]({commit}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.deleteProductStart);
      productApi
          .deleteProduct(payload)
          .then(response => {
            commit(mutationTypes.deleteProductSuccess, response.id);
            resolve(response.id);
          })
          .catch((result) => {
            commit(mutationTypes.deleteProductFailure, result)
          })
    })
  },

  [actionTypes.soldProduct]({commit}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.soldProductStart);
      productApi
          .patchProduct(payload)
          .then(response => {
            commit(mutationTypes.soldProductSuccess, response);
            resolve(response.product);
          })
          .catch((result) => {
            commit(mutationTypes.soldProductFailure, result);
          })
    })
  },
  [actionTypes.editProduct]({commit}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.editProductStart);
      productApi
          .getOneProduct(payload)
          .then(response => {
            commit(mutationTypes.editProductSuccess, response);
            resolve(response);
          })
          .catch(result => {
            commit(mutationTypes.editProductFailure, result);
          })
    })
  },
  [actionTypes.selectedProduct]({commit}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.selectedProductStart);
      productApi
        .getOneProduct(payload)
        .then(response => {
          commit(mutationTypes.selectedProductSuccess, response.data);
          resolve(response.data);
        })
        .catch(result => {
          commit(mutationTypes.selectedProductFailure, result);
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
