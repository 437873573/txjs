<template>
  <transition name="slide">
    <div class="class-modify">
      <Info @next="success"></Info>
    </div>
  </transition>
</template>

<script>
  import Info from 'components/info'

  export default {
    name: "user-info-class-modify",
    components: {Info},
    methods: {
      success() {
        this.$http.get('/profile').then(r => {
          if (r.status === 'success') {
            this.$store.commit('SET_USER', r.data.user);
            this.$router.back()
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .class-modify {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 3;
    background: #efefef;
  }
</style>
