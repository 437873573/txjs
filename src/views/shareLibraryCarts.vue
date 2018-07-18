<template>
  <Scroll :data="data" class="wrapper">
    <ul class="book-list">
      <li class="item" v-for="item in data">
        <div class="img">
          <img v-lazy="item.options.images_large">
        </div>
        <div class="text">
          <h4 v-html="item.name"></h4>
          <h5 v-html="item.options.author"></h5>
          <p v-html="item.options.summary"></p>
        </div>
        <div class="del" @click="delBook(item.rowId)">
          <i class="icon-tabbar_icon_del_selected"></i>
        </div>
      </li>
    </ul>
    <footer @click="borrow">立即借阅</footer>
    <Confirm ref="confirm" :canShow="false" :confirmBtnText="text">
      <div id="text" v-html="message"></div>
    </Confirm>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'

  export default {
    name: "book-carts",
    components: {Scroll},
    data() {
      return {
        data: [],
        text:'确定',
        message:''
      }
    },
    methods: {
      getList() {
        this.data=[]
        this.$http.get('/bill-library-carts').then(r => {
          if (r.status === 'success') {
            for (let i in r.data.carts) {
              this.data.push(r.data.carts[i]);
            }
          }
        })
      },
      delBook(id) {
        this.$http.delete('bill-library-cart', {params: {rowId: id}}).then(r => {
          if (r.status === 'success') {
            let index = this.data.findIndex(v => {
              return v.rowId === id
            });
            this.data.splice(index, 1);
            // console.log(index,this.data);
            let num = this.$store.state.carts;
            this.$store.commit('SET_CARTS', num - 1);
            if (!this.data.length) {
              this.$router.back()
            }
          }
        })
      },
      borrow() {
        let arr = [];
        this.data.forEach(v => {
          arr.push(v.rowId)
        });
        this.$http.post('/bill-library/store', {row_ids: arr}).then(r => {
          if (r.status === 'success') {
            this.$router.replace({path:`/libProof/${r.data.id}`});
            this.$store.commit('SET_CARTS', 0)
          }else{
            this.message=r.data;
            this.$refs.confirm.show()
          }
        })

      }
    },
    activated() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .wrapper {
    @extend %cover;
    z-index: 5;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 98px;
    line-height: 98px;
    font-size: $font-size-large-x;
    color: #fff;
    background: $color-theme;
  }

  .book-list .item {
    margin: 20px 0;
    padding: 12px 24px;
    height: 240px;
    box-sizing: border-box;
    background: #fff;
    @extend %start;
    align-items: stretch;
    &:first-of-type {
      margin-top: 0;
    }
    .img {
      width: 160px;
      height: 100%;
      flex: none;
    }
    .text {
      flex: none;
      width: 440px;
      margin: 0 24px;
      @extend %around;
      padding: 10px 0;
      box-sizing: border-box;
      align-items: flex-start;
      flex-direction: column;
      text-align: left;
      h4 {
        width: 100%;
        flex: none;
        font-size: $font-size-large-x;
        color: $color-text-d;
        font-weight: bold;
        @include no-wrap;
      }
      h5 {
        max-width: 360px;
        color: $color-text-l;
        font-size: $font-size-medium;
        @extend %start;
        @include no-wrap;
        span {
          flex: none;
          display: block;
          width: 124px;
          height: 36px;
          border: 1px solid $color-theme;
          border-radius: 5px;
          margin-left: 20px;
          color: $color-theme;
        }
      }
      p {
        align-self: stretch;
        height: 68px;
        flex: none;
        font-size: $font-size-medium;
        @include no-wrap-multi(2);
      }
    }
    .del {
      width: 86px;
      flex: 1;
      @extend %center;
      i {
        font-size: 36px;
      }
    }
  }
</style>
