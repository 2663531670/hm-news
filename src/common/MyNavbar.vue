<template>
  <div class="my-navbar" @click="clickFn">
    <div class="left">{{title}}</div>
    <div class="center">{{info}}</div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    info: String
  },
  methods: {
    clickFn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.my-navbar {
  display: flex;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  margin: 10px 20px;
  margin-right: 0;
  border-bottom: 1px solid #ccc;

  .center {
    text-align: right;
    flex: 1;
    padding-right: 20px;
    color: #999;
  }
  .right {
    width: 30px;
  }
}
</style>