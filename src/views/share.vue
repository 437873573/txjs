<template>
  <main class="share">
    <div class="tab">
      <i class="icon-btn_icon_search"></i>
      <h2>龙口西小学图书馆</h2>
      <i class="icon-nav_icon_news"></i>
    </div>
    <Scroll :data="lists" class="library-content">
      <ul class="library-lists">
        <li v-for="v in lists" :key="v.id" @click="selectItem(v)">
          <div class="img">
            <img v-lazy="v.image" alt="">
          </div>
          <h3>{{v.name}}</h3>
          <h5>共{{v.count}}本</h5>
        </li>
      </ul>
    </Scroll>
    <router-view></router-view>
  </main>
</template>

<script>
  import Scroll from 'base/scroll'
  import {mapMutations} from 'vuex'

  export default {
    name: "share",
    components: {Scroll},
    data() {
      return {
        lists: []
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({
          path: `/library/shelf`
        });
        this.setShelf(item)
      },
      ...mapMutations({
        'setShelf': 'SET_SHELF'
      })
    },
    created() {
      this.$http.get('/school/shelf-index').then(r => {
        // console.log(r)
        if (r.status == 'success') {
          this.lists = r.data.shelves
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .tab {
    height: 88px;
    padding: 0 24px;
    box-sizing: border-box;
    background: $color-background-h;
    border-bottom: 1px solid $color-border;
    @extend %between;
    i{
      font-size: $font-size-large-x;
    }
    h2{
      font-size: $font-size-medium-x;
      color: $color-text-d;
    }
  }

  .library-content {
    position: absolute;
    top: 88px;
    bottom: 98px;
    left: 0;
    right: 0;
  }

  .library-lists {
    padding: 24px;
    box-sizing: border-box;
    @extend %between;
    flex-wrap: wrap;
    li {
      width: 218px;
      border-radius: 10px;
      background: $color-background-h;
      padding: 30px 0 20px;
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
</style>
