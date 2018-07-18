<template>
  <Scroll class="order-content user-mess" :data="data">
    <ul class="order-lists">
      <li class="item" v-for="v in data" :key="v.id" @click="selectItem(v.id)">
        <div class="img">
          <img v-lazy="v.borrow_mechanism_book_item[0].mechanism_book.book.images_large">
        </div>
        <div class="text">
          <h2>{{v.borrow_mechanism_book_item[0].mechanism_book.book.title}}等</h2>
          <h4>共{{v.borrow_mechanism_book_item.length}}本</h4>
          <h3 v-show="v.status=='APPLYING'">借书码：{{v.random_code}}</h3>
          <h3 class="org">借书机构：{{v.mechanism.name}}</h3>
          <p class="not" v-if="v.status=='APPLYING'">待取书</p>
          <p v-else>{{v.status=='REJECT'?'已过期':v.status=='READING'?'已取书':'已归还'}}</p>
        </div>
      </li>
    </ul>
    <!-- loading 组件 -->
    <div class="loading-container" v-show="!show">
      <Loading></Loading>
    </div>
    <!-- noResult 组件 -->
    <div class="noResult-container" v-show="show&&!data.length">
      <NoResult :title="title"></NoResult>
    </div>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'

  export default {
    name: "org-proof-list",
    components: {Scroll, Loading, NoResult},
    data() {
      return {
        data: [],
        show: false,
        title: '还没有机构的借书单'
      }
    },
    methods: {
      selectItem(id) {
        this.$router.push({path: `/orgProof/${id}`})
      }
    },
    mounted() {
      this.$http.get('/bill-mechanism/index').then(r => {
        if (r.status == 'success') {
          this.show=true;
          this.data = r.data
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .user-mess {
    @extend %cover;
    z-index: 4;
  }

  .item {
    height: 240px;
    margin-bottom: 18px;
    padding: 12px 24px;
    box-sizing: border-box;
    background: #fff;
    @extend %between;
    .img {
      flex: none;
      width: 160px;
      height: 100%;
    }
    .text {
      flex: 1;
      align-self: stretch;
      padding: 16px 0 16px 24px;
      box-sizing: border-box;
      @extend %between;
      flex-direction: column;
      position: relative;
      h2 {
        width: 520px;
        font-size: $font-size-large-x;
        color: $color-text-d;
        text-align: left;
        @include no-wrap
      }
      h3 {
        width: 520px;
        font-size: $font-size-medium-x;
        color: $color-theme;
        text-align: left;
        @include no-wrap;
        &.org{
          color: #666;
        }
      }
      h4 {
        width: 520px;
        font-size: $font-size-medium;
        color: $color-text;
        text-align: left;
        @include no-wrap
      }
      h5 {
        position: absolute;
        right: 0;
        top: 16px;
        display: inline-block;
        padding: 0 5px;
        border-radius: 5px;
        line-height: 32px;
        font-size: $font-size-small;
        color: #fff;
        background: $color-theme;
        &.borrow {
          background: $color-sub-theme;
        }
      }
      p {
        position: absolute;
        right: -24px;
        bottom: 8px;
        width: 120px;
        height: 60px;
        line-height: 60px;
        font-size: $font-size-medium;
        color: $color-text;
        background: $color-background;
        &.not {
          background: $color-theme;
          color: $color-text-ll;
        }
      }
    }
  }

  .loading-container, .noResult-container {
    @extend %middle;
  }
</style>
