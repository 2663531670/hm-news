<template>
  <div class="my-comments">
    <my-header>我的跟帖</my-header>
    <div class="list">
      <van-list
        @load="onload"
        v-model="loading"
        :immediate-check="false"
        loading-text
        :finished="finished"
        finished-text="没有更多了"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">{{item.create_date|date('YYYY-MM-DD HH:mm')}}</div>
          <!-- 父评论 -->
          <div class="parentComment" v-if="item.parent">
            <div class="up">回复： 火星彩票研究员</div>
            <div class="down">啊信是张信哲吗？张信哲是不是的张学友弟弟？</div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="link">
            <div class="title one-txt-cut">原文：{{item.post.title}}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 7
    }
  },
  created() {
    this.getInfoList()
  },
  methods: {
    getInfoList() {
      this.load = false
      this.$axios({
        url: '/user_comments',
        method: 'get',
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.list = this.list.concat(data)
          console.log(this.list)
          this.loading = false
          if (data.length < this.pageSize) {
            this.finished = true
          }
        }
      })
    },
    onload() {
      // this.loading = true
      console.log('我触底了，我要加载数据')
      setTimeout(() => {
        this.pageIndex++
        this.getInfoList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  padding: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .time {
    font-size: 12px;
    color: #999;
  }
  .content {
    padding: 10px 0;
    padding-bottom: 20px;
    font-size: 14px;
  }
  .link {
    padding: 0;
    font-size: 14px;
    color: #999;
    display: flex;
    justify-content: space-between;
    .title {
      flex: 1;
    }
    span {
      width: 50px;
      text-align: right;
    }
  }
  .parentComment {
    background-color: #ddd;
    margin: 10px 0;
    padding: 10px;
    .up,
    .down {
      color: #999;
      padding: 10px 0;
    }
    .up {
      font-size: 12px;
    }
    .down {
      font-size: 14px;
    }
  }
}
</style>