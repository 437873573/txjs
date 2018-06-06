<template>
  <div class="user-collect">
    <Scroll class="class-content" :data="favoriteList">
      <BookList :lists="favoriteList" @select="selectItem"></BookList>
    </Scroll>
    <div class="no-result-wrapper" v-show="noResult">
      <NoResult :title="'还没有收藏的图书，快去收藏吧'"></NoResult>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll'
  import BookList from 'base/bookList'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    name: "user-collect",
    components:{Scroll,BookList,Loading,NoResult},
    computed:{
      ...mapGetters(['favoriteList']),
      noResult(){
        return !this.favoriteList.length
      }
    },
    methods:{
      selectItem(item) {
        this.$router.push({path: `/index/${item.id}`});
        this.selectBook({
          book: item
        })
      },
      ...mapActions(['selectBook'])
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .user-collect{
    @extend %cover;
    z-index: 4;
  }
  .no-result-wrapper{
    @extend %middle;
  }
</style>
