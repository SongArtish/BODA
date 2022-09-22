<template>
  <div class="AdminLoginpage">
    <!--헤더-->
    <AdminHeader />
    <!--로그인폼-->
    <form v-on:submit.prevent="submitForm">
      <div class="login-form">
        <label for="username">ID </label>
        <input class="login-box" id="username" type="text" v-model="username" />
      </div>
      <div class="login-form">
        <label for="password">Password </label>
        <input
          class="login-box"
          id="password"
          type="password"
          v-model="password"
        />
      </div>

      <button id="login-btn" type="submit">관리자 로그인</button>
    </form>
  </div>
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader.vue";

export default {
  data() {
    return {
      user: {
        id: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm: function () {
      console.log(this.username, this.password);
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
