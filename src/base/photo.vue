<template>
  <div class="photo">
    <div class="image-list">
      <div class="file-img" v-show="isPhoto" @click.stop="addPic">
        <i class="icon-login_img_camera"></i>
        添加照片
        <input type="file" accept="image/*" @change="onFileChange" hidden>
      </div>
      <div class="preview" v-show="!isPhoto">
        <img :src="imgUrls[0]" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import lrz from 'lrz'
  export default {
    name: "photo",
    data() {
      return {
        imgUrls: [],
        urlArr: [],
        isPhoto: true,
        btnTitle: '',
        isModify: false,
        previewImg: '',
        isPreview: false
      }
    },
    watch: {
      imgUrls: 'toggleAddPic'
    },
    methods: {
      toggleAddPic: function () {
        let vm = this;
        if (vm.imgUrls.length >= 1) {
          vm.isPhoto = false;
        } else {
          vm.isPhoto = true;
        }
      },
      addPic: function (e) {
        let vm = this;
        $('input[type=file]').trigger('click');
        return false;
      },
      onFileChange: function (e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files, e);
      },
      createImage: function (file, e) {
        let vm = this;
        lrz(file[0], {width: 480}).then(function (rst) {
          vm.imgUrls.push(rst.base64);
          return rst;
        }).always(function () {
          // 清空文件上传控件的值
          e.target.value = null;
        });
      },
      delImage: function (index) {
        let vm = this;
        let btnArray = ['取消', '确定'];
        mui.confirm('确定删除该图片?', '提示', btnArray, function (e) {
          if (e.index == 1) {
            vm.imgUrls.splice(index, 1);
          }
        })

      },
      previewImage: function (url) {
        let vm = this;
        vm.isPreview = true;
        vm.previewImg = url;
      },
      closePreview: function () {
        let vm = this;
        vm.isPreview = false;
        vm.previewImg = "";
      },
      saveImage: function () {
        let vm = this;
        let urlArr = [],
          imgUrls = this.imgUrls;

        for (let i = 0; i < imgUrls.length; i++) {
          if (imgUrls[i].indexOf('file') == -1) {
            urlArr.push(imgUrls[i].split(',')[1]);
          } else {
            urlArr.push(imgUrls[i]);
          }
        }

        //数据传输操作
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  .file-img{
    margin-right: 24px;
    padding: 10px;
    width: 160px;
    height: 160px;
    border: 4px dashed $color-border;
    border-radius: 10px;
    box-sizing: border-box;
    @extend %center;
    flex-direction: column;
    i{
      font-size: 48px;
      margin-bottom: 15px;
    }
  }
  .preview{
    width: 160px;
    height: 160px;
    margin-right: 24px;
  }
  .add-preview{
    position: relative;
    img{
      position: absolute;
    }
  }
</style>
