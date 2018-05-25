<template>
  <div class="no-result">
    <div class="img">
      <img src="../common/img/noResult.png">
    </div>
    <p class="no-result-text">{{ title }}</p>
  </div>
</template>

<script>
  export default {
    name: "no-result",
    props: {
      title: {
        type: String,
        default: '抱歉，暂无数据'
      }
    },
  }
</script>

<style scoped lang="scss">
  @import 'common/scss/const.scss';
  .no-result {
    text-align: center;
    .img{
      display: inline-block;
      width: 160px;
      height: 145px;
    }
    .no-result-text {
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
</style>
