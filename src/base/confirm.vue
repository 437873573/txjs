<template>
  <transition name="confirm-fade">
    <div class="my-confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <header>{{head}}</header>
          <slot class="text"></slot>
          <div class="operate">
            <div v-show="canShow" @click="cancel" class="operate-btn left">{{ cancelBtnText }}</div>
            <div @click="confirm" class="operate-btn">{{ confirmBtnText }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        // 显示
        showFlag: false
      }
    },
    props: {
      canShow: {
        type: Boolean,
        default: true
      },
      head: {
        type: String,
        default: '温馨提示'
      },
      cancelBtnText: {
        type: String,
        default: '再考虑一下'
      },
      confirmBtnText: {
        type: String,
        default: '确定申请'
      }
    },
    methods: {
      // 对外提供，显示对话框
      show() {
        this.showFlag = true
      },
      // 对外提供，隐藏对话框
      hide() {
        this.showFlag = false
      },
      confirm() {
        this.showFlag = false
        this.$emit('confirm')
      },
      cancel() {
        this.showFlag = false
        this.$emit('cancel')
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/const.scss';
  @import 'common/scss/mymixin.scss';

  .my-confirm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.2);
    &.confirm-fade-enter-active {
      animation: confirm-fadein 0.3s;
      .confirm-content {
        animation: confirm-zoom 0.3s;
      }
    }
    .confirm-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 6;
      .confirm-content {
        width: 580px;
        border-radius: 20px;
        background: #fff;
        header {
          padding: 40px 0 30px;
          color: $color-text-d;
          font-size: $font-size-large-x;
        }
        .operate {
          display: flex;
          align-items: center;
          font-size: $font-size-large-x;
          margin-top: 30px;
          background: svg(t-border);
          .operate-btn {
            flex: 1;
            height: 88px;
            line-height: 88px;
            color: $color-theme;
            &.left {
              color: $color-text-l;
              background: svg(r-border);
            }
          }
        }
      }
    }
  }

  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes confirm-zoom {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
