<template>
    <div class="book-detail">
      <header>
        <div class="img">
          <img v-lazy="data.images_large">
        </div>
        <div class="text">
          <h2 v-html="data.title"></h2>
          <h3 v-html="data.author"></h3>
          <h4>出版社: {{data.publisher}}</h4>
          <h4>出版时间: {{data.pubdate}}</h4>
          <h4>ISBN: {{data.isbn}}</h4>
          <!--<p><span>荐</span></p>-->
        </div>
      </header>
      <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
      <template>
        <section class="detail" v-show="currentIndex==0">
          <Scroll class="detail-content" :data="[data.summary]">
            <p v-html="data.summary"></p>
          </Scroll>
          <slot name="footer"></slot>
        </section>
        <section class="comment" v-show="currentIndex==1">
          <Scroll class="comment-content" :data="data.review" ref="comments">
            <ul class="comment-lists">
              <li class="item" v-for="(v,i) in data.review" :key="i">
                <div class="item-left">
                  <div class="img">
                    <img v-lazy="v.user?v.user.avatar:''">
                  </div>
                </div>
                <div class="item-right">
                  <h3 v-html="v.user?v.user.realname:''"></h3>
                  <p v-html="v.content"></p>
                  <h5 v-html="v.time"></h5>
                </div>
              </li>
            </ul>
          </Scroll>
          <footer>
            <input type="text" class="text" placeholder="我也来说两句" ref="text" v-model="content">
            <div class="btn s" @click="sub">提交</div>
          </footer>
        </section>
      </template>
    </div>
</template>

<script>
  import Switches from 'base/switches'
  import Scroll from 'base/scroll'
  export default {
    name: "book-detail",
    components: {Switches, Scroll},
    data() {
      return {
        switches: [{name: '内容详情'}, {name: '书籍评论'}],
        content:'',
        currentIndex: 0,
      }
    },
    props:{
      data:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
        if(index==1){
          this.$refs.comments.scrollTo(0,0)
        }
      },
      sub() {
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
                realname: data.user.realname
              }
            });
            this.content = '';
            this.$refs.comments.scrollTo(0, 0)
          }
        });
        this.$refs.text.blur()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

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
      .img {
        height: 100%;
        width: 200px;
        margin-right: 24px;
        flex: none;
      }
      .text {
        width: 478px;
        flex: none;
        text-align: left;
        padding-top: 10px;
        font-size: $font-size-small-x;
        color: $color-text-l;
        @extend %between;
        flex-direction: column;
        align-items: flex-start;
        h2 {
          width: 100%;
          font-size: $font-size-large-x;
          color: $color-text-d;
          @include no-wrap
        }
        h3 {
          width: 100%;
          font-size: $font-size-medium;
          @include no-wrap
        }
        h4 {
          width: 100%;
          @include no-wrap
        }
        p span {
          margin-right: 12px;
          display: inline-block;
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
        box-sizing: border-box;
        @extend %between;
        /*<!--border-top: 1px solid $color-border;-->*/
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
          width: 750px;
          background: $color-background-h;
          padding: 24px;
          box-sizing: border-box;
        }
      }
    }
    .comment {
      position: relative;
      &-content{
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
            .img {
              width: 88px;
              height: 88px;
              img{
                border-radius: 50%;
              }
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
        background: #fff svg(t-border);
        box-sizing: border-box;
        input {
          height: 70px;
          flex-grow: 1;
          border-radius: 10px;
          padding-left: 24px;
          border: 1px solid $color-border;
          -webkit-appearance: none;
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
</style>
