<template>
  <scroll class="my-suggest-list"
             ref="scrollRef"
             :data="result"
             :beforeScroll="beforeScrollData"
             @beforeScroll="beforeScroll"
             :pullup="pullup"
             @scrollToEnd="scrollToEnd">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="img">
          <img v-lazy="item.images_large" alt="">
        </div>
        <div class="text">
          <h3>{{item.title}}</h3>
          <h5>{{item.author}}</h5>
          <p v-html="item.summary"></p>
          <h4>图书来源：{{item.origin=='user'?'同学':'图书馆'}}</h4>
        </div>
      </li>
    </ul>
    <!-- loading 组件 -->
    <div class="loading" v-show="hasMore" >
      <Loading></Loading>
    </div>
    <div class="no-result-wrapper" v-if="!hasMore && !result.length">
      <NoResult :title="title"></NoResult>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'
  import {mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      Scroll,
      Loading,
      NoResult
    },
    data() {
      return {
        title:'抱歉，没有找到你想要的书籍',
        // 当前检索页数，用于下拉加载
        page: 1,
        // 每一页的数量
        perpage: 20,
        // 接受检索结果
        result: [],
        // 标志位。是否加载完
        hasMore: true,
        beforeScrollData: true,
        pullup: true
      }
    },
    props: {
      // 接受的检索值
      query: {
        type: String,
        default: ''
      },
    },
    watch: {
      query(newVal) {
        this.search()
      }
    },
    methods: {
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.scrollRef.scrollTo(0, 0)
        this.$http.get('/book',{params:{
          keyword:this.query
          }}).then((res) => {
          if (res.status=='success') {
            this.result=res.data.books.data
            this._checkMore(res.data)
          }
        })
      },
      scrollToEnd() {
        // if (!this.hasMore) {
        //   return
        // }
        // this.page++
        // search(this.query, this.page, this.perpage,).then((res) => {
        //   if (res.code === 0) {
        //     // this.result = this.result.concat(this._formatSearch(res.data))
        //     // this._checkMore(res.data)
        //   }
        // })
      },
      // 路由跳转逻辑
      selectItem(item) {
        this.$router.push({path: `/book/${item.id}`});
        this.$store.commit('SET_BOOK', item);
        this.$emit('select')
      },
      // 什么时候不上拉刷新
      _checkMore(data) {
        let books = data.books
        // 没有数据或最后一页
        if (!books.data.length|| (books.from + books.current_page * this.perpage) > books.total) {
          this.hasMore = false
        }
      },
      // 滚动前触发事件
      beforeScroll() {
        this.$emit('beforeScroll')
      },
      // 给父亲用
      refresh() {
        this.$refs.scrollRef.refresh()
      },
      ...mapActions(['selectBook'])
    },
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/const.scss';
  @import 'common/scss/mymixin.scss';

  .my-suggest-list {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      .suggest-item {
        margin: 20px 0;
        padding: 12px 24px;
        height: 240px;
        box-sizing: border-box;
        background: #fff;
        @extend %start;
        align-items: stretch;
        &:first-of-type{
          margin-top: 0;
        }
        .img {
          margin-right: 26px;
          width: 160px;
          height: 100%;
          flex: none;
        }
        .text {
          flex: none;
          width: 516px;
          @extend %between;
          padding: 8px 0;
          box-sizing: border-box;
          align-items: flex-start;
          flex-direction: column;
          text-align: left;
          h3 {
            width: 100%;
            flex: none;
            font-size: $font-size-large;
            color: $color-text-d;
            font-weight: bold;
            @include no-wrap;
          }
          h4{
            font-size: $font-size-medium;
            color: #65d0ab;
          }
          h5 {
            max-width: 360px;
            color: $color-text-l;
            font-size: $font-size-small-x;
            @extend %start;
            @include no-wrap;
            span {
              flex: none;
              display: block;
              width: 124px;
              height: 36px;
              border: 1px solid $color-theme;
              border-radius: 5px;
              margin-left: 20px;
              color: $color-theme;
            }
          }
          p {
            align-self: stretch;
            height: 68px;
            flex: none;
            font-size: $font-size-medium;
            @include no-wrap-multi(2);
          }
        }
      }
    }
    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .loading{
    position: relative;
    width: 100%;
    height: 600px;
  }
</style>

