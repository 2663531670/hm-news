<template>
  <div class="my-comment">
    <div class="header">
      <img :src="$axios.defaults.baseURL+comment.user.head_img" alt />
      <div class="center">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date|date2}}</div>
      </div>
      <div class="right" @click="reply(comment.id,comment.user.nickname)">回复</div>
    </div>
    <!-- 盖楼 -->
    <reply
      v-if="comment.parent"
      :comment="comment.parent"
      :count="getCount(0,comment)"
      @reply="reply"
    ></reply>

    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import Reply from './Reply'
export default {
  data() {
    return {
      count: 3
    }
  },
  props: {
    comment: Object
  },
  methods: {
    getCount(num, data) {
      if (data.parent) {
        return this.getCount(num + 1, data.parent)
      } else {
        return num
      }
    },
    reply(id, nickname) {
      this.$emit('reply', id, nickname)
    }
  },
  components: {
    Reply
  }
}
</script>

<style lang="less" scoped>
.my-comment {
  padding: 20px 0;
  .header {
    display: flex;
    margin-bottom: 10px;
    img {
      width: 40px;
      height: 40px;
      display: block;
      border-radius: 20px;
    }
    .center {
      flex: 1;
      font-size: 14px;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .time {
        color: #999;
      }
    }
    .right {
      font-size: 14px;
      color: #999;
    }
  }
  .content {
    font-size: 16px;
    padding-top: 20px;
    word-break: break-all;
  }
}
</style>