<template>
  <div class="classmate-list" ref="classmateRef">
    <PhoneList ref="listRef" :data="classmate" @select="selectItem" :flag="flag"></PhoneList>
    <router-view></router-view>
  </div>
</template>

<script>
  import PhoneList from 'base/phoneList'
  export default {
    name: 'classmate-list',
    components: {PhoneList},
    props: {
      classmate: {
        type: Array,
        default() {
          return []
        }
      },
      flag:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      // 子路由分配
      selectItem(item) {
        this.$store.commit('SET_CLASSMATE', item);
        this.$router.push({path: '/classBookList'})
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>
