<template>
  <transition name="confirm-fade">
    <div class="my-confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <header>{{head}}</header>
          <slot></slot>
          <div class="operate">
            <div v-show="canshow" @click="cancel" class="operate-btn left">{{ cancelBtnText }}</div>
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
      // 描述性文字
      canshow: {
        type: Boolean,
        default: true
      },
      head: {
        type: String,
        default: '提示'
      },
      text: {
        type: String,
        default: '是否申请借阅这本图书？'
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
    watch: {},
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
    // 过滤器设计目的就是用于简单的文本转换
    filters: {},
    // 若要实现更复杂的数据变换，你应该使用计算属性
    computed: {},
    created() {
    },
    mounted() {
    },
    destroyed() {
    }
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
          padding: 40px 0 20px;
          color: $color-text-d;
          font-size: $font-size-large-x;
        }
        .text {
          padding: 20px 40px 40px;
          text-align: left;
          font-size: $font-size-medium-x;
          color: $color-text-l;
        }
        .operate {
          display: flex;
          align-items: center;
          font-size: $font-size-large;
          .operate-btn {
            flex: 1;
            height: 88px;
            line-height: 88px;
            border-top: 1px solid $color-border;
            color: $color-theme;
            &.left {
              color: $color-text-l;
              border-right: 1px solid $color-border;
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
