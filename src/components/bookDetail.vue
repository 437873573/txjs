<template>
  <transition name="slide">
    <div class="book-detail" v-show="showDetail">
      <header>
        <img v-lazy="data.images_large">
        <article>
          <h2 v-html="data.title"></h2>
          <h3 v-html="data.author"></h3>
          <h4>出版社: {{data.publisher}}</h4>
          <h4>出版时间: {{data.pubdate}}</h4>
          <h4>ISBN: {{data.isbn}}</h4>
          <p><span>荐</span></p>
        </article>
      </header>
      <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
      <template>
        <section class="detail" v-if="currentIndex==0">
          <Scroll class="detail-content" :data="[data.summary]">
            <p v-html="data.summary"></p>
          </Scroll>
          <footer>
            <div class="mark">
              <i class="icon-tabbar_icon_collect_default"></i>
              收藏
            </div>
            <div class="borrow" @click="borrow">立即借阅</div>
          </footer>
        </section>
        <section class="comment" v-else-if="currentIndex==1">
          <Scroll class="comment-content" :data="data.review">
            <ul class="comment-lists">
              <li class="item" v-for="(v,i) in data.review" :key="i">
                <div class="item-left">
                  <img v-lazy="v.user.avatar">
                </div>
                <div class="item-right">
                  <h3 v-html="v.user.nickname"></h3>
                  <p v-html="v.content"></p>
                  <h5 v-html="v.time"></h5>
                </div>
              </li>
            </ul>
          </Scroll>
          <footer>
            <input type="text" class="text" placeholder="我也来说两句" ref="text">
            <div class="btn s" @click="sub">提交</div>
          </footer>
        </section>
        <Confirm :head="head" ref="confirm" @confirm="toOrder">
          <template>
            <Scroll :scrollX="scrollX" :scrollY="scrollY" :data="data.user" class="user-content">
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
          </template>

        </Confirm>
      </template>
    </div>
  </transition>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import Switches from 'base/switches'
  import Scroll from 'base/scroll'

  export default {
    name: "book-detail",
    components: {Switches, Scroll},
    data() {
      return {
        switches: [{name: '内容详情'}, {name: '书籍评论'}],
        currentIndex: 0,
        data: {},
        head: '请选择书籍拥有者',
        scrollX: true,
        scrollY: false,
        oid: 0
      }
    },
    computed: {
      ...mapGetters([
        'showDetail',
        'book',
        'favoriteList'
      ])
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
      },
      borrow() {
        this.$refs.userLists.style.width = 168 * this.data.user.length / 7.5 + 'vw'
        this.$refs.confirm.show()
      },
      toOrder() {
        this.$http.post('/borrow/share-store',{user_book_id:this.oid}).then(r=>{
          if(r.status=='success'){
            // this.$router.push({path: '/order',params:{id:r.data.id,name:r.data.realname}})
          }
        })
      },
      sub() {
        this.$refs.text.blur()
      }
    },
    mounted() {
      this.$http.get('/book/show', {
        params: {
          id: this.book.id,
          origin: this.book.origin
        }
      }).then(r => {
        if (r.status == 'success') {
          this.data = r.data.books
        }

      }).catch(e => console.log(e))
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .book-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background: $color-background;
    header {
      height: 318px;
      margin-bottom: 18px;
      padding: 24px;
      box-sizing: border-box;
      background: $color-background-h;
      @extend %start;
      align-items: stretch;
      img {
        height: 100%;
        width: 200px;
        margin-right: 24px;
      }
      article {
        text-align: left;
        padding-top: 10px;
        font-size: $font-size-small-x;
        color: $color-text-l;
        @extend %between;
        flex-direction: column;
        align-items: flex-start;
        h2 {
          font-size: $font-size-large-x;
          color: $color-text-d;
          @include no-wrap
        }
        h3 {
          font-size: $font-size-medium;
          @include no-wrap
        }
        h4 {
          @include no-wrap
        }
        p span {
          margin-right: 12px;
          display: inline-block;
          /*padding: 5px;*/
          border-radius: 5px;
          width: 32px;
          height: 32px;
          background: $color-theme;
          color: #fff;
          text-align: center;
        }
      }
    }
    .detail, .comment {
      height: calc(100% - 424px);
      border-top: 1px solid $color-border;
      footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 98px;
        @extend %between;
        border-top: 1px solid $color-border;
      }
    }
    .detail {
      position: relative;
      &-content {
        position: absolute;
        top: 0;
        bottom: 98px;
        overflow: hidden;
        box-sizing: border-box;
        text-align: justify;
        p {
          background: $color-background-h;
          padding: 24px;
          box-sizing: border-box;
        }
      }
      footer {
        .mark {
          width: 250px;
          @extend %between;
          flex-direction: column;
          padding: 10px 0;
          box-sizing: border-box;
          font-size: $font-size-small-x;
          i {
            font-size: 48px;
          }
        }
        .borrow {
          width: 500px;
          line-height: 98px;
          background: $color-theme;
          font-size: $font-size-large-x;
          color: $color-text-ll;
        }
      }
    }
    .comment {
      position: relative;
      &-lists {
        padding: 0 24px;
        box-sizing: border-box;
        background: $color-background-h;
        .item {
          padding: 24px 0;
          border-bottom: 1px solid $color-border;
          @extend %between;
          align-items: flex-start;
          &:last-of-type {
            border-bottom: none;
          }
          &-left {
            margin-right: 24px;
            img {
              width: 88px;
              height: 88px;
              border-radius: 50%;
            }
          }
          &-right {
            flex-grow: 1;
            text-align: left;
            h3 {
              font-size: $font-size-medium;
              color: $color-text-l;
            }
            p {
              font-size: $font-size-medium-x;
              color: $color-text-d;
              margin: 14px 0 20px;
            }
            h5 {
              text-align: right;
              font-size: $font-size-small-x;
              color: $color-text-l;
            }
          }
        }
      }
      footer {
        padding: 0 24px;
        background: #fff;
        box-sizing: border-box;
        input {
          height: 70px;
          flex-grow: 1;
          border-radius: 10px;
          padding-left: 24px;
          border: 1px solid $color-border;
        }
        .btn {
          margin-left: 24px;
          height: 70px;
          line-height: 70px;
          font-size: $font-size-medium;
        }
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
        img {
          width: 84px;
          height: 84px;
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

  .slide-enter-active, .slide-leave-active {
    transition: all .5s ease;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
</style>
