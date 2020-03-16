import Vue from 'vue'
import App from './App.vue'
import './styles/base.less'
import './styles/iconfont.css'
import 'lib-flexible'
import router from './router/index'
import axios from 'axios'
// ------------全局导入vant-ui和所需样式
import { Toast } from 'vant'
Vue.use(Toast)
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
// 给vue原型上添加axios,使用更方便
Vue.prototype.$axios = axios
// 给axios配置公共路径
axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
