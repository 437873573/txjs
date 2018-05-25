<template>
  <main class="proof">
    <header>
      <div class="img">
        <img v-lazy="list.images_large" alt="">
      </div>
      <div class="text">
        <h3>{{list.title}}</h3>
        <h4>{{list.author}} <span>校长推荐</span></h4>
        <p v-html="list.summary"></p>
      </div>
    </header>
    <section class="code" :class="{not:status=='CANCEL'||status=='FINISHED'}">
      <h3>取书码</h3>
      <h1 v-if="status=='CANCEL'">已过期</h1>
      <h1 v-else-if="status=='FINISHED'">已归还</h1>
      <h1 v-else-if="status=='READING'">已取书</h1>
      <h1 v-else>{{code}}</h1>
      <h4>有效期至  {{time}}</h4>
    </section>
    <p class="notice">
      温馨提示：<br>
      1.凡本校学生均可在本室借阅图书。每次借书不得超过2册。<br>
      2.为了加快图书的流通，借阅时间不能超过1个月。<br>
      3.借阅到期必须及时归还，如需继续使用可办续借手续，长期不归还者停止借阅权利，并按遗失图书处理。<br>
      4.所借图书如有污损、涂写、圈点及遗失者，能买到原版的图书可买书赔偿，否则按以下规定赔偿：<br>
      ①、丢失孤本书、特藏书、工具书按原价四倍以上赔偿。<br>
      ②、丢失多卷书中的2至4册者，均按全套价赔偿。 <br>
      5.员工在调动工作或离开本公司时，应在离开前还清所借的图
    </p>
  </main>
</template>

<script>
  export default {
    name: "proof",
    data() {
      return {
        code:'------',
        time:'00/00 00:00',
        status:'APPLYING',
        list:{}
      }
    },
    activated() {
      let id = this.$route.query.id;
      this.$http.get('/bill/share-show', {params: {id: id, origin: 'LIBRARY'}}).then(r => {
        if (r.status == 'success') {
          this.code = r.data.info.random_code;
          this.time=r.data.info.deadline;
          this.status=r.data.info.status;
          this.list=r.data.info.borrow_library_book_item[0].book
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .proof {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background: $color-background;
  }
  header{
    padding: 12px 24px;
    height: 240px;
    box-sizing: border-box;
    background: #fff;
    @extend %start;
    align-items: stretch;
    .img {
      margin-right: 26px;
      flex: none;
      width: 160px;
      height: 100%;
    }
    .text {
      @extend %around;
      padding: 10px 0;
      box-sizing: border-box;
      align-items: flex-start;
      flex-direction: column;
      h3 {
        font-size: $font-size-large-x;
        color: $color-text-d;
        font-weight: bold;
        @include no-wrap;
      }
      h4 {
        color: $color-text-l;
        font-size: $font-size-medium;
        @extend %start;
        span {
          flex: none;
          display: block;
          width: 124px;
          height: 36px;
          border: 1px solid $color-theme;
          border-radius: 5px;
          margin-left: 20px;
          color: $color-theme;
        }
      }
      p {
        text-align: left;
        font-size: $font-size-medium;
        @include no-wrap-multi(2)
      }
    }
  }
  .code{
    height: 322px;
    margin: 20px 24px;
    padding: 40px 0 50px;
    box-sizing: border-box;
    background-image: url("../common/img/library_jsm_selected.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: #fff;
    @extend %center;
    flex-direction: column;
    &.not{
      background-image: url("../common/img/library_jsm_default.png");
      color: $color-text-l;
    }
    h3{
      font-size: $font-size-medium-x;
    }
    h1{
      font-size: 96px;
    }
    h4{
      font-size: $font-size-medium;
    }
  }
  .notice{
    padding: 0 24px;
    font-size: $font-size-medium;
    color: $color-text-l;
    text-align: left;
  }
</style>
