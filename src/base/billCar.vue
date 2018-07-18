<template>
  <router-link tag="div" :to="{path:'/mall/carts'}" class="car" v-show="bill" replace>
    <i class="icon-tabbar_icon_shopc_selected"></i>
    <span>{{bill>10?'..':bill}}</span>
  </router-link>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: "bill-car",
    computed: {
      ...mapGetters(['bill'])
    },
    methods: {
      getList() {
        this.$http.get('/good-carts').then(r => {
          if (r.status === 'success') {
            this.setBill(r.data.count)
          }
        })
      },
      ...mapMutations({
        'setBill': 'SET_BILL'
      })
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .car {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: #65d0ab;
    line-height: 88px;
    font-size: 48px;
    color: #fff;
    span {
      position: absolute;
      top: 0;
      right: -10px;
      display: block;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: $color-theme;
      font-size: 16px;
      line-height: 28px;
    }
  }
</style>
