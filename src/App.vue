<template>
  <div id="app">
    <Tab :i="index"></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Tab from 'components/tab'

  export default {
    name: 'App',
    components: {Tab},
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
        } else if (hash.search('mall') != -1) {
          return this.index = 2
        } else if (hash.search('user') != -1) {
          return this.index = 3
        } else {
          return this.index = 0
        }
      }
    },
    updated() {
      this.hash()
    },
    mounted(){
      this.$http.get('/profile').then(
        r => {
          let bound = r.data.bound
          if ((bound & 1) == 0) {
          this.$router.push({name: 'login'})
          } else if ((bound & 2) == 0) {
            this.$router.push({name: 'info'})
          } else {
            this.$store.commit('SET_USER',r.data.user)
            this.hash()
          }
        }
      ).catch(err => console.log(err))
    },
    activated() {
      this.hash()
    }
  }
</script>

<style lang="scss">
  @import 'common/scss/index.scss';

  #app {
    width: 100%;
    height: 100%;
  }
</style>
