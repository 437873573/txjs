<template>
  <div class="log">
    <header>
      <div class="left">
        <div class="img">
          <img src="" alt="">
        </div>
        <h5>{{name}}</h5>
      </div>
      <p>{{no}}</p>
    </header>
    <div class="content">
      <h4>{{state==0?'暂无轨迹':state==1?'已揽件':state==2?'运输中':state==3?'已签收':'问题件，请联系客服'}}</h4>
      <ul class="list">
        <li v-for="v in list" :key="v.time">
          <span>{{v.time}}</span>
          <p>{{v.status}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mall-order-log",
    data() {
      return {
        no: '',
        state: 0,
        name: '',
        logo: '',
        list: []
      }
    },
    activated() {
      let id = this.$route.query.id;
      this.no = '';
      this.state = 0;
      this.name = '';
      this.logo = '';
      this.list = [];
      this.$http.get('/express',{
        params:{
          order_id:id
        }
      }).then(r=>{
        if(r.status==='success'){
          let data=r.data.express.result;
          this.name=data.expName;
          this.no=data.number;
          this.state=data.deliverystatus;
          this.list=data.list
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .log {

    position: relative;
    width: 100%;
    background: #efefef;
    z-index: 3;
    header {
      background: #fff;
      padding: 20px 24px;
      box-sizing: border-box;
      @extend %between;
      margin-bottom: 20px;
      .left {
        @extend %start;
        .img {
          width: 88px;
          height: 88px;
          margin-right: 20px;
        }
        h5 {
          font-size: 32px;
          color: #333;
        }
      }
    }
    h4 {
      line-height: 80px;
      padding-left: 24px;
      font-size: 32px;
      color: #333;
      text-align: left;
      background: #fff svg(b-border);
    }
    .list {
      background: #fff;
      width: 100%;
      padding: 20px 24px;
      box-sizing: border-box;
      li {
        @extend %start;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 40px;
        height: 150px;
        position: relative;
        span {
          font-size: 24px;
          color: #999;
        }
        p{
          width: 100%;
          text-align: justify;
        }
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 10px;
          left: -36px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #65d0ab;
        }
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 40px;
          left: -31px;
          width: 2px;
          height: 100px;
          background: #65d0ab;
        }
        &:last-of-type {
          &:after {
            display: none;
          }
        }
      }
    }
  }
</style>
