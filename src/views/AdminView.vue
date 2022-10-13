<!--Admin 첫번째(로그인) 페이지-->

<template>
  <div class="AdminLoginpage">
    <!--헤더-->
    <div>
      <span>찬양공유 관리자시스템</span>
    </div>
    <div class="title">
      <div class="title__main">
        <span class="title__main" id="title__main_1">서울중앙교회 </span>
        <span>찬양공유</span>
      </div>
      <div>
        <span>이용을 위해서 로그인이 필요합니다.</span>
      </div>
    </div>
    <!--로그인폼-->
    <form @submit.prevent="login">
      <div class="login-form">
        <label for="password">관리자 로그인</label>
        <input
          class="login-box"
          id="password"
          type="password"
          v-model="password"
        />
      </div>
      <button @click="login({ password })" id="login-btn" type="submit">
        로그인
      </button>
      <!-- <button @click="test">테스트</button> -->
    </form>
  </div>
</template>

<script>

// import axios from "axios";
import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  data() {
    return {
      password: "",
    };
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(userStore, ["login"]),
    // test() {
    //   // Make a request for a user with a given ID
    //   axios
    //     .post("https://reqres.in/api/register", {
    //       email: "eve.holt@reqres.in",
    //       password: "pistol",
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  name: "AdminView"
};
</script>
<style scoped>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
.AdminLoginpage {
  font-family: "Noto Sans KR";
  background: #48495b;
  color: #fffffd;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex;
}

.login-form {
  margin: 15px 45px;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.login-box {
  width: 200px;
  height: 48px;
  border: 2px solid #aaaaaa;
  border-radius: 4px;
  margin-top: 5px;
}

.title {
  display: flex;
  flex-direction: column;
}

.title__main {
  font-size: 18px;
  margin-bottom: 10px;
}

#title__main_1 {
  font-weight: 700;
}

#login-btn {
  background: #505062;
  border-radius: 4px;
  width: 100%;
  height: 48px;
  left: 88px;
  top: 371px;
  color: #6e707f;
  border: 0px;
}
</style>
