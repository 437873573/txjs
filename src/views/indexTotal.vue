<template>
  <Scroll id="total">
    <div class="total-wrapper">
      <section class="total">
        <h4>本班整体概况</h4>
        <div class="total-content">
          <div class="book">
            <span>书籍上传数量</span>
            <div class="progress" :style="{width:book_count/(100+book_count)*200+'px'}"></div>
            <span>{{book_count}}</span>
          </div>
          <div class="book">
            <span>本班用户人数</span>
            <div class="progress" :style="{width:user_count/(50+user_count)*200+'px'}"></div>
            <span>{{user_count}}</span>
          </div>
          <div class="book">
            <span>班级借阅次数</span>
            <div class="progress" :style="{width:bill_count/(300+bill_count)*200+'px'}"></div>
            <span>{{bill_count}}</span>
          </div>
        </div>
      </section>
      <section class="uploadRank" v-show="group_books.length">
        <h4 @click="toRankList(group_books)">
          本班最近一个月上传图书数量排行
          <i class="icon-tabbar_icon_more_selected"></i>
        </h4>
        <ul class="list">
          <li v-for="(v,i) in group_books.slice(0,3)" @click="selectItem(v)">
            <div>
              <i class="icon" :class="getRankCls(i)"></i>
              <span>{{v.user_name}}</span>
            </div>
            <span class="up">{{v.count}}本</span>
          </li>
        </ul>
      </section>
      <section class="borrowRank" v-show="group_bills.length">
        <h4 @click="toRankList(group_bills)">
          本班最近一个月借阅次数排行
          <i class="icon-tabbar_icon_more_selected"></i>
        </h4>
        <ul class="list">
          <li v-for="(v,i) in group_bills.slice(0,3)" @click="selectItem(v)">
            <div>
              <i class="icon" :class="getRankCls(i)">{{i+1}}</i>
              <span>{{v.user_name}}</span>
            </div>
            <span class="up">{{v.count}}本</span>
          </li>
        </ul>
      </section>
      <section class="uploadTotal">
        <h4>本班最近6个月图书上传次数</h4>
        <schart class="chart" :canvasId="upload.canvasId" :type="upload.type" :width="upload.width"
                :height="upload.height" :data="upload.data" :options="upload.options"></schart>
      </section>
      <section class="borrowTotal">
        <h4>本班最近6个月图书借阅次数</h4>
        <schart class="chart" :canvasId="borrow.canvasId" :type="borrow.type" :width="borrow.width"
                :height="borrow.height" :data="borrow.data" :options="borrow.options"></schart>
      </section>
    </div>
    <router-view></router-view>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Schart from 'vue-schart'
  export default {
    name: "total",
    components: {Schart, Scroll},
    data() {
      return {
        bill_count: 0,
        book_count: 0,
        user_count: 0,
        group_books: [],
        group_bills: [],
        upload: {
          canvasId: 'myCanvas1',
          type: 'bar',
          width: 750,
          height: 300,
          data: [],
          options: {
            title: ' ',
            topPadding: 10,
            bottomPadding: 30,
            leftPadding: -1,
            rightPadding: -10,
            bgColor: '#FFFFFF',
            fillColor: '#1E9FFF',
            contentColor: '#eeeeee',
            axisColor: '#666666',
            yEqual: 10,
          }
        },
        borrow: {
          canvasId: 'myCanvas2',
          type: 'bar',
          width: 750,
          height: 300,
          data: [],
          options: {
            title: ' ',
            topPadding: 10,
            bottomPadding: 30,
            leftPadding: -1,
            rightPadding: -10,
            bgColor: '#FFFFFF',
            fillColor: '#1E9FFF',
            contentColor: '#eeeeee',
            axisColor: '#666666',
            yEqual: 10,
          }
        },
      }
    },
    methods: {
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
        if(item.user_id==this.$store.state.user.id) return;
        this.$router.push({path: '/classBookList'});
        this.$store.commit('SET_CLASSMATE', item)
      },
      toRankList(list){
        this.$router.push({path: '/total/rankList'});
        this.$store.commit('SET_RANK_LIST',list)
      }
    },
    activated() {
      this.$http.get('/statistics').then(r => {
        if (r.status == 'success') {
          this.bill_count = r.data.group.bill_count;
          this.book_count = r.data.group.book_count;
          this.user_count = r.data.group.user_count;
          this.group_books = r.data.group_books.reverse();
          this.group_bills = r.data.group_bills.reverse();
          this.upload.data = r.data.book_half_year;
          this.borrow.data = r.data.bill_half_year;
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  #total {
    @extend %cover;
    z-index: 2;
  }

  section {
    background: #fff;
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  h4 {
    padding: 28px 24px 26px;
    font-size: $font-size-large-x;
    color: $color-text-d;
    background: #fff svg(b-border);
    @extend %between;
  }

  .chart {
    margin-top: 1px;
    width: 750px;
    height: 300px;
  }

  .total-content {
    padding: 28px 24px;
    background: #fff;
    text-align: left;
    div {
      height: 46px;
      margin-bottom: 20px;
      @extend %start;
      span:first-of-type {
        padding: 0 12px;
        flex: none;
        display: block;
        height: 46px;
        line-height: 46px;
        color: #fff;
        background: #65d0ab;
      }
      span:last-of-type {
        flex: none;
        margin-left: 12px;
        color: #65d0ab;
      }
      .progress {
        height: 46px;
        background: #65d0ab;
        max-width: 400px;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

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
</style>
