import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import './axios.js'
import './assets/css/global.css'
import locale from 'element-ui/lib/locale/lang/en' 
import echarts from 'echarts'



Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

Vue.use(ElementUI,{ locale });


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
