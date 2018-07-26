<template>
  <div id="app">
    <TabBar :i="index"></TabBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import TabBar from 'components/tabBar'
  import {share} from 'common/js/share'

  export default {
    name: 'App',
    components: {TabBar},
    mixins: [share],
    data() {
      return {
        index: 0,
      }
    },
    methods: {
      hash() {
        let hash = window.location.hash;
        let that = this;
        // console.log(hash)
        if (hash.search('share') != -1) {
          let title = '我的同学都在用同学借书共享书籍，赶快加入我们，一起分享美好的阅读体验';
          that.share({title: title})
          return this.index = 1
        } else if (hash.search('organization') != -1) {
          let title = '我用同学借书在自己周边找到好多家机构可以共享书籍，你也可以';
          that.share({title: title})
          return this.index = 2
        } else if (hash.search('mall') != -1) {
          let title = '我在同学借书的图书商城找到好多有内涵的图书';
          that.share({title: title})
          return this.index = 3
        } else if (hash.search('user') != -1) {
          that.share()
          return this.index = 4
        } else if (hash.search('index') != -1){
          that.share()
          return this.index = 0
        }
      }
    },
    updated() {
      this.hash()
    },
    mounted() {
      this.$http.get('/profile').then(r => {
        this.$store.commit('SET_BOUND', r.data.bound);
        this.$store.commit('SET_USER', r.data.user);
        window.links = window.location.origin + '?user_id=' + r.data.user.id;
      });
    },
  }
</script>

<style lang="scss">
  @import 'common/scss/index.scss';

  #app {
    width: 100%;
    height: 100%;
  }
</style>
