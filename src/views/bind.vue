<template>
  <main class="bind">
    <header class="status">
      <div class="status-left">班级验证</div>
      <div class="status-right" :class="bound&2?'':'no'">手机验证</div>
    </header>
    <Login v-if="bound===2" @success="success"></Login>
    <Info v-else @next="next"></Info>
    <Confirm ref="confirm" :confirmBtnText="text" :canShow="false" :head="head" @confirm="toIndex">
      <div id="text" v-html="message"></div>
    </Confirm>
  </main>
</template>

<script>
  import Login from 'components/login'
  import Info from 'components/info'
  import {mapGetters} from 'vuex'
  export default {
    name: "bind",
    components: {Login, Info},
    data() {
      return {
        head: '恭喜',
        message: '验证成功',
        text: '进入同学借书',
      }
    },
    computed:{
      ...mapGetters(['bound'])
    },
    methods: {
      next() {
        this.$store.commit('SET_BOUND', 2);
        this.bound=2
      },
      toIndex() {
        this.$router.replace({path: '/index'})
      },
      success() {
        this.$http.get('/profile').then(r => {
            if (r.status === 'success') {
              this.$store.commit('SET_USER', r.data.user);
              this.$refs.confirm.show()
            }
          }
        ).catch(err => console.log(err));
      }
    },
    created(){
      if(this.bound===3){
        this.toIndex()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .bind {
    @extend %cover;
    z-index: 3;
  }

  .status {
    padding-top: 60px;
    @extend %between;
    div {
      flex-grow: 1;
      height: 50px;
      border-top: 3px solid $color-theme;
      position: relative;
      font-size: $font-size-small;
      color: $color-theme;
      line-height: 60px;
      &:before {
        content: '';
        display: block;
        @extend %Center;
        top: -7px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: $color-theme;
      }
      &.no {
        color: $color-text-l;
        border-top-color: $color-text-l;
        &:before {
          background: $color-text-l;
        }
      }
    }
  }
</style>
