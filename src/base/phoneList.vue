<template>
  <Scroll ref="scrollRef"
             :data="data"
             :probeType="probeType"
             :listen-scroll="listenScroll"
             @scroll="scroll"
             class="phone-list">
    <!-- 左侧歌手列表 -->
    <ul>
      <li ref="leftRef" v-for="group in data" class="list-group">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.items" @click="selectItem(item)" class="list-group-item">
            <div class="person">
              <div class="img">
                <img v-lazy="item.avatar" class="avatar">
              </div>
              <span class="name" v-html="item.realname"></span>
            </div>
            <h5 class="count">共{{item.count}}本图书</h5>
          </li>
        </ul>
      </li>
    </ul>

    <!--&lt;!&ndash; 右侧字母列表 &ndash;&gt;-->
    <!--<div @touchstart="onShortcutTouchstart"-->
         <!--@touchmove.stop.prevent="onShortcutTouchmove"-->
         <!--class="list-shortcut">-->
      <!--<ul>-->
        <!--<li-->
          <!--v-for="(item, index) in shortcut"-->
          <!--:data-index="index"-->
          <!--:class="{ 'current': currentIndex === index }"-->
          <!--class="item">{{ item }}</li>-->
      <!--</ul>-->
    <!--</div>-->

    <!-- 滚动固定标题实现 -->
    <div ref="fixedTitleRef" v-show="fixedTitle" class="list-fixed">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>

    <!-- loading 组件 -->
    <div v-show="!flag" class="loading-container">
      <Loading></Loading>
    </div>
    <!-- noResult 组件 -->
    <div class="noResult-container" v-show="flag&&!data.length">
      <NoResult :title="title"></NoResult>
    </div>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'
  import { myDOM } from 'common/js/myutils.js'

  const RIGHT_ONEWORD_HEIGHT = 18
  const TITLE_HEIGHT = 15

  export default {
    components: {
      Scroll,
      Loading,
      NoResult
    },
    data () {
      return {
        title:'还没有同学加入，快去邀请加入吧',
        scrollY: -1,
        currentIndex: 0,
        // 标题上推y值（热门标题 - A 标题）
        diff: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      },
      flag:{
        type:Boolean,
        default:false
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._caclHeight()
        }, 20)
      },
      // 监听 scrollY 落在 leftListHeight 的哪个区间，实现高亮联动
      scrollY(newY) {
        const leftListHeight = this.leftListHeight

        // 当滚动到顶部，newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }

        // 在中间部分滚动
        for (let i = 0; i < leftListHeight.length - 1; i++) {
          let height1 = leftListHeight[i]
          let height2 = leftListHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }

        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = leftListHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0

        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixedTitleRef.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    },
    methods: {
      // 对父亲提供的刷新 better-scroll 方法
      refresh() {
        this.$refs.scrollRef.refresh()
      },
      // 向上派发 item 项点击事件
      selectItem(item) {
        this.$emit('select', item)
      },
      // 点击右侧，左侧联动
      onShortcutTouchstart(e) {
        // console.log(e.target)
        // console.log(e.touches)

        let nowTouch = e.touches[0]
        this.touch.y1 = nowTouch.pageY

        let nowIndex = myDOM.customAttribute(e.target, 'index')
        this.touch.nowIndex = nowIndex

        this._scrollTo(nowIndex)
      },
      // 滑动右侧，左侧联动，与左侧共享 touch 对象
      onShortcutTouchmove(e) {
        let nowTouch = e.touches[0]
        this.touch.y2 = nowTouch.pageY

        // 两次 touch y轴偏移
        let offset = Math.floor((this.touch.y2 - this.touch.y1) / RIGHT_ONEWORD_HEIGHT)
        let nowIndex = Number(this.touch.nowIndex) + offset

        this._scrollTo(nowIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        // console.log(index)

        // 超出范围不能点击和拖动
        if (!index) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.leftListHeight.length - 2) {
          index = this.leftListHeight.length - 2
        }

        this.currentIndex = Number(index)
        this.$refs.scrollRef.scrollToElement(this.$refs.leftRef[index], 0)
      },
      // 计算 leftListHeight 的高度
      _caclHeight() {
        // 初始化
        let height = 0
        this.leftListHeight = []
        this.leftListHeight.push(height)

        let list = this.$refs.leftRef
        for (let i = 0; i < list.length; i++) {
          height += list[i].clientHeight
          this.leftListHeight.push(height)
        }
      }
    },
    computed: {
      // 快速入口排列数组
      shortcut() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    created () {
      this.touch = {}
      this.listenScroll = true
      this.leftListHeight = []
      this.probeType = 3 // better-scroll 滚动组件 不截留
    },
    mounted () {},
    destroyed () {}
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/const.scss';
  @import 'common/scss/mymixin.scss';

  .phone-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group {
      background: #fff;
      .list-group-title {
        height: 44px;
        line-height: 44px;
        padding-left: 24px;
        font-size: $font-size-medium;
        color: $color-text-l;
        background: $color-background;
        text-align: left;
      }
      .list-group-item {
        @extend %between;
        height: 120px;
        box-sizing: border-box;
        border-bottom: 1px solid $color-border;
        border-image: svg(b-border) 1;
        margin-left: 24px;
        padding-right: 24px;
        &:last-of-type{
          border-bottom: none;
          border-image: none;
        }
        .person{
          height: 100%;
          @extend %start;
          .img {
            width: 80px;
            height: 80px;
            img{
              border-radius: 50%;
            }
          }
          .name {
            margin-left: 20px;
            color: $color-text-d;
            font-size: $font-size-large;
          }
        }
        .count{
          color: $color-text-l;
          font-size: $font-size-large;
        }
      }
    }
    .list-shortcut {
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: $color-background-d;
      .item {
        padding: 3px;
        line-height: 1;
        color: $color-text;
        font-size: $font-size-small;
        &.current {
          color: $color-theme;
        }
      }
    }
    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title {
        height: 44px;
        line-height: 44px;
        padding-left: 24px;
        box-sizing: border-box;
        font-size: $font-size-medium;
        color: $color-text-l;
        background: #fff svg(b-border);
        text-align: left;
      }
    }
    .loading-container ,.noResult-container{
      @extend %middle;
    }
  }
</style>
