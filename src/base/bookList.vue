<template>
  <ul class="book-list">
    <li class="item" v-for="(item,index) in lists" :key="index" @click="selectItem(item)">
      <div class="img">
        <img v-lazy="item.images_large" alt="">
      </div>
      <div class="text">
        <h4 v-html="item.title"></h4>
        <h5 v-html="item.author"></h5>
        <p v-html="item.summary"></p>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "book-list",
    props: {
      lists: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .book-list .item {
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
      @extend %around;
      padding: 10px 0;
      box-sizing: border-box;
      align-items: flex-start;
      flex-direction: column;
      text-align: left;
      h4 {
        width: 100%;
        flex: none;
        font-size: $font-size-large-x;
        color: $color-text-d;
        font-weight: bold;
        @include no-wrap;
      }
      h5 {
        max-width: 360px;
        color: $color-text-l;
        font-size: $font-size-medium;
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
</style>
