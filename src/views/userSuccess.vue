<template>
  <div class="success">
    <header>
      <h6>{{time}}</h6>
      <h5>{{list.length}}</h5>
      <span>我已阅读</span>
    </header>
    <Scroll class="wrapper" :data="list" :scrollX="true" :scrollY="false">
      <ul class="list" ref="list">
        <li class="item" v-for="v in list">
          <div class="img">
            <img v-lazy="v.images_large">
          </div>
          <p>{{v.title}}</p>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
  let date = new Date();
  import Scroll from 'base/scroll'

  export default {
    name: "user-success",
    components: {Scroll},
    data(){
      return{
        time:date.getFullYear()+'年'+(date.getMonth()+1)+'月',
        data:[]
      }
    },
    computed:{
      list(){
        return this.data.map(v=>{
          return v.book
        })
      }
    },
    mounted(){
      this.$http.get('/bill-share/index').then(r => {
        if (r.status === 'success') {
          this.data = r.data.borrowUserBooks.filter(v=>{
            return v.status=='Borrow'&&v.type=='BORROW'
          });
         this.$refs.list.style.width=this.data.length*85+24+'px'
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .success{
    @extend %cover;
    z-index: 3;
  }
  header{
    height: 480px;
    @extend %between;
    flex-direction: column;
    padding: 30px 0 40px;
    box-sizing: border-box;
    color: #fff;
    margin-bottom: 20px;
    background: url("../common/img/success.png") no-repeat center/cover;
    h6{
      font-size: 36px;
    }
    h5{
      font-size: 108px;
      margin-bottom: 30px;
    }
    span{
      font-size: 32px;
    }
  }
  .wrapper{
    background: #fff;
  }
  .list{
    @extend %start;
    .item{
      padding: 24px 0;
      flex: none;
      width: 146px;
      margin-left: 24px;
      @extend %center;
      flex-direction: column;
      .img {
        width: 142px;
        height: 200px;
        margin-bottom: 12px;
      }
      p {
        width: 100%;
        height: 80px;
        text-align: justify;
        @include no-wrap-multi(2)
      }
    }
  }

</style>
