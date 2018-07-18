<template>
  <div class="borrow-library">
    <BookDetail :data="data">
      <footer slot="footer">
        <div class="borrow" @click="borrow">
          加入借书单
        </div>
      </footer>
    </BookDetail>
    <BookCar class="bookCar" ref="bookCar"></BookCar>
    <Confirm ref="confirm" :confirmBtnText="text" :canShow="false">
      <div id="text" v-html="message"></div>
    </Confirm>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BookDetail from 'base/bookDetail'
  import BookCar from 'base/bookCar'

  export default {
    name: "borrow-library",
    components: {BookDetail, BookCar},
    computed: {
      ...mapGetters(['book'])
    },
    data(){
      return{
        message: '',
        text: '确定'
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
        let id = this.data.library[0].origin_id
        this.$http.post('/bill-library-cart ', {id: id}).then(r => {
          if (r.status == 'success') {
            this.$refs.bookCar.getList();
            this.$router.back()
          }else if(r.status==='error'){
            this.message=r.mess;
            this.$refs.confirm.show()
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .bookCar {
    position: fixed;
    bottom: 128px;
    right: 30px;
    z-index: 10;
  }

  .borrow-library {
    @extend %cover;
    z-index: 10;
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
        border: 1px solid $color-border;
      }
    }
  }
</style>
