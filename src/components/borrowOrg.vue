<template>
  <div class="borrow-org">
    <BookDetail :data="data">
      <footer slot="footer">
        <div class="borrow" @click="borrow">
          加入借书单
        </div>
      </footer>
    </BookDetail>
    <Confirm ref="confirm" :confirmBtnText="text" :canShow="false">
      <div id="text" v-html="message"></div>
    </Confirm>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import BookDetail from 'base/bookDetail'

    export default {
      name: "borrow-org",
      components: {BookDetail},
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
          let id=this.$route.params.id;
          this.$http.post('/bill-mechanism/store', {mechanism_book_ids: [this.data.mechanism[0].origin_id]}).then(r => {
            if (r.status === 'success') {
              this.$router.replace({path:`/orgProof/${r.data.id}`});
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

  .borrow-org {
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
