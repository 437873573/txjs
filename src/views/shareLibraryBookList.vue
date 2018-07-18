<template>
  <Scroll class="shelf-content"
          ref="scroll"
          :data="lists">
    <BookList :lists="lists" @select="selectItem"></BookList>
    <!-- loading 组件 -->
    <div class="loading-container" v-show="!show">
      <Loading></Loading>
    </div>
    <!-- noResult 组件 -->
    <div class="noResult-container" v-show="show&&!lists.length">
      <NoResult :title="title"></NoResult>
    </div>
    <BookCar class="bookCar"></BookCar>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'
  import BookList from 'base/bookList'
  import BookCar from 'base/bookCar'
  import {mapGetters} from 'vuex'

  export default {
    name: "share-library-book-list",
    components: {Scroll, BookList, BookCar, Loading, NoResult},
    data() {
      return {
        show:false,
        title:'该书架暂时还没有书籍',
        lists: []
      }
    },
    computed: {
      ...mapGetters([
        'shelf'
      ])
    },
    methods: {
      selectItem(item) {
        this.$router.push({path: `/book/${item.id}`});
        this.$store.commit('SET_BOOK', item)
      },
      _getShelf() {
        if (!this.shelf.id) {
          this.$router.push('/share');
          return
        }
        this.show=false;
        this.lists=[];
        this.$http.get('/book', {params: {school_shelf_id: this.shelf.id, origin: 'LIBRARY'}}).then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.show=true;
            this.lists = r.data.books.data
          }
        })
      },
    },
    activated() {
      this._getShelf()
    }
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

  .shelf-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    background: $color-background;
  }
  .loading-container ,.noResult-container{
    @extend %middle;
  }
</style>
