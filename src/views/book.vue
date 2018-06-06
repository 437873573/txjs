<template>
  <transition name="slide">
    <BorrowUser :data="data" v-if="book.origin=='user'"></BorrowUser>
    <BorrowLibrary :data="data" v-else-if="book.origin=='library'"></BorrowLibrary>
  </transition>
</template>

<script>
  import BorrowUser from 'components/borrowUser'
  import BorrowLibrary from 'components/borrowLibrary'
  import {mapGetters} from 'vuex'

  export default {
    name: "book",
    components: {BorrowUser, BorrowLibrary},
    computed: {
      ...mapGetters([
        'book',
      ])
    },
    data() {
      return {
        data: {}
      }
    },
    methods: {
      getBookDetail() {
        if (!this.book.id) {
          this.$router.push('/index');
          return
        }
        this.$http.get('/book/show', {
          params: {
            id: this.book.id,
            origin: this.book.origin
          }
        }).then(r => {
          if (r.status == 'success') {
            this.data = r.data.books
          }
        }).catch(e => console.log(e))
      }
    },
    created() {
      this.getBookDetail()
    }
  }
</script>

<style scoped lang="scss">

</style>
