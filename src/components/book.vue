<template>
  <main v-show="book.id">
    <BorrowUser :data="data" v-if="book.origin==='user'"></BorrowUser>
    <BorrowLibrary :data="data" v-else-if="book.origin==='library'"></BorrowLibrary>
    <BorrowOrg :data="data" v-else-if="book.origin==='mechanism'"></BorrowOrg>
  </main>
</template>

<script>
  import BorrowUser from 'components/borrowUser'
  import BorrowLibrary from 'components/borrowLibrary'
  import BorrowOrg from 'components/borrowOrg'
  import {mapGetters} from 'vuex'
  import {share} from "../common/js/share";

  export default {
    name: "book",
    mixins: [share],
    components: {BorrowUser, BorrowLibrary, BorrowOrg},
    computed: {...mapGetters(['book'])},
    data() {
      return {
        data: {}
      }
    },
    methods: {
      getBookDetail() {
        if (!this.book.id) {
          this.$router.back();
          return
        }
        this.$http.get('/book/show', {
          params: {
            id: this.book.id,
            mechanism_id: this.book.mechanism_id,
            origin: this.book.origin
          }
        }).then(r => {
          if (r.status == 'success') {
            this.data = r.data.books;
            window.img = this.data.images_large;
            window.title = '我正在用同学借书借阅' + this.data.title;
            if (this.data.summary.length) {
              window.desc = this.data.summary
            }
            this.share()
          }
        }).catch(e => console.log(e))
      }
    },
    activated() {
      this.data = {};
      this.getBookDetail()
    }
  }
</script>

