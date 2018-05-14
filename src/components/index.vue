<template>
  <main class="index">
    <transition name="fade">
      <div class="searchMinBox" v-show="searchMin">
        <i class="icon-nav_icon_scan"></i>
        <div class="searchMin"><i class="icon-btn_icon_search"></i>&nbsp;&nbsp;在这里搜你想要的书籍</div>
        <i class="icon-nav_icon_news"></i>
      </div>
    </transition>
    <Scroll class="recommend-content"
            ref="scroll"
            :data="lists"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="scroll">
      <div>
        <section class="slider-wrapper" v-if="banners.length">
          <div class="scan"><i class="icon-nav_icon_scan"></i></div>
          <div class="news"><i class="icon-nav_icon_news"></i></div>
          <Slider>
            <div v-for="banner in banners">
              <img :src="banner.image" @load="loadImg">
            </div>
          </Slider>
        </section>
        <div class="searchBox" ref="searchBox">
          <div class="search" ref="search"><i class="icon-btn_icon_search"></i>&nbsp;&nbsp;在这里搜你想要的书籍</div>
        </div>
        <nav>
          <div><img src="../common/img/home_icon_personal.png" alt=""><span>我的图书</span></div>
          <div><img src="../common/img/home_icon_borrow.png" alt=""><span>借阅管理</span></div>
          <div><img src="../common/img/home_icon_find.png" alt=""><span>发现更多</span></div>
          <div><img src="../common/img/home_icon_sign.png" alt=""><span>每日签到</span></div>
        </nav>
        <!-- 图书推荐列表 -->
        <div class="recommend-list">
          <ul>
            <li class="item" v-for="item in lists" :key="item.origin+item.id" @click="selectItem(item)">
              <div class="img">
                <img v-lazy="item.images_medium" alt="">
              </div>
              <div class="text">
                <h3>{{item.title}}</h3>
                <h4>{{item.author}} <span>校长推荐</span></h4>
                <p v-html="item.summary"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <router-view></router-view>
  </main>
</template>

<script>
  import Slider from 'base/slider'
  import Scroll from 'base/scroll'
  import {mapActions} from 'vuex'
  export default {
    name: "index",
    data() {
      return {
        banners: [],
        lists: [],
        data:{},
        searchMin: false
      }
    },
    methods: {
      selectItem(item){
        this.$router.push({path:`/index/${item.id}`});
        this.selectBook({
          book:item
        })
      },
      scroll(pos) {
        // console.log(pos.y)
        // console.log(this.$refs.search.offsetTop-pos.y)
        let boxTop = this.$refs.searchBox.offsetTop,
          secTop = this.$refs.search.offsetTop,
          scrollY = boxTop + secTop + pos.y;
        if (scrollY <= 0) {
          this.searchMin = true
        } else {
          this.searchMin = false
        }
      },
      //当首次获取到图片时，Better-scroll 重新计算
      loadImg() {
        if (!this.flag) {
          this.$refs.scroll.refresh()
          this.flag = true
        }
      },
      ...mapActions(['selectBook'])
    },
    beforeCreate() {
      this.probeType = 3
      this.listenScroll = true
    },
    created() {
      //获取轮播图
      this.$http.get('/banner').then(r => {
        // console.log(r)
        if (r.status == 'success') {
          this.banners = r.data.banners
        }
      })
      //获取推荐图书
      setTimeout(() => {
        this.$http.get('/book').then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.lists = r.data.books.user_books.data
          }
        })
      }, 1000)
    },
    components: {
      Slider,
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .index {
    position: fixed;
    z-index: 3;
    width: 100%;
    top: 0;
    bottom: 98px;
  }

  .searchMinBox {
    position: absolute;
    z-index: 998;
    width: 100%;
    height: 88px;
    background: #fff;
    padding: 12px 24px;
    box-sizing: border-box;
    border-bottom: 1px solid $color-border;
    @extend %between;
    .searchMin {
      width: 80%;
      height: 100%;
      border-radius: 10px;
      font-size: $font-size-medium;
      line-height: 64px;
      text-align: left;
      background: $color-background-d;
      i {
        color: $color-text-d;
        margin-left: 24px;
      }
    }
  }

  .recommend-content {
    height: 100%;
    overflow: hidden;
  }

  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    .scan, .news {
      position: absolute;
      top: 24px;
      width: 68px;
      height: 68px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      font-size: 40px;
      color: $color-text-ll;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      //@include extend-click()
    }
    .scan {
      left: 24px;
    }
    .news {
      right: 24px;
    }
  }

  .searchBox {
    height: 50px;
    position: relative;
    .search {
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      width: 600px;
      height: 64px;
      border-radius: 100px;
      font-size: $font-size-medium;
      line-height: 66px;
      background: $color-background-h;
      box-shadow: 0 10px 18px rgba(0, 0, 0, 0.1);
      i {
        color: $color-text-d;
      }
    }
  }

  nav {
    @extend %between;
    align-items: stretch;
    padding: 26px 0;
    height: 160px;
    box-sizing: border-box;
    background: $color-background-h;
    div {
      flex: 1;
      @extend %between;
      flex-direction: column;
      img {
        width: 68px;
        height: 68px;
      }
      span {
        font-size: $font-size-medium;
      }
    }
  }

  .recommend-list li {
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
