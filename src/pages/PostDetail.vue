<template>
  <div class="post-detail">
    <div class="my-header">
      <div class="left">
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <span class="followed" v-if="detail.has_follow" @click="unfollow(detail.user.id)">已关注</span>
        <span class="follow" v-else @click="follow(detail.user.id)">关注</span>
      </div>
    </div>
    <div class="post">
      <div class="title">{{detail.title}}</div>
      <div class="user">
        <span class="name">{{detail.user.nickname}}</span>
        <span class="time">{{detail.create_date|date}}</span>
      </div>

      <div class="content" v-if="detail.type === 1" v-html="detail.content"></div>
      <video :src="detail.content" controls loop v-else></video>
    </div>

    <div class="btns">
      <div class="like" @click="handleLike(detail.id)" :class="{active:detail.has_like}">
        <span class="iconfont icondianzan"></span>
        <span>{{detail.like_length||0}}</span>
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
    <!-- 评论区 -->
    <div class="commentList">
      <div class="header">精彩跟帖</div>
      <!-- 评论组件 -->
      <myComment v-for="item in commentList" :key="item.id" :comment="item" @reply="reply"></myComment>
    </div>
    <!-- 底部写评论区 -->
    <div class="footer">
      <!-- input区域 -->
      <div class="input" v-if="show">
        <input type="text" placeholder="写跟帖" @focus="handleFocus" />
        <span class="iconfont iconpinglun-">
          <span class="pls">{{detail.comment_length}}</span>
        </span>
        <span
          class="iconfont iconshoucang"
          @click="handleStar(detail.id)"
          :class="{active:detail.has_star}"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>

      <!-- textarea区域 -->
      <div class="textarea" v-else>
        <textarea
          :placeholder="'回复：'+replyNickname"
          @blur="handleBlur"
          ref="textarea"
          v-model="content"
        ></textarea>
        <div class="send" @click="add">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../common/Comment'
export default {
  data() {
    return {
      detail: {
        user: {}
      },
      show: true,
      commentList: {},
      content: '',
      replyId: '',
      replyNickname: ''
    }
  },
  components: {
    myComment: Comment
  },
  created() {
    this.getPostDetail()
    this.getCommentList()
  },
  methods: {
    async getPostDetail() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.detail = data
      }
    },
    async follow(id) {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        return
      }
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.getPostDetail()
      }
    },
    async unfollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.detail.has_follow = false
      }
    },
    async handleLike(id) {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        return
      }
      const res = await this.$axios.get(`/post_like/${id}`)
      // console.log(res.data)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async handleStar(id) {
      const res = await this.$axios.get(`/post_star/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async getCommentList() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      this.commentList = data
      // console.log(this.commentList)
    },
    handleFocus() {
      this.show = false
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },

    async add() {
      // if (this.content.trim() === '') {
      //   // this.$toast('发表的内容不能为空哦')
      //   console.log('内容是空的啊')
      //   return
      // }
      const id = this.$route.params.id
      const res = await this.$axios({
        url: `/post_comment/${id}`,
        method: 'post',
        data: {
          content: this.content,
          parent_id: this.replyId
        }
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.content = ''
        this.show = true
        this.getCommentList()
        this.replyId = ''
      }
    },
    handleBlur() {
      if (this.content.trim() === '') {
        this.show = true
        this.replyId = ''
        this.replyNickname = ''
        return
      }
    },
    reply(id, nickname) {
      this.show = false
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
      this.replyId = id
      this.replyNickname = nickname
    }
  }
}
</script>

<style lang="less" scoped>
.post-detail {
  padding-bottom: 50px;
  .my-header {
    display: flex;
    height: 30px;
    padding: 10px 20px;
    line-height: 30px;
    .center {
      flex: 1;
      padding-left: 10px;
      span {
        font-size: 45px;
      }
    }
    .right {
      span {
        font-size: 11px;
        border: 1px solid #ccc;
        padding: 3px 10px;
        border-radius: 16px;
      }
    }
  }
  .post {
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .user {
      padding: 10px 0;
      span {
        font-size: 14px;
        color: #999;
        margin-right: 10px;
      }
    }
    .content {
      font-size: 14px;
      /deep/img {
        width: 100%;
        display: block;
        margin-bottom: 20px;
      }
    }
    video {
      width: 100%;
    }
  }
  .btns {
    display: flex;
    padding: 20px 40px;
    .like,
    .share {
      height: 30px;
      flex: 1;
      text-align: center;
      margin-right: 20px;
      border: 1px solid #ccc;
      line-height: 30px;
      font-size: 14px;
      border-radius: 15px;
    }
    .like {
      span {
        padding-right: 10px;
      }
      &.active {
        color: red;
        border-color: red;
      }
    }
    .share {
      color: lime;
      span {
        padding-left: 10px;
      }
    }
  }
  .commentList {
    border-top: 3px solid #ccc;
    padding: 20px;
    margin-bottom: 100px;
    .header {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
  .input {
    height: 30px;
    padding: 10px 20px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    input {
      height: 30px;
      border: none;
      background-color: #ddd;
      outline: none;
      width: 180px;
      padding-left: 20px;
      border-radius: 15px;
      font-size: 14px;
    }
    span {
      margin-left: 10px;
      font-size: 20px;
      height: 30px;
      line-height: 30px;
      &.active {
        color: red;
        border-color: red;
      }
    }
    .iconpinglun- {
      position: relative;
      span {
        background-color: red;
        position: absolute;
        font-size: 8px;
        padding: 0 3px;
        border-radius: 5px;
        width: 20px;
        height: 15px;
        line-height: 10px;
        color: #fff;
        text-align: center;
        top: 0;
        left: 0;
      }
    }
  }
  .textarea {
    display: flex;
    padding: 20px;
    border-top: 1px solid #ccc;
    align-items: flex-end;
    height: 120px;
    textarea {
      border: 1px solid #ccc;
      outline: none;
      // width: 180px;
      flex: 1;
      height: 100%;
      border-radius: 5px;
      background-color: #ddd;
      font-size: 14px;
    }
    .send {
      font-size: 14px;
      width: 60px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      border-radius: 10px;
      margin-left: 10px;
      color: #fff;
      background-color: red;
    }
  }
}
</style>