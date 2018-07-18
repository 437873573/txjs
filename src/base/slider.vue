<template>
  <div class="my-slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots" v-if="showDot">
      {{currentPageIndex+1}}/{{dots.length}}
    </div>
  </div>
</template>

<script >
  import BScroll from 'better-scroll'
  import { myDOM } from 'common/js/myutils.js'

  export default {
    name:'slider',
    data () {
      return {
        dots: [],
        currentPageIndex:0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDot: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      }
    },
    watch: {
      loop() {
        this.update()
      },
      autoPlay() {
        this.update()
      },
      speed() {
        this.update()
      },
      threshold() {
        this.update()
      }
    },
    methods: {
      update() {
        if (this.slider) {
          this.slider.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSliderWidth(true)
        this.slider.refresh()
      },
      init() {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSliderWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      },
      // 轮播图(sliderGroup)宽度
      _setSliderWidth (isResize) {
        // 拿到传过来的图片
        this.children = this.$refs.sliderGroup.children
        // 拿到父元素（slider）宽度
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth

        // 动态添加 class、width
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          myDOM.addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px'
      },
      // 初始化轮播图
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          bounce: false,
          stopPropagation: true,
          click: this.click
        });

        this.slider.on('scrollEnd', this._onScrollEnd);

        this.slider.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        });

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      // 初始化轮播点
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      // 自动播放
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
    },
    mounted () {
      this.update();
      window.addEventListener('resize', () => {
        if (!this.slider || !this.slider.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slider.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slider) {
        return
      }
      this.slider.enable()
      let pageIndex = this.slider.getCurrentPage().pageX
      this.slider.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slider.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slider.disable()
      clearTimeout(this.timer)
    },
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/const.scss';
  @import 'common/scss/mymixin.scss';

  .my-slider {
    min-height: 320px;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img {
          display: block;
          width: 100%;

        }
      }
    }
    .dots {
      position: absolute;
      right: 20px;
      bottom: 16px;
      font-size: $font-size-medium;
      color: black;
    }
  }
</style>

