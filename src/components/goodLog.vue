<template>
  <Scroll class="user-bill-content">
    <ul class="logList">
      <li class="item" v-for="v in lists" :key="v.id">
        <ul class="goods">
          <li v-for="i in v.order_item">
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
        <p class="total">共{{v.all_number}}件商品 合计：￥ {{v.total_price}}</p>
        <footer>
          <div v-if="v.status==0" class="btn o sub" @click="cancelOrder(v.id)">取消订单</div>
          <div v-if="v.status==0" class="btn o" @click="buy(v.id)">立即付款</div>
          <div v-if="v.status==1" class="btn o sub" @click="refund(v.id)">申请退款</div>
          <div v-if="v.status==2" class="btn o sub" @click="toLog(v.id)">查看物流</div>
          <div v-if="v.status==2" class="btn o" @click="confirm(v.id)">确认收货</div>
          <div v-if="v.status==3" class="btn disabled">已收货</div>
        </footer>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'
  import {buy} from "../common/js/buy";

  export default {
    name: "good-log",
    components: {Scroll, Loading, NoResult},
    mixins:[buy],
    computed:{
      lists() {
        return this.data.filter(v => {
          return v.status===this.i
        });
      }
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      i: {
        type: Number,
        default: 0
      }
    },
    methods: {
      cancelOrder(id) {
        this._status(id,4)
      },
      toLog(id){
        this.$router.push({path:'/mall/log',query:{id:id}})
      },
      confirm(id){
        this._status(id,3)
      },
      refund(id){
        this.$router.push({path:'/mall/return',query:{id:id}})
      },
      _status(id,status){
        this.$http.patch(`/orders/${id}`, {
          status: status
        }).then(r => {
          if (r.status === 'success') {
            let index=this.lists.findIndex(v=>{
              return v.id===id
            });
            this.lists[index].status=status
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .item {
    margin-bottom: 20px;
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

  .total {
    height: 64px;
    line-height: 64px;
    text-align: right;
    padding: 0 24px;
    background: #fff svg(b-border);
  }

  footer {
    padding-right: 20px;
    height: 88px;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      box-sizing: border-box;
      height: 64px;
      line-height: 64px;
      margin-left: 20px;
      &.sub{
        background: #fff;
        border-color: #999;
        color: #999;
      }
    }
  }
</style>
