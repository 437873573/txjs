<template>
  <main class="organization">
    <router-link tag="div" class="mess" v-show="mess" :to="{path:`/organization/detail/${org.id}`}">
      <div class="img">
        <img v-lazy="org.cover">
      </div>
      <div class="text">
        <h3>{{org.name}}</h3>
        <h5><i class="icon-tabbar_icon_tel_selected"></i>{{org.tel}}</h5>
        <h5><i class="icon-tabbar_icon_address_selected"></i>{{org.address}}</h5>
        <p><span v-for="(item,index) in org.business" :key="index">{{item}}</span></p>
      </div>
    </router-link>
    <el-amap vid="amap" :center="center" v-if="center.length" :zoom="18" :events="events">
      <el-amap-marker :position="center"></el-amap-marker>
      <el-amap-marker v-for="(item,index) in lists"
                      :key="index"
                      :position="item.position"
                      :offset="[-29,-72]"
                      :events="item.events"
                      :visible="true"
                      :draggable="false"
                      :icon="icon">
      </el-amap-marker>
    </el-amap>
  </main>

</template>

<script>
  import {getLocation} from "../common/js/getLocation";

  export default {
    name: "organization",
    mixins: [getLocation],
    data() {
      const self = this;
      return {
        // lists: [],
        org: {
          name: '',
          cover: '',
          tel: '',
          address: '',
          business: [],
          id: ''
        },
        mess: false,
        icon: '//t-oss01.mion.cn/uploads/0b1e08d6a0fd14085c8ac45ecc11c3bd.png',
        center: [113.3245904, 23.1066805],
        lng: 0,
        lat: 0,
        loaded: false,
        plugin: [{
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 100,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: 'all',
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                // console.log(result)
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
            complete(data) {
              self.getMechanisms(data.position.lng, data.position.lat)
            },
            error(data) {
              alert(data.message)
            }
          }
        }],
        events: {
          click() {
            self.mess = false;
          },
        }
      }
    },
    methods: {
      showMess(item) {
        this.mess = true;
        this.org.id = item.id;
        this.org.cover = item.cover;
        this.org.tel = item.telephone;
        this.org.address = item.address;
        this.org.name = item.name;
        this.org.business = item.bunisness;
      },
      getMechanisms(lng, lat) {
        // alert(lng)
        this.$http.get('/mechanism',
          {
            params:
              {
                distance: 5000,
                latitude: lat,
                longitude: lng,
              }
          }).then(r => {
          if (r.status === 'success') {
            this.lists = [];
            let self = this;
            r.data.mechanisms.forEach((v) => {
              let marker = {};
              marker.position = [v.longitude, v.latitude];
              marker.events = {
                click() {
                  self.showMess(v)
                }
              };
              this.lists.push(marker)
            });
            // alert(this.lists.length)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .organization {
    position: fixed;
    z-index: 3;
    width: 100%;
    top: 0;
    bottom: 98px;
  }

  .mess {
    position: absolute;
    top: 20px;
    left: 50%;
    background: #fff;
    border-radius: 10px;
    z-index: 1;
    transform: translateX(-50%);
    width: 700px;
    height: 246px;
    padding: 30px;
    box-sizing: border-box;
    @extend %between;
    align-items: stretch;
    box-shadow: 10px 0px 30px rgba(58, 53, 53, 0.2);
    .img {
      margin-right: 20px;
      width: 164px;
      height: 186px;
      flex: none;
    }
    .text {
      width: 456px;
      @extend %between;
      align-items: flex-start;
      flex-direction: column;
      text-align: left;
      h3 {
        width: 100%;
        font-size: 32px;
        color: #333;
        @include no-wrap;
      }
      h5 {
        width: 100%;
        @include no-wrap;
      }
      h5 i {
        margin-right: 12px;
      }
      p span {
        display: inline-block;
        margin-right: 8px;
        padding: 0 14px;
        line-height: 40px;
        font-size: 24px;
        color: #fff;
        background: #65d0ab;
        border-radius: 5px;
      }
    }
  }
</style>
