<template>
  <div class="login">
    <my-header>登录</my-header>
    <my-logo></my-logo>
    <my-input type="text" placeholder="用户名/手机号" msg="用户名格式错误" v-model="username" :rule=/^\d{5,9}$/ ref = "username"></my-input>
    <my-input type="password" placeholder="密码" msg="密码格式错误" v-model="password"
    :rule = "/^\d{3,12}$/" ref = "password"></my-input>
    <my-button @click="login">登录</my-button>
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
  methods: {
    login() {
      // 点击让所有表单元素进行校验
      const res1 = this.$refs.username.validate(this.username)
      const res2 = this.$refs.password.validate(this.password)
      // console.log(res1)
      // console.log(res2)
      if(!res1||!res2){
        return
      }
      this.$axios({
        url:'/login',
        method:'post',
        data:{
          username:this.username,
          password:this.password
        }
      }).then(res=>{
        if(res.data.statusCode===200){
          this.$toast.success('登录成功')
          this.$router.push('./user')
        }else{
          this.$toast.fail('用户名或密码错误')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>