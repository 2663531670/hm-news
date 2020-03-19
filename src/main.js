import Vue from 'vue'
import App from './App.vue'
import './styles/base.less'
import './styles/iconfont.css'
import 'lib-flexible'
import router from './router/index'
import axios from 'axios'
import moment from 'moment'
// ------------全局导入vant-ui和所需样式
import {
  Toast,
  Dialog,
  Field,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Uploader
} from 'vant'
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
// -------------------全局注册组件
import MyHeader from './common/MyHeader.vue'
import MyLogo from './common/Logo.vue'
import MyButton from './common/MyButton.vue'
import MyInput from './common/HmInput.vue'
import MyNavbar from './common/MyNavbar.vue'
Vue.component('my-header', MyHeader)
Vue.component('my-logo', MyLogo)
Vue.component('my-button', MyButton)
Vue.component('my-input', MyInput)
Vue.component('my-navbar', MyNavbar)
// ------------------全局注册时间过滤器
Vue.filter('date', function(input) {
  return moment(input).format('YYYY-MM-DD')
})
// 给vue原型上添加axios,使用更方便
Vue.prototype.$axios = axios
// 给axios配置公共路径
axios.defaults.baseURL = 'http://localhost:3000'
// --------------请求拦截器------------------
axios.interceptors.request.use(function(req) {
  const token = localStorage.getItem('token')
  req.headers.Authorization = token
  return req
})

// --------响应拦截器-------------------->>
axios.interceptors.response.use(function(res) {
  const { message, statusCode } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    console.log('拦截了')
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    Toast.fail(message)
  }
  return res
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
