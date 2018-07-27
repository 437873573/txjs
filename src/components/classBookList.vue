<template>
  <Scroll class="class-content" :data="lists">
    <BookList :lists="lists" @select="selectItem"></BookList>
    <!-- loading 组件 -->
    <div class="loading-container" v-show="!show">
      <Loading></Loading>
    </div>
    <!-- noResult 组件 -->
    <div class="noResult-container" v-show="show&&!lists.length">
      <NoResult :title="title"></NoResult>
    </div>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'
  import BookList from 'base/bookList'
  import {mapGetters} from 'vuex'

  export default {
    name: "class-book-list",
    components: {Scroll, BookList,Loading,NoResult},
    computed: {
      ...mapGetters(['classmate'])
    },
    data() {
      return {
        show:false,
        title:'这位同学还没有上传书籍',
        lists: []
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({path: `/book/${item.id}`});
        this.$store.commit('SET_BOOK', item);
      },
      getList() {
        if(!this.classmate.user_id){
          this.$router.push({path:'/index'})
        }
        this.$http.get('/book', {
          params: {
            user_id: this.classmate.user_id,
            origin: 'user'
          }
        }).then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.show=true;
            this.lists = r.data.books.data
          }
        })
      },
    },
    activated() {
      this.lists = [];
      this.show=false;
      this.getList()
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .class-content {
    @extend %cover;
    z-index: 5;
  }
  .loading-container ,.noResult-container{
    @extend %middle;
  }
</style>
