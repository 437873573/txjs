<template>
  <ul class="book-list">
    <li class="item" v-for="item in lists" :key="item.origin+item.id" @click="selectItem(item)">
      <div class="img">
        <img v-lazy="item.images_large" alt="">
      </div>
      <div class="text">
        <h3>{{item.title}}</h3>
        <h4>{{item.author}} <span>校长推荐</span></h4>
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
    methods:{
      selectItem(item){
        this.$emit('select', item)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .book-list .item{
    margin: 20px 0;
    padding: 12px 24px;
    height: 240px;
    box-sizing: border-box;
    background: #fff;
    @extend %start;
    align-items: stretch;
    .img {
      margin-right: 26px;
      img {
        flex: none;
        width: 160px;
        height: 100%;
      }
    }
    .text {
      @extend %around;
      padding: 10px 0;
      box-sizing: border-box;
      align-items: flex-start;
      flex-direction: column;
      h3 {
        font-size: $font-size-large-x;
        color: $color-text-d;
        font-weight: bold;
        @include no-wrap;
      }
      h4 {
        color: $color-text-l;
        font-size: $font-size-medium;
        @extend %start;
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
        text-align: left;
        font-size: $font-size-medium;
        @include no-wrap-multi(2)
      }
    }
  }
</style>
