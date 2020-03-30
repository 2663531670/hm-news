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
  Uploader,
  Button,
  List,
  Tab,
  Tabs,
  PullRefresh
} from 'vant'
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Button)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
// -------------------全局注册组件
import MyHeader from './common/MyHeader.vue'
import MyLogo from './common/Logo.vue'
import MyButton from './common/MyButton.vue'
import MyInput from './common/HmInput.vue'
import MyNavbar from './common/MyNavbar.vue'
import MyPost from './common/MyPost.vue'

Vue.component('my-header', MyHeader)
Vue.component('my-logo', MyLogo)
Vue.component('my-button', MyButton)
Vue.component('my-input', MyInput)
Vue.component('my-navbar', MyNavbar)
Vue.component('my-post', MyPost)
// ------------------全局注册时间过滤器
Vue.filter('date', function(input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

Vue.filter('date2', input => {
  const time = new Date(input)
  const now = new Date()
  const hour = ((now - time) / 1000 / 60 / 60) | 0
  if (hour < 24) {
    return '刚刚'
  } else {
    return moment(input).format('YYYY-MM-DD HH:mm:ss')
  }
})

// -----------------解决防盗链过滤器
// Vue.filter('video', input => {
//   return input.split('?')[0]
// })

// 给vue原型上添加axios,使用更方便
Vue.prototype.$axios = axios
// 给axios配置公共路径
axios.defaults.baseURL = 'http://localhost:3000'
// --------------请求拦截器------------------
axios.interceptors.request.use(function(req) {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = token
  }
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
