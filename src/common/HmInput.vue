<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :class="{success:status==='success',error:status==='error'}"
      :value="value"
      @input="input"
    />
    <div class="tip" v-show="status === 'error'">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: ''
    }
  },
  methods: {
    input(e) {
      const value = e.target.value
      this.$emit('input', value)
      // 根据接收到的rule和message添加表单的校验
      this.validate(value)
    },
    // 表单校验
    validate(value) {
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
        console.log(this.status)
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入...'
    },
    msg: {
      type: String,
      default: '用户名或者密码错误'
    },
    value: {
      type: String
    },
    rule: RegExp,
    message: String
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  height: 50px;
  margin: 0 20px;
  input {
    height: 30px;
    line-height: 30px;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    // color: #666;
    &.success {
      border-color: green;
    }
    &.error {
      border-color: red;
    }
  }
  .tip {
    color: red;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
}
</style>