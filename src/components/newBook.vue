<template>
  <transition name="slide">
    <main class="new-book">
      <div class="book-detail" v-show="haveBook">
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
          <section class="detail" v-show="currentIndex==0">
            <Scroll class="detail-content" :data="[data.summary]">
              <p v-html="data.summary"></p>
            </Scroll>
            <footer>
              <div class="cancel" @click="cancel">取消</div>
              <div class="sup" @click="sup" v-if="data.action=='up'">上架图书</div>
              <div class="sub" @click="sub" v-else-if="data.action=='down'">下架图书</div>
            </footer>
          </section>
          <section class="comment" v-show="currentIndex==1">
            <Scroll class="comment-content" :data="data.review" ref="comments">
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
              <input type="text" class="text" placeholder="我也来说两句" ref="text" v-model="content">
              <div class="btn s" @click="submit">提交</div>
            </footer>
          </section>
        </template>
      </div>
      <div class="no-result-wrapper" v-show="!haveBook">
        <NoResult :title="title"></NoResult>
      </div>
    </main>
  </transition>
</template>

<script>
  import Switches from 'base/switches'
  import Scroll from 'base/scroll'
  import NoResult from 'base/noResult'

  export default {
    name: "new-book",
    components: {Switches, Scroll, NoResult},
    data() {
      return {
        haveBook: false,
        title: '抱歉，暂时没有这本书的数据',
        switches: [{name: '内容详情'}, {name: '书籍评论'}],
        content: '',
        currentIndex: 0,
        data: {
          review:[]
        },
      }
    },
    methods: {
      cancel(){
        this.$router.back()
      },
      sup() {
        this.$http.post('/book/share-store',{book_id:this.data.id}).then(r=>{
          if(r.status=='success'){
            alert('上架成功')
          }else{
            this.$router.push({name:'/'})
          }
        }).catch(e=>console.log(e))
      },
      sub() {
        this.$http.post('/book/share-update',{id:this.data.userbook.id,action:'NORMAL'}).then(r=>{
          if(r.status=='success'){
            alert('下架成功')
          }else{
            this.$router.push({name:'/'})
          }
        }).catch(e=>console.log(e))
      },
      switchItem(index) {
        this.currentIndex = index
        if (index == 1) {
          this.$refs.comments.scrollTo(0, 0)
        }
      },
      submit() {
        this.$http.post('/book/comment', {
          book_id: this.data.id,
          content: this.content
        }).then(r => {
          if (r.status == 'success') {
            let data = r.data.review
            this.data.review.unshift({
              content: data.content,
              time: data.time,
              user: {
                avatar: data.user.avatar,
                nickname: data.user.nickname
              }
            })
            this.content = ''
            this.$refs.comments.scrollTo(0, 0)
          }
        });
        this.$refs.text.blur()
      }
    },
    activated() {
      let isbn = window.location.hash.split('=')[1];
      this.$http.get('/third/isbn', {
        params: {
          isbn: isbn
        }
      }).then(r => {
        if (r.status == 'success') {
          this.haveBook=true
          this.data = r.data.book
        }
      }).catch(e => console.log(e))
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .new-book {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background: $color-background;
  }

  .book-detail {
    width: 100%;
    height: 100%;
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
        line-height: 98px;
        font-size: $font-size-large-x;
        .cancel {
          width: 250px;
          background: #fff;
          color: $color-theme;

        }
        .sup,.sub {
          width: 500px;
          background: $color-theme;
          color: $color-text-ll;
        }
      }
    }
    .comment {
      position: relative;
      &-content {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 98px;
        overflow: hidden;
        box-sizing: border-box;
      }
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

  .no-result-wrapper {
    @extend %middle
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s ease;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
</style>

