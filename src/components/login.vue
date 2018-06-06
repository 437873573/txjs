<template>
  <section class="login">
    <div class="text">
      <i class='icon-login_img_phone'></i>
      <input type="text" placeholder="请输入您的手机号" v-model="phone">
    </div>
    <div class="code">
      <div class="text">
        <i class='icon-login_img_sec'></i>
        <input type="text" placeholder="请输入验证码" v-model="code">
      </div>
      <div class="btn o" v-show="show" @click="getCode">获取验证码</div>
      <div class="btn disabled" v-show="!show">{{count}} s</div>
    </div>
    <div class="btn x" @click="sub">下一步</div>
  </section>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        show: true,
        count: '',
        timer: null,
        phone: '',
        code: ''
      }
    },
    methods: {
      sub() {
        this.$http.post('/mobile-bind', {mobile: this.phone, scode: this.code}).then(r => {
          if (r.status == 'success') {
            this.$emit('next')
          } else if (r.status == 'fail') {
            this.$emit('show', r.mess)
          }
        }).catch(e => console.log(e))
      },
      getCode() {
        if (this.phone) {
          this.$http.post('/captcha-sms', {mobile: this.phone}).then(r => {
            if(r.status=='success'){
              this._countdown()
            }else{
              this.$emit('show', r.mess)
            }
          }).catch(e => console.log(e))
        } else {
          this.$emit('show', '手机号码不能为空')
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
    > div {
      margin: 30px 0;
    }
    .code {
      @extend %between;
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
