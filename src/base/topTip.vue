<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "top-tip",
    data() {
      return {
        showFlag: false
      }
    },
    props: {
      // 延迟关闭时间
      delay: {
        type: Number,
        default: 2000
      }
    },
    methods: {
      show() {
        this.showFlag = true

        clearTimeout(this.timer)

        // delay 秒自动关闭
        this.timer = setTimeout(() => {
          this.showFlag = false
        }, this.delay)
      },
      hide() {
        this.showFlag = false
      }
    },
  }
</script>

<style scoped lang="scss">
  @import 'common/scss/const.scss';
  @import 'common/scss/mymixin.scss';

  .top-tip {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background: #65d0ab;
    height: 74px;
    line-height: 74px;
    color: #fff;
    font-size: 32px;
    &.drop-enter-active, &.drop-leave-active {
      transition: all 0.8s;
    }
    &.drop-enter, &.drop-leave-to {
      transform: translate3d(0, -100%, 0);
    }
  }
</style>
