<template>
  <div class="edit">
    <my-header>编辑资料</my-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL+info.head_img" alt />
      <!-- 上传头像 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <my-navbar title="昵称" :info="info.nickname" @click="showNickname"></my-navbar>
    <my-navbar title="密码" :info="info.password|password" @click="showPassword"></my-navbar>
    <my-navbar title="性别" :info="info.gender ===1?'男':'女'" @click="showGender"></my-navbar>
    <!-- 修改昵称确认框 -->
    <van-dialog v-model="show" title="修改昵称" @confirm="editNickname" show-cancel-button>
      <van-field class="input" v-model="value" />
    </van-dialog>
    <!-- 修改密码确认框 -->
    <van-dialog v-model="show1" title="修改密码" @confirm="editPassword" show-cancel-button>
      <my-input placeholder="密码" msg="密码格式错误" v-model="password" :rule="/^\d{3,12}$/"></my-input>
    </van-dialog>
    <!-- 修改性别确认框 -->
    <van-dialog v-model="show2" title="修改性别" @confirm="editGender" show-cancel-button>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      show: false,
      show1: false,
      show2: false,
      value: '',
      password: '',
      gender: 1
    }
  },
  created() {
    this.getInfo()
  },
  filters: {
    password(input) {
      if (!input) {
        return
      }
      return input.replace(/./g, '*')
    }
  },
  methods: {
    getInfo() {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
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
    editUser(data) {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      this.$axios({
        url: `user_update/${user_id}`,
        method: 'post',
        // headers: {
        //   Authorization: token
        // },
        data
      }).then(res => {
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.getInfo()
          this.$toast.success(message)
        }
      })
    },
    showNickname() {
      this.show = true
      this.value = this.info.nickname
    },
    editNickname() {
      this.editUser({
        nickname: this.value
      })
    },
    showPassword() {
      this.show1 = true
      this.password = this.info.password
    },
    editPassword() {
      this.editUser({
        password: this.password
      })
    },
    showGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    afterRead(file) {
      if (file.file.type !== 'image/jpeg') {
        this.$toast('图片类型不支持')
        return
      }
      if (file.file.size / 1024 > 200) {
        this.$toast('图片尺寸过大')
        return
      }
      console.log(file.file)
      const fd = new FormData()
      fd.append('file', file.file)
      const token = localStorage.getItem('token')
      this.$axios({
        url: '/upload',
        method: 'post',
        data: fd,
        headers: {
          Authorization: token
        }
      }).then(res => {
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editUser({
            head_img: data.url
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  height: 70px;
  position: relative;
  img {
    height: 70px;
    width: 70px;
    display: block;
    border-radius: 50%;
    margin: 30px auto;
  }
}
.van-dialog {
  padding: 0 10px;
}
.van-field {
  border: 1px solid #ccc;
  margin: 10px 0;
}
.van-uploader {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  opacity: 0;
}
</style>