<template>
  <div class="user-book">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="selectItem"></Switches>
    <Borrowing :data="borrowingData" :i="currentIndex" v-show="currentIndex<2"></Borrowing>
    <Borrowed :data="borrowedData" :i="currentIndex" v-show="currentIndex>1"></Borrowed>
    <div class="btn x" @click="scan">上架新书籍</div>
  </div>
</template>

<script>
  import Switches from 'base/switches'
  import Scroll from 'base/scroll'
  import Borrowing from 'components/borrowing'
  import Borrowed from 'components/borrowed'
  import {scan} from "common/js/scanCode";

  export default {
    name: "user-book",
    mixins: [scan],
    components: {Switches, Scroll, Borrowed, Borrowing},
    data() {
      return {
        switches: [{name: '已上架'}, {name: '已下架'}, {name: '借出'}, {name: '借入'}],
        currentIndex: 0,
        borrowingData: [],
        borrowedData: [],
      }
    },
    methods: {
      selectItem(index) {
        this.currentIndex = index
      },
      getBorrowing() {
        this.$http.get('/book/my-books').then(r => {
          if (r.status == 'success') {
            this.borrowingData = r.data.userbook
          }
        })
      },
      getBorrowed() {
        this.$http.get('/bill-share/index').then(r => {
          if (r.status == 'success') {
            this.borrowedData = r.data.borrowUserBooks
          }
        })
      }
    },
    activated() {
      if(this.$store.state.bound<3){
        this.$router.replace('/bind')
        return
      }
      this.getBorrowing();
      this.getBorrowed()
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .user-book {
    @extend %cover;
    z-index: 4;
    background: $color-background;
  }

  .user-book-content {
    position: absolute;
    top: 88px;
    bottom: 98px;
    left: 0;
    right: 0;

  }

  .user-book > .btn {
    position: fixed;
    bottom: 0;
    border-radius: 0;
    width: 100%;
    height: 98px;
    line-height: 98px;
    margin-top: 0;
  }
</style>
