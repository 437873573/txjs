<template>
  <div class="my-book">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="selectItem"></Switches>
    <Scroll class="my-book-content">
      <ul class="my-book-lists">
        <li class="item" v-for="v in lists" :key="v.id">
          <div class="img">
            <img v-lazy="v.images_large">
          </div>
          <div class="text">
            <h2 v-html="v.title"></h2>
            <h3 v-html="v.author"></h3>
            <div class="btns" v-if="v.status=='ON_SALE'">
              <div class="btn" v-if="v.downAble=='1'" @click="sub(v)">下架本书</div>
              <div class="btn disabled" v-else-if="v.downAble=='0'">借阅中</div>
            </div>
            <div class="btns" v-else-if="v.status=='NORMAL'">
              <div class="btn" @click="sup(v)">上架本书</div>
              <div class="btn disabled" @click="del(v)">删除</div>
            </div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
  import Switches from 'base/switches'
  import Scroll from 'base/scroll'
  import NoResult from 'base/noResult'

  export default {
    name: "my-book",
    components: {Switches, Scroll, NoResult},
    data() {
      return {
        switches: [{name: '全部'}, {name: '已上架'}, {name: '已下架'}],
        currentIndex: 0,
        data: [],
      }
    },
    computed: {
      lists() {
        let list = this.data.filter(v => {
          if (this.currentIndex == '1') {
            return v.status == 'ON_SALE'
          } else if (this.currentIndex == '2') {
            return v.status == 'NORMAL'
          } else {
            return v
          }
        })
        return list
      }
    },
    methods: {
      sub(item){
        this.$http.post('/book/share-update',{
          id:item.id,
          action:'NORMAL'
        }).then(r=>{
          if(r.status=='success'){
            let i=this.data.findIndex(v=>{
              return v.id==item.id
            })
            this.data[i].status='NORMAL'
          }
        })
      },
      sup(item){
        this.$http.post('/book/share-update',{
          id:item.id,
          action:'ON_SALE'
        }).then(r=>{
          if(r.status=='success'){
            let i=this.data.findIndex(v=>{
              return v.id==item.id
            })
            this.data[i].status='ON_SALE'
          }
        })
      },
      del(item){
        this.$http.post('book/share-destroy',{
          id:item.id
        }).then(r=>{
          if(r.status=='success'){
            let i=this.data.findIndex(v=>{
              return v.id==item.id
            })
            this.data.splice(i,1)
          }
        })
      },
      selectItem(index) {
        this.currentIndex = index
      }
    },
    activated() {
      this.$http.get('/book/share-index').then(r => {
        if (r.status == 'success') {
          this.data = r.data.userbook
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .item {
    height: 240px;
    margin-bottom: 20px;
    padding: 12px 24px;
    box-sizing: border-box;
    background: #fff;
    @extend %between;
    .img {
      flex: none;
      width: 160px;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .text{
      flex: 1;
      align-self: stretch;
      padding: 28px 0 0 24px;
      box-sizing: border-box;
      @extend %between;
      align-items: flex-start;
      flex-direction: column;
      h2{
        font-size: $font-size-large-x;
        color: $color-text-d;
      }
      h3{
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .btns{
        align-self: flex-end;
        height: 90px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: flex-end;
        .btn{
          height: 60px;
          margin-left: 24px;
          line-height: 60px;
          font-size: $font-size-medium;
        }
      }
    }
  }
</style>
