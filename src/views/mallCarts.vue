<template>
  <div class="mall-carts">
    <scroll class="wrapper" :data="goodsList">
      <ul>
        <li class="item" v-for="(good,index) in goodsList">
          <div class="left" v-if="good.select===false" @click="good.select=!good.select">
            <i class="icon-tabbar_icon_choice_default"></i>
          </div>
          <div class="left" v-else-if="good.select===true" @click="good.select=!good.select">
            <i class="icon-tabbar_icon_choice_selected"></i>
          </div>
          <div class="right">
            <div class="img">
              <img v-lazy="good.options.image">
            </div>
            <div class="text">
              <p>{{good.name}}</p>
              <div class="num">
                <span>￥ {{good.price}}</span>
                <div class="setting">
                  <a class="button" @click="good.qty>1?good.qty--:''">-</a>
                  <input type="text" class="number" v-model="good.qty">
                  <a class="button" @click="good.qty++">+</a>
                </div>
              </div>
              <div class="del" @click="deleteOne(index)">
                <i class="icon-search_icon_delete"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- loading 组件 -->
      <div class="loading-container" v-show="!show">
        <Loading></Loading>
      </div>
      <!-- noResult 组件 -->
      <div class="noResult-container" v-show="show&&!goodsList.length">
        <NoResult :title="title"></NoResult>
      </div>
    </scroll>
    <footer>
      <div class="left" v-if="isSelectAll===false" @click="selectAll(),select=!select">
        <i class="icon-tabbar_icon_choice_default"></i>全选
      </div>
      <div class="left" v-else-if="isSelectAll===true" @click="selectNone(),select=!select">
        <i class="icon-tabbar_icon_choice_selected"></i>全选
      </div>
      <div class="middle">
        <h6>不含运费</h6>
        <p><span>总计：</span>￥ {{getTotal.totalPrice}}</p>
      </div>
      <div class="right" @click="count">
        结算
      </div>
    </footer>
  </div>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'

  export default {
    name: "mall-carts",
    components: {Scroll, Loading, NoResult},
    computed: {
      isSelectAll: function () {
        //如果每一条数据的select都为true，返回true，否则返回false;
        return this.goodsList.every(function (val) {
          return val.select
        });
      },
      getTotal: function () {
        //获取goodsList中select为true的数据。
        var _proList = this.goodsList.filter(function (val) {
          return val.select
        }), totalPrice = 0;
        for (var i = 0, len = _proList.length; i < len; i++) {
          //总价累加
          totalPrice += _proList[i].qty * _proList[i].price;
        }
        //选择产品的件数就是_proList.length，总价就是totalPrice
        return {totalNum: _proList.length, totalPrice: totalPrice}
      },

    },
    data() {
      return {
        show: false,
        title: '购物车空空如也',
        select: false,
        goodsList: []
      }
    },
    methods: {
      count() {
        let arr=this.goodsList.filter(v=>{
          return v.select===true
        });
        this.$store.commit('SET_GOOD_LIST',arr);
        this.$router.replace({path: '/mall/bill'})
      },
      selectAll: function () {
        for (let i = 0; i < this.goodsList.length; i++) {
          this.goodsList[i].select = true;
        }
      },
      selectNone: function () {
        for (let i = 0; i < this.goodsList.length; i++) {
          this.goodsList[i].select = false;
        }
      },
      deleteOne: function (index) {
        //选中之后删除
        //this.goodsList=this.goodsList.filter(function (item) {return !item.select});
        //点击删除按钮后直接删除
        this.goodsList.splice(index, 1);
      },
      deleteGoods: function () {
        this.goodsList = this.goodsList.filter(function (item) {
          return !item.select
        });
      },
    },
    beforeRouteLeave(to, from, next) {
      let carts = this.goodsList.map(v => {
        return {id: v.id, num: v.qty}
      });
      this.$http.post('/good-carts', {carts: carts}).then(r => {
        if (r.status === 'success') {
          this.$http.get('/good-carts').then(r => {
            if (r.status === 'success') {
              this.$store.commit('SET_BILL', r.data.count)
            }
          })
        }
      });
      next()
    },
    activated() {
      let id=this.$route.query.id;
      this.show = false;
      this.goodsList = [];
      let _this = this;
      this.$http.get('/good-carts').then(r => {
        if (r.status === 'success') {
          _this.show = true;
          for (let i in r.data.carts) {
            _this.goodsList.push(r.data.carts[i]);
          }
          _this.goodsList.map(function (goods) {
            if(goods.id==id){
              _this.$set(goods, 'select', true);
            }else{
              _this.$set(goods, 'select', false);
            }
          });
        }
      });
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .mall-carts {
    @extend %cover;
    z-index: 3;
  }

  .loading-container, .noResult-container {
    @extend %middle;
  }

  .wrapper {
    position: absolute;
    top: 0;
    bottom: 98px;
    width: 100%;
  }

  .item {
    background: #fff;
    height: 240px;
    margin-bottom: 20px;
    padding: 20px;
    padding-left: 0;
    box-sizing: border-box;
    @extend %between;
    align-items: stretch;
    .left {
      width: 80px;
      flex: none;
      @extend %center;
      i {
        font-size: 36px;
      }
    }
    .right {
      flex-grow: 1;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        p {
          width: 100%;
          text-align: left;
          color: $color-text-d;
          @include no-wrap-multi(2);
        }
        .num {
          width: 100%;
          @extend %between;
          span {
            font-size: 36px;
            color: #FF2D2D;
          }
          .setting {
            @extend %center;
            border: 1px solid #65d0ab;
            .button {
              width: 54px;
              height: 48px;
              background: #68d0ab;
              font-size: 36px;
              line-height: 48px;
              color: #fff;
              text-align: center;
            }
            input {
              width: 72px;
              height: 48px;
              display: block;
              text-align: center;
            }
          }
        }
        .del {
          @extend %start;
          width: 100%;
          font-size: 32px;
          color: #999;
          flex-direction: row-reverse;
        }
      }
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    height: 98px;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    .left {
      padding-left: 24px;
      line-height: 98px;
      @extend %center;
      i {
        font-size: 36px;
        margin-right: 12px;
      }
    }
    .middle {
      flex-grow: 1;
      padding-right: 24px;
      @extend %start;
      justify-content: flex-end;
      h6 {
        font-size: $font-size-medium;
        color: #999;
        margin-right: 12px;
      }
      p {
        color: #ff2d2d;
        span {
          color: #333;
        }
      }
    }
    .right {
      width: 240px;
      flex: none;
      font-size: 32px;
      color: #fff;
      background: #38a7ff;
      line-height: 98px;
    }
  }
</style>
