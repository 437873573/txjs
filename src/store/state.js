/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */
import { getStorage, getFavorite } from 'common/js/store.js'

const state = {
  //绑定信息
  bound:0,
  //用户信息
  user:{},
  //同学信息
  classmate:{},
  //书本信息
  book:{},
  //借书单显示状态
  carts:0,
  //购物车显示状态
  bill:0,
  //购物车列表
  goodList:[],
  //购物车列表
  orderList:[],
  // 书架信息
  shelf: {},
  // 图书排行
  rankList: [],
  //机构图书
  orgList: [],
  // 搜索结果
  searchHistory: getStorage(),
};

export default state
