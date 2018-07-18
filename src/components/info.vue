<template>
  <section class="info">
    <div class="select">
      <input type="text" placeholder="请输入您的姓名" v-model="name" @click="error.realname=''">
      <p v-show="error.realname" v-html="error.realname"></p>
    </div>
    <div class="select">
      <input type="text" ref="area"
             placeholder="请选择您所在的地区"
             v-model="areaStatus"
             @click="areaShow">
      <i></i>
      <p v-show="error.area" v-html="error.area"></p>
    </div>
    <div class="select">
      <input type="text" ref="school"
             placeholder="请选择您所在的学校"
             v-model="schoolStatus"
             @click="schoolShow">
      <i></i>
      <p v-show="error.school_id" v-html="error.school_id"></p>
    </div>
    <div class="select">
      <input type="text" ref="grade"
             placeholder="请选择您所在的年级"
             v-model="gradeStatus"
             @click="gradeShow">
      <i></i>
      <p v-show="error.grade" v-html="error.grade"></p>
    </div>
    <div class="select">
      <input type="text" ref="team"
             placeholder="请选择您所在的班级"
             v-model="classStatus"
             @click="classShow">
      <i></i>
      <p v-show="error.class" v-html="error.class"></p>
    </div>
    <div class="btn x" @click="sub">{{bound===3?'确认修改':'下一步'}}</div>
    <router-link tag="div" class="noSchool" :to="{name:'create'}" v-show="!bound">找不到学校？点击这里申请开通</router-link>

    <SelectArea :status="areaSelect"
                :class="{'none':!areaSelect}"
                :area='areaStatus'
                @areaShow="areaShow"
                @update:area="val => areaStatus = val">
    </SelectArea>
    <SelectSchool ref="selectSchool"
                  :status="schoolSelect"
                  :class="{'none':!schoolSelect}"
                  :school='schoolStatus'
                  @schoolShow="schoolShow"
                  @update:school="val => schoolStatus = val">
    </SelectSchool>
    <SelectGrade :status="gradeSelect"
                 :class="{'none':!gradeSelect}"
                 :grade='gradeStatus'
                 @gradeShow="gradeShow"
                 @update:grade="val => gradeStatus = val">
    </SelectGrade>
    <SelectClass :status="classSelect"
                 :class="{'none':!classSelect}"
                 :team='classStatus'
                 @classShow="classShow"
                 @update:team="val => classStatus = val">
    </SelectClass>
  </section>
</template>

<script>
  import SelectArea from 'base/selectArea'
  import SelectSchool from 'base/selectSchool'
  import SelectGrade from 'base/selectGrade'
  import SelectClass from 'base/selectClass'
  import {mapGetters} from 'vuex'

  export default {
    name: "info",
    components: {SelectArea, SelectSchool, SelectGrade, SelectClass},
    computed: {
      ...mapGetters(['bound', 'user'])
    },
    data() {
      return {
        name: '',
        provinceId: 0,
        cityId: 0,
        regionId: 0,
        schoolId: 0,
        gradeId: 0,
        classId: 0,
        error: {
          realname: '',
          area: '',
          school_id: '',
          grade: '',
          class: ''
        },
        areaStatus: '',
        areaSelect: false,
        schoolStatus: '',
        schoolSelect: false,
        gradeStatus: '',
        gradeSelect: false,
        classStatus: '',
        classSelect: false
      }
    },
    methods: {
      areaShow(area) {
        this.$refs.area.blur();
        this.error.area = '';
        this.error.school_id = '';
        this.schoolStatus = '';
        this.areaSelect = !this.areaSelect;
        if (area.provinceId && area.cityId && area.regionId) {
          this.$refs.selectSchool.getSchool(area)
        }
      },
      schoolShow(id) {
        this.$refs.school.blur();
        if (this.areaStatus) {
          this.schoolId = id;
          this.schoolSelect = !this.schoolSelect;
        } else {
          this.error.school_id = '请先选择正确的所在地区'
        }
      },
      gradeShow(id) {
        this.$refs.grade.blur();
        this.gradeId = id;
        this.gradeSelect = !this.gradeSelect;
      },
      classShow(id) {
        this.$refs.team.blur();
        this.classId = id;
        this.classSelect = !this.classSelect;
      },
      sub() {
        this.$http.post('/school-bind', {
          realname: this.name,
          school_id: this.schoolId,
          grade: this.gradeId,
          class: this.classId
        }).then(r => {
          if (r.status === 'success') {
            this.$emit('next')
          } else if (r.status === 'fail') {
            for (let k in r.data) {
              // console.log(k,data.data[k])
              this.error[k] = r.data[k][0]
            }
            if (!this.areaStatus) {
              this.error.area = '请选择所在地区'
            }
          }
        })
      },
    },
    mounted() {
      if (this.user.realname) {
        this.name = this.user.realname;
        this.provinceId = this.user.school_province_id;
        this.cityId = this.user.school_city_id;
        this.regionId = this.user.school_area_id;
        this.schoolId = this.user.school_id;
        this.gradeId = this.user.grade;
        this.classId = this.user.class;
        this.areaStatus = this.user.school_province + ' ' + this.user.school_city + ' ' + this.user.school_area;
        this.schoolStatus = this.user.school_name;
        this.gradeStatus = this.user.grade_name;
        this.classStatus = this.user.class_name;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  @import "common/scss/form.scss";

  .info {
    width: 580px;
    margin: 0 auto 0;
    .noSchool {
      text-align: left;
      margin-top: 30px;
      width: 100%;
      font-size: 26px;
    }
  }
</style>
