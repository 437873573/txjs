<template>
  <div class="index">
    <Tab></Tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import Tab from './tab'


  export default {
    name: "home",
    components: {
      Tab,
    }
  }
</script>

<style scoped>
</style>
