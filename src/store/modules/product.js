import productApi from "@/api/product";
import {actionTypes as actionTypesFromAuth} from "@/store/modules/auth";

const state = {
  data: null,
  isLoading: false,
  errors: null,
  filter: {},
  filterData: [],
  currentElement: null,
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

  currentElement: '[product] Current element'
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

  currentElement: '[product] Current element',
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
    state.currentElement = null;
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
    state.currentElement = null;
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
  //FILTER DATA
  [mutationTypes.filterData](state, payload) {
    state.filter = payload;
  },
  //CURRENT ELEMENT
  [mutationTypes.currentElement](state, payload) {
    state.currentElement = payload;
  }
};

const actions = {
  [actionTypes.getProducts]({commit, dispatch}) {
    return new Promise(resolve => {
      commit(mutationTypes.getProductStart);
      productApi
          .getProducts()
          .then(response => {
            commit(mutationTypes.getProductSuccess, response.data);
            resolve(response.data)
          })
          .catch((result) => {
            dispatch(actionTypesFromAuth.logout);
            commit(mutationTypes.getProductFailure, result);
          })
    })
  },
  [actionTypes.addProduct]({commit, dispatch}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.addProductStart);
      productApi
          .addProduct(payload)
          .then(response => {
            commit(mutationTypes.addProductSuccess, response.data);
            resolve(response.data);
          })
          .catch((result) => {
            dispatch(actionTypesFromAuth.logout);
            commit(mutationTypes.addProductFailure, result)
          })
    })
  },

  [actionTypes.deleteProduct]({commit, dispatch}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.deleteProductStart);
      productApi
          .deleteProduct(payload)
          .then(response => {
            commit(mutationTypes.deleteProductSuccess, response.id);
            resolve(response.id);
          })
          .catch((result) => {
            dispatch(actionTypesFromAuth.logout);
            commit(mutationTypes.deleteProductFailure, result)
          })
    })
  },

  [actionTypes.soldProduct]({commit, dispatch}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.soldProductStart);
      productApi
          .patchProduct(payload)
          .then(response => {
            commit(mutationTypes.soldProductSuccess, response);
            resolve(response.product);
          })
          .catch((result) => {
            dispatch(actionTypesFromAuth.logout);
            commit(mutationTypes.soldProductFailure, result);
          })
    })
  },
  [actionTypes.editProduct]({commit, dispatch}, payload) {
    return new Promise(resolve => {
      commit(mutationTypes.editProductStart);
      productApi
          .getOneProduct(payload)
          .then(response => {
            commit(mutationTypes.editProductSuccess, response);
            resolve(response);
          })
          .catch(result => {
            dispatch(actionTypesFromAuth.logout);
            commit(mutationTypes.editProductFailure, result);
          })
    })
  },

  [actionTypes.filterData]({commit}, payload) {
    commit(mutationTypes.filterData, payload)
  },

  [actionTypes.currentElement]({commit}, payload) {
    commit(mutationTypes.currentElement, payload)
  },

}

export default {
  state,
  actions,
  getters,
  mutations
}
