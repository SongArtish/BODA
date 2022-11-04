import {loginAPI} from "@/apis/admin";

export default {
  methods: {
    login (password) {
      loginAPI(password)
        .then((res) => {
          console.log(res)
          if (res.result.loginResult) {
            localStorage.setItem('accessToken', res.result.accessToken);
            this.$router.push('/admin/list');
          } else {
            // TODO 로그인 실패 얼럿
            alert('로그인 실패');
          }
        })
        .catch((err) => console.log(err))
    },
    logout () {
      if (confirm('로그아웃 하시겠습니까?')) {
        localStorage.removeItem('accessToken');
        this.$router.push({name: 'AdminHome'});
      }
    }
  }
}
