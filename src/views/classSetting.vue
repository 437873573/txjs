<template>
  <transition name="slide">
    <div class="class-setting">
      <div class="class-content">
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
                  @click="click(v)">{{v.name}}
              </li>
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
        <AreaSelect
          ref="area"
          :data="areaList"
          :status="areaSelect"
          :class="{'none':!areaSelect}"
          :area='areaStatus'
          :pId="provinceId"
          :cId="cityId"
          :rId="regionId"
          @areashow="maskStatus"
          @get="getSchool"
          @update:area="val => areaStatus = val">
        </AreaSelect>
      </div>
      <Confirm ref="confirm" :confirmBtnText="text" :canShow="false" :head="head">
        <div id="text" v-html="message"></div>
      </Confirm>
    </div>
  </transition>
</template>

<script>
  import AreaSelect from 'base/areaSelect'
  import Scroll from 'base/scroll'
  import {AREAS} from 'common/js/area.js'
  import {mapGetters} from 'vuex'
  export default {
    name: "class-setting",
    components: {AreaSelect, Scroll},
    computed: {
      ...mapGetters(['user']),
      provinceId() {
        return this.user.school_province_id
      },
      cityId() {
        return this.user.school_city_id
      },
      regionId() {
        return this.user.school_area_id
      },
      schoolList() {
        let _this = this;
        let NewItems = [];
        this.school.map(function (item) {
          if (item.name.search(_this.sname) != -1) {
            NewItems.push(item);
          }
        });
        return NewItems;
      }
    },
    data() {
      return {
        head: '填写有以下错误',
        message: '',
        text: '确定',
        school: [],
        name: '',
        sname:'',
        schoolId: 0,
        gradeId: 0,
        classId: 0,
        grade: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
        areaStatus: '',
        areaList: [],
        areaSelect: false,
        showList: false,
      }
    },
    methods: {
      click(item) {
        this.schoolId = item.id;
        this.sname = item.name
        setTimeout(() => {
          this.showList = false
        }, 150)
      },
      show(mess) {
        this.message = mess;
        this.$refs.confirm.show()
      },
      success() {
        this.$http.get('/profile').then(r => {
          if (r.status == 'success') {
            this.$store.commit('SET_USER', r.data.user)
            this.$router.back()
          }
        })
      },
      maskStatus() {
        this.$refs.place.blur();
        this.showList=false;
        this.areaSelect = !this.areaSelect;
      },
      getSchool(ids) {
        let that = this
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
            if (ids.regionId != that.regionId && that.regionId) {
              this.sname = ''
            }
            // console.log(this.school);
          }).catch(e => console.log(e))
        }
      },
      sub() {
        if (!this.schoolId) {
          this.schoolId = this.user.school_id
        }
        this.$http.post('/school-bind', {
          realname: this.name,
          school_id: this.schoolId,
          grade: this.gradeId,
          class: this.classId
        }).then(r => {
          if (r.status == 'success') {
            this.success()
          } else {
            this.$emit('show', r.mess)
          }
        })
      },
      getClass(){
        this.$http.get('/profile').then(r=>{
          if(r.status=='success'){
            let user=r.data.user;
            this.name=user.realname;
            this.sname=user.school_name;
            this.gradeId=user.grade;
            this.classId=user.class;
          }
        })
      }
    },
    created() {
      this.areaList = AREAS;
      this.getClass()
    },
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  @import "common/scss/form.scss";

  .class-setting {
    @extend %cover;
    .class-content {
      width: 580px;
      margin: 50px auto 0;
      .noSchool {
        text-align: left;
        margin-top: 30px;
        width: 100%;
        font-size: 26px;
      }
    }
  }

  .school-list {
    position: absolute;
    width: 100%;
    height: 280px;
    overflow: hidden;
    z-index: 3;
    background: #fff;
    border: 1px solid $color-border;
    li {
      font-size: $font-size-medium-x;
      padding: 20px 24px;
      border-bottom: 1px solid $color-border;
      text-align: left;
      color: #333;
      box-sizing: border-box;
      &:last-of-type {
        border-bottom: none;
      }
      &.selected {
        background: $color-theme;
        color: #fff;
      }
    }
  }

  #text {
    padding: 20px 40px 40px;
    text-align: left;
    font-size: $font-size-medium-x;
    color: $color-text-l;
  }
</style>
