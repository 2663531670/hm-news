<template>
  <div class="hm-user">
    <my-header>个人中心</my-header>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL+info.head_img" alt />
      </div>
      <div class="center">
        <div class="up">
          <span v-if="info.gender===1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <div>{{info.nickname}}</div>
        </div>
        <div class="down">{{info.create_date|date}}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <my-navbar title="我的关注" info="关注的用户" @click="$router.push('/my-follow')"></my-navbar>
    <my-navbar title="我的跟帖" info="跟帖/回复" @click="$router.push('/my-comments')"></my-navbar>
    <my-navbar title="我的收藏" info="文章/视频"></my-navbar>
    <my-navbar title="设置" @click="$router.push('/edit')"></my-navbar>
    <my-navbar title="退出" @click="logout"></my-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    this.$axios({
      url: `/user/${user_id}`,
      method: 'get'
      // headers: {
      //   Authorization: token
      // }
    }).then(res => {
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    })
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗'
        })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          this.$toast('退出成功')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$toast('取消退出')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  height: 60px;
  display: flex;
  padding: 20px;
  border-bottom: 3px solid #ccc;
  .left {
    height: 60px;
    width: 60px;
    img {
      height: 60px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    font-size: 14px;
    padding: 10px;
    padding-left: 20px;
    .up {
      display: flex;
      .iconxingbienan {
        color: #7eaeff;
      }
      .iconxingbienv {
        color: pink;
      }
    }
    .down {
      font-size: 12px;
      color: #666;
    }
  }
  .right {
    width: 30px;
    height: 50px;
    line-height: 50px;
  }
}
</style>