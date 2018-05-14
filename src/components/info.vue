<template>
  <section class="info">
    <input type="text" placeholder="请输入您的姓名" v-model="name">
    <div class="select">
      <input type="text" placeholder="请选择您所在的地区" v-model="areaStatus" @click="maskStatus">
      <i></i>
    </div>
    <div class="select">
      <select v-model="schoolId">
        <option value="" selected="selected">请选择您所在的学校</option>
        <option :value="v.id" v-for="(v,i) in schools" :key="v.id">{{v.name}}</option>
      </select>
      <i></i>
    </div>
    <div class="select">
      <select v-model="teamId">
        <option value="">请选择您所在的班级</option>
        <option :value="v.id" v-for="v in teams" :key="v.id">{{v.grade+v.name}}</option>
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
  let school=[]
  import AreaSelect from 'base/areaSelect'
  import {AREAS} from 'common/js/area.js'

  export default {
    name: "info",
    data() {
      return {
        name: '',
        school: [],
        schoolId:'',
        team: [],
        teamId:'',
        areaStatus: '',
        areaList: [],
        areaSelect: false,
      }
    },
    computed:{
      schools(){
        if(this.school){
          return this.school
        }
      },
      teams(){
        let team;
        if(
          typeof(team = this.school.find(v => {
            return v.id == this.schoolId;
          })) == 'undefined'
        ) {
          team = {'classes': []}
        }

        return team.classes
      }
    },
    watch:{

    },
    methods: {
      maskStatus() {
        this.areaSelect = !this.areaSelect;
      },
      getSchool(ids){
        if (ids.provinceId && ids.cityId) {
          this.$http.get('/school', {
            params: {
              province_id: ids.provinceId,
              city_id:ids.cityId,
              area_id:ids.regionId
            }
          }).then(r=>{
            // console.log(r.data.schools);
            this.school=r.data.schools;
            // console.log(this.school);
          }).catch(e=>console.log(e))
        }
      },
      sub() {
        this.$http.post('/school-bind',{school_class_id:this.teamId}).then(r=>{
          if(r.status=='success'){
            this.$router.push({name:'index'})
          }
        })
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
