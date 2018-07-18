<template>
  <div class="return">
    <header>
      <span>退款说明：</span>
      <input type="text" placeholder="请输入原因" v-model="reason">
    </header>
    <scroll class="wrapper">
      <div class="item">
        <p class="total">退款金额：<span>￥ {{order.total_price}}</span></p>
        <ul class="goods">
          <li v-for="i in order.order_item">
            <div class="img">
              <img v-lazy="i.goods_image">
            </div>
            <div class="text">
              <p>{{i.goods_name}}</p>
              <div class="num">
                <span>￥ {{i.price}}</span>
                <span>× {{i.num}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    <footer @click="refund(order.id)">提交申请</footer>
  </div>
</template>

<script>
  import Scroll from 'base/scroll'
  import {mapGetters} from 'vuex'

  export default {
    name: "mall-return",
    components: {Scroll},
    computed: {
      ...mapGetters(['orderList']),
    },
    data() {
      return {
        reason: '',
        order: {}
      }
    },
    methods:{
      refund(id){
        this.$http.post('/refunds',{
          order_id:id,
          remark:this.reason
        }).then(r=>{
          if(r.status==='success'){
            this.$router.replace({path:'/user/bill',query:{i:4}})
          }
        })
      }
    },
    activated() {
      let id = this.$route.query.id;
      if(!this.orderList.length){
        this.$router.replace({path:'/mall'})
      }
      if (id) {
        this.order = {};
        this.order = this.orderList.find(v => {
          return v.id === id
        })
      } else {
        this.$router.replace({path:'/mall'})
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .return {
    @extend %cover;
    z-index: 3;
  }

  header {
    height: 88px;
    background: #fff;
    @extend %between;
    padding: 20px 24px;
    box-sizing: border-box;
    margin-bottom: 20px;
    span {
      width: 140px;
      flex: none;
    }
    input {
      flex-grow: 1;
      -webkit-appearance: none;
      &::placeholder {
        color: #999;
      }
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98px;
    background: #65d0ab;
    color: #fff;
    line-height: 98px;
    font-size: 32px;
  }

  .wrapper {
    position: absolute;
    top: 108px;
    bottom: 98px;
    width: 100%;
  }

  .total {
    height: 88px;
    line-height: 88px;
    text-align: right;
    padding: 0 24px;
    background: #fff svg(b-border);
    span {
      color: #ff2d2d;
    }
  }

  .goods li {
    height: 240px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid $color-border;
    border-image: svg(b-border) 1;
    @extend %start;
    align-items: stretch;
    .img {
      flex: none;
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }
    .text {
      flex-grow: 1;
      @extend %between;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      p {
        width: 100%;
        font-size: $font-size-large-x;
        color: $color-text-d;
        @include no-wrap-multi(2)
      }
      .num {
        width: 100%;
        @extend %between;
        span:first-of-type {
          font-size: 36px;
          color: #ff2d2d;
        }
        span:last-of-type {
          color: #333;
        }
      }
    }
  }
</style>
