<template>
  <div class="course">
    <header>
      <div class="img">
        <img v-lazy="data.book.images_large">
      </div>
      <div class="text">
        <h2 v-html="data.book.title"></h2>
        <h3 v-html="data.book.author"></h3>
        <p v-html="data.book.summary"></p>
        <h1>借出人：{{data.book_user.realname}}</h1>
        <h1>申请人：{{data.user.realname}}</h1>
      </div>
    </header>
    <section class="course-detail">
      <ul class="share-log">
        <li v-for="v in data.get_borrow_log" :class="{not:v.type=='REJECT'||v.type=='CANCEL'}">
          <h5 v-html="v.type_name"></h5>
          <span v-html="v.time"></span>
        </li>
        <li class="not" v-if="data.status=='APPLYING'">
          <h5>等待回复</h5>
        </li>
        <li class="not" v-else-if="data.status=='AGREE'">
          <h5>等待取书</h5>
        </li>
        <li class="not" v-else-if="data.status=='READING'">
          <h5>等待归还</h5>
        </li>
      </ul>
      <template>
        <div class="btns" v-if="data.type=='BORROW'&&data.status=='APPLYING'">
          <div class="btn o" @click="update('CANCEL')">取消申请</div>
        </div>
        <div class="btns" v-if="data.type=='BORROW'&&data.status=='AGREE'">
          <div class="btn" @click="update('READING')">书已借到</div>
        </div>
        <div class="btns" v-else-if="data.type=='LEND'&&data.status=='APPLYING'">
          <div class="btn o" @click="update('REJECT')">拒绝申请</div>
          <div class="btn" @click="update('AGREE')">同意借阅</div>
        </div>
        <div class="btns" v-else-if="data.type=='LEND'&&data.status=='READING'">
          <div class="btn" @click="update('FINISHED')">书已归还</div>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
  export default {
    name: "course",
    data() {
      return {
        data: {
          book: {},
          user: {},
          book_user: {},
          get_borrow_log: {},
          status: ''
        },
      }
    },
    methods: {
      update(status) {
        this.$http.post('/bill-share/update', {id: this.id, status: status}).then(r => {
          if (r.status == 'success') {
            this.data.get_borrow_log = r.data.info.get_borrow_log
            this.data.status = r.data.info.status
          }
        })
      }
    },
    activated() {
      this.data={
        book: {},
        user: {},
        book_user: {},
        get_borrow_log: {},
        status: ''
      };
      this.id = this.$route.params.id;
      this.$http.get('/bill-share/show', {params: {id: this.id}}).then(r => {
        if (r.status == 'success') {
          this.data = r.data.info
        }
      })
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .course {
    @extend %cover;
    z-index: 5;
    header {
      height: 318px;
      margin-bottom: 18px;
      padding: 24px;
      box-sizing: border-box;
      background: #fff;
      @extend %start;
      align-items: stretch;
      .img {
        flex: none;
        height: 100%;
        width: 200px;
        margin-right: 24px;
      }
      .text {
        text-align: left;
        padding-top: 10px;
        font-size: $font-size-small-x;
        color: $color-text-l;
        @extend %between;
        flex-direction: column;
        align-items: flex-start;
        h1 {
          font-size: $font-size-large;
          color: $color-theme;
          &:last-of-type {
            color: rgb(104, 208, 171);
          }
        }
        h2 {
          font-size: $font-size-large-x;
          color: $color-text-d;
          @include no-wrap
        }
        h3 {
          font-size: $font-size-medium;
          @include no-wrap
        }
        p {
          height: 72px;
          text-align: left;
          font-size: $font-size-medium;
          -webkit-box-orient: vertical;
          @include no-wrap-multi(2)
        }
      }
    }
    &-detail {
      background: #fff;
      width: 100%;
      height: calc(100% - 336px);
      padding: 24px;
      box-sizing: border-box;
      position: relative;
      li {
        @extend %between;
        margin-left: 40px;
        margin-bottom: 40px;
        position: relative;
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: -36px;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: $color-theme;
        }
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 100%;
          left: -31px;
          width: 2px;
          height: 40px;
          background: $color-theme;
        }
        &:last-of-type {
          &:after {
            display: none;
          }
        }
        &.not {
          h5 {
            color: $color-text-l;
          }
          &:before {
            background: $color-text-l;
          }
          &:after {
            display: none;
          }
        }
        h5 {
          color: $color-text-d;
          font-size: $font-size-large-x;
        }
        span {
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
      .btns {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 750px;
        height: 98px;
        @extend %between;
        .btn {
          height: 100%;
          line-height: 98px;
          flex: 1;
          border: none;
          border-radius: 0;
          &.o {
            background: #fff svg(t-border);
          }
        }
      }
    }
  }
</style>
