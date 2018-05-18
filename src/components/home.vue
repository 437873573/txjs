<template>
  <div class="index">
    <Tab :i="index"></Tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import Tab from './tab'


  export default {
    name: "home",
    data() {
      return {
        index: 0,
      }
    },
    methods: {
      hash() {
        let hash = window.location.hash;
        // console.log(hash)
        if (hash.search('library')!=-1) {
          return this.index = 1
        } else if (hash.search('mall')!=-1) {
          return this.index = 2
        } else if (hash.search('user')!=-1) {
          return this.index = 3
        } else {
          return this.index = 0
        }
      }
    },
    updated() {
      this.hash()
    },
    activated() {
      this.hash()
    },
    components: {
      Tab,
    }
  }
</script>

<style scoped>
</style>
