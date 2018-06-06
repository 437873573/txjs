<template>
  <main class="search">
    <!-- 搜索框 -->
    <div class="search-box-wrapper">
      <SearchBox ref="searchBoxRef" @query="onQueryChange"></SearchBox>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutRef">
      <scroll class="shortcut" ref="scrollRef" :data="scrollData" :refreshDelay="refreshDelay">
        <div>
          <!--&lt;!&ndash; 热门搜索 &ndash;&gt;-->
          <!--<div class="hot-key">-->
          <!--<h1 class="title">热门搜索</h1>-->

          <!--&lt;!&ndash; <div class="item special">{{ hotkey.special_key }}</div> &ndash;&gt;-->
          <!--<ul>-->
          <!--<li class="item" v-for="item in hotkey" @click="addQuery(item.k)">-->
          <!--<span>{{ item.k }}</span>-->
          <!--</li>-->
          <!--</ul>-->
          <!--</div>-->

          <!-- 搜索历史 -->
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">历史记录</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-search_icon_delete"></i>
              </span>
            </h1>
            <SearchList :searches="searchHistory" @select="addQuery" @delete="deleteHis"></SearchList>
          </div>
        </div>
      </scroll>
    </div>

    <!-- 搜索结果 -->
    <div class="search-result" ref="resultRef" v-show="query">
      <SuggestList
        ref="suggestRef"
        :query="query"
        @beforeScroll="blurInput"
        @select="saveHis">
      </SuggestList>
    </div>

    <!-- 清空弹窗 -->
    <Confirm ref="confirmRef"
             :cancelBtnText="cancelBtnText"
             :confirmBtnText="confirmBtnText"
             @confirm="confirm" @cancel="cancel">
      <div id="text">
        <p>你确认要删除全部历史记录吗？</p>
      </div>
    </Confirm>
    <router-view></router-view>
  </main>
</template>

<script>
  import SearchBox from 'base/searchBox'
  import SearchList from 'base/searchList'
  import Scroll from 'base/scroll'
  import SuggestList from 'components/suggestList'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: {
      SearchBox,
      SuggestList,
      SearchList,
      Scroll
    },
    data() {
      return {
        cancelBtnText:'取消',
        confirmBtnText:'确定',
        // 热门搜索关键系
        hotkey: [],
        // 搜索字段 (my-search-box -> my-search -> my-suggest-List)
        query: '',
        refreshDelay: 100
      }
    },
    watch: {
      // 解决添加歌曲后不能滚动的问题
      query(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.$refs.scrollRef.refresh()
          }, 20)
        }
      }
    },
    methods: {
      ...mapActions(['saveHistory', 'delHistory', 'clearHistory']),
      // 保存搜索结果历史到 vuex 和 localstorage 中
      saveHis() {
        this.saveHistory(this.query)
      },
      deleteHis(item) {
        this.delHistory(item)
      },
      showConfirm() {
        this.$refs.confirmRef.show()
      },
      confirm() {
        this.clearHistory()
      },
      cancel() {
        return
      },
      // 当检索值改变时
      onQueryChange(query) {
        this.query = query
      },
      addQuery(k) {
        this.$refs.searchBoxRef.getQuery(k)
      },
      // 获取热搜索数据
      _getHotKey() {
        // getHotKey().then((res) => {
        //   if (res.code === 0) {
        //     // console.log(res.data.hotkey)
        //     this.hotkey = res.data.hotkey.slice(0, 10)
        //   }
        // })
      },
      // 滚动前触发事件
      blurInput() {
        this.$refs.searchBoxRef.blur()
      },
    },
    computed: {
      ...mapGetters(['searchHistory']),
      scrollData() {
        return this.hotkey.concat(this.searchHistory)
      }
    },
    created() {
      this._getHotKey()
    },
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/const.scss';
  @import 'common/scss/mymixin.scss';

  .search {
    @extend %cover;
    z-index: 4;
    .search-box-wrapper {
      padding: 20px;
      box-sizing: border-box;
      background: $color-background-h;
    }
    .shortcut-wrapper {
      position: fixed;
      top: 120px;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0 24px;
      .shortcut {
        height: 100%;
        overflow: hidden;
        .hot-key {
          // height: 170px;
          // overflow: hidden;
          margin: 0 20px 20px 20px;
          .title {
            margin-bottom: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
          .item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: $color-background-h;
            font-size: $font-size-medium;
            color: $color-text-d;
            &.special {
              color: rgba(255, 255, 255, 0.7);
              // border: 1px solid #fc4524;
            }
          }
        }
        .search-history {
          position: relative;
          .title {
            display: flex;
            align-items: center;
            height: 40px;
            font-size: $font-size-medium-x;
            color: $color-text-d;
            .text {
              flex: 1;
              text-align: left;
            }
            .clear {
              @include extend-click();
              .icon-clear {
                font-size: $font-size-large-x;
                color: $color-text-l;
              }
            }
          }
        }
      }
    }
    .search-result {
      position: fixed;
      width: 100%;
      top: 120px;
      bottom: 0;
    }
  }
  #text {
    padding: 20px 40px 40px;
    text-align: left;
    font-size: $font-size-medium-x;
    color: $color-text-l;
  }
</style>
