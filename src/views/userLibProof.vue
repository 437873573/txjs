<template>
  <main class="proof">
    <header class="code" :class="{not:status=='REJECT'||status=='FINISHED'}">
      <h3>取书码</h3>
      <h2 v-if="status=='REJECT'">已过期</h2>
      <h2 v-else-if="status=='FINISHED'">已归还</h2>
      <h2 v-else>{{code}}</h2>
      <h4>有效期至  {{time}}</h4>
    </header>
    <Scroll class="proof-detail">
      <div>
        <h3>借阅书单：<span v-show="status=='READING'">（已取书）</span></h3>
        <BookList :lists="lists"></BookList>
        <p class="notice">
          温馨提示：<br>
          1.凡本校学生均可在本室借阅图书。每次借书不得超过2册。<br>
          2.为了加快图书的流通，借阅时间不能超过1个月。<br>
          3.借阅到期必须及时归还，如需继续使用可办续借手续，长期不归还者停止借阅权利，并按遗失图书处理。<br>
          4.所借图书如有污损、涂写、圈点及遗失者，能买到原版的图书可买书赔偿，否则按以下规定赔偿：<br>
          ①、丢失孤本书、特藏书、工具书按原价四倍以上赔偿。<br>
          ②、丢失多卷书中的2至4册者，均按全套价赔偿。 <br>
          5.学生在放假或转离本学校时，应在离开前还清所借的图书。
        </p>
      </div>
    </Scroll>
  </main>
</template>

<script>
  import BookList from 'base/bookList'
  import Scroll from 'base/scroll'
  export default {
    name: "proof",
    components:{BookList,Scroll},
    data() {
      return {
        code:'------',
        time:'00/00 00:00',
        status:'APPLYING',
        list:[]
      }
    },
    computed:{
      lists(){
        let arr=[];
        this.list.forEach(v=>{
          arr.push(v.library_book.book)
        });
        return arr
      }
    },
    activated() {
      let id = this.$route.params.id;
      this.$http.get('/bill-library/show', {params: {id: id}}).then(r => {
        if (r.status === 'success') {
          this.code = r.data.info.random_code;
          this.time=r.data.info.deadline;
          this.status=r.data.info.status;
          this.list=r.data.info.borrow_library_book_item
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
    h2{
      font-size: 92px;
    }
    h4{
      font-size: $font-size-medium;
    }
  }
  .proof-detail{
    @extend %cover;
    top: 362px;
    overflow: hidden;
    h3{
      line-height: 2;
      text-align: left;
      padding-left: 24px;
    }
  }
  .notice{
    padding: 0 24px;
    font-size: $font-size-medium;
    color: $color-text-l;
    text-align: left;
  }
</style>
