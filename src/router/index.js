import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import MyFollow from '../pages/MyFollow.vue'
import MyComments from '../pages/Mycomments.vue'
import MyStar from '../pages/MyStar.vue'
import Home from '../pages/Home.vue'
import PostDetail from '../pages/PostDetail.vue'
import Test from '../pages/Test.vue'
import TabEdit from '../pages/TabEdit.vue'
import Search from '../pages/Search.vue'
Vue.use(VueRouter)
// 解决导航重复的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/user', name: 'user', component: User },
    { path: '/edit', name: 'edit', component: Edit },
    { path: '/my-follow', name: 'my-follow', component: MyFollow },
    { path: '/my-comments', name: 'my-comments', component: MyComments },
    { path: '/my-star', name: 'my-star', component: MyStar },
    { path: '/post-detail/:id', name: 'post-detail', component: PostDetail },
    { path: '/test', name: 'test', component: Test },
    { path: '/tab-edit', name: 'tab-list', component: TabEdit },
    { path: '/search', name: 'search', component: Search }
  ]
})
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  const authpath = ['/user', '/edit', '/my-follow', '/my-comments', '/my-star']
  if (authpath.includes(to.path)) {
    if (!token) {
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
