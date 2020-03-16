<template>
  <div class="hm-user">
    <my-header>个人中心</my-header>
    <div class="info">
      <div class="left">
        <img src="http://b-ssl.duitang.com/uploads/item/201504/02/20150402H5812_cshdn.jpeg" alt />
      </div>
      <div class="center">
        <div class="up">
          <span class="iconfont iconxingbienan"></span>
          <div>火星网友</div>
        </div>
        <div class="down">2019-10-10</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <my-navbar title="我的关注" info="关注的用户"></my-navbar>
    <my-navbar title="我的跟帖" info="跟帖/回复"></my-navbar>
    <my-navbar title="我的跟帖" info="跟帖/回复"></my-navbar>
    <my-navbar title="设置"></my-navbar>
  </div>
</template>

<script>
export default {}
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
      span {
        color: #7eaeff;
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