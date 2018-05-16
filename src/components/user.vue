<template>
  <main class="user">
    <header>
      <div class="head">
        <img v-lazy="data.avatar">
        <h2 v-html="data.nickname"></h2>
      </div>
      <div class="info">
        <div class="money">
          <h5>100</h5>
          <h4>借书豆</h4>
        </div>
        <div class="line"></div>
        <div class="credit">
          <h5>100</h5>
          <h4>个人信用</h4>
        </div>
      </div>
    </header>
    <nav>
      <ul class="nav">
        <li class="nli">
          <img src="../common/img/personal_icon_dd_sm.png" alt="">
          <h3>我的订单</h3>
        </li>
        <li class="nli">
          <img src="../common/img/home_icon_personal_sm.png" alt="">
          <h3>我的图书</h3>
        </li>
        <li class="nli">
          <img src="../common/img/personal_icon_sc_sm.png" alt="">
          <h3>我的收藏</h3>
        </li>
        <li class="nli">
          <img src="../common/img/home_icon_borrow_sm.png" alt="">
          <h3>借阅管理</h3>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        data: {},
      }
    },
    mounted() {
      this.$http.get('/profile').then(r => {
        if (r.status == 'success') {
          this.data = r.data.user
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  header {
    margin-bottom: 18px;
    background: #ffffff;
  }

  .head {
    height: 245px;
    padding-top: 40px;
    box-sizing: border-box;
    @extend %between;
    flex-direction: column;
    img {
      width: 136px;
      height: 136px;
      border-radius: 136px;
      border: 5px solid $color-border;
    }
    h2 {
      font-size: $font-size-large-x;
      color: $color-text-d;
    }
  }

  .info {
    @extend %center;
    height: 126px;
    padding: 30px 0;
    box-sizing: border-box;
    font-size: $font-size-medium-x;
    color: $color-text;
    h5 {
      font-weight: bold;
    }
    div {
      flex: 1;
    }
    .line {
      flex: none;
      width: 2px;
      height: 60px;
      background: $color-background;
    }
    .money, .credit {
      height: 100%;
      @extend %between;
      flex-direction: column;
    }
    .money h5 {
      color: $color-theme;
    }
    .credit h5 {
      color: rgb(104, 208, 171);
    }
  }
  .nli{
    height: 108px;
    border-bottom: 1px solid $color-border;
    padding: 0 24px;
    box-sizing: border-box;
    background: $color-background-h;
    @extend %start;
    img{
      width: 36px;
      height: 36px;
      margin-right: 24px;
    }
    h3{
      font-size: $font-size-medium-x;
      color: $color-text-d;
    }
  }
</style>
