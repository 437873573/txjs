<template>
  <div class="orderList">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>

    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  import Switches from 'base/switches'
  import Scroll from 'base/scroll'

  export default {
    name: "share",
    components: {Switches, Scroll},
    data() {
      return {
        switches: [
          {name: '全部'},
          {name: '申请中'},
          {name: '借阅中'},
          {name: '借阅历史'}
        ],
        currentIndex: 0,
        data: []
      }
    },
    computed: {
      lists() {
        let list = this.data.filter(v => {
          if (this.currentIndex == '1') {
            return v.status == 'APPLYING'
          } else if (this.currentIndex == '2') {
            return v.status == 'READING'
          } else if (this.currentIndex == '3') {
            return v.status == 'FINISHED' || v.status == 'REJECT' || v.status == 'CANCEL'
          } else {
            return v
          }
        })
        return list
      }
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
      },
      selectItem(id) {
        this.$router.push({path: '/order', query: {id: id}})
      }
    },
    activated() {

    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .orderList-content {
    position: fixed;
    top: 89px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
  }


</style>
