<template>
  <main class="bind">
    <section class="status">
      <div class="status-left">手机验证</div>
      <div class="status-right" :class="flag?'':'no'">添加班级</div>
    </section>
    <keep-alive>
      <router-view @next="next" @show="show" @status="status"></router-view>
    </keep-alive>
    <Confirm ref="confirm" :confirmBtnText="text" :canShow="false" :head="head">
      <div id="text" v-html="message"></div>
    </Confirm>
  </main>
</template>

<script>
  export default {
    name: "bind",
    data(){
      return{
        flag:false,
        head:'填写有以下错误',
        message:'',
        text:'确定'
      }
    },
    methods:{
      status(flag){
        this.flag=flag
      },
      next(){
        this.flag=true;
        this.$router.push({name:'info'})
      },
      show(mess){
        this.message=mess;
        this.$refs.confirm.show()
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .bind{
    @extend %cover;
    z-index: 3;
  }
  .status {
    padding-top: 60px;
    @extend %between;
    div {
      flex-grow: 1;
      height: 60px;
      border-top: 3px solid $color-theme;
      position: relative;
      font-size: $font-size-small;
      color: $color-theme;
      line-height: 60px;
      &:before {
        content: '';
        display: block;
        @extend %Center;
        top: -7px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: $color-theme;
      }
      &.no {
        color: $color-text-l;
        border-top-color: $color-text-l   ;
        &:before {
          background: $color-text-l;
        }
      }
    }
  }
  #text {
     padding: 20px 40px 40px;
     text-align: left;
     font-size: $font-size-medium-x;
     color: $color-text-l;
   }
</style>
