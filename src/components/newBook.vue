<template>
  <transition name="slide">
    <div class="new-book">
      <BookDetail :data="data" v-show="!loading&&!noBook">
        <template>
          <footer slot="footer" v-if="data.action=='up'">
            <div class="cancel" @click="cancel">取消</div>
            <div class="sup" @click="sup(data)">上架图书</div>
          </footer>
          <footer slot="footer" v-else-if="data.action=='down'">
            <div class="delete" @click="del(data)">删除</div>
            <div class="sub" @click="sub(data)">下架图书</div>
          </footer>
        </template>
      </BookDetail>
      <div class="loading" v-show="loading">
        <Loading></Loading>
      </div>
      <div class="no-result-wrapper" v-show="noBook">
        <NoResult :title="title"></NoResult>
      </div>
      <Confirm ref="confirm" :confirmBtnText="text" :canShow="false" :head="head">
        <div id="text" v-html="message"></div>
      </Confirm>
    </div>
  </transition>
</template>

<script>
  import BookDetail from 'base/bookDetail'
  import NoResult from 'base/noResult'
  import Loading from 'base/loading'

  export default {
    name: "new-book",
    components: {BookDetail, NoResult, Loading},
    data() {
      return {
        head:'提示',
        text:'再重试一次',
        message:'',
        data:{},
        loading: true,
        noBook: false,
        title: '抱歉，暂时没有这本书的数据',
      }
    },
    methods: {
      cancel() {
        this.$router.back()
      },
      show(mess){
        this.message=mess
        this.$refs.confirm.show()
      },
      del(item){
        this.$http.post('book/share-destroy', {
          id: item.id
        }).then(r => {
          if (r.status == 'success') {
            this.$router.push({path: '/mybook'})
          }else{
            this.show(r.mess)
          }
        })
      },
      sup(item) {
        this.$http.post('/book/share-store', {book_id: item.id}).then(r => {
          if (r.status == 'success') {
            this.$router.push({path: '/mybook'})
          } else {
            this.show(r.mess)
          }
        }).catch(e => console.log(e))
      },
      sub(item) {
        this.$http.post('/book/share-update', {id: item.userbook.id, action: 'NORMAL'}).then(r => {
          if (r.status == 'success') {
            this.$router.push({path: '/mybook'})
          } else {
            this.show(r.mess)
          }
        }).catch(e => console.log(e))
      },
    },
    activated() {
      let isbn = this.$route.query.isbn;
      this.$http.get('/third/isbn', {
        params: {
          isbn: isbn
        }
      }).then(r => {
        this.loading = false;
        if (r.status == 'success') {
          this.data = r.data.book;
        } else {
          this.noBook = true;
        }
      }).catch(e => console.log(e))
    },
    deactivated() {
      this.data = {};
      this.noBook = false;
      this.loading = true
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
  footer {
    line-height: 98px;
    font-size: $font-size-large-x;
    .cancel ,.delete{
      width: 250px;
      background: #fff;
      color: $color-theme;
    }
    .sup, .sub {
      width: 500px;
      background: $color-theme;
      color: $color-text-ll;
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
  #text {
    padding: 20px 40px 40px;
    text-align: left;
    font-size: $font-size-medium-x;
    color: $color-text-l;
  }
</style>

