<template>
  <div class="library">
    <Scroll :data="lists" class="library-content">
      <ul class="library-lists">
        <li v-for="v in lists" :key="v.id" @click="selectItem(v)">
          <div class="img">
            <img v-lazy="v.image" alt="">
          </div>
          <h3>{{v.name}}</h3>
          <!--<h5>共{{v.count}}本</h5>-->
        </li>
      </ul>
      <div class="no-result-wrapper" v-show="!lists.length">
        <NoResult :title="title"></NoResult>
      </div>
    </Scroll>
    <BookCar class="bookCar" ref="bookCar"></BookCar>
  </div>
</template>

<script>
  import Scroll from 'base/scroll'
  import NoResult from 'base/noResult'
  import BookCar from 'base/bookCar'
  import {mapMutations} from 'vuex'

  export default {
    name: "library-book-list",
    components: {Scroll,NoResult,BookCar},
    data(){
      return{
        title:'该功能由学校申请开通'
      }
    },
    props: {
      lists: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({path: '/share/libraryBookList'});
        this.setShelf(item)
      },
      ...mapMutations({
        'setShelf': 'SET_SHELF'
      })
    },
    activated(){
      this.$refs.bookCar.getList()
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .bookCar{
    position: fixed;
    bottom: 128px;
    right: 30px;
    z-index: 10;
  }
  .library-content{
    width: 100%;
    height: 100%;
  }
  .library-lists {
    padding: 24px 0;
    box-sizing: border-box;
    @extend %start;
    flex-wrap: wrap;
    li {
      width: 218px;
      border-radius: 10px;
      background: $color-background-h;
      padding: 30px 0 20px;
      margin-left: 24px;
      margin-bottom: 24px;
      box-sizing: border-box;
      @extend %start;
      flex-direction: column;
      .img {
        width: 172px;
        height: 170px;
        margin-left: 7px;
        margin-bottom: 7px;
      }
      h3 {
        font-size: $font-size-large-x;
        color: $color-text-d;
        font-weight: bold;
        @include no-wrap
      }
      h5 {
        font-size: $font-size-small-x;
        color: $color-text-l;
      }
    }
  }
  .no-result-wrapper{
    @extend %middleCenter;
  }
</style>
