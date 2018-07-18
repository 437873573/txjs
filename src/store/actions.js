// 根级别的 action
// 封装复杂的 mutations

import * as types from './mutations-type.js'
import {localSave, localDel, localClear} from 'common/js/store.js'

/**
 * 保存搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const saveHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, localSave(query))
};

/**
 * 删除单个搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const delHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, localDel(query))
};

/**
 * 删除全部搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const clearHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, localClear())
};
