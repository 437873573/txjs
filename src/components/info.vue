<template>
  <section class="info">
    <input type="text" placeholder="请输入您的姓名" v-model="name">
    <div class="select">
      <input type="text" placeholder="请选择您所在的地区" v-model="areaStatus" @click="maskStatus">
      <i></i>
    </div>
    <div class="select">
      <select v-model="school">
        <option value="">请选择您所在的学校</option>
      </select>
      <i></i>
    </div>
    <div class="select">
      <select v-model="grade">
        <option value="">请选择您所在的年级</option>
      </select>
      <i></i>
    </div>
    <div class="select">
      <select v-model="team">
        <option value="">请选择您所在的班级</option>
      </select>
      <i></i>
    </div>
    <div class="btn x" @click="sub">完成</div>
    <router-link tag="div" class="noSchool" :to="{name:'create'}">找不到学校？点击这里申请开通</router-link>
    <AreaSelect :data="areaList" :status="areaSelect" :class="{'none':!areaSelect}" :area='areaStatus'
                @areashow="maskStatus" @update:area="val => areaStatus = val">
    </AreaSelect>
  </section>
</template>

<script>
  import AreaSelect from 'base/areaSelect'
  import {AREAS} from 'common/js/area.js'

  export default {
    name: "info",
    data() {
      return {
        name: '',
        provinceId:'',
        cityId: '',
        regionId:'',
        school: '',
        grade: '',
        team: '',
        areaStatus: '',
        areaList: [],
        areaSelect: false,
      }
    },
    methods: {
      maskStatus(ids) {
        this.areaSelect = !this.areaSelect;
        this.provinceId=ids.provinceId;
        this.cityId=ids.cityId;
        this.regionId=ids.regionId;
      },
      sub() {
        console.log(this.provinceId,this.cityId,this.regionId)
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

  .info {
    width: 580px;
    margin: 50px auto 0;
    .select {
      margin: 30px 0;
    }
    .noSchool{
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 30px;
      color: $color-theme;
      font-size: $font-size-medium;
    }
  }
</style>
