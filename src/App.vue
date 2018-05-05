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
    data(){
      return{
       bound:0
      }
    },
    beforeCreate(){
      if(!localStorage.accessToken){

      }
    },
    created() {
      // this.$http.get('/profile').then(r=>console.log(r)).catch(err=>console.log(err))
      if(this.bound==3){
        this.$router.push({name: 'index'})
      }else{
        this.$router.push({name: 'bind',query:{status:this.bound}})
      }
    }
  }
</script>

<style lang="scss">
  @import 'common/scss/index.scss';
</style>
