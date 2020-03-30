<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center">
        <div class="search" @click="$router.push('/search')">
          <span class="iconfont iconsearch"></span>
          <span class="text">搜索新闻</span>
        </div>
      </div>
      <div class="right">
        <span class="iconfont iconwode" @click="$router.push('/user')"></span>
      </div>
    </div>
    <!-- tab栏 -->
    <van-tabs v-model="active" swipeable animated sticky>
      <van-tab v-for="item in tabList" :key="item.id" :title="item.name">
        <div class="postList">
          <!-- 下拉刷新 -->
          <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              @load="onload"
              finished-text="没有更多了"
              :offset="20"
            >
              <my-post v-for="post in postList" :key="post.id" :post="post"></my-post>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      tabList: [],
      postList: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5,
      isLoading: false
    }
  },
  created() {
    const active = localStorage.getItem('activeTabs')
    const deactive = localStorage.getItem('deactiveTabs')
    if (active && deactive) {
      this.tabList = JSON.parse(localStorage.getItem('activeTabs'))
      this.getPostList(this.tabList[this.active].id)
      // console.log(this.tabList[this.active].id)
      // console.log(this.tabList[this.active])
      return
    }
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        this.getPostList(this.tabList[this.active].id)
      }
    },
    async getPostList(id) {
      // console.log('我需要拿到id为', id, '的文章数据')
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        if (this.postList.length > 0 && this.pageIndex === 1) {
          this.postList = []
        }
        this.postList = [...this.postList, ...data]
        this.loading = false
        // console.log(this.postList)
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onload() {
      setTimeout(() => {
        const id = this.tabList[this.active].id
        this.pageIndex++
        this.getPostList(id)
      }, 1000)
    },
    onRefresh() {
      this.pageIndex = 1
      this.postList = []
      this.loading = true
      this.finished = false
      setTimeout(() => {
        const id = this.tabList[this.active].id
        this.getPostList(id)
        this.isLoading = false
      }, 500)
    }
  },

  watch: {
    active(value) {
      // this.pageIndex = 1
      // this.postList = []
      // this.loading = true
      // this.finished = false
      // this.getPostList(this.tabList[value].id)

      this.pageIndex = 1
      this.postList = []
      this.loading = true
      this.finished = false
      setTimeout(() => {
        const id = this.tabList[this.active].id
        this.getPostList(id)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 0 10px;
  display: flex;
  height: 50px;
  background-color: #ff0000;
  justify-content: space-between;
  font-size: 14px;
  .left {
    line-height: 50px;
    height: 50px;
    width: 80px;
    span {
      font-size: 50px;
      color: #fff;
    }
  }
  .center {
    height: 50px;
    flex: 1;
    .search {
      background-color: rgba(255, 255, 255, 0.5);
      height: 30px;
      margin-top: 10px;
      border-radius: 15px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      .text {
        margin-left: 10px;
      }
    }
  }
  .right {
    height: 50px;
    width: 60px;
    line-height: 50px;
    text-align: right;
    padding-right: 20px;
    span {
      color: #fff;
      font-size: 20px;
    }
  }
}
/deep/.van-tabs__nav {
  background-color: #ddd;
}
.content {
  height: 40px;
}
.item {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .left {
    flex: 1;
    display: flex;
    padding-right: 20px;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 14px;
    }
    .bottom {
      display: flex;
      font-size: 12px;
      color: #999;
      .name {
        margin-right: 20px;
      }
    }
  }
  .right {
    img {
      width: 121px;
      height: 75px;
      object-fit: cover;
    }
  }
}
</style>