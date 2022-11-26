import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: {
      filter: {
        category: 0,
        monthFilter: 0
      }
    },
    user: {
      filter: {
        category: 0,
        monthFilter: 0
      }
    },
    list: {
      filter: {
        monthFilterList: []
      }
    }
  },
  getters: {
    GET_ADMIN_FILTER(state) {
      return state.admin.filter;
    },
    GET_USER_FILTER(state) {
      return state.user.filter;
    },
    GET_MONTH_FILTER_LIST(state) {
      return state.list.filter.monthFilterList;
    }
  },
  mutations: {
    SET_ADMIN_FILTER_CATEGORY(state, payload) {
      state.admin.filter.category = payload;
    },
    SET_ADMIN_FILTER_MONTH_FILTER(state, payload) {
      state.admin.filter.monthFilter = payload;
    },
    SET_USER_FILTER_CATEGORY(state, payload) {
      state.user.filter.category = payload;
    },
    SET_USER_FILTER_MONTH_FILTER(state, payload) {
      state.user.filter.monthFilter = payload;
    },
    SET_MONTH_FILTER_LIST(state, payload) {
      state.list.filter.monthFilterList = payload;
    }
  },
  actions: {
    INIT_MONTH_FILTER({commit}) {
      let today = new Date()
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const semiannualList = [
        {
          id: 0,
          name: '상반기',
          months: [1,2,3,4,5,6]
        },
        {
          id: 1,
          name: '하반기',
          months: [7,8,9,10,11,12]
        }
      ];
      const monthFilterList = [];
      let semiannual = 0;

      semiannual = semiannualList.find(semi => {return semi.months.includes(month)});
      let startYear = 2021;
      let id = 0;
      monthFilterList.push({year: startYear, semiannual: 1, id});id++;
      startYear++;
      for (; startYear <= year; startYear++) {
        if (startYear < year) {
          monthFilterList.push({year: startYear, semiannual: 0, id}); id++;
          monthFilterList.push({year: startYear, semiannual: 1, id});id++;
        } else {
          if (semiannual === 0) {
            monthFilterList.push({year: startYear, semiannual: 0, id});id++;
          } else {
            monthFilterList.push({year: startYear, semiannual: 0, id}); id++;
            monthFilterList.push({year: startYear, semiannual: 1, id});id++;
          }
        }
      }
      commit('SET_MONTH_FILTER_LIST', monthFilterList);
      commit('SET_USER_FILTER_MONTH_FILTER', id - 1);
      commit('SET_ADMIN_FILTER_MONTH_FILTER', id - 1);
    }
  },
  modules: {
  }
})
