<template>
  <div class="mallBook">
    <Scroll class="wrapper" ref="scroll">
      <div class="inner">
        <header>
          <BookSlider :loop="book.sowing_image.length>1?true:false" :showDot="book.sowing_image.length>1?true:false">
            <div class="img" v-for="banner in book.sowing_image">
              <img :src="banner" @load="loadImg">
            </div>
          </BookSlider>
          <div class="text">
            <h4>{{book.name}}</h4>
            <h5>￥ {{book.shop_price}}</h5>
            <p><span>已售 {{book.sale_num+book.tips}}</span><span>{{book.express_free_total?`满${book.express_free_total}包邮`:'免邮'}}</span></p>
          </div>
        </header>
        <div class="detail">
          <h6>书籍详情</h6>
          <ul>
            <li class="img" v-for="i in book.master_image">
              <img v-lazy="i">
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <footer>
      <div @click="addCar">加入购物车</div>
      <div @click="buy">立即购买</div>
    </footer>
    <BillCar class="billCar" ref="billCar"></BillCar>
    <Confirm ref="confirm" :confirmBtnText="text" :canShow="false">
      <div id="text" v-html="message"></div>
    </Confirm>
    <TopTip ref="top">已加入购物车</TopTip>
  </div>
</template>

<script>
  import TopTip from 'base/topTip'
  import Scroll from 'base/scroll'
  import BookSlider from 'base/bookSlider'
  import BillCar from 'base/billCar'

  export default {
    name: "mall-book",
    components: {Scroll, BookSlider, BillCar,TopTip},
    data() {
      return {
        message: '',
        text: '确定',
        book: {},
      }
    },
    methods: {
      addCar() {
        let id = this.$route.params.id;
        this.$http.post('/good-cart', {id: id}).then(r => {
          if (r.status === 'success') {
            this.$refs.billCar.getList();
            this.$refs.top.show()
          } else {
            this.message = r.mess;
            this.$refs.confirm.show()
          }
        })
      },
      buy() {
        let id = this.$route.params.id;
        this.$http.post('/good-cart', {id: id}).then(r => {
          if (r.status === 'success') {
            this.$refs.billCar.getList();
            this.$router.push({path: '/mall/carts',query:{id:id}})
          } else {
            this.message = r.mess;
            this.$refs.confirm.show()
          }
        })
      },
      loadImg() {
        if (!this.flag) {
          this.$refs.scroll.refresh();
          this.flag = true
        }
      },
    },
    activated() {
      this.book={};
      let id = this.$route.params.id;
      this.$http.get(`/goods/${id}`).then(r => {
        if (r.status === 'success') {
          this.book = r.data.good
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .mallBook {
    @extend %cover;
    z-index: 3;
  }
  .top{
    color: #fff;
  }
  .billCar {
    position: fixed;
    bottom: 128px;
    right: 30px;
    z-index: 10;
  }

  .wrapper {
    position: absolute;
    top: 0;
    bottom: 98px;
    width: 100%;
    overflow: hidden;
  }

  footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 98px;
    @extend %between;
    div {
      height: 100%;
      flex: 1;
      line-height: 98px;
      color: #fff;
      font-size: $font-size-large-x;
      &:first-of-type {
        background: #65d0ab;
      }
      &:last-of-type {
        background: $color-theme;
      }
    }
  }

  .img {
    width: 750px;
  }

  .text {
    height: 188px;
    padding: 20px 24px;
    background: #fff;
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

  .detail {
    margin-top: 20px;
    h6 {
      line-height: 70px;
      background: #fff;
      font-size: $font-size-large-x;
      color: $color-text-d;
    }
  }
</style>
