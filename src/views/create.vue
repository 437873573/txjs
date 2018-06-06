<template>
  <main class="create">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
    <div class="form">
      <div class="input">
        <input type="text" placeholder="请输入您的姓名" v-model="name">
      </div>
      <div class="input">
        <input type="text" placeholder="请输入您申请开通的学校名称" v-model="school">
      </div>
      <div class="select">
        <input type="text" placeholder="请选择您所在的地区" v-model="areaStatus" @click="maskStatus">
        <i></i>
      </div>
      <div class="file" @click="upload">
        <div class="file-img" v-show="photo?!isPhoto:isPhoto">
          <i class="icon-login_img_camera"></i>
          添加照片
        </div>
        <div class="preview" v-show="photo?isPhoto:!isPhoto">
          <img :src="photo?photo:''" alt="">
        </div>
        <h5>{{h5}}</h5>
      </div>
    </div>
    <div class="btn x" @click="sub">完成创建</div>
    <AreaSelect :data="areaList" :status="areaSelect" :class="{'none':!areaSelect}" :area='areaStatus'
                @areashow="maskStatus" @get="get" @update:area="val => areaStatus = val">
    </AreaSelect>
    <Confirm ref="confirm" :confirmBtnText="text1" :canShow="false" :head="head">
      <div id="text" v-html="message"></div>
    </Confirm>
  </main>
</template>

<script>
  import AreaSelect from 'base/areaSelect'
  // import Photo from 'base/photo'
  import {upload} from "common/js/uploadImg";
  import {AREAS} from 'common/js/area.js'

  export default {
    name: "create",
    components: {AreaSelect},
    mixins: [upload],
    data() {
      return {
        text: ['请上传学生证或其他证明照片', '请上传公章证明或机构证书'],
        switches: [
          {name: '个人创建'},
          {name: '机构创建'}
        ],
        isPhoto: true,
        name: '',
        school: '',
        currentIndex: 0,
        provinceId: '',
        cityId: '',
        regionId: '',
        areaStatus: '',
        areaList: [],
        areaSelect: false,
        head: '填写有以下错误',
        message: '',
        text1: '确定'

      }
    },
    computed: {
      h5() {
        return this.text[this.currentIndex]
      },
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
      },
      maskStatus() {
        this.areaSelect = !this.areaSelect;
      },
      get(ids) {
        this.provinceId = ids.provinceId;
        this.cityId = ids.cityId;
        this.regionId = ids.regionId;
      },
      sub() {
        this.$http.post('/school/apply', {
          type: ['PERSONAL', 'MECHANISM'][this.currentIndex],
          applicant: this.name,
          name: this.school,
          province_id: this.provinceId,
          city_id: this.cityId,
          area_id: this.regionId,
          attachments: this.serverId
        }).then(r => {
          if (r.status == 'success') {
            this.$router.push({path: '/'})
          } else {
            this.show(r.mess)
          }
        }).catch(e => alert(e))
      },
      show(mess) {
        this.message = mess;
        this.$refs.confirm.show()
      }
    },
    created() {
      this.areaList = AREAS;
    },

  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";
  @import "common/scss/form.scss";

  .create {
    @extend %cover;
    z-index: 3;
  }

  .form {
    width: 580px;
    margin: 0 auto;
    .input, .select {
      margin: 30px 0;
    }
    .file {
      margin: 30px 0;
      @extend %start;
      color: $color-text-l;
      font-size: $font-size-medium;
      &-img {
        margin-right: 24px;
        padding: 10px;
        width: 160px;
        height: 160px;
        border: 4px dashed $color-border;
        border-radius: 10px;
        box-sizing: border-box;
        @extend %center;
        flex-direction: column;
        i {
          font-size: 48px;
          margin-bottom: 15px;
        }
      }
      .preview {
        width: 160px;
        height: 160px;
        margin-right: 24px;
      }
    }
  }
  #text {
    padding: 20px 40px 40px;
    text-align: left;
    font-size: $font-size-medium-x;
    color: $color-text-l;
  }
</style>
