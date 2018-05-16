<template>
  <section class="shelf">
    <Scroll class="shelf-content"
            ref="scroll"
            :data="lists">
      <BookList :lists="lists" @select="selectItem"></BookList>
    </Scroll>
  </section>
</template>

<script>
  import Scroll from 'base/scroll'
  import BookList from 'base/bookList'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "shelf",
    components: {Scroll,BookList},
    data() {
      return {
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
        this.$router.push({path: `/library/${item.id}`});
        this.selectBook({
          book: item
        })
      },
      _getShelf() {
        // 禁止直接刷新详情页（获取不到歌手 id）
        if (!this.shelf.id) {
          this.$router.push('/library')
          return
        }
        this.$http.get('/book', {params: {school_shelf_id: this.shelf.id,origin:'LIBRARY'}}).then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.lists = r.data.books.library_books.data
          }
        })
      },
      ...mapActions(['selectBook'])
    },
    mounted() {
      this._getShelf()
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .shelf {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: $color-background;
  }
</style>
