<template>
  <div>
    <div class="area-mask "
         :class="{mask_active: status}"
         @click="select"></div>
    <transition name="fade">
      <div class="area-contain" :class="{area_contain_active: status}" v-if="status">
        <section class="area-main">
          <header class="area-header">所在地区<i class="area-close" @click="select">✖</i></header>
          <div class="area-top  border-a">
            <div class="area-province area-top-item"
                 :class="{area_top_active: 1==areaStatus}"
                 @click="selectArea(1)">
              {{CheckArea.province}}
            </div>
            <div class="area-city area-top-item"
                 :class="{area_top_active: 2==areaStatus}"
                 @click="selectArea(2)">
              {{CheckArea.city}}
            </div>
            <div class="area-region area-top-item"
                 :class="{area_top_active: 3==areaStatus}"
                 @click="selectArea(3)">
              {{CheckArea.region}}
            </div>
          </div>
          <div class="area-content border">
            <ul class="area-data" :class="{none: 1!=areaStatus}">
              <li class="area-data-item"
                  v-for="(item,key,index) in data"
                  @click="checkProvOne(key,item.name,item.id)"
                  :class="{red: item.id==pId}">
                <span class="area-text">{{item.name}}</span>
                <!--<i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{none: key != checkProvince}"></i>-->
              </li>
            </ul>
            <ul class="area-data"
                :class="{none: 2!=areaStatus}"
                v-if="data[checkProvince]">
              <li class="area-data-item"
                  v-for="(item,key,index) in data[checkProvince].child"
                  @click="checkCityOne(key,item.name,checkProvince,item.id)"
                  :class="{red: key==checkCity}">
                <span class="area-text">{{item.name}}</span>
                <!--<i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{none: key != checkCity}"></i>-->
              </li>
            </ul>
            <ul class="area-data" :class="{none: 3!=areaStatus}"
                v-if="data[checkProvince]&&data[checkProvince].child[checkCity].child">
              <li class="area-data-item"
                  v-for="(item,key,index) in data[checkProvince].child[checkCity].child"
                  @click="checkRegionOne(key,item.name,item.id)"
                  :class="{red: key==checkRegion}">
                <span class="area-text">{{item.name}}</span>
                <!--<i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{none: key != checkRegion}"></i>-->
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
    name: "area-select",
    data() {
      return {
        maskStatus: true,
        areaStatus: 1,
        checkProvince: 0,
        checkCity: 0,
        checkRegion: 0,
        CheckArea: {
          province: '请选择',
          city: '请选择',
          region: '请选择',
          provinceId: '',
          cityId: '',
          regionId: ''
        }
      }
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      status: {
        type: Boolean,
        default: false
      },
      pId:{
        type:Number,
        default:0
      },
      cId:{
        type:Number,
        default:0
      },
      rId:{
        type:Number,
        default:0
      },
    },
    methods: {
      select() {
        this.$emit('areashow');
        this.$emit('get', this.CheckArea)
        var data = this.CheckArea.province + ' ' + this.CheckArea.city + ' ' + this.CheckArea.region;
        this.$emit('update:area', data)
      },
      selectArea(it) { // 高亮 省 市 区 其中一个
        this.areaStatus = it;
      },
      checkProvOne(it, name, id) { // 选择省份
        this.checkProvince = it;
        this.CheckArea.province = name;
        this.CheckArea.provinceId = id;
        this.CheckArea.city = this.data[it].child[0].name;
        this.CheckArea.region = this.data[it].child[0].child
        && this.data[it].child[0].child.length != 0
          ? this.data[it].child[0].child[0].name : '无';
        this.checkCity = 0;
        this.checkRegion = 0,
          this.areaStatus = 2;
      },
      checkCityOne(it, name, its, id) { // 选择市区
        this.checkCity = it;
        this.CheckArea.province = this.data[its].name;
        this.CheckArea.city = name;
        this.CheckArea.cityId = id;
        this.CheckArea.region = this.data[its].child[it].child
        && this.data[its].child[it].child.length != 0
          ? this.data[its].child[it].child[0].name : '无';
        this.checkRegion = 0,
          this.areaStatus = 3;

      },
      checkRegionOne(it, name, id) { // 选择区
        this.CheckArea.province = this.data[this.checkProvince].name;
        this.CheckArea.city = this.data[this.checkProvince].child[this.checkCity].name;
        this.checkRegion = it;
        this.CheckArea.region = name;
        this.CheckArea.regionId = id;
        this.select()
      },
    },
    created(){
      // console.log(this.pId,this.cId,this.rId)
      if(this.pId===0) return
      // console.log(this.pId)
      let i=this.data.findIndex(v=>{
        return v.id==this.pId
      });
      // console.log(i)
      let iv=this.data.find(v=>{
        return v.id==this.pId
      });
      if(!iv) return
      let j=iv.child.findIndex(v=>{
        return v.id==this.cId
      });
      let jv=iv.child.find(v=>{
        return v.id==this.cId
      });
      let k=jv.child.findIndex(v=>{
        return v.id==this.rId
      });
      let kv=jv.child.find(v=>{
        return v.id==this.rId
      });
      this.checkProvOne(i,iv.name,this.pId);
      this.checkCityOne(j,jv.name,i,this.cId);
      this.checkRegionOne(k,kv.name,this.rId);
      this.select()
    }
  }
</script>

<style scoped>
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

  .border-a:after {
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
    font-size: 30px;
    color: #999;
  }

  .area-top {
    height: 80px;
    line-height: 80px;

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
