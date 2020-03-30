<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="请输入搜索的内容"
          v-model="keyword"
          @keyup.enter="search"
          @input="input"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <!-- 推荐列表 -->
    <div class="recommend" v-if="recommend.length > 0">
      <div
        class="item one-txt-cut"
        v-for="item in recommend"
        :key="item.id"
        @click="history(item.title)"
      >{{item.title}}</div>
    </div>

    <!-- 渲染文章列表 -->
    <div class="post-list" v-else-if="postList.length > 0">
      <my-post v-for="post in postList" :key="post.id" :post="post"></my-post>
    </div>
    <div class="content" v-else>
      <h3>历史纪录</h3>
      <div class="list">
        <div class="item" @click="history(item)" v-for="item in hislist" :key="item">{{item}}</div>
      </div>
      <h3>热门搜索</h3>
      <div class="list">
        <div class="item" @click="history(item)" v-for="item in hotlist" :key="item">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      hislist: [],
      recommend: [],
      keyword: '',
      postList: [],
      hotlist: ['办公室小野否认解散', '新冠肺炎', '复工']
    }
  },
  created() {
    const history = JSON.parse(localStorage.getItem('history'))
    if (history) {
      this.hislist = history
    }
  },
  methods: {
    async search() {
      this.recommend = []
      if (this.keyword === '') {
        this.$toast.fail('搜索关键字不能为空哦')
        return
      }
      this.hislist = this.hislist.filter(item => item !== this.keyword)
      this.hislist.unshift(this.keyword)
      localStorage.setItem('history', JSON.stringify(this.hislist))
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
        if (this.postList.length === 0) {
          this.$toast('请换个关键字试试')
        }
      }
    },
    input: _.debounce(async function() {
      if (this.keyword === '') {
        this.postList = []
        this.recommend = []
        return
      }
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommend = data
        console.log(this.recommend)
      }
    }, 500),
    history(item) {
      this.keyword = item
      this.search()
    },
    back() {
      if (this.postList.length > 0 || this.recommend.length > 0) {
        this.keyword = ''
        this.postList = []
        this.recommend = []
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .center {
      flex: 1;
      padding: 0 10px;
      position: relative;
      display: flex;
      input {
        flex: 1;
        height: 34px;
        line-height: 34px;
        border-radius: 17px;
        border: none;
        outline: none;
        border: 1px solid #ccc;
        padding-left: 30px;
        font-size: 12px;
      }
      .iconfont {
        position: absolute;
        top: 0;
        left: 20px;
        line-height: 34px;
      }
    }
    .right {
      font-size: 14px;
    }
  }
  .content {
    padding: 20px;
    h3 {
      padding: 10px 0;
      font-size: 20px;
    }
    .list {
      overflow: hidden;
      .item {
        font-size: 14px;
        border: 1px solid #ccc;
        background-color: #ddd;
        padding: 5px 10px;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }

  .recommend {
    position: absolute;
    z-index: 999;
    background-color: #fff;
    width: 100%;
    .item {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>