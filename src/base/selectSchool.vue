<template>
  <div class="select-school">
    <div class="area-mask "
         :class="{mask_active: status}"
         @click="select"></div>
    <transition name="fade">
      <div class="area-contain" :class="{area_contain_active: status}" v-if="status">
        <section class="area-main">
          <header class="area-header">
            所在学校
            <i class="area-close icon-tabbar_icon_del_selected" @click="select"></i>
          </header>
          <div class="area-top  border-a">
            <div>
              <input type="text"
                     placeholder="可输入关键字筛选"
                     v-model="schoolName"
                     @click="showList=true">
            </div>
          </div>
          <div class="area-content border">
            <ul class="area-data">
              <li v-if="!schoolList.length">查询不到此学校，请确认后再选择</li>
              <li class="area-data-item"
                  v-for="(item,key,index) in schoolList"
                  @click="checkSchoolOne(key,item.name,item.id)"
                  :class="{red: key===checkSchool}">
                <span class="area-text">{{item.name}}</span>
                <i class="icon-tabbar_icon_choice_selected"
                   style="margin-left: 0.1rem"
                   :class="{none: key !== checkSchool}"></i>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "select-school",
    data() {
      return {
        data:[],
        maskStatus: true,
        checkSchool: 0,
        schoolName: '',
        schoolId:''
      }
    },
    computed: {
      schoolList() {
        let _this = this;
        let NewItems = [];
        this.data.map(function (item) {
          if (item.name.search(_this.schoolName) != -1) {
            NewItems.push(item);
          }
        });
        return NewItems;
      }
    },
    props: {
      status: {
        type: Boolean,
        default: false
      },
      sId: {
        type: Number,
        default: 0
      }
    },
    methods: {
      select() {
        this.$emit('schoolShow',this.schoolId);
        this.$emit('update:school', this.schoolName)
      },
      checkSchoolOne(it, name, id) {
        this.checkProvince = it;
        this.schoolName = name;
        this.schoolId = id;
        this.select()
      },
      getSchool(ids) {
        this.$http.get('/school', {
          params: {
            province_id: ids.provinceId,
            city_id: ids.cityId,
            area_id: ids.regionId
          }
        }).then(r => {
          this.data = r.data.schools;
          this.schoolName = ''
        })
      },
    },
    created() {
      let ids={};
      ids.provinceId=this.$store.state.user.school_province_id;
      ids.cityId=this.$store.state.user.school_city_id;
      ids.regionId=this.$store.state.user.school_area_id;
      this.getSchool(ids)
    }
  }
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .none {
    display: none
  }

  .border-a {
    position: relative;
    border: none;
  }

  .border-a:before,.border-a:after {
    content: '';
    position: absolute;
    left: 0;
    background: #efefef;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  .area-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #000;
    opacity: .7;
    display: none;
  }

  .mask_active {
    z-index: 99;
    display: block;
  }

  .area-contain {
    display: none;
    background-color: #fff;
    text-align: left;
  }

  .area_contain_active {
    z-index: 100;
    display: block;
    height: 500px;
    width: 100%;
    position: fixed;
    top: auto;
    left: 0px;
    bottom: 0px;
  }

  .area-header {
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 35px;
  }

  .area-close {
    position: absolute;
    right: 30px;
    line-height: 80px;
  }

  .area-top {
    height: 80px;
    div{
      padding: 12px 10px;
      box-sizing: border-box;
      input{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 8px 10px;
        border-radius: 5px;
        border: 1px solid #dadada;
        color: #333333;
        font-size: 28px;
        line-height: 38px;
        -webkit-appearance: none;
        &::placeholder {
          color: #999;
        }
      }
    }
  }

  .area-top-item {
    display: inline-block;
    font-size: 33px;
    padding: 0 10px;
    max-width: 245px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .area_top_active {
    color: #38a7ff;
    border-bottom: 1px solid #38a7ff;
  }

  .area-data {
    height: 340px;
    overflow: auto;
  }

  .area-data-item {
    height: 70px;
    line-height: 70px;
    padding: 0rem 20px;
    font-size: 30px;
  }

  .red {
    color: #38a7ff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: height .2s
  }

  .fade-enter, .fade-leave-active {
    height: 0
  }
</style>
