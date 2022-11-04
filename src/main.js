import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptorsSetup from './apis/interceptors';

Vue.config.productionTip = false
interceptorsSetup();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
