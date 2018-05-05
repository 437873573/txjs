<template>
  <ul class="my-switches">
    <li class="switch-item" :class="{'active':currentIndex === index}"
        v-for="(item, index) in switches" @click="switchItem(index)">
      <span>{{ item.name }} </span>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
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
  watch: {},
  methods: {
    // 开关被切换了，通知父组件
    switchItem(index) {
      this.$emit('switch', index)
    }
  },
  // 过滤器设计目的就是用于简单的文本转换
  filters: {},
  // 若要实现更复杂的数据变换，你应该使用计算属性
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';
@import 'common/scss/mymixin.scss';

.my-switches {
  width: 100%;
  background: $color-background-h;
  display: flex;
  .switch-item {
    flex: 1;
    padding: 30px 0;
    margin: 0 74px;
    box-sizing: border-box;
    font-size: $font-size-large;
    color: $color-text-l;
    &:after{
      width: 100%;
      height: 6px;
      position: absolute;
      bottom: 0;
      background: red;
      border-left: 74px solid #fff;
    }
    &.active {
      color: $color-theme;
    }
  }
}
</style>
