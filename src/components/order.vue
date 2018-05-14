<template>
  <main class="order">
    <header>
      <img v-lazy="book.images_large">
      <article>
        <h2 v-html="book.title"></h2>
        <h3 v-html="book.author"></h3>
        <h4>出版社: {{book.publisher}}</h4>
        <h4>出版时间: {{book.pubdate}}</h4>
        <h4>ISBN: {{book.isbn}}</h4>
        <h3>借出人：请问是</h3>
      </article>
    </header>
  </main>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "order",
    computed: {
      ...mapGetters([
        'book'
      ])
    },
    mounted(){
      console.log(this.book)
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .order{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background: $color-background;
    header {
      height: 318px;
      margin-bottom: 18px;
      padding: 24px;
      box-sizing: border-box;
      background: $color-background-h;
      @extend %start;
      align-items: stretch;
      img {
        height: 100%;
        width: 200px;
        margin-right: 24px;
      }
      article {
        text-align: left;
        padding-top: 10px;
        font-size: $font-size-small-x;
        color: $color-text-l;
        @extend %between;
        flex-direction: column;
        align-items: flex-start;
        h2 {
          font-size: $font-size-large-x;
          color: $color-text-d;
          @include no-wrap
        }
        h3 {
          font-size: $font-size-medium;
          @include no-wrap
        }
        h4 {
          @include no-wrap
        }
        p span {
          margin-right: 12px;
          display: inline-block;
          /*padding: 5px;*/
          border-radius: 5px;
          width: 32px;
          height: 32px;
          background: $color-theme;
          color: #fff;
          text-align: center;
        }
      }
    }
  }

</style>
