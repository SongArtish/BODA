<template>
  <div class="AdminHome">
    <NavBar :textNavbar="textNavbar" />
    <div class="title">
        <div class="title-1"><span class="title-1-stress">서울중앙교회</span> 찬양공유</div>
        <div class="title-2">이용을 위해서 <span class="title-2-stress">로그인</span>이 필요합니다.</div>
    </div>
    <div class="login">
        <div class="login-label">관리자 로그인</div>
        <input class="login-input" type="password" placeholder="비밀번호를 입력하세요" autofocus v-model="password" @keyup.enter="checkValidity" />
        <div class="login-alert-message" v-if="message">{{ message }}</div>
    </div>
    <BottomButton :class="{'disabled': !isNotNull }" :textButton="textButton" @buttonClick="checkValidity" />
  </div>
</template>
<script>
import { BottomButton, NavBar } from './atoms'
import Login from "@/mixins/login";

export default {
  name: 'AdminHome',
  components: {
    BottomButton,
    NavBar
  },
  mixins: [Login],
  data() {
      return {
        password: '',
        message: null,
        textButton: "로그인",
        textNavbar: "찬양공유 관리자시스템"
      }
  },
  computed: {
    isNotNull() {
      return this.password.length
    }
  },
  created() {
    // 로그인 돼있으면 목록화면으로 이동
    if (localStorage.getItem('accessToken')) {
      this.$router.push({name: 'AdminList'});
    }
  },
  methods: {
    checkValidity() {
      if (this.password === null || this.password.length < 1) {
        this.message = "비밀번호를 입력하세요"
      }
      // else if (isNaN(this.password)) {
      //   this.message = "숫자만 입력할 수 있습니다."
      // }
      else {
        this.message = null
        this.login(this.password);
      }
      return false;
    }
  }
}
</script>
<style scoped>
.title {
    margin: 3rem 2rem;
}
.title-1 {
    font-size: 1.2rem;
}
.title-1-stress {
    font-weight: bold;
}
.title-2-stress {
  color: #90E5FA;
}
.login {
    margin: 4rem 2rem;
}
.login-input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #CCC;
    color: white;
    box-sizing: border-box;
    font-family: 'Arvo';
    font-size: 18px;
    height: 50px;
    /* margin: -25px 0 0 -100px; */
    padding: 10px 0px;
    position: relative;
    top: 50%;
    width: 100%;
}
.login-input:focus {
    outline: none;
}
.login-input::-webkit-input-placeholder {
  color: #AAA;
}

.login-input:focus::-webkit-input-placeholder {
  color: white;
}

.login-input:focus+.underline {
  transform: scale(1);
}

.login-alert-message {
  color: var(--color-alert);
  margin-top: .3rem;
}

.disabled {
  background: #505062;
  color: gray;
  cursor: none;
}
</style>
