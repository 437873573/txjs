<template>
  <div class="borrow-user">
    <BookDetail :data="data">
      <footer slot="footer">
        <div class="borrow" @click="borrow" v-show="data.user" :class="data.user&&data.user.length?'':'not'">
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
            <h5 v-html="v.user.realname"></h5>
          </li>
        </ul>
      </Scroll>
    </Confirm>
    <Confirm :head="head2" ref="confirm2"
             :canShow="false"
             :confirmBtnText="confirmBtnText"
             @confirm="noUser">
      <div id="text" v-html="message"></div>
    </Confirm>
  </div>
</template>

<script>
  import BookDetail from 'base/bookDetail'
  import Scroll from 'base/scroll'

  export default {
    name: "borrow-user",
    components: {BookDetail, Scroll},
    data() {
      return {
        head: '请选择书籍拥有者',
        head2: '提示',
        message: '',
        confirmBtnText: '确定',
        scrollX: true,
        scrollY: false,
        oid: 0
      }
    },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      borrow() {
        this.$refs.userLists.style.width = 168 * this.data.user.length / 7.5 + 'vw';
        this.$refs.confirm.show()
      },
      toOrder() {
        this.$http.post('/bill-share/store', {user_book_id: this.oid}).then(r => {
          if (r.status === 'success') {
            this.$router.replace({path: `/course/${r.data.id}`})
          } else {
            this.message = r.mess;
            this.$refs.confirm2.show()
          }
        })
      },
      noUser() {
        this.data.user = []
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
    z-index: 10;
    background: $color-background;
  }

  footer {
    /*<!--.mark {-->*/
    /*<!--width: 250px;-->*/
    /*<!--@extend %between;-->*/
    /*<!--flex-direction: column;-->*/
    /*<!--padding: 10px 0;-->*/
    /*<!--box-sizing: border-box;-->*/
    /*<!--font-size: $font-size-small-x;-->*/
    /*<!--background: #fff;-->*/
    /*<!--color: $color-theme;-->*/
    /*<!--i {-->*/
    /*<!--font-size: 48px;-->*/
    /*<!--}-->*/
    /*<!--}-->*/
    .borrow {
      width: 100%;
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
    padding: 0 24px;
    box-sizing: border-box;
  }

  .user-lists {
    @extend %start;
    li {
      width: 120px;
      margin-right: 20px;
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
        width: 120px;
        @include no-wrap;
        margin-top: 6px;
        font-size: $font-size-small-x;
      }
      &:last-of-type {
        margin-right: 0;
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
