// 根级别的 mutation

import * as types from './mutations-type.js'

const mutations = {
  [types.SET_BOOK](state, book) {
    state.book = book
  },
  [types.SET_SHOWDETAIL](state,showDetail){
    state.showDetail=showDetail
  },
  [types.SET_SHELF](state, shelf) {
    state.shelf = shelf
  },
  [types.SET_RECOMMENDLIST](state, recommendList) {
    state.recommendList = recommendList
  },
  [types.SET_RANKLIST](state, rankList) {
    state.rankList = rankList
  },
  [types.SET_SEARCHHISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  }
}

export default mutations
