<template>
  <transition name="slide">
    <ul class="user-info">
      <li class="item">
        <h4>头像</h4>
        <div class="img">
          <img :src="user.avatar" alt="">
        </div>
      </li>
      <li class="item">
        <h4>昵称</h4>
        <p v-html="user.realname"></p>
      </li>
      <router-link tag="li" class="item" :to="{path:'/user/userInfo/classSetting'}">
        <h4>班级</h4>
        <p v-html="user.class_name"></p>
      </router-link>
      <li class="item">
        <h4>手机</h4>
        <p v-html="iphone"></p>
      </li>
      <router-view></router-view>
    </ul>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "user-info",
    computed: {
      ...mapGetters(['user']),
      iphone() {
        let str = this.user.mobile, str2;
        if (str) {
          str2 = str.substr(0, 3) + "****" + str.substr(7);
        }
        return str2
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .user-info {
    @extend %cover;
    bottom: 98px;
    z-index: 4;
  }

  .item {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 24px;
    background: #fff;
    border-bottom: 1px solid $color-border;
    &:last-of-type {
      border-bottom: none;
    }
    @extend %between;
    h4 {
      font-size: $font-size-large-x;
      color: $color-text-d;
    }
    p {
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
    .img {
      width: 136px;
      height: 136px;
      img {
        border-radius: 50%;
      }
    }
  }
</style>
