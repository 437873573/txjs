<template>
  <main class="cteate">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
    <div class="form">
      <div class="input">
        <input type="text" placeholder="请输入您的姓名">
      </div>
      <div class="input">
        <input type="text" placeholder="请输入您申请开通的学校名称">
      </div>
      <div class="select">
        <input type="text" placeholder="请选择您所在的地区" v-model="areaStatus" @click="maskStatus">
        <i></i>
      </div>
    </div>
    <AreaSelect :data="areaList" :status="areaSelect" :class="{'none':!areaSelect}" :area='areaStatus'
                @areashow="maskStatus" @update:area="val => areaStatus = val">
    </AreaSelect>
  </main>
</template>

<script>
  import AreaSelect from 'base/areaSelect'
  import {AREAS} from 'common/js/area.js'

  export default {
    name: "create",
    data() {
      return {
        switches: [
          {name: '个人创建'},
          {name: '机构创建'}
        ],
        currentIndex: 0,
        provinceId: '',
        cityId: '',
        regionId: '',
        areaStatus: '',
        areaList: [],
        areaSelect: false,
      }
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
      },
      maskStatus(ids) {
        this.areaSelect = !this.areaSelect;
        this.provinceId = ids.provinceId;
        this.cityId = ids.cityId;
        this.regionId = ids.regionId;
      },
    },
    created: function () {
      this.areaList = AREAS;
    },
    components: {
      AreaSelect,
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  @import "common/scss/form.scss";
  .form{
    width: 580px;
    margin: 0 auto;
    .input,.select{
      margin: 30px 0;
    }
  }
</style>
