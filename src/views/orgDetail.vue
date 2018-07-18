<template>
  <scroll class="detail">
    <div>
      <div class="banner">
        <img v-lazy="org.cover">
      </div>
      <header>
        <h3>{{org.name}}</h3>
        <h5><i class="icon-tabbar_icon_tel_selected"></i>{{org.tel}}</h5>
        <h5><i class="icon-tabbar_icon_address_selected"></i>{{org.address}}</h5>
        <p><span v-for="(item,index) in org.business" :key="index">{{item}}</span></p>
      </header>
      <div class="content">
        <h6>简介</h6>
        <div><p>
          {{org.intro}}</p>
        </div>
      </div>
      <div class="book" v-show="lists.length">
        <router-link tag="h6" :to="{path:'/organization/orgList'}">
          书籍 <i class="icon-tabbar_icon_more_selected"></i>
        </router-link>
        <ul class="lists">
          <li class="item" v-for="(item,index) in lists" :key="index" @click="selectItem(item)">
            <div class="img">
              <img v-lazy="item.book.images_large">
            </div>
            <span>{{item.book.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll'

  export default {
    name: "org-detail",
    components: {Scroll},
    data() {
      return {
        org: {
          name: '',
          cover: '',
          tel: '',
          address: '',
          business: [],
          intro: ''
        },
        lists: []
      }
    },
    methods:{
      selectItem(item) {
        console.log(item)
        this.$router.push({path: `/book/${item.mechanism_id}`});
        this.$store.commit('SET_BOOK', item.book)
      },
    },
    activated() {
      this.org={
        name: '',
          cover: '',
          tel: '',
          address: '',
          business: [],
          intro: ''
      };
      let id = this.$route.params.id;
      this.$http.get(`/mechanism/${id}`).then(r => {
        if (r.status === 'success') {
          let item = r.data.mechanism;
          this.org.cover = item.cover;
          this.org.tel = item.telephone;
          this.org.address = item.address;
          this.org.name = item.name;
          this.org.business = item.bunisness;
          this.org.intro = item.introduction;
        }
      });
      this.$http.get(`/mechanism-book`, {
        params: {
          mechanism_id: id
        }
      }).then(r => {
        if (r.status === 'success') {
          this.$store.commit('SET_ORG_LIST',r.data.mechanism_books)
          this.lists = r.data.mechanism_books.slice(0, 3)
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .detail {
    @extend %cover;
    z-index: 2;
  }

  .banner {
    height: 320px;
  }

  header {
    padding: 20px 24px;
    background: #fff;
    margin-bottom: 20px;
    height: 226px;
    box-sizing: border-box;
    @extend %between;
    flex-direction: column;
    align-items: flex-start;
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
      margin: 0 12px 0 6px;
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

  h6 {
    background: #fff svg(b-border);
    padding: 20px 24px;
    font-size: 32px;
    color: #333;
    @extend %between;
  }

  .content {
    margin-bottom: 20px;
    div {
      padding: 16px 36px;
      background: #fff;
      p {
        text-align: justify;
      }
    }
  }

  .lists {
    background: #fff;
    padding: 20px 30px;
    box-sizing: border-box;
    @extend %start;
    li {
      width: 210px;
      height: 266px;
      border: 1px solid $color-border;
      border-radius: 10px;
      @extend %center;
      flex-direction: column;
      margin-right: 30px;
      .img {
        width: 126px;
        height: 180px;
        margin-bottom: 16px;
      }
      span {
        font-size: 24px;
      }
    }
  }

</style>
