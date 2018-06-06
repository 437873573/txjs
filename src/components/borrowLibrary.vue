<template>
  <div class="borrow-library">
    <BookDetail :data="data" v-show="showDetail">
      <footer slot="footer">
        <div class="mark">
          <i :class="getFavoriteCls(book)"
             @click="toggleFavoriteCls(book)"></i>
          收藏
        </div>
        <div class="borrow" @click="borrow">
          加入借书单
        </div>
      </footer>
    </BookDetail>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {collect} from 'common/js/collect'
  import BookDetail from 'base/bookDetail'

  export default {
    name: "borrow-library",
    components: {BookDetail},
    mixins:[collect],
    computed: {
      ...mapGetters([
        'showDetail',
        'book',
      ])
    },
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    methods: {
      borrow(){
        let id = this.data.library[0].origin_id
        this.$http.post('/bill/library-store', {library_book_ids: [id]}).then(r => {
          if (r.status == 'success') {
            this.$router.push({path: '/proof', query: {id: r.data.id}})
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .borrow-library {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: $color-background;
  }

  footer {
    .mark {
      width: 250px;
      @extend %between;
      flex-direction: column;
      padding: 10px 0;
      box-sizing: border-box;
      font-size: $font-size-small-x;
      background: #fff;
      color: $color-theme;
      i {
        font-size: 48px;
      }
    }
    .borrow {
      width: 500px;
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
