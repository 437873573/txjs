<template>
  <Scroll class="user-bill-content">
    <ul class="logList">
      <li class="item" v-for="v in data" :key="v.id">
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
          <div v-if="v.status==5" class="ret">申请审核中...</div>
          <div v-if="v.status==6" class="ret">已同意</div>
          <div v-if="v.status==13" class="ret">已拒绝</div>
        </footer>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'

  export default {
    name: "good-log",
    components: {Scroll, Loading, NoResult},
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
    .ret {
      text-align: right;
      padding-right: 24px;
      color: #333;
    }
  }
</style>
