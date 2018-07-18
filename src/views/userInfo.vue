<template>
  <ul class="user-info">
    <li class="item">
      <h4>头像</h4>
      <div class="img">
        <img v-lazy="user.avatar">
      </div>
    </li>
    <li class="item">
      <h4>昵称</h4>
      <p>
        {{user.realname}}
        <!--<i class="icon-tabbar_icon_more_selected"></i>-->
      </p>
    </li>
    <li class="item">
      <h4>学校</h4>
      <p>
        {{user.school_name}}
        <!--<i class="icon-tabbar_icon_more_selected"></i>-->
      </p>
    </li>
    <router-link tag="li" class="item" :to="{path:'/user/info/classModify'}">
      <h4>班级</h4>
      <p>
        {{user.grade_name+user.class_name}}
        <i class="icon-tabbar_icon_more_selected"></i>
      </p>
    </router-link>
    <router-link tag="li" class="item" :to="{path:'/user/info/mobileModify'}">
      <h4>手机</h4>
      <p>
        {{iphone}}
        <i class="icon-tabbar_icon_more_selected"></i>
      </p>
    </router-link>
    <router-view></router-view>
  </ul>
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
    z-index: 3;
  }

  .item {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 24px;
    background: #fff;
    border-bottom: 1px solid $color-border;
    border-image: svg(b-border) 1 ;
    &:last-of-type {
      border-bottom: none;
      border-image: none;
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
      border-radius: 50%;
      img {
        border-radius: 50%;
      }
    }
  }
</style>
