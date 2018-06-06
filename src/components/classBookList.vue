<template>
  <Scroll class="class-content" :data="lists">
    <BookList :lists="lists" @select="selectItem"></BookList>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import BookList from 'base/bookList'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "class-book-list",
    components: {Scroll, BookList},
    computed: {
      ...mapGetters(['classmate'])
    },
    data() {
      return {
        lists: []
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({path: `/share/${item.id}`});
        this.selectBook({
          book: item
        })
      },
      getList() {
        this.$http.get('/book', {
          params: {
            user_id: this.classmate.id
          }
        }).then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.lists = r.data.books.data
          }
        })
      },
      ...mapActions(['selectBook'])
    },
    mounted() {
      this.getList()
    },
    deactivated() {
      this.lists = []
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .class-content {
    @extend %cover;
    z-index: 5;
  }
</style>
