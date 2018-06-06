<template>
  <main class="share">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="selectItem"></Switches>
    <ClassmateList class="share-content" v-show="currentIndex==0" :classmate="classLists"></ClassmateList>
    <LibraryBookList class="share-content" v-show="currentIndex==1" :lists="libraryLists"></LibraryBookList>
    <router-view></router-view>
  </main>
</template>

<script>
  import Switches from 'base/switches'
  import ClassmateList from 'components/classmateList'
  import LibraryBookList from 'components/libraryBookList'

  export default {
    name: "share",
    components: {Switches, ClassmateList, LibraryBookList},
    data() {
      return {
        switches: [{name: '本班级'}, {name: '图书馆'}],
        currentIndex: 0,
        libraryLists: [],
        classLists: []
      }
    },
    methods: {
      selectItem(index) {
        this.currentIndex = index
      },
      // 重组 res.data.list 数据
      _formatClassmate(list) {
        let map={};
        // 填充歌手数据
        list.forEach((item, index) => {
          // 填充 a-z 字母
          let key = item.initial;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }

          // 填充对应字母歌手数据
          map[key].items.push(item)
        });

        // 得到有序列表
        let lists = [];
        let others = [];

        for (let key in map) {
          let value = map[key];
          if (value.title.match(/[a-zA-Z]/)) {
            lists.push(value)
          } else {
            others.push(value)
          }
        }

        lists.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        });

        return lists.concat(others)
      },
      getLibraryBookList() {
        this.$http.get('/school/shelf-index').then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.libraryLists = r.data.shelves
          }
        })
      },
      getClassmateList() {
        this.$http.get('/book/class-student').then(r => {
          // console.log(r)
          if (r.status == 'success') {
            this.classLists = this._formatClassmate(r.data.students)
          }
        })
      }
    },
    activated() {
      this.getClassmateList();
      this.getLibraryBookList()
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .share{
    height: calc(100% - 98px);
    position: relative;
  }
  .share-content {
    position: absolute;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
    overflow: hidden;
  }

</style>
