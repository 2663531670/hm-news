<template>
  <div class="my-post" @click="$router.push(`/post-detail/${post.id}`)">
    <div class="video-post" v-if="post.type === 2">
      <div class="title">{{post.title}}</div>
      <div class="img">
        <div class="play">
          <span class="iconfont iconshipin"></span>
        </div>
        <img :src="fixUrl(post.cover[0].url)" alt />
      </div>
      <div class="bottom">
        <div class="name">{{post.user.nickname}}</div>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <!-- 单图片结构 -->
    <div class="single-post" v-else-if="post.cover.length<3">
      <div class="left">
        <div class="title">{{post.title}}</div>
        <div class="bottom">
          <div class="name">{{post.user.nickname}}</div>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="fixUrl(post.cover[0].url)" alt />
      </div>
    </div>
    <!-- 多图片结构 -->
    <div class="multiple-post" v-else>
      <div class="title">{{post.title}}</div>
      <div class="imgs">
        <img :src="fixUrl(post.cover[0].url)" alt />
        <img :src="fixUrl(post.cover[0].url)" alt />
        <img :src="fixUrl(post.cover[0].url)" alt />
      </div>
      <div class="bottom">
        <div class="name">{{post.user.nickname}}</div>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  },
  methods: {
    fixUrl(url) {
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
// 单图片结构样式
.single-post {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .left {
    flex: 1;
    display: flex;
    padding-right: 20px;
    flex-direction: column;
    justify-content: space-between;
  }
  .right {
    img {
      width: 121px;
      height: 75px;
      object-fit: cover;
    }
  }
}
// 多图片结构样式
.multiple-post {
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .imgs {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 110px;
      height: 80px;
      object-fit: cover;
    }
  }
}
// 视频文章样式
.video-post {
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .img {
    padding: 5px 0;
    position: relative;
    img {
      width: 100%;
      height: 150px;
      display: block;
      margin: 10px auto;
      object-fit: cover;
    }
    .play {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 60px;
      .iconshipin {
        font-size: 32px;
        color: #fff;
      }
    }
  }
}
</style>