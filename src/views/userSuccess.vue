<template>
  <div class="success">
    <header>
      <h6>{{time}}</h6>
      <h5>{{list.length}}</h5>
      <span>我已阅读</span>
    </header>
    <Scroll class="wrapper" :data="list" :scrollX="true" :scrollY="false">
      <ul class="list" ref="list">
        <li class="item" v-for="v in list">
          <div class="img">
            <img v-lazy="v.images_large">
          </div>
          <p>{{v.title}}</p>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
  let date = new Date();
  import {share} from "../common/js/share";
  import Scroll from 'base/scroll'

  export default {
    name: "user-success",
    mixins: [share],
    components: {Scroll},
    data() {
      return {
        time: date.getFullYear() + '年' + (date.getMonth() + 1) + '月',
        data: []
      }
    },
    computed: {
      list() {
        return this.data
      }
    },
    methods: {
      _share() {
        let that = this;
        this.$refs.list.style.width = this.list.length * 85 + 24 + 'px'
        let n = this.list.length < 99 ? this.data.length : 99;
        let title = '用同学借书，这个月我看了' + n + '本书，每一的书都是人生的通关密码';
        let desc = '被称为时代先驱的人，阅读量都不少。我用同学借书每月读好几本书，每一次的阅读，都是在发掘知识，提升自我';
        let img = `/image/share/share-${n}.png`;
        that.share({
          title:title,
          img:img,
          desc:desc,
        })
      }
    },
    mounted() {
      let n = 0, that = this;
      this.$http.get('/bill-share/index', {
        params: {
          type: 'month'
        }
      }).then(r => {
        if (r.status === 'success') {
          let arr = r.data.borrowUserBooks.filter(v => {
            return v.status == 'FINISHED' && v.type == 'BORROW'
          });
          let brr = arr.map(v => {
            return v.book
          });
          this.data = this.data.concat(brr)
          aa()
        }
      });
      this.$http.get('/bill-library/index', {
        params: {
          type: 'month'
        }
      }).then(r => {
        if (r.status === 'success') {
          let arr = []
          r.data.forEach(i => {
            i.borrow_library_book_item.forEach(j => {
              arr.push(j.library_book.book)
            })
          });
          this.data = this.data.concat(arr)
          aa()
        }
      });
      this.$http.get('/bill-mechanism/index', {
        params: {
          type: 'month'
        }
      }).then(r => {
        if (r.status === 'success') {
          let arr = []
          r.data.forEach(i => {
            i.borrow_mechanism_book_item.forEach(j => {
              arr.push(j.mechanism_book.book)
            })
          });
          this.data = this.data.concat(arr);
          aa()
        }
      });

      function aa() {
        n++;
        if (n === 3) {
          that._share()
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .success {
    @extend %cover;
    z-index: 3;
  }

  header {
    height: 480px;
    @extend %between;
    flex-direction: column;
    padding: 30px 0 40px;
    box-sizing: border-box;
    color: #fff;
    margin-bottom: 20px;
    background: url("../common/img/success.png") no-repeat center/cover;
    h6 {
      font-size: 36px;
    }
    h5 {
      font-size: 108px;
      margin-bottom: 30px;
    }
    span {
      font-size: 32px;
    }
  }

  .wrapper {
    background: #fff;
  }

  .list {
    @extend %start;
    .item {
      padding: 24px 0;
      flex: none;
      width: 146px;
      margin-left: 24px;
      @extend %center;
      flex-direction: column;
      .img {
        width: 142px;
        height: 200px;
        margin-bottom: 12px;
      }
      p {
        width: 100%;
        height: 80px;
        text-align: justify;
        @include no-wrap-multi(2)
      }
    }
  }

</style>
