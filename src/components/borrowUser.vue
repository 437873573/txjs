<template>
  <div class="borrow-user">
    <BookDetail :data="data" v-show="showDetail">
      <footer slot="footer">
        <div class="mark">
          <i :class="getFavoriteCls(book)" @click="toggleFavoriteCls(book)"></i>
          收藏
        </div>
        <div class="borrow" @click="borrow" :class="data.user&&data.user.length?'':'not'">
          {{data.user&&data.user.length?'立即借阅':'已被借出'}}
        </div>
      </footer>
    </BookDetail>
    <Confirm :head="head" ref="confirm" @confirm="toOrder">
      <Scroll :scrollX="scrollX" :scrollY="scrollY" :data="data.user" class="user-content" v-show="data.user">
        <ul class="user-lists" ref="userLists">
          <li v-for="(v,i) in data.user" :key="v.origin_id" @click="oid=v.origin_id">
            <div class="img">
              <img v-lazy="v.user.avatar">
              <i :class="oid==v.origin_id?'select':'default'"></i>
            </div>
            <h5 v-html="v.user.nickname"></h5>
          </li>
        </ul>
      </Scroll>
    </Confirm>
    <Confirm :head="head2" ref="confirm2" :canShow="false" :confirmBtnText="confirmBtnText" @confirm="noUser">
      <div id="text" v-html="message"></div>
    </Confirm>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {collect} from 'common/js/collect'
  import BookDetail from 'base/bookDetail'
  import Scroll from 'base/scroll'

  export default {
    name: "borrow-user",
    components: {BookDetail, Scroll},
    mixins: [collect],
    computed: {
      ...mapGetters([
        'showDetail',
        'book',
      ])
    },
    data() {
      return {
        head: '请选择书籍拥有者',
        head2:'提示',
        message:'',
        confirmBtnText:'确定',
        scrollX: true,
        scrollY: false,
        oid: 0
      }
    },
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    methods: {
      borrow() {
        if (this.data.user.length) {
          this.$refs.userLists.style.width = 168 * this.data.user.length / 7.5 + 'vw'
          this.$refs.confirm.show()
        }
      },
      toOrder() {
        this.$http.post('/bill/share-store', {user_book_id: this.oid}).then(r => {
          if (r.status == 'success') {
            this.$router.push({path: '/order', query: {id: r.data.id}})
          }else {
            this.message=r.mess
            this.$refs.confirm2.show()
          }
        })
      },
      noUser(){
        this.data.user=[]
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .borrow-user {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background: $color-background;
  }

  footer {
    .mark {
      width: 250px;
      @extend %between;
      flex-direction: column;
      padding: 10px 0;
      box-sizing: border-box;
      font-size: $font-size-small-x;
      background: #fff;
      color: $color-theme;
      i {
        font-size: 48px;
      }
    }
    .borrow {
      width: 500px;
      line-height: 98px;
      box-sizing: border-box;
      background: $color-theme;
      font-size: $font-size-large-x;
      color: $color-text-ll;
      &.not {
        background: $color-background-d;
        color: $color-text;
        box-sizing: border-box;
        border-left: 1px solid $color-border;
      }
    }
  }

  .user-content {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .user-lists {
    padding-top: 8px;
    @extend %start;
    li {
      width: 120px;
      margin: 0 24px;
      @extend %center;
      flex-direction: column;
      .img {
        position: relative;
        width: 84px;
        height: 84px;
        img {
          @extend %middleCenter;
          border-radius: 50%;
        }
        i {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 24px;
          height: 24px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          &.default {
            background-image: url("../common/img/default.png");
          }
          &.select {
            background-image: url("../common/img/select.png");
          }
        }
      }
      h5 {
        @include no-wrap;
        margin: 6px 0;
        font-size: $font-size-small-x;
      }
    }
  }
  #text {
    padding: 20px 40px 40px;
    text-align: left;
    font-size: $font-size-medium-x;
    color: $color-text-l;
  }
</style>
