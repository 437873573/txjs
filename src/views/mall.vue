<template>
  <main class="mall">
    <div class="img">
      <img src="../common/img/mall_selected.png" alt="">
    </div>
  </main>

</template>

<script>
  export default {
    name: "mall"
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
.mall{
  position: fixed;
  z-index: 3;
  width: 100%;
  top: 0;
  bottom: 98px;
}
  .img {
    @extend %middleCenter;
    width: 548px;
    height: 359px;
  }
</style>
