<template>
  <Scroll class="my-book-content">
    <ul>
      <li class="item" v-for="v in lists" :key="v.id" @click="selectItem(v.id)">
        <div class="img">
          <img v-lazy="v.book.images_large">
        </div>
        <div class="text">
          <h2 v-html="v.book.title"></h2>
          <h4 v-html="v.book.author"></h4>
          <h3 class="borrow" v-show="v.type=='BORROW'">所有者：{{v.book_user.realname}}</h3>
          <h3 class="lend" v-show="v.type=='LEND'">申请人：{{v.user.realname}}</h3>
          <div class="btns" v-if="v.type=='BORROW'">
            <div class="btn disabled" v-if="v.status!='AGREE'">取消申请</div>
            <div class="btn" v-else-if="v.status=='AGREE'">书已拿到</div>
            <div class="btn disabled" v-else-if="v.status=='READING'">等待归还</div>
          </div>
          <div class="btns" v-else-if="v.type=='LEND'">
            <div class="btn" v-if="v.status!='APPLYING'">书已归还</div>
            <div class="btn" v-else-if="v.status=='APPLYING'">同意申请</div>
            <div class="btn disabled" v-else-if="v.status=='APPLYING'">拒绝申请</div>
          </div>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'

  export default {
    name: "borrowed",
    components: {Scroll, Loading, NoResult},
    props: {
      data: {
        type: Array,
        default: []
      },
      i: {
        type: Number,
        default: 0
      }
    },
    computed: {
      lists() {
        let list = this.data.filter(v => {
          if (this.i == 2) {
            return v.type == 'LEND'
          } else if (this.i == 3) {
            return v.type == 'BORROW'
          }
        });
        return list
      }
    },
    methods: {
      selectItem(id) {
        this.$router.push({path: '/order', query: {id: id}})
      },
      update(id,status) {
        this.$http.post('/bill/share-update', {id:id, status: status}).then(r => {
          if (r.status == 'success') {

          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .item {
    height: 240px;
    margin-bottom: 18px;
    padding: 12px 24px;
    box-sizing: border-box;
    background: #fff;
    @extend %between;
    .img {
      flex: none;
      width: 160px;
      height: 100%;
    }
    .text {
      flex: 1;
      align-self: stretch;
      padding: 28px 0 0 24px;
      box-sizing: border-box;
      @extend %between;
      flex-direction: column;
      h2 {
        width: 520px;
        font-size: $font-size-large-x;
        color: $color-text-d;
        text-align: left;
        @include no-wrap
      }
      h3 {
        width: 520px;
        font-size: $font-size-medium-x;
        color: $color-theme;
        text-align: left;
        @include no-wrap;
        &.lend {
          color: rgb(101, 208, 171);
        }
      }
      h4 {
        width: 520px;
        font-size: $font-size-medium;
        color: $color-text-l;
        text-align: left;
        @include no-wrap
      }
    }
    .btns {
      align-self: flex-end;
      height: 90px;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: flex-end;
      .btn {
        height: 60px;
        margin-left: 24px;
        line-height: 60px;
        font-size: $font-size-medium;
      }
    }
  }
</style>
