<template>
  <transition name="slide">
    <div class="sort">
      <Scroll class="nav-wrapper" :data="nav">
        <ul class="nav">
          <li v-for="(v,i) in nav" :class="{selected:sid===i}" @click="sid=i" :key="i">
            {{v}}
          </li>
        </ul>
      </Scroll>
      <Scroll class="list-wrapper" :data="lists">
        <ul class="list">
          <li v-for="v in lists" :key="v.id" @click="selectItem(v.id)">
            <div class="img">
              <img v-lazy="v.image">
            </div>
            <h6>{{v.name}}</h6>
          </li>
        </ul>
      </Scroll>
    </div>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll'

  export default {
    name: "sort",
    components: {Scroll},
    data() {
      return {
        sid:0,
        data: []
      }
    },
    computed:{
      nav(){
        let old=this.data.map(v=>{
          return v.p_name
        });
        return [...new Set(old)];
      },
      lists(){
        let arr=this.data.filter(v=>{
          return v.p_name===this.nav[this.sid]
        });
        return arr
      }
    },
    methods:{
      selectItem(id){
        this.$router.push({path: '/mall/mallList',query:{id:id}})
      }
    },
    mounted(){
      this.$http.get('/good-categories').then(r => {
        if (r.status === 'success') {
          this.data = r.data.categories
        }
      });
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .sort {
    @extend %cover;
    z-index: 3;
  }

  .nav-wrapper {
    height: 100%;
    width: 164px;
    overflow: hidden;
    float: left;
    .nav li {
      width: 164px;
      height: 86px;
      background: #fff;
      line-height: 86px;
      color: $color-text-d;
      &.selected {
        background: $color-background;
        position: relative;
        &:before {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          content: '';
          display: block;
          width: 8px;
          height: 46px;
          background: $color-theme;
        }
      }
    }
  }

  .list-wrapper {
    height: 100%;
    width: 586px;
    overflow: hidden;
    float: left;
    padding: 24px;
    box-sizing: border-box;
    .list {
      border-radius: 10px;
      background: #fff;
      padding: 30px 0;
      @extend %start;
      flex-wrap: wrap;
      li {
        width: 33.3333333%;
        margin-bottom: 30px;
        @extend %center;
        flex-direction: column;
        .img {
          width: 88px;
          height: 124px;
          margin-bottom: 20px;
        }
        h6 {
          font-size: 26px;
        }
      }
    }
  }
</style>
