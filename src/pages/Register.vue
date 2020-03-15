<template>
  <div class="register">
    <my-header>注册</my-header>
    <my-logo></my-logo>
    <my-input type="text" placeholder="请输入用户名" msg="用户名错误" v-model="username"></my-input>
    <my-input type="password" placeholder="请输入密码" msg="密码错误" v-model="password"></my-input>
    <my-button @click="register">注册</my-button>
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
    register() {
      console.log('正在注册')
    }
  }
}
</script>

<style>
</style>