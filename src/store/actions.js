// 根级别的 action
// 封装复杂的 mutations

import * as types from './mutations-type.js'
import {localSave, localDel, localClear, saveFavorite, delFavorite} from 'common/js/store.js'

//选择书籍展示详情
export const selectBook = function ({commit}, {book}) {
  commit(types.SET_SHOWDETAIL,true)
  commit(types.SET_BOOK,book)
}
/**
 * 保存搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const saveHistory = function ({commit}, query) {
  commit(types.SET_SEARCHHISTORY, localSave(query))
}

/**
 * 删除单个搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const delHistory = function ({commit}, query) {
  commit(types.SET_SEARCHHISTORY, localDel(query))
}

/**
 * 删除全部搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const clearHistory = function ({commit}) {
  commit(types.SET_SEARCHHISTORY, localClear())
}

// 我的收藏
export const savefavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const delfavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, delFavorite(song))
}
