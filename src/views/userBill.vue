<template>
  <div class="user-bill">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="selectItem"></Switches>
    <GoodLog :data="orders" :i="currentIndex" v-show="currentIndex<4"></GoodLog>
    <GoodReturn :data="refunds" v-show="currentIndex===4"></GoodReturn>
  </div>
</template>

<script>
  import Switches from 'base/switches'
  import GoodLog from 'components/goodLog'
  import GoodReturn from 'components/goodReturn'

  export default {
    name: "user-bill",
    components: {Switches, GoodLog, GoodReturn},
    data() {
      return {
        switches: [{name: '待付款'}, {name: '待发货'}, {name: '待收货'}, {name: '已收货'}, {name: '退款'}],
        currentIndex: 1,
        orders: [],
        refunds: []
      }
    },
    methods: {
      selectItem(index) {
        this.currentIndex = index
      },
    },
    activated() {
      let i = parseInt(this.$route.query.i);
      if (i) {
        this.currentIndex = i;
      }
      this.$http.get('/orders').then(r => {
        if (r.status === 'success') {
          this.orders = r.data.orders;
          this.$store.commit('SET_ORDER_LIST', this.orders)
        }
      });
      this.$http.get('/refunds').then(r => {
        if (r.status === 'success') {
          this.refunds = r.data.orders
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .user-bill {
    @extend %cover;
    z-index: 4;
    background: $color-background;
  }

  .user-bill-content {
    position: absolute;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
