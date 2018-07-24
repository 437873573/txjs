<template>
  <main class="mall">
    <Scroll class="wrapper"
            ref="scroll">
      <div class="mall-content">
        <section class="slider-wrapper" v-if="banners.length">
          <Slider>
            <div v-for="banner in banners">
              <a :href="banner.link">
                <img :src="banner.image" @load="loadImg" @error="error">
              </a>
            </div>
          </Slider>
        </section>
        <div class="searchBox" ref="searchBox">
          <div class="search" ref="search" @click="$router.push({path:'/search'})"><i class="icon-btn_icon_search"></i>&nbsp;&nbsp;在这里搜你想要的书籍
          </div>
        </div>
        <div class="sort" v-show="categories.length">
          <router-link tag="h4" :to="{path:'/mall/sort'}">
            <span>热门分类</span>
            <i class="icon-tabbar_icon_more_selected"></i>
          </router-link>
          <ul class="lists">
            <li v-for="(v,i) in categories" :key="v.id" @click="selectItem(v.id)">
              <div class="img">
                <img v-lazy="v.image">
              </div>
              <h6>{{v.name}}</h6>
            </li>
          </ul>
        </div>
        <div class="hot" v-show="hotBook.length">
          <router-link tag="h4" :to="{path:'/mall/mallList',query:{type:'hot'}}">
            <span>热门商品</span>
            <i class="icon-tabbar_icon_more_selected"></i>
          </router-link>
          <ul class="lists">
            <li v-for="v in hotBook" :key="v.id" @click="selectBook(v.id)">
              <div class="img">
                <img v-lazy="v.image">
              </div>
              <h6>{{v.name}}</h6>
            </li>
          </ul>
        </div>
        <div class="new" v-show="newBook.length">
          <router-link tag="h4" :to="{path:'/mall/mallList',query:{type:'new'}}">
            <span>最新上架</span>
            <i class="icon-tabbar_icon_more_selected"></i>
          </router-link>
          <ul class="lists">
            <li v-for="v in newBook" :key="v.id" @click="selectBook(v.id)">
              <div class="img">
                <img v-lazy="v.image">
              </div>
              <h6>{{v.name}}</h6>
            </li>
          </ul>
        </div>
      </div>
      <BillCar class="billCar" ref="billCar"></BillCar>
    </Scroll>
    <router-view></router-view>
  </main>
</template>

<script>
  import Slider from 'base/slider'
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import BookList from 'base/bookList'
  import BillCar from 'base/billCar'

  export default {
    name: "mall",
    components: {
      Slider,
      Scroll,
      Loading,
      BookList,
      BillCar
    },
    data() {
      return {
        banners: [],
        categories: [],
        hotBook: [],
        newBook: []
      }
    },
    methods: {
      selectItem(id) {
        this.$router.push({path: '/mall/mallList', query: {id: id}})
      },
      selectBook(id) {
        this.$router.push({name: 'mallBook', params: {id: id}})
      },
      //当首次获取到图片时，Better-scroll 重新计算
      loadImg() {
        if (!this.flag) {
          this.$refs.scroll.refresh();
          this.flag = true
        }
      },
      error() {
        this.$http.get('/banner').then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.banners = r.data.banners
          }
        });
      },
    },
    activated() {
      //获取轮播图
      this.$http.get('/banner', {params: {type: 2}}).then(r => {
        // console.log(r)
        if (r.status == 'success') {
          this.banners = r.data.banners;
          this.$refs.scroll.refresh();
        }
      });
      let timer = setTimeout(() => {
        //图书分类
        this.$http.get('/good-categories').then(r => {
          if (r.status === 'success') {
            this.categories = r.data.categories.slice(0, 4)
          }
        });
        //最新，最热图书
        this.$http.get('/goods', {params: {type: ['new']}}).then(r => {
          if (r.status === 'success') {
            this.newBook = r.data.goods.data.slice(0, 4)
          }
        });
        this.$http.get('/goods', {params: {type: ['hot']}}).then(r => {
          if (r.status === 'success') {
            this.hotBook = r.data.goods.data.slice(0, 4)
          }
        });
        this.$refs.billCar.getList();
        clearTimeout(timer)
      }, 60);

    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .billCar {
    position: fixed;
    bottom: 128px;
    right: 30px;
    z-index: 10;
  }

  .mall {
    position: fixed;
    z-index: 3;
    width: 100%;
    top: 0;
    bottom: 98px;
  }

  .wrapper {
    height: 100%;
    overflow: hidden;
  }

  .searchMinBox {
    position: absolute;
    z-index: 3;
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
      text-align: left;
      background: $color-background;
      @extend %start;
      i {
        color: $color-text-l;
        font-size: 36px;
        margin-left: 24px;
      }
    }
  }

  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
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
      background: $color-background-h;
      box-shadow: 0 10px 18px rgba(0, 0, 0, 0.1);
      @extend %center;
      i {
        margin-left: -36px;
        color: $color-text-l;
        font-size: 36px;
      }
    }
  }

  h4 {
    padding: 24px;
    border-bottom: 1px solid $color-border;
    border-image: svg(b-border) 1 1;
    @extend %between;
    background: #fff;
    span {
      border-left: 8px solid $color-theme;
      padding-left: 12px;
      font-size: $font-size-large;
      color: $color-text-d;
    }
    i {
      color: $color-text-l;
    }
  }

  .lists {
    padding: 20px 0;
    margin-bottom: 20px;
    @extend %start;
    background: #fff;
    li {
      flex: none;
      width: 157.5px;
      margin-left: 24px;
      @extend %center;
      flex-direction: column;
      .img {
        width: 142px;
        height: 200px;
        margin-bottom: 20px;
      }
      h6 {
        width: 100%;
        @include no-wrap
      }
    }
  }

  .sort li .img {
    width: 92px;
    height: 100px;
  }

  .loading {
    position: relative;
    width: 100%;
    height: 600px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
