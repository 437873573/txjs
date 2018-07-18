<template>
  <transition name="slide">
    <Scroll class="rank-list">
      <ul class="list">
        <li v-for="(v,i) in rankList" @click="selectItem(v)">
          <div>
            <i class="icon" :class="getRankCls(i)">{{i+1}}</i>
            <span>{{v.user_name}}</span>
          </div>
          <span class="up">{{v.count}}本</span>
        </li>
      </ul>
      <router-view></router-view>
    </Scroll>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from 'base/scroll'

  export default {
    name: "rank-list",
    components: {Scroll},
    computed: {
      ...mapGetters(['rankList','user'])
    },
    methods:{
      getRankCls(index) {
        if (index === 0) {
          return 'icon0'
        } else if (index === 1) {
          return 'icon1'
        } else if (index === 2) {
          return 'icon2'
        }
      },
      selectItem(item) {
        if(item.user_id==this.user.id) return;
        this.$store.commit('SET_CLASSMATE', item);
        this.$router.push({path: '/classBookList'})
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .rank-list {
    @extend %cover;
    z-index: 5;
    .list {
      background: #fff;
      li {
        margin-left: 24px;
        padding-right: 24px;
        background: #fff;
        border-bottom: 1px solid $color-border;
        border-image: svg(b-border) 1 1;
        text-align: left;
        height: 98px;
        box-sizing: border-box;
        @extend %between;
        div {
          @extend %start;
          i {
            display: inline-block;
            width: 36px;
            height: 40px;
            margin-right: 12px;
            background-size: 36px 40px;
            text-align: center;
            line-height: 40px;
            &.icon0, &.icon1, &.icon2 {
              color: transparent;
            }
            &.icon0 {
              @include bg-image('first');
            }
            &.icon1 {
              @include bg-image('second');
            }
            &.icon2 {
              @include bg-image('third');
            }
          }
        }
        &:last-of-type {
          border-bottom: none;
          border-image: none;
        }
        .up {
          color: $color-theme;
        }
        .bow {
          color: #65d0ab;
        }
      }
    }
  }
</style>
