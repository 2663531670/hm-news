<template>
  <div class="hm-register">
    <my-header>注册</my-header>
    <my-logo></my-logo>
    <my-input type="text" placeholder="用户名/手机号" msg="用户名格式错误" v-model="username" :rule=/^\d{5,9}$/ ref = "username"></my-input>
    <my-input type="text" placeholder="昵称" msg="昵称格式错误" v-model="nickname" :rule=/^([\u4e00-\u9fa5]){3,7}$/ ref = "nickname"></my-input>
    <my-input type="password" placeholder="密码" msg="密码格式错误" v-model="password" :rule = "/^\d{3,12}$/" ref = "password"></my-input>
    <my-button @click="register">注册</my-button>
    <div class="go-login">
      已有账号？去<router-link class="link" to = "/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      nickname:'',
      password: ''
    }
  },
  methods: {
    register() {
      const res1 = this.$refs.username.validate(this.username)
      const res2 = this.$refs.nickname.validate(this.nickname)
      const res3 = this.$refs.password.validate(this.password)
      if(!res1||!res2||!res3){
        return
      }
      this.$axios({
        url:'/register',
        method:'post',
        data:{
          username:this.username,
          nickname:this.nickname,
          password:this.password
        }
      }).then(res=>{
        if(res.data.statusCode===200){
          this.$toast.success('注册成功了')
          this.$router.push({
            name:'login',
            params:{
              username:this.username,
              nickname:this.nickname,
              password:this.password
            }
          })
        }else{
          this.$toast.fail('用户名已存在')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hm-register{
  .go-login{
    font-size: 16px;
    padding: 0 20px;
    text-align: right;
    .link{
      color:orange;
    }
  }
}
</style>