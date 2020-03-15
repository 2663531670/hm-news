<template>
  <div class="hm-header">
    <div class="left" @click="$router.go(-1)">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang = "less" scoped>
.hm-header {
  height: 50px;
  font-size: 14px;
  display: flex;
  line-height: 50px;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .center {
    text-align: center;
    font-weight: 700;
    flex: 1;
  }
  .left,
  .right {
    text-align: center;
    height: 30px;
    width: 30px;
  }
}
</style>