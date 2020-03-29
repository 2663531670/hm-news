<template>
  <div class="my-star">
    <my-header>我的收藏</my-header>
    <div class="list">
      <my-post v-for="post in list" :key="post.id" :post="post"></my-post>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getInfoList()
  },
  methods: {
    async getInfoList() {
      const res = await this.$axios.get('/user_star')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    }
  }
}
</script>

