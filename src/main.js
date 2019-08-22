// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import VueJsDialog from 'vuejs-dialog'
import global from '@/components/global'

Vue.use(ElementUi, {size: 'small', zIndex: 3000})
Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(VueJsDialog)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cookies = VueCookies
Vue.prototype.$global = global

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前,格式化参数，增加token
  let data = config.data
  let params = new URLSearchParams()
  for (let key in config.data) {
    params.append(key, data[key])
  }
  // params.append("tokenStr", getTimes())
  config.data = params
  return config
}, function (error) {
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
