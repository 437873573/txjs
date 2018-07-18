<template>
  <transition name="slide">
    <div class="mobile-modify">
      <Login @success="success"></Login>
    </div>
  </transition>
</template>

<script>
  import Login from 'components/login'

  export default {
    name: "user-info-mobile-modify",
    components:{Login},
    methods:{
      success(){
        this.$http.get('/profile').then(r => {
          if (r.status === 'success') {
            this.$store.commit('SET_USER', r.data.user);
            this.$router.back()
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .mobile-modify{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 3;
    background: #efefef;
  }
</style>
