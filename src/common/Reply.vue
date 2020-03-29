<template>
  <div class="big">
    <reply v-if="comment.parent" :comment="comment.parent" :count="count-1" @reply="reply"></reply>
    <div class="reply" :class="{active:!comment.parent}">
      <div class="header">
        <div class="name">{{count}}楼 {{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date|date2}}</div>
        <div class="right" @click="reply(comment.id,comment.user.nickname)">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
    count: Number
  },
  name: 'reply',
  methods: {
    reply(id, nickname) {
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang="less" scoped>
.reply {
  padding: 20px;
  border: 1px solid #000;
  background-color: #ddd;
  border-top: none;
  &.active {
    border-top: 1px solid #000;
  }
  .header {
    display: flex;
    font-size: 14px;
    margin-bottom: 10px;
    .time {
      flex: 1;
      padding-left: 20px;
      color: #999;
    }
    .right {
      font-size: 12px;
      color: #999;
    }
  }
  .content {
    font-size: 14px;
    word-break: break-all;
  }
}
</style>