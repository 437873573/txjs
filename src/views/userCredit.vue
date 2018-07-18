<template>
  <div class="user-credit">
    <div class="header">
      <h2>{{user.credit}}</h2>
      <span>{{user.credit>60?'信用良好':'信用一般'}}</span>
    </div>
    <h5>信用记录</h5>
    <Scroll class="bill-content" :data="logs">
      <ul class="bill-list">
        <li class="item" v-for="v in logs" :key="v.id">
          <div class="left">
            <h3 v-html="v.description"></h3>
            <h4 v-html="v.time"></h4>
          </div>
          <div class="right">
            <h3 v-if="v.amount>0">+{{v.amount}}</h3>
            <h3 v-if="v.amount<0" :class="{not:v.amount<0}">{{v.amount}}</h3>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll'
  import {mapGetters} from 'vuex'
  export default {
    name: "user-coin",
    components: {Scroll},
    computed:{
      ...mapGetters(['user'])
    },
    data() {
      return {
        logs: [],
      }
    },
    methods: {
      getLog() {
        this.$http.get('/credit/log').then(r => {
          if (r.status == 'success') {
            this.logs = r.data.creditLog.data
          }
        })
      },
    },
    activated(){
      this.getLog()
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .user-credit {
    @extend %cover;
    z-index: 4;
    .header {
      margin: 30px 24px 50px;
      height: 322px;
      background: url("../common/img/user-credit.png") no-repeat center/cover;
      @extend %center;
      flex-direction: column;
      color: $color-text-ll;
      font-size: $font-size-medium-x;
      h2 {
        font-size: 96px;
      }
    }
    h5 {
      padding: 0 0 20px 24px;
      font-size: $font-size-medium;
      text-align: left;
    }
    .bill-content {
      position: absolute;
      top: 450px;
      bottom: 0;
      width: 100%;
      overflow: hidden;
    }
    .item {
      height: 120px;
      border-bottom: 1px solid $color-border;
      border-image: svg(b-border) 1 ;
      padding: 0 24px;
      box-sizing: border-box;
      @extend %between;
      align-items: stretch;
      background: #FFF;
      &:last-of-type {
        border-bottom: none;
        border-image: none;
      }
      .left {
        @extend %center;
        align-items: flex-start;
        flex-direction: column;
        line-height: 1.5;
        h4 {
          font-size: $font-size-medium;
          color: $color-text-l;
        }
      }
      .right {
        line-height: 120px;
        color: $color-theme;
        .not {
          color: red;
        }
      }
    }
  }
</style>
