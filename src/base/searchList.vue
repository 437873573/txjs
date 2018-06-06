<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
        <span class="text">{{item}}</span>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "search-list",
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      }
    },
  }
</script>

<style scoped lang="scss">
  @import 'common/scss/const.scss';
  @import 'common/scss/mymixin.scss';

  .search-list {
    @extend %start;
    margin: 0 -10px;
  }

  .search-item {
    display: inline-block;
    padding: 0 16px;
    height: 64px;
    background: #ffffff;
    border-radius: 10px;
    line-height: 64px;
    font-size: $font-size-medium;
    margin: 20px 10px;
    &.list-enter-active, &.list-leave-active {
      transition: all 0.1s;
    }
    &.list-enter, &.list-leave-to {
      height: 0;
    }
  }

</style>
