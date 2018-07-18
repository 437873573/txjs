<template>
  <transition name="slide">
    <Scroll class="shelf-content"
            ref="scroll"
            :data="lists">
      <BookList :lists="lists" @select="selectItem"></BookList>
    </Scroll>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll'
  import BookList from 'base/bookList'
  import {mapGetters} from 'vuex'

  export default {
    name: "org-list",
    components: {Scroll, BookList},
    computed: {
      ...mapGetters(['orgList']),
      lists() {
        let arr = [];
        this.orgList.map(v => {
          arr.push(v.book)
        });
        return arr
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({path: `/book/${item.id}`});
        this.$store.commit('SET_BOOK', item)
      },
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
