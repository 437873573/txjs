<template>
  <div class="select-grade">
    <div class="area-mask "
         :class="{mask_active: status}"
         @click="select"></div>
    <transition name="fade">
      <div class="area-contain" :class="{area_contain_active: status}" v-if="status">
        <section class="area-main">
          <header class="area-header border-a">
            所在年级
            <i class="area-close icon-tabbar_icon_del_selected" @click="select"></i>
          </header>
          <div class="area-content border">
            <ul class="area-data">
              <li class="area-data-item"
                  v-for="(item,index) in data"
                  @click="checkGradeOne(index,item)"
                  :class="{red: index===checkGrade}">
                <span class="area-text">{{item+'年级'}}</span>
                <i class="icon-tabbar_icon_choice_selected"
                   style="margin-left: 0.1rem"
                   :class="{none: index !== checkGrade}"></i>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "select-grade",
    data() {
      return {
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        maskStatus: true,
        checkGrade: 0,
        gradeName: '',
        gradeId: ''
      }
    },
    props: {
      status: {
        type: Boolean,
        default: false
      },
      gId: {
        type: Number,
        default: 0
      }
    },
    methods: {
      select() {
        this.$emit('gradeShow', this.gradeId);
        this.$emit('update:grade', this.gradeName)
      },
      checkGradeOne(it, name) {
        this.checkGrade = it;
        this.gradeName = name + '年级';
        this.gradeId = it + 1;
        this.select()
      },
    },
  }
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .none {
    display: none
  }

  .border-a {
    position: relative;
    border: none;
  }

  .border-a:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background: #efefef;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  .area-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #000;
    opacity: .7;
    display: none;
  }

  .mask_active {
    z-index: 99;
    display: block;
  }

  .area-contain {
    display: none;
    background-color: #fff;
    text-align: left;
  }

  .area_contain_active {
    z-index: 100;
    display: block;
    height: 500px;
    width: 100%;
    position: fixed;
    top: auto;
    left: 0px;
    bottom: 0px;
  }

  .area-header {
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 35px;
  }

  .area-close {
    position: absolute;
    right: 30px;
    line-height: 80px;
  }

  .area-top {
    height: 80px;
    line-height: 80px;
  }

  .area-top-item {
    display: inline-block;
    font-size: 33px;
    padding: 0 10px;
    max-width: 245px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .area_top_active {
    color: #38a7ff;
    border-bottom: 1px solid #38a7ff;
  }

  .area-data {
    height: 420px;
    overflow: auto;
  }

  .area-data-item {
    height: 70px;
    line-height: 70px;
    padding: 0rem 20px;
    font-size: 30px;
  }

  .red {
    color: #38a7ff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: height .2s
  }

  .fade-enter, .fade-leave-active {
    height: 0
  }
</style>
