<template>
  <Scroll class="user-book-content" :data="lists">
    <ul class="user-book-lists">
      <li class="item" v-for="v in lists" :key="v.id" v-if="v.downAble !='0'" @click.stop="selectItem(v)">
        <div class="img">
          <img v-lazy="v.images_large">
        </div>
        <div class="text">
          <h2 v-html="v.title"></h2>
          <h3 v-html="v.author"></h3>
          <div class="btns" v-if="v.status=='ON_SALE'">
            <div class="btn" @click.stop="sub(v)">下架本书</div>
          </div>
          <div class="btns" v-else-if="v.status=='NORMAL'">
            <div class="btn" @click.stop="sup(v)">上架本书</div>
            <div class="btn o" @click.stop="del(v)">删除</div>
          </div>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult'

  export default {
    name: "borrowing",
    components: {Scroll, Loading, NoResult},
    props: {
      data: {
        type: Array,
        default: []
      },
      i: {
        type: Number,
        default: 0
      }
    },
    computed: {
      lists() {
        let list = this.data.filter(v => {
          if (this.i == 0) {
            return v.status == 'ON_SALE'
          } else if (this.i == 1) {
            return v.status == 'NORMAL'
          }
        });
        return list
      }
    },
    methods: {
      selectItem(v){
        this.$router.push({path:'/newBook',query:{isbn:v.isbn}})
      },
      sub(item) {
        this.$http.post('/book/share-update', {
          id: item.id,
          action: 'NORMAL'
        }).then(r => {
          if (r.status == 'success') {
            item.status='NORMAL'
            // let i = this.data.findIndex(v => {
            //   return v.id == item.id
            // });
            // this.data[i].status = 'NORMAL'
          }
        })
      },
      sup(item) {
        this.$http.post('/book/share-update', {
          id: item.id,
          action: 'ON_SALE'
        }).then(r => {
          if (r.status == 'success') {
            // let i = this.data.findIndex(v => {
            //   return v.id == item.id
            // });
            // this.data[i].status = 'ON_SALE'
            item.status='ON_SALE'
          }
        })
      },
      del(item) {
        this.$http.post('book/share-destroy', {
          id: item.id
        }).then(r => {
          if (r.status == 'success') {
            let i = this.data.findIndex(v => {
              return v.id == item.id
            });
            this.data.splice(i, 1)
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .item {
    height: 240px;
    margin-bottom: 18px;
    padding: 12px 24px;
    box-sizing: border-box;
    background: #fff;
    @extend %between;
    .img {
      flex: none;
      width: 160px;
      height: 100%;
    }
    .text {
      flex: 1;
      align-self: stretch;
      padding: 28px 0 0 24px;
      box-sizing: border-box;
      @extend %between;
      flex-direction: column;
      h2 {
        width: 520px;
        font-size: $font-size-large-x;
        color: $color-text-d;
        text-align: left;
        @include no-wrap
      }
      h3 {
        width: 520px;
        font-size: $font-size-medium;
        color: $color-text-l;
        text-align: left;
        @include no-wrap
      }
      .btns {
        align-self: flex-end;
        height: 90px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: flex-end;
        .btn {
          height: 60px;
          margin-left: 24px;
          line-height: 60px;
          font-size: $font-size-medium;
        }
      }
    }
  }
</style>
