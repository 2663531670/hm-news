import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import MyFollow from '../pages/MyFollow.vue'
import MyComments from '../pages/Mycomments.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/user', name: 'user', component: User },
    { path: '/edit', name: 'edit', component: Edit },
    { path: '/my-follow', name: 'my-follow', component: MyFollow },
    { path: '/my-comments', name: 'my-comments', component: MyComments }
  ]
})
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  const authpath = ['/user', '/edit', '/my-follow', '/my-comments']
  if (authpath.includes(to.path)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
