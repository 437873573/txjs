<template>
  <transition name="slide">
    <section class="shelf">
      <Scroll class="shelf-content"
              ref="scroll"
              :data="lists">
        <ul class="shelf-lists">
          <li class="item" v-for="item in lists" :key="item.id" @click="selectItem(item)">
            <div class="img">
              <img v-lazy="item.info.images_medium" alt="">
            </div>
            <div class="text">
              <h3>{{item.info.title}}</h3>
              <h4>{{item.info.author}}</h4>
              <p v-html="item.info.summary"></p>
            </div>
          </li>
        </ul>
      </Scroll>
    </section>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll'
  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: "shelf",
    components: {Scroll},
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
      selectItem(item){
        this.$router.push({path:`/library/${item.id}`});
        this.selectBook({
          book:item
        })
      },
      _getShelf() {
        // 禁止直接刷新详情页（获取不到歌手 id）
        if (!this.shelf.id) {
          this.$router.push('/library')
          return
        }
        this.$http.get('/book/library', {params: {school_shelf_id: this.shelf.id}}).then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.lists= r.data.libraryBooks
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

  .shelf {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: $color-background;
  }

  .item {
    margin: 20px 0;
    padding: 12px 24px;
    height: 240px;
    box-sizing: border-box;
    background: #fff;
    @extend %start;
    align-items: stretch;
    .img {
      margin-right: 26px;
      img {
        width: 160px;
        height: 100%;
      }
    }
    .text {
      @extend %around;
      padding: 10px 0;
      box-sizing: border-box;
      align-items: flex-start;
      flex-direction: column;
      h3 {
        font-size: $font-size-large-x;
        color: $color-text-d;
        font-weight: bold;
      }
      h4 {
        color: $color-text-l;
        font-size: $font-size-medium;
        @extend %start;
        span {
          flex: none;
          display: block;
          width: 124px;
          height: 36px;
          border: 1px solid $color-theme;
          border-radius: 5px;
          margin-left: 20px;
          color: $color-theme;
        }
      }
      p {
        text-align: left;
        font-size: $font-size-medium;
        -webkit-box-orient: vertical;
        @include no-wrap-multi(2)
      }
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s ease;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0) scale3d(0,1,0);
  }
</style>
