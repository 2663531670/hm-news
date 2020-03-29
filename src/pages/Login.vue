<template>
  <div class="hm-login">
    <my-header>登录</my-header>
    <my-logo></my-logo>
    <my-input type="text" placeholder="用户名/手机号" msg="用户名格式错误" v-model="username" :rule=/^\d{5,9}$/ ref = "username"></my-input>
    <my-input type="password" placeholder="密码" msg="密码格式错误" v-model="password"
    :rule = "/^\d{3,12}$/" ref = "password"></my-input>
    <my-button @click="login">登录</my-button>
    <div class="go-register">
      没有账号？去<router-link class="link" to = "./register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created(){
    this.username = this.$route.params.username
    this.password = this.$route.params.password
    console.log(this.$route)
  },
  methods: {
   async login() {
      // 点击让所有表单元素进行校验
      const res1 = this.$refs.username.validate(this.username)
      const res2 = this.$refs.password.validate(this.password)
      // console.log(res1)
      // console.log(res2)
      if(!res1||!res2){
        return
      }
    const res =await this.$axios({
        url:'/login',
        method:'post',
        data:{
          username:this.username,
          password:this.password
        }
      })
        const {message,statusCode,data} = res.data
        if(statusCode===200){
          console.log(res.data)
          // 登录成功时将响应回来的token和用户id存储在本地
          localStorage.setItem('token',data.token)
          localStorage.setItem('user_id',data.user.id)
          this.$toast.success('登录成功')
          if(this.$route.params.back){
            this.$router.back()
            return
          }
          this.$router.push('./user')
        }else{
          this.$toast.fail('用户名或密码错误')
        }
      
     
    }
  }
}
</script>

<style lang="less" scoped>
.hm-login{
  .go-register{
    font-size:16px;
    padding: 0 20px;
    text-align: right;
    .link{
      color:orange;
    }
  }
}
</style>