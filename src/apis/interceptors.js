import axios from 'axios';
import router from '../router';

export default function setup () {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Cache-Control'] = 'no-cache';
  axios.defaults.timeout = 30000;

  axios.interceptors.request.use(
    async config => {
      console.log('config', config);
      if (config.url.includes('/api/admin') && !config.url.includes('auth')) {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          // access token 이 없는 경우 로그인 화면으로 이동
          // todo 로그인 해야한다는 얼럿?
          await router.push({name: 'AdminHome'});
        } else {
          config.headers.Authorization = accessToken;
        }
      }
      return config;
    },error => {
      // 오류 요청을 보내기전 수행할 일
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    async response => {
      return response;
    }, error => {
      return Promise.reject(error);
    }
  );
}
