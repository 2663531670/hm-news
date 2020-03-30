<template>
  <keep-alive :include="['home']">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {}
</script>

<style>
.box {
  width: 200px;
  height: 200px;
  background-color: #dba520;
}
</style>