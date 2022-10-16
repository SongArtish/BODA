import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//작성한 모듈 가져오기
import userStore from "@/store/modules/UserStore.js";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
  },
});
