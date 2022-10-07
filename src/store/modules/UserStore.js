//관리자 로그인

import Vue from "vue";
import Vuex from "vuex";
// import router from "@/router";
import axios from "axios";

Vue.use(Vuex);

const userStore = {
  state: {
    adminpassword: 12345678,
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    // 로그인이 성공했을 때,
    loginSuccess(state) {
      state.isLogin = true;
      state.isLoginError = false;
    },
    //로그인이 실패했을 때
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
  },
  actions: {
    //로그인 시도
    login(loginObj) {
      axios
        .post(
          "http://ec2-3-39-205-107.ap-northeast-2.compute.amazonaws.com/api/admin/valid/password",
          {
            loginObj,
          }
        )
        .then((res) => {
          console.log(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
      // if (state.adminpassword != loginObj.password) {
      //   alert("비밀번호가 틀렸습니다");
      //   commit("loginError");
      // }
      // //맞게 입력했을 때
      // else {
      //   alert("로그인 되었습니다.");
      //   commit("loginSuccess");
      //   router.push({ name: "AdminListView" });
      // }
      // console.log(state.adminpassword);
      // console.log(loginObj.password);
      // //   console.log(singinObj);
    },
  },
  namespaced: true,
};

export default userStore;
