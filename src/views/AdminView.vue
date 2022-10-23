<!--Admin 첫번째(로그인) 페이지-->

<template>
  <div class="admin_login_page">
    <!--헤더-->
    <div>
      <span>찬양공유 관리자시스템</span>
    </div>
    <div class="title">
      <div class="title_main">
        <span class="title_main" id="title_main_1">서울중앙교회 </span>
        <span>찬양공유</span>
      </div>
      <div>
        <span>이용을 위해서 로그인이 필요합니다.</span>
      </div>
    </div>
    <!--로그인폼-->
    <div class='form' @submit.prevent="login">
      <div class="login_form">
        <label for="password">관리자 로그인</label>
        <input
          class="login_box"
          id="password"
          type="password"
          v-model="password"
        />
      </div>
      <button @click="login({ password })" id="login_btn" type="submit">
        로그인
      </button>
      <!-- <button @click="test">테스트</button> -->
    </div>
  </div>
</template>

<script>

// import axios from "axios";
import {loginAPI} from '../api/index'
// import { mapState, mapActions } from "vuex";
// const userStore = "userStore";

export default {
    name: "AdminView",
  data() {
    return {
      password: "",
    };
  },
  computed: {
    isNotNull() {
      return this.password.length
    }
  },
  methods: {
    checkValidity() {
      if (this.password === null || this.password.length < 1) {
        this.message = "비밀번호를 입력하세요"
      }
      else if (isNaN(this.password)) {
        this.message = "숫자만 입력할 수 있습니다."
      }
      else {
        this.message = null
        return true
      }
      return false
    },
    login() {
      if(this.checkValidity()) {
        loginAPI(this.password)
          .then((res) => {
            console.log(res)
            return res.result
          })
          .then((result) => {
            console.log('Login Result: ' + result)
            this.$router.push('/admin/list')
            if (result) {
              this.$router.push('/admin/list')
            }
          })
          .catch((err) => console.log(err))
      }
    }
  }
  // computed: {
  //   ...mapState(["isLogin", "isLoginError"]),
  // },
  // methods: {
  //   ...mapActions(userStore, ["login"]),
  // },

};
</script>
<style scoped>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
.admin_login_page {
  font-family: "Noto Sans KR";
  background: #48495b;
  color: #fffffd;
  margin: 0;
  padding: 0;
  font-size: 14px;
  height: 100vh;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex;
}

.login_form {
  margin: 15px 45px;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.login_box {
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

.title_main {
  font-size: 18px;
  margin-bottom: 10px;
}

#title_main_1 {
  font-weight: 700;
}

#login_btn {
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
