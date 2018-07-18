<template>
  <div class="search-box">
    <i class="icon-btn_icon_search"></i>
    <input type="text" class="box" ref="queryRef" v-model="query" :placeholder="placeholder">
    <i class="icon-tabbar_icon_del_selected" v-show="query" @click="clearQuery"></i>
  </div>
</template>

<script>
  import { myDOM } from 'common/js/myutils.js'

  export default {
    name:'search-box',
    data () {
      return {
        query: ''
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '在这里搜你想要的书籍吧'
      }
    },
    methods: {
      // 给父亲用的，让输入框失去焦点，避免滚动搜索结果时移动端键盘遮挡
      blur() {
        this.$refs.queryRef.blur()
      },
      // 给父亲用的，传进搜索框的值
      // this.$refs.searchBoxRef.getQuery(k)
      getQuery(k) {
        this.query = k
      },
      clearQuery() {
        this.query = ''
      }
    },
    computed: {},
    created () {
      // 节流
      this.$watch('query', myDOM.debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 300))
    },
    mounted () {},
    destroyed () {}
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/const.scss';
  @import 'common/scss/mymixin.scss';

  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 24px;
    height: 60px;
    background: $color-background;
    border-radius: 6px;
    .icon-search {
      font-size: 24px;
      color: $color-text;
    }
    .box {
      flex: 1;
      margin: 0 5px;
      height: 60px;
      border: 0;
      outline: none;
      background: $color-background;
      color: $color-text-d;
      font-size: $font-size-medium;
      -webkit-appearance: none;
      line-height: 60px;
      &::placeholder {
        color: $color-text;
      }
    }
  }
</style>

