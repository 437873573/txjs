<template>
  <section class="login">
    <div class="text">
      <i class='icon-login_img_phone'></i>
      <input type="text" placeholder="请输入您的手机号" v-model="phone" @click="error.mobile=''">
      <p v-show="error.mobile" v-html="error.mobile"></p>
    </div>
    <div class="code">
      <div class="text">
        <i class='icon-login_img_sec'></i>
        <input type="text" placeholder="请输入验证码" v-model="code" @click="error.scode=''">
        <p v-show="error.scode" v-html="error.scode"></p>
      </div>
      <div class="btn o" v-show="show" @click="getCode">获取验证码</div>
      <div class="btn disabled" v-show="!show">{{count}} s</div>
    </div>
    <div class="btn x" @click="sub">{{bound===3?'确认修改':'验证完成'}}</div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "login",
    computed:{
      ...mapGetters(['bound'])
    },
    data() {
      return {
        show: true,
        count: '',
        timer: null,
        phone: '',
        code: '',
        error: {
          mobile: '',
          scode: ''
        }
      }
    },
    methods: {
      sub() {
        this.$http.post('/mobile-bind', {mobile: this.phone, scode: this.code}).then(r => {
          if (r.status === 'success') {
            this.$emit('success')
          } else if (r.status === 'fail') {
            for (let k in r.data) {
              // console.log(k,data.data[k])
              this.error[k] = r.data[k][0]
            }
          }
        })
      },
      getCode() {
        if (this.phone) {
          this.$http.post('/captcha-sms', {mobile: this.phone}).then(r => {
            if (r.status === 'success') {
              this._countdown()
            } else if (r.status === 'fail') {
              for (let k in r.data) {
                // console.log(k,data.data[k])
                this.error[k] = r.data[k][0]
              }
            }
          })
        } else {
          this.error.mobile = '手机号码不能为空'
        }
      },
      _countdown() {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  @import "common/scss/form.scss";

  .login {
    width: 580px;
    margin: 140px auto 0;
    .code {
      @extend %between;
      margin: -40px 0;
      .text {
        width: 360px;
      }
      .btn {
        box-sizing: border-box;
        width: 200px;
      }
    }
    i {
      font-size: 48px;
      color: $color-theme;
    }
  }
</style>
