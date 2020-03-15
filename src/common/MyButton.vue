<template>
  <div class="hm-button" @click="clickFn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      this.$emit("click");
    }
  }
};
</script>

<style lang = "less" scoped>
.hm-button {
  height: 50px;
  background-color: #cc3300;
  font-size: 20px;
  text-align: center;
  color: #fff;
  line-height: 50px;
  margin: 20px;
  border-radius: 25px;
  cursor: pointer;
}
</style>