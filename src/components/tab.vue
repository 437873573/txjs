<template>
  <header class="my-tab">
    <router-link tag="div" class="tab-item" :to="{ name: 'index' }" @click.native="index=1">
      <i :class="index==1?'icon-tabbar_icon_home_selected':'icon-tabbar_icon_home_default'"></i>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'library' }" @click.native="index=2">
      <i :class="index==2?'icon-tabbar_icon_library_selected':'icon-tabbar_icon_library_default'"></i>
      <span class="tab-link">图书馆</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'mall' }" @click.native="index=3">
      <i :class="index==3?'icon-tabbar_icon_mall_selected':'icon-tabbar_icon_mall_default'"></i>
      <span class="tab-link">商城</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'user' }" @click.native="index=4">
      <i :class="index==4?'icon-tabbar_icon_personal_selected':'icon-tabbar_icon_personal_default'"></i>
      <span class="tab-link">我的</span>
    </router-link>
  </header>
</template>

<script>
  export default {
    name: 'tab',
    data(){
      return{
        index:1
      }
    },
    // mounted(){
    //   let hash=window.location.hash;
    //   // console.log(hash)
    //   if(hash=='#/library'){
    //     return this.index=2
    //   }else if(hash=='#/mall'){
    //     return this.index=3
    //   }else if(hash=='#/user'){
    //     return this.index=4
    //   }else{
    //     return this.index=1
    //   }
    // }
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/const.scss';

  .my-tab {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background: #fff;
    display: flex;
    height: 98px;
    padding: 12px 0 10px;
    box-sizing: border-box;
    font-size: $font-size-small;
    border-top: 1px solid #eaeaea;
    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: $color-text;
      i{
        font-size: 48px;
      }
      &.router-link-active {
        .tab-link {
          color: $color-theme;
        }
      }
    }
  }
</style>
