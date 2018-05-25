/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */
import { getStorage, getFavorite } from 'common/js/store.js'

const state = {
  //用户信息
  user:{},
  //书本信息
  book:{},
  //书籍详情页显示状态
  showDetail:false,
  // 书架信息
  shelf: {},
  // 推荐页书单
  recommendList: {},
  // 图书排行数据
  rankList: {},
  // 搜索结果
  searchHistory: getStorage(),
  // 我的收藏
  favoriteList: getFavorite()
}

export default state
