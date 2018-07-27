<template>
  <main class="user">
    <header>
      <router-link class="head" tag="div" :to="{path:'/user/info'}">
        <div class="img">
          <img v-lazy="user.avatar">
        </div>
        <h2 v-html="user.realname"></h2>
      </router-link>
      <div class="info">
        <router-link tag="div" class="coin" :to="{path:'/user/coin'}">
          <h5 v-html="user.coin"></h5>
          <h4>借书豆</h4>
        </router-link>
        <div class="line"></div>
        <router-link tag="div" class="credit" :to="{path:'/user/credit'}">
          <h5 v-html="user.credit"></h5>
          <h4>信用值</h4>
        </router-link>
      </div>
    </header>
    <nav>
      <ul class="nav">
        <router-link tag="li" class="nli" :to="{path:'/user/bill'}">
          <div class="img">
            <img src="../common/img/personal_icon_dd_sm.png" alt="">
          </div>
          <h3>商城订单</h3>
          <i class="icon-tabbar_icon_more_selected"></i>
        </router-link>
        <router-link tag="li" class="nli" :to="{path:'/user/book'}">
          <div class="img">
            <img src="../common/img/home_icon_personal_sm.png" alt="">
          </div>
          <h3>我的图书</h3>
          <i class="icon-tabbar_icon_more_selected"></i>
        </router-link>
        <router-link tag="li" class="nli" :to="{path:'/user/libProofList'}">
          <div class="img">
            <img src="../common/img/nav_icon_class.png" alt="">
          </div>
          <h3>图书馆借书单</h3>
          <i class="icon-tabbar_icon_more_selected"></i>
        </router-link>
        <router-link tag="li" class="nli" :to="{path:'/user/orgProofList'}">
          <div class="img">
            <img src="../common/img/nav_icon_library.png" alt="">
          </div>
          <h3>机构借书单</h3>
          <i class="icon-tabbar_icon_more_selected"></i>
        </router-link>
        <router-link tag="li" class="nli" :to="{path:'/user/success'}">
          <div class="img">
            <img src="../common/img/personal_icon_sc_sm.png" alt="">
          </div>
          <h3>我的成就</h3>
          <i class="icon-tabbar_icon_more_selected"></i>
        </router-link>
        <!--<router-link tag="li" class="nli" :to="{path:'/user/userCollect'}">-->
          <!--<div class="img">-->
            <!--<img src="../common/img/personal_icon_sc_sm.png" alt="">-->
          <!--</div>-->
          <!--<h3>我的收藏</h3>-->
        <!--</router-link>-->
      </ul>
    </nav>
    <router-view></router-view>
  </main>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "user",
    computed:{
      ...mapGetters(['user'])
    },
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
    .img {
      width: 136px;
      height: 136px;
      border-radius: 50%;
      border: 5px solid $color-border;
      img{
        border-radius: 50%;
      }
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
      width: 3px;
      height: 60px;
      background: $color-background;
    }
    .coin, .credit {
      height: 100%;
      @extend %between;
      flex-direction: column;
    }
    .coin h5 {
      color: $color-theme;
    }
    .credit h5 {
      color: rgb(104, 208, 171);
    }
  }
  .nli{
    height: 108px;
    border-bottom: 1px solid $color-border;
    border-image: svg(b-border) 1 1;
    background: #fff;
    padding: 0 24px;
    box-sizing: border-box;
    position: relative;
    &:last-of-type{
      border-bottom:none;
      border-image:none;
    }
    @extend %start;
    .img{
      width: 36px;
      height: 36px;
      margin-right: 24px;
    }
    h3{
      font-size: $font-size-medium-x;
      color: $color-text-d;
    }
    i{
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
    }
  }
</style>
