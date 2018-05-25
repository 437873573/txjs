import {mapActions, mapGetters} from 'vuex'
export const collect={
  computed: {
    ...mapGetters([
      'favoriteList'
    ])
  },
  methods:{
    ...mapActions(['saveFavoriteList', 'delFavoriteList']),
    toggleFavoriteCls(book) {
      if (this._isFavorite(book)) {
        this.delFavoriteList(book)
      } else {
        this.saveFavoriteList(book)
      }
    },
    getFavoriteCls(book) {
      if (this._isFavorite(book)) {
        return 'icon-tabbar_icon_collect_selected'
      } else {
        return 'icon-tabbar_icon_collect_default'
      }
    },
    _isFavorite(book) {
      let index = this.favoriteList.findIndex((item) => {
        return book.id === item.id
      });
      return index > -1
    },
  }
};
