<template>
  <div class="my-follow">
    <my-header>我的关注</my-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL+item.head_img" alt />
        </div>
        <div class="center">
          <div class="name">{{item.nickname}}</div>
          <div class="time">{{item.create_date|date}}</div>
        </div>
        <div class="right">
          <div class="cancel" @click="unFollow(item.id)">取消关注</div>
        </div>
      </div>
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
    this.getFollowList()
  },
  methods: {
    getFollowList() {
      this.$axios({
        url: `/user_follows`,
        method: 'get'
      }).then(res => {
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.list = data
          console.log(this.list)
        }
      })
    },
    unFollow(id) {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '你确定要取消关注该用户吗'
        })
        .then(() => {
          this.$axios({
            url: `/user_unfollow/${id}`,
            method: 'get'
          }).then(res => {
            console.log(res.data)
            const { statusCode, message } = res.data
            if (statusCode === 200) {
              this.$toast(message)
              this.getFollowList()
            }
          })
        })
        .catch(() => {
          this.$toast('取消操作成功')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  margin-top: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  .left {
    width: 40px;
    height: 40px;
    img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 20px;
    .name {
      font-size: 16px;
      color: #666;
    }
    .time {
      font-size: 14px;
    }
  }
  .right {
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    background-color: #ddd;
    border-radius: 15px;
  }
}
</style>