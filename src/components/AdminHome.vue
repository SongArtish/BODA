<template>
  <div class="AdminHome">
    <NavBar :textNavbar="textNavbar" />
    <div class="title">
        <div class="title-1"><span class="title-1-bold">서울중앙교회</span> 찬양공유</div>
        <div class="title-2">이용을 위해서 로그인이 필요합니다.</div>
    </div>
    <div class="login">
        <div class="login-label">관리자 로그인</div>
        <input class="login-input" type="password" placeholder="비밀번호를 입력하세요" autofocus v-model="password" @keyup.enter="login" />
        <span class="login-input-underline"></span>
        <div class="login-alert-message" v-if="message">{{ message }}</div>
    </div>
    <BottomButton :class="{'disabled': !isNotNull }" :textButton="textButton" @buttonClick="login" />
  </div>
</template>
<script>
import { BottomButton, NavBar } from './atoms'
import { loginAPI } from '../apis/admin'

export default {
  name: 'AdminHome',
  components: {
    BottomButton,
    NavBar
  },
  data() {
      return {
        password: '',
        message: null,
        textButton: "로그인",
        textNavbar: "찬양공유 관리자 시스템"
      }
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
}
</script>
<style scoped>
.title {
    margin: 3rem 0;
}
.title-1 {
    font-size: 1.2rem;
}
.title-1-bold {
    font-weight: bold;
}
.login {
    margin: 4rem 0;
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

.login-input-underline {
  background-color: dodgerblue;
  display: inline-block;
  height: 2px;
  left: 50px;
  margin-top: -4px;
  position: absolute;
  top: 185px;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
  -webkit-transition: all 0.5s linear;
  transition: all 0.5s linear;
  width: 202px;
}
.login-alert-message {
  color: #df4759;
  margin-top: .3rem;
}

.disabled {
  background: #505062;
  color: gray;
  cursor: none;
}
</style>