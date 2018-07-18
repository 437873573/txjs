<template>
  <Scroll class="wrapper" :data="data">
    <ul class="book-list">
      <li class="item" v-for="v in data" :key="v.id" @click="selectItem(v.id)">
        <div class="img">
          <img v-lazy="v.image">
        </div>
        <div class="text">
          <h4>{{v.name}}</h4>
          <h5>￥ {{v.shop_price}}</h5>
          <p><span>已售 {{v.sale_num+v.tips}}</span><span>{{v.express_free_total?`满${v.express_free_total}包邮`:'免邮'}}</span></p>
        </div>
      </li>
    </ul>
    <!-- loading 组件 -->
    <div class="loading-container" v-show="!show">
      <Loading></Loading>
    </div>
    <!-- noResult 组件 -->
    <div class="noResult-container" v-show="show&&!data.length">
      <NoResult :title="title"></NoResult>
    </div>
    <BillCar class="billCar" ref="billCar"></BillCar>
  </Scroll>
</template>

<script>
  import BillCar from 'base/billCar'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'
  import Scroll from 'base/scroll'

  export default {
    name: "mall-list",
    components: {Scroll,Loading,NoResult,BillCar},
    data(){
      return{
        title:'暂无图书',
        show:false,
        data:[]
      }
    },
    methods:{
      selectItem(id){
        this.$router.push({name: 'mallBook',params:{id:id}})
      }
    },
    activated(){
      this.show=false;
      this.data=[];
      let that=this;
      let type=[this.$route.query.type];
      let id=this.$route.query.id;
      this.$http.get('/goods',{params:{
        type:type,
        cat_id:id
        }}).then(r=>{
          if(r.status=='success'){
            that.show=true;
            that.data=r.data.goods.data
          }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .billCar{
    position: fixed;
    bottom: 128px;
    right: 30px;
    z-index: 10;
  }
  .wrapper{
    @extend %cover;
    z-index: 3;
  }
  .item {
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    @extend %start;
    background: #fff;
    .img {
      flex: none;
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }
    .text {
      height: 200px;
      flex-grow: 1;
      @extend %between;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      h4 {
        font-size: $font-size-large-x;
        color: $color-text-d;
        line-height: 1.5;
        @include no-wrap-multi(2)
      }
      h5 {
        font-size: 36px;
        color: #FF2D2D;
      }
      p {
        width: 100%;
        @extend %between;
        font-size: $font-size-medium;
        color: #777;
      }
    }
  }
  .loading-container ,.noResult-container{
    @extend %middle;
  }
</style>
