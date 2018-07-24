<template>
  <header class="my-tab">
    <router-link tag="div" class="tab-item" :to="{ name: 'index' }" @click.native="index=1">
      <i :class="index==1?'icon-tabbar_icon_home_selected':'icon-tabbar_icon_home_default'"></i>
      <h3 class="tab-link">首页</h3>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'share' }" @click.native="index=2">
      <i :class="index==2?'icon-tabbar_icon_library_selected':'icon-tabbar_icon_library_default'"></i>
      <h3 class="tab-link">分享</h3>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'organization' }" @click.native="index=3">
      <i :class="index==3?'icon-tabbar_icon_mechanism_selected':'icon-tabbar_icon_mechanism_default'"></i>
      <h3 class="tab-link">机构</h3>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'mall' }" @click.native="index=4">
      <i :class="index==4?'icon-tabbar_icon_mall_selected':'icon-tabbar_icon_mall_default'"></i>
      <h3 class="tab-link">商城</h3>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'user' }" @click.native="index=5">
      <i :class="index==5?'icon-tabbar_icon_personal_selected':'icon-tabbar_icon_personal_default'"></i>
      <h3 class="tab-link">个人</h3>
    </router-link>
  </header>
</template>

<script>
  export default {
    name: 'tab',
    data() {
      return {
        arr: [1, 2, 3, 4, 5]
      }
    },
    computed: {
      index: {
        get: function () {
          return this.arr[this.i]
        },
        set: function (val) {
          return this.arr[val]
        }
      }
    },
    props: {
      i: {
        type: Number,
        default: 0
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/const.scss';
  @import "common/scss/mymixin.scss";

  .my-tab {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    display: flex;
    height: 98px;
    padding: 12px 0 10px;
    box-sizing: border-box;
    font-size: $font-size-small;
    background: #fff svg(t-border);
    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: $color-text;
      i {
        font-size: 44px;
      }
      &.router-link-active {
        .tab-link {
          color: $color-theme;
        }
      }
    }
  }
</style>
