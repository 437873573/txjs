<template>
  <transition name="slide">
    <Scroll class="news" :data="data">
      <ul class="news-lists">
        <li class="item" v-for="item in data">
          <a :href="item.link">
            <div class="img">
              <img v-lazy="item.cover">
            </div>
            <div class="text">
              <h4 v-html="item.title"></h4>
              <p v-html="item.updated_at"></p>
            </div>
          </a>
        </li>
      </ul>
    </Scroll>
  </transition>

</template>

<script>
  import Scroll from 'base/scroll'

  export default {
    name: "news",
    components: {Scroll},
    data() {
      return {
        data: []
      }
    },
    mounted() {
      this.$http.get('/articles').then(r => {
        if (r.status == 'success') {
          this.data=r.data.articles
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .news {
    @extend %cover;
    z-index: 4;
  }
  .item{
    margin: 20px 0;
    padding: 12px 24px;
    height: 240px;
    box-sizing: border-box;
    background: #fff;
    &:first-of-type{
      margin-top: 0;
    }
    a{
      height: 100%;
      @extend %start;
      align-items: stretch;
    }
    .img {
      margin-right: 26px;
      width: 200px;
      flex: none;
    }
    .text {
      flex: none;
      width: 456px;
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
        @include no-wrap-multi(2);
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
        height: 34px;
        flex: none;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
    }
  }
</style>
