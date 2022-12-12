import Vue from 'vue'
import Vuex from 'vuex'
import {getContiMaxMinDate} from '@/apis/user';

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
    async INIT_MONTH_FILTER({commit}) {
      await getContiMaxMinDate()
        .then(async res => {
          const today = new Date();
          const nowYear = today.getFullYear();
          const nowMonth = today.getMonth() + 1;
          const semiannualList = [
            {
              id: 0,
              name: '상반기',
              months: [1, 2, 3, 4, 5, 6]
            },
            {
              id: 1,
              name: '하반기',
              months: [7, 8, 9, 10, 11, 12]
            }
          ];
          const monthFilterList = [];
          let nowSemiannual = 0;
          let minSemiannual = 0;
          let maxSemiannual = 0;

          let minYear;
          let minMonth;
          let maxYear;
          let maxMonth;
          const minMaxDate = res.result;
          minYear = minMaxDate.minContiDate[0];
          minMonth = minMaxDate.minContiDate[1];
          maxYear = minMaxDate.maxContiDate[0];
          maxMonth = minMaxDate.maxContiDate[1];

          nowSemiannual = semiannualList.find(semi => {
            return semi.months.includes(nowMonth)
          }).id;
          minSemiannual = semiannualList.find(semi => {
            return semi.months.includes(minMonth)
          }).id;
          maxSemiannual = semiannualList.find(semi => {
            return semi.months.includes(maxMonth)
          }).id;

          let id = 0;
          let nowId = 0;

          if (minSemiannual === 0) {
            monthFilterList.push({year: minYear, semiannual: 0, id});
            if (minYear === nowYear && nowSemiannual === 0) nowId = id;
            id++;
          }
          monthFilterList.push({year: minYear, semiannual: 1, id});
          if (minYear === nowYear && nowSemiannual === 1) nowId = id;
          id++;
          minYear++;
          for (; minYear <= maxYear; minYear++) {
            if (minYear < maxYear) {
              monthFilterList.push({year: minYear, semiannual: 0, id});
              if (minYear === nowYear && nowSemiannual === 0) nowId = id;
              id++;
              monthFilterList.push({year: minYear, semiannual: 1, id});
              if (minYear === nowYear && nowSemiannual === 1) nowId = id;
              id++;
            } else {
              if (maxSemiannual === 0) {
                monthFilterList.push({year: minYear, semiannual: 0, id});
                if (minYear === nowYear && nowSemiannual === 0) nowId = id;
                id++;
              } else {
                monthFilterList.push({year: minYear, semiannual: 0, id});
                if (minYear === nowYear && nowSemiannual === 0) nowId = id;
                id++;
                monthFilterList.push({year: minYear, semiannual: 1, id});
                if (minYear === nowYear && nowSemiannual === 1) nowId = id;
                id++;
              }
            }
          }
          await commit('SET_MONTH_FILTER_LIST', monthFilterList);
          await commit('SET_USER_FILTER_MONTH_FILTER', nowId);
          await commit('SET_ADMIN_FILTER_MONTH_FILTER', nowId);
        })
        .catch(e => {
          console.log('e', e);
        });
    }
  },
  modules: {}
})
