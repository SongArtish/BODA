import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: {},
    user: {
      filter: {
        category: 0,
        monthFilter: 0
      }
    }
  },
  getters: {
    GET_USER_FILTER(state) {
      return state.user.filter;
    }
  },
  mutations: {
    SET_USER_FILTER_CATEGORY(state, payload) {
      state.user.filter.category = payload;
    },
    SET_USER_FILTER_MONTH_FILTER(state, payload) {
      state.user.filter.monthFilter = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
