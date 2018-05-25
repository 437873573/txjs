<template>
  <section class="info">
    <input type="text" placeholder="请输入您的姓名" v-model="name">
    <div class="select">
      <input type="text" placeholder="请选择您所在的地区" v-model="areaStatus" @click="maskStatus" ref="place">
      <i></i>
    </div>
    <div class="select">
      <select v-model="schoolId">
        <option value="0" selected="selected">请选择您所在的学校</option>
        <option :value="v.id" v-for="(v,i) in school" :key="v.id">{{v.name}}</option>
      </select>
      <i></i>
    </div>
    <div class="select">
      <select v-model="gradeId">
        <option value=0 selected>请选择您所在的年级</option>
        <option :value="v" v-for="v in 9">{{grade[v-1]}}年级</option>
      </select>
      <i></i>
    </div>
    <div class="select">
      <select v-model="teamId">
        <option value="0">请选择您所在的班级</option>
        <option :value="v" v-for="v in 30">{{v}}班</option>
      </select>
      <i></i>
    </div>
    <div class="btn x" @click="sub">完成</div>
    <router-link tag="div" class="noSchool" :to="{name:'create'}">找不到学校？点击这里申请开通</router-link>
    <AreaSelect :data="areaList" :status="areaSelect" :class="{'none':!areaSelect}" :area='areaStatus'
                @areashow="maskStatus" @update:area="val => areaStatus = val" @get="getSchool">
    </AreaSelect>
  </section>
</template>

<script>
  let school = [];
  import AreaSelect from 'base/areaSelect'
  import {AREAS} from 'common/js/area.js'

  export default {
    name: "info",
    components: {AreaSelect},
    data() {
      return {
        name: '',
        school: [],
        grade: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
        team: [],
        schoolId: 0,
        gradeId: 0,
        teamId: 0,
        areaStatus: '',
        areaList: [],
        areaSelect: false,
      }
    },
    methods: {
      maskStatus() {
        this.$refs.place.blur();
        this.areaSelect = !this.areaSelect;
      },
      getSchool(ids) {
        if (ids.provinceId && ids.cityId) {
          this.$http.get('/school', {
            params: {
              province_id: ids.provinceId,
              city_id: ids.cityId,
              area_id: ids.regionId
            }
          }).then(r => {
            // console.log(r.data.schools);
            this.school = r.data.schools;
            // console.log(this.school);
          }).catch(e => console.log(e))
        }
      },
      sub() {
        this.$http.post('/school-bind', {
          realname: this.name,
          school_id: this.schoolId,
          grade: this.gradeId,
          class: this.teamId
        }).then(r => {
          if (r.status == 'success') {
            this.$router.push({name: 'index'})
          } else {
            this.$emit('show', r.mess)
          }
        })
      },
    },
    created() {
      this.areaList = AREAS;
    },
    mounted() {
      this.$emit('status', true)
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
    .noSchool {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 30px;
      color: $color-theme;
      font-size: $font-size-medium;
    }
  }
</style>
