<template>
  <main class="bind">
    <section class="status">
      <div class="status-left">绑定手机</div>
      <div class="status-right" :class="status?'':'no'">绑定班级</div>
    </section>
    <keep-alive>
      <router-view @next="next" @show="show"></router-view>
    </keep-alive>
    <Confirm ref="confirm" :text="message" :confirmBtnText="text" :canshow="false" :head="head"></Confirm>
  </main>
</template>

<script>
  export default {
    name: "bind",
    data(){
      return{
        status:false,
        head:'填写有以下错误',
        message:'666',
        text:'确定'
      }
    },
    methods:{
      next(){
        this.status=true,
        this.$router.push({name:'info'})
      },
      show(mess){
        this.message=mess
        this.$refs.confirm.show()
      }
    },
    activated(){
      this.status=this.$route.query.status
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
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
        @extend %levCenter;
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
</style>
