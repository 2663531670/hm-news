<template>
  <div class="tab-edit">
    <my-header>栏目管理</my-header>
    <div class="content">
      <div class="activeTabs">
        <p class="del">点击删除以下频道</p>
        <div
          class="item"
          v-for="item in activeTabs"
          :key="item.id"
          @click="del(item.id)"
        >{{item.name}}</div>
      </div>

      <div class="deactiveTabs" v-if="deactiveTabs.length>0">
        <p class="add">点击添加以下频道</p>
        <div
          class="item"
          v-for="item in deactiveTabs"
          :key="item.id"
          @click="add(item.id)"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabs: [],
      deactiveTabs: []
    }
  },
  async created() {
    const active = localStorage.getItem('activeTabs')
    const deactive = localStorage.getItem('deactiveTabs')
    if (active && deactive) {
      this.activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
      this.deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
      return
    }
    const res = await this.$axios.get('/category')
    console.log(res.data)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeTabs = data
      console.log(this.activeTabs)
    }
  },
  methods: {
    del(id) {
      // 根据传递的id找到对应的下标
      const index = this.activeTabs.findIndex(item => item.id === id)
      // 先添加到deactiveTabs里
      this.deactiveTabs.push(this.activeTabs[index])
      // 再根据下标删除
      this.activeTabs.splice(index, 1)
    },
    add(id) {
      // 根据id找对应的下标
      const index = this.deactiveTabs.findIndex(item => item.id === id)
      // 先把对应的项添加到activeTabs中
      this.activeTabs.push(this.deactiveTabs[index])
      // 再根据下标删除
      this.deactiveTabs.splice(index, 1)
    }
  },
  watch: {
    activeTabs: {
      handler(value) {
        localStorage.setItem('activeTabs', JSON.stringify(value))
        localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  .del {
    font-size: 12px;
    color: #999;
  }
  .add {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
  }
  .activeTabs {
    font-size: 14px;
    overflow: hidden;
    .item {
      padding: 5px;
      margin: 10px;
      background-color: #ddd;
      text-align: center;
      float: left;
      border-radius: 5px;
    }
  }
  .deactiveTabs {
    font-size: 14px;
    overflow: hidden;
    .item {
      border-radius: 5px;
      padding: 5px;
      margin: 10px;
      background-color: #ddd;
      text-align: center;
      float: left;
    }
  }
}
</style>