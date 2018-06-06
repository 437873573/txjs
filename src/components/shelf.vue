<template>
  <Scroll class="shelf-content"
          ref="scroll"
          :data="lists">
    <BookList :lists="lists" @select="selectItem"></BookList>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import BookList from 'base/bookList'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "shelf",
    components: {Scroll, BookList},
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
        this.$router.push({path: `/share/${item.id}`});
        this.selectBook({
          book: item
        })
      },
      _getShelf() {
        if (!this.shelf.id) {
          this.$router.push('/share')
          return
        }
        this.$http.get('/book', {params: {school_shelf_id: this.shelf.id, origin: 'LIBRARY'}}).then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.lists = r.data.books.data
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

  .shelf-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    background: $color-background;
  }
</style>
