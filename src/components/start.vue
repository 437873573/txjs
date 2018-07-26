<template>
  <main>
    <h1>
      <img src="../common/img/startLogo.png" alt="">
      同学借书
    </h1>
  </main>
</template>
<script>
  export default {
    mounted(){
      let wait = setTimeout(() => {
        this.$router.replace({path: '/index'})
        clearTimeout(wait);
      }, 800);
    }
  }
</script>
<style scoped lang="scss">
  main {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    z-index: 3;
    h1 {
      width: 430px;
      height: 90px;
      font-size: 0;
      color: transparent;
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      img {
        display: block;
      }
    }
  }
</style>
