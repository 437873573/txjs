<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      // this.$http.get('/profile').then(
      //   r => {
      //     this.bound = r.data.bound
      //   }).then(
      //   () => {
      //     if ((this.bound & 1) == 0) {
      //       this.$router.push({name: 'login'})
      //     } else if ((this.bound & 2) == 0) {
      //       this.$router.push({name: 'info',query:{status:1}})
      //     } else {
      //       this.$router.push({name: 'home'})
      //     }
      //   }
      // ).catch(err => console.log(err))
      this.$router.push({name: 'home'})
    }
  }
</script>

<style lang="scss">
  @import 'common/scss/index.scss';
</style>
