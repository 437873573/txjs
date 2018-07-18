<template>
  <router-link tag="div" :to="{path:'/share/libraryCarts'}" class="car" v-show="carts" replace>
    <i class="icon-tabbar_icon_book_selected"></i>
    <span>{{carts}}</span>
  </router-link>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: "book-car",
    computed:{
      ...mapGetters(['carts'])
    },
    methods:{
      getList(){
        this.$http.get('/bill-library-carts').then(r=>{
          if(r.status=='success'){
            this.setCarts(r.data.count)
          }
        })
      },
      ...mapMutations({
        'setCarts':'SET_CARTS'
      })
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .car{
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: #65d0ab;
    line-height: 88px;
    font-size: 48px;
    color: #fff;
    span{
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
