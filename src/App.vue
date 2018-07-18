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
        // console.log(hash)
        if (hash.search('share') != -1) {
          return this.index = 1
        } else if (hash.search('organization') != -1) {
          return this.index = 2
        } else if (hash.search('mall') != -1) {
          return this.index = 3
        } else if (hash.search('user') != -1) {
          return this.index = 4
        } else {
          return this.index = 0
        }
      }
    },
    updated() {
      this.hash()
    },
    mounted() {
      clearTimeout(this.wait);
      this.wait = setTimeout(() => {
        this.$http.get('/profile').then(r => {
          let bound = r.data.bound;
          this.$store.commit('SET_BOUND', bound);
          if (bound === 3) {
            this.$store.commit('SET_USER', r.data.user);
            window.link = 'http://txjs-wechat-hnw.mion.cn?user_id=' + r.data.user.id;
            if (window.location.hash === '#/') {
              this.$router.replace({path: '/index'})
            } else {
              this.hash()
            }
          } else {
            this.$router.replace({path: '/bind'})
          }
        });
      }, 500);
      this.share()
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
