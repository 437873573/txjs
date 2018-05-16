<template>
  <div class="loading-container">
    <div class="my-loading">
      <img src="../common/img/loading.gif">
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      title: {
        type: String,
        default: '加载中...'
      }
    },
  }
</script>

<style scoped lang="scss">
  @import 'common/scss/const.scss';
  @import "common/scss/mymixin.scss";
  .loading-container{
    @extend %middle
  }
  .my-loading {
    width: 100%;
    text-align: center;
    img{
      display: inline-block;
      width: 24px;
      height: 24px;
    }
    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
</style>
