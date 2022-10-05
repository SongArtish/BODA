<template>
  <div class="AdminLoginpage">
    <!--헤더-->
    <AdminHeader />
    <!--로그인폼-->
    <form @submit.prevent="onLogin">
      <div class="login-form">
        <label for="password">Password </label>
        <input
          class="login-box"
          id="password"
          type="password"
          v-model="password"
        />
      </div>
      <button @click="login({ password })" id="login-btn" type="submit">
        관리자 로그인
      </button>
      <button @click="test">테스트</button>
    </form>
  </div>
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader.vue";
import axios from "axios";
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
    test() {
      // Make a request for a user with a given ID
      axios
        .post("https://reqres.in/api/register", {
          email: "eve.holt@reqres.in",
          password: "pistol",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  name: "AdminView",
  components: {
    AdminHeader,
  },
};
</script>
<style scoped>
html,
body {
  padding: 0;
  margin: 0;
}
.AdminLoginpage {
  font-family: "Noto Sans KR";
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
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

#login-btn {
  background: #074ee8;
  border-radius: 4px;
  width: 200px;
  height: 48px;
  left: 88px;
  top: 371px;
  color: #ffffff;
}
</style>
