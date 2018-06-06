<template>
  <div class="classmate-list" ref="classmateRef">
    <PhoneList ref="listRef" :data="classmate" @select="selectItem"></PhoneList>
    <router-view></router-view>
  </div>
</template>

<script>
  import PhoneList from 'base/phoneList'
  import {mapMutations} from 'vuex'

  export default {
    name: 'classmate-list',
    components: {PhoneList},
    props: {
      classmate: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      // 子路由分配
      selectItem(item) {
        this.$router.push({
          path: `/share/classBookList`
        });
        this.setClassmate(item)
      },
      // vuex
      ...mapMutations({
        'setClassmate': 'SET_CLASSMATE'
      })
    },
  }
</script>

<style lang="scss" scoped>
</style>
