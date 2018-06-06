<template>
  <section class="info">
    <input type="text" placeholder="请输入您的姓名" v-model="name">
    <div class="select">
      <input type="text" placeholder="请选择您所在的地区" v-model="areaStatus" @click.prevent="maskStatus" ref="place">
      <i></i>
    </div>
    <div class="select">
      <input type="text" placeholder="请选择您所在的学校" v-model="sname" @click="showList=true">
      <Scroll class="school-list" v-show="showList" :data="schoolList">
        <ul>
          <li v-if="!schoolList.length">查询不到此学校，请确认后再输入</li>
          <li v-else v-for="v in schoolList"
              :class="{selected:schoolId==v.id}"
              :key="v.id"
              @click="click(v)">{{v.name}}</li>
        </ul>
      </Scroll>
      <i></i>
    </div>
    <div class="select">
      <select v-model="gradeId">
        <option value=0>请选择您所在的年级</option>
        <option :value="v" v-for="v in 9">{{grade[v-1]}}年级</option>
      </select>
      <i></i>
    </div>
    <div class="select">
      <select v-model="classId">
        <option value="0">请选择您所在的班级</option>
        <option :value="v" v-for="v in 30">{{v}}班</option>
      </select>
      <i></i>
    </div>
    <div class="btn x" @click="sub">完成</div>
    <router-link tag="div" class="noSchool" :to="{name:'create'}">找不到学校？点击这里申请开通</router-link>
    <AreaSelect :data="areaList"
                :status="areaSelect"
                :class="{'none':!areaSelect}"
                :area='areaStatus'
                @areashow="maskStatus"
                @get="getSchool"
                @update:area="val => areaStatus = val">
    </AreaSelect>
  </section>
</template>

<script>
  import AreaSelect from 'base/areaSelect'
  import Scroll from 'base/scroll'
  import {AREAS} from 'common/js/area.js'

  export default {
    name: "info",
    components: {AreaSelect,Scroll},
    computed:{
      schoolList(){
        let _this = this;
        let NewItems = [];
        this.school.map(function(item) {
          if (item.name.search(_this.sname) != -1) {
            NewItems.push(item);
          }
        });
        return NewItems;
      }
    },
    data() {
      return {
        name: '',
        sname:'',
        schoolId: 0,
        gradeId: 0,
        classId: 0,
        provinceId: 0,
        cityId: 0,
        regionId: 0,
        school: [],
        grade: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
        areaStatus: '',
        areaList: [],
        areaSelect: false,
        showList:false
      }
    },
    methods: {
      click(item){
        this.schoolId=item.id;
        this.sname=item.name
        setTimeout(()=>{
          this.showList=false
        },100)
      },
      maskStatus() {
        this.$refs.place.blur();
        this.showList=false;
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
            this.sname=''
            // console.log(this.school);
          }).catch(e => console.log(e))
        }
      },
      sub() {
        this.$http.post('/school-bind', {
          realname: this.name,
          school_id: this.schoolId,
          grade: this.gradeId,
          class: this.classId
        }).then(r => {
          if (r.status == 'success') {
            this.$emit('success')
          } else {
            this.$emit('show', r.mess)
          }
        })
      },
    },
    created() {
      this.areaList = AREAS;
      this.$emit('status', true);
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  @import "common/scss/form.scss";

  .info {
    width: 580px;
    margin: 50px auto 0;
    .school-list{
      position: absolute;
      width: 100%;
      height: 280px;
      overflow: hidden;
      z-index: 3;
      background: #fff;
      border: 1px solid $color-border;
      li{
        font-size: $font-size-medium-x;
        padding: 20px 24px;
        border-bottom: 1px solid $color-border;
        text-align: left;
        color: #333;
        box-sizing: border-box;
        &:last-of-type{
          border-bottom: none;
        }
        &.selected{
          background: $color-theme;
          color: #fff;
        }
      }
    }
    .noSchool {
      text-align: left;
      margin-top: 30px;
      width: 100%;
      font-size: 26px;
    }
  }
</style>
