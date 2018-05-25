<template>
  <transition name="slide">
    <div class="class-setting">
      <Info @show="show"></Info>
      <Confirm ref="confirm" :confirmBtnText="text" :canShow="false" :head="head">
        <div id="text" v-html="message"></div>
      </Confirm>
    </div>
  </transition>
</template>

<script>
  import Info from 'components/info'

  export default {
    name: "class-setting",
    components:{Info},
    data(){
      return{
        head:'填写有以下错误',
        message:'',
        text:'确定'
      }
    },
    methods:{
      show(mess){
        this.message=mess
        this.$refs.confirm.show()
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .class-setting {
    @extend %cover;
  }
  #text {
    padding: 20px 40px 40px;
    text-align: left;
    font-size: $font-size-medium-x;
    color: $color-text-l;
  }
</style>
