<template>
  <div class="loading-container">
    <div class="loading">
      <div class="img">
        <img src="../common/img/loading.gif">
      </div>
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
  .loading {
    width: 100%;
    text-align: center;
    .img{
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
