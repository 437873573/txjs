<template>
  <div class="orderList">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
    <Scroll class="orderList-content">
      <ul>
        <li class="item" v-for="v in lists" :key="v.id" @click="selectItem(v.id)">
          <img v-lazy="v.book.images_large">
          <div class="text">
            <h2 v-html="v.book.title"></h2>
            <h4 v-html="v.book.author"></h4>
            <h3>借出人：{{v.book_user.nickname}}</h3>
            <h3>申请人：{{v.user.nickname}}</h3>
          </div>
          <template>
            <div class="type" v-if="v.type=='BORROW'">借入</div>
            <div class="type lend" v-else-if="v.type=='LEND'">借出</div>
          </template>
          <template>
            <div class="status" v-if="v.status=='APPLYING'">申请中</div>
            <div class="status done" v-else-if="v.status=='REJECT'">已拒绝</div>
            <div class="status done" v-else-if="v.status=='CANCEL'">已取消</div>
            <div class="status done" v-else-if="v.status=='FINISHED'">已归还</div>
            <div class="status" v-else>阅读中</div>
          </template>
        </li>
      </ul>
    </Scroll>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  import Switches from 'base/switches'
  import Scroll from 'base/scroll'

  export default {
    name: "share",
    components: {Switches, Scroll},
    data() {
      return {
        switches: [
          {name: '全部'},
          {name: '申请中'},
          {name: '借阅中'},
          {name: '借阅历史'}
        ],
        currentIndex: 0,
        data: []
      }
    },
    computed: {
      lists() {
        let list = this.data.filter(v => {
          if (this.currentIndex == '1') {
            return v.status == 'APPLYING'
          } else if (this.currentIndex == '2') {
            return v.status == 'READING'
          } else if (this.currentIndex == '3') {
            return v.status == 'FINISHED' || v.status == 'REJECT' || v.status == 'CANCEL'
          } else {
            return v
          }
        })
        return list
      }
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
      },
      selectItem(id) {
        this.$router.push({path: '/order', query: {id: id}})
      }
    },
    activated() {
      this.$http.get('/bill/index').then(r => {
        if (r.status == 'success') {
          this.data = r.data.borrowUserBooks
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .orderList-content {
    position: fixed;
    top: 89px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
  }

  .item {
    position: relative;
    width: 100%;
    height: 240px;
    background: $color-background-h;
    padding: 12px 24px;
    box-sizing: border-box;
    margin-bottom: 18px;
    @extend %start;
    img {
      flex: none;
      width: 160px;
      height: 216px;
    }
    .text {
      text-align: left;
      padding: 20px 24px;
      box-sizing: border-box;
      @extend %between;
      align-items: flex-start;
      flex-direction: column;
      h2 {
        width: 440px;
        font-size: $font-size-large-x;
        color: $color-text-d;
        @include no-wrap
      }
      h3 {
        font-size: $font-size-medium-x;
        color: $color-text-l;
        @include no-wrap
      }
      h4 {
        font-size: $font-size-medium;
        color: $color-text;
        @include no-wrap
      }
    }
    .type {
      position: absolute;
      top: 40px;
      right: 24px;
      width: 54px;
      height: 32px;
      line-height: 32px;
      font-size: $font-size-small;
      color: $color-text-ll;
      background: rgb(101, 208, 171);
      border-radius: 5px;
      &.lend {
        background: rgb(56, 167, 255);
      }
    }
    .status {
      position: absolute;
      right: 0;
      bottom: 24px;
      width: 120px;
      height: 60px;
      line-height: 60px;
      font-size: $font-size-medium;
      color: $color-text-ll;
      background: rgb(255, 169, 76);
      &.done {
        background: $color-background-d;
        color: $color-text-d;
      }
    }
  }
</style>
