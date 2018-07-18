// 根级别的 mutation

import * as types from './mutations-type.js'

const mutations = {
  [types.SET_BOUND](state, bound) {
    state.bound = bound
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_CLASSMATE](state, classmate) {
    state.classmate = classmate
  },
  [types.SET_BOOK](state, book) {
    state.book = book
  },
  [types.SET_SHELF](state, shelf) {
    state.shelf = shelf
  },
  [types.SET_CARTS](state, carts) {
    state.carts = carts
  },
  [types.SET_BILL](state, bill) {
    state.bill = bill
  },
  [types.SET_RANK_LIST](state, rankList) {
    state.rankList = rankList
  },
  [types.SET_GOOD_LIST](state, goodList) {
    state.goodList = goodList
  },
  [types.SET_ORG_LIST](state, orgList) {
    state.orgList = orgList
  },
  [types.SET_ORDER_LIST](state, orderList) {
    state.orderList = orderList
  },
  [types.SET_SEARCH_HISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  },
};

export default mutations
