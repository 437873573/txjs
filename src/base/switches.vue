<template>
  <ul class="switches">
    <li class="switch-item" :class="{'active':currentIndex === index}"
        v-for="(item, index) in switches" @click="switchItem(index)">
      <span>{{ item.name }} </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 开关被切换了，通知父组件
    switchItem(index) {
      this.$emit('switch', index)
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';
@import 'common/scss/mymixin.scss';

.switches {
  width: 100%;
  background: $color-background-h svg(b-border);
  display: flex;
  height: 88px;
  position: relative;
  z-index: 5;
  .switch-item {
    flex: 1;
    line-height: 88px;
    box-sizing: border-box;
    font-size: $font-size-large;
    color: $color-text-l;
    border-bottom: 6px solid transparent;
    &.active {
      color: $color-theme;
      border-bottom-color: $color-theme;
      transition: all 0.5s ease;
    }
  }
}
</style>
