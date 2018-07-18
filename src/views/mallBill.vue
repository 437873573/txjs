<template>
  <div class="mall-bill">
    <Scroll class="bill-wrapper">
      <div>
        <div class="address">
          <div class="text">
            <input type="text" placeholder="收货人姓名" v-model="name" @click="error.name=''">
            <p v-show="error.name" v-html="error.name"></p>
          </div>
          <div class="text">
            <input type="text" placeholder="联系电话" v-model="mobile" @click="error.mobile=''">
            <p v-show="error.mobile" v-html="error.mobile"></p>
          </div>
          <div class="text">
            <input type="text" ref="area"
                   placeholder="所在地区"
                   v-model="areaStatus"
                   @click="areaShow">
            <p v-show="error.area" v-html="error.area"></p>
          </div>
          <div class="text">
            <input type="text" placeholder="详细地址" v-model="address" @click="error.address=''">
            <p v-show="error.address" v-html="error.address"></p>
          </div>
        </div>
        <div class="postage">
          <span>配送方式</span>
          <span>{{data.express&&data.express.express_price?`快递 ￥${data.express.express_price}`:'免邮'}}</span>
        </div>
        <ul class="bill-list">
          <li class="item" v-for="v in goodList">
            <div class="img">
              <img v-lazy="v.options.image">
            </div>
            <div class="text">
              <p>{{v.name}}</p>
              <div class="num">
                <span>￥ {{v.price}}</span>
                <span>× {{v.qty}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
    <footer>
      <p>
        <span>合计：</span>
        <span>￥ {{data.total_price}}</span>
      </p>
      <div class="sub" @click="sub">提交</div>
    </footer>
    <SelectArea :status="areaSelect"
                :class="{'none':!areaSelect}"
                :area='areaStatus'
                @areaShow="areaShow"
                @update:area="val => areaStatus = val">
    </SelectArea>
  </div>
</template>

<script>
  import Scroll from 'base/scroll'
  import SelectArea from 'base/selectArea'
  import {mapGetters} from 'vuex'
  import {buy} from "../common/js/buy";

  export default {
    name: "mall-bill",
    mixins:[buy],
    components: {SelectArea, Scroll},
    computed:{
      ...mapGetters(['goodList'])
    },
    data() {
      return {
        data:{},
        name:'',
        mobile:'',
        address:'',
        provinceId: '',
        cityId: '',
        regionId: '',
        areaStatus: '',
        areaSelect: false,
        error: {
          name: '',
          area: '',
          mobile: '',
          address: ''
        },
      }
    },
    methods: {
      areaShow(area) {
        this.$refs.area.blur();
        this.error.area = '';
        this.areaSelect = !this.areaSelect;
        if (area.provinceId && area.cityId && area.regionId) {
          this.provinceId=area.provinceId;
          this.cityId=area.cityId;
          this.regionId=area.regionId;
        }
      },
      sub(){
        let arr=this.goodList.map(v=>{
          return v.rowId
        });
        this.$http.post('/orders',{
          name:this.name,
          mobile:this.mobile,
          province_id:this.provinceId,
          city_id:this.cityId,
          area_id:this.regionId,
          address:this.address,
          rowIds:arr
        }).then(r=>{
          if(r.status==='success'){
            this.buy(r.data.order.id)
          }else if(r.status==='fail'){
            for (let k in r.data) {
              // console.log(k,data.data[k])
              if(k==='province_id'||k==='city_id'||k==='area_id'){
                this.error.area='请选择所在地区'
              }else{
                this.error[k] = r.data[k][0]
              }
            }
          }
        })
      }
    },
    activated(){
      this.data={};
      if(!this.goodList.length){
        this.$router.back()
      }else{
        let arr=this.goodList.map(v=>{
          return v.rowId
        });
        this.$http.get('/orders/price',{params:{rowIds:arr}}).then(r=>{
          if(r.status==='success'){
            this.data=r.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .mall-bill {
    @extend %cover;
    z-index: 3;
  }

  .bill-wrapper {
    position: absolute;
    top: 0;
    bottom: 98px;
    width: 100%;
    overflow: hidden;
  }

  .item {
    height: 240px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid $color-border;
    border-image: svg(b-border) 1;
    @extend %start;
    align-items: stretch;
    .img {
      flex: none;
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }
    .text {
      flex-grow: 1;
      @extend %between;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      p {
        width: 100%;
        font-size: $font-size-large-x;
        color: $color-text-d;
        @include no-wrap-multi(2)
      }
      .num {
        width: 100%;
        @extend %between;
        span:first-of-type {
          font-size: 36px;
          color: #ff2d2d;
        }
        span:last-of-type {
          color: #333;
        }
      }
    }
  }

  .postage {
    padding: 24px;
    background: #fff svg(b-border);
    @extend %between;
    color: #333333;
  }

  .address {
    background: #fff;
    padding-left: 24px;
    box-sizing: border-box;
    margin-bottom: 20px;
    div{
      position: relative;
      border-bottom: 1px solid $color-border;
      border-image: svg(b-border) 1;
      &:last-of-type {
        border-bottom: none;
        border-image: none;
      }
      p{
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        font-size: $font-size-small;
        color: #ff4d5a;
        &:before {
          content: '*';
          display: inline-block;
          margin-right: 4px;
        }
      }
    }
    input {
      width: 100%;
      height: 86px;
      line-height: 86px;
      -webkit-appearance: none;
      padding: 20px 0;
      box-sizing: border-box;
      &::placeholder {
        color: #999;
      }
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    height: 98px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    p {
      flex-grow: 1;
      background: #fff svg(t-border);
      text-align: right;
      line-height: 98px;
      padding-right: 30px;
      span:first-of-type {
        color: #333;
      }
      span:last-of-type {
        color: #ff2d2d;
      }
    }
    .sub {
      flex: none;
      width: 240px;
      background: #38a7ff;
      line-height: 98px;
      color: #fff;
      font-size: 32px;
    }
  }
</style>
