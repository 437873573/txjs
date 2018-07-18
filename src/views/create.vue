<template>
  <main class="create">
    <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
    <div class="form">
      <div class="select">
        <input type="text" placeholder="请输入您的姓名" v-model="name" @click="error.applicant=''">
        <p v-show="error.applicant" v-html="error.applicant"></p>
      </div>
      <div class="select">
        <input type="text" placeholder="请输入您申请开通的学校名称" v-model="school" @click="error.name=''">
        <p v-show="error.name" v-html="error.name"></p>
      </div>
      <div class="select">
        <input type="text" placeholder="请选择您所在的地区" v-model="areaStatus" @click="areaShow" ref="area">
        <i></i>
        <p v-show="error.area" v-html="error.area"></p>
      </div>
      <div class="file" @click="upload();error.attachments=''">
        <div class="file-img" v-show="photo?!isPhoto:isPhoto">
          <i class="icon-login_img_camera"></i>
          添加照片
        </div>
        <div class="preview" v-show="photo?isPhoto:!isPhoto">
          <img :src="photo?photo:''" alt="">
        </div>
        <h5>{{h5}}</h5>
        <p v-show="error.attachments" v-html="error.attachments"></p>
      </div>
    </div>
    <div class="btn x" @click="sub">提交创建</div>
    <SelectArea :status="areaSelect"
                :class="{'none':!areaSelect}"
                :area='areaStatus'
                @areaShow="areaShow"
                @update:area="val => areaStatus = val">
    </SelectArea>
    <Confirm ref="confirm" :confirmBtnText="confirmText" :canShow="false" :head="head">
      <div id="text" v-html="message"></div>
    </Confirm>
  </main>
</template>

<script>
  import SelectArea from 'base/selectArea'
  import {upload} from "common/js/uploadImg";

  export default {
    name: "create",
    components: {SelectArea},
    mixins: [upload],
    data() {
      return {
        switches: [
          {name: '个人创建'},
          {name: '机构创建'}
        ],
        currentIndex: 0,
        head:'提示',
        confirmText:'确定',
        message:'提交成功，请耐心等待审核结果',
        text: ['请上传学生证或其他证明照片', '请上传公章证明或机构证书'],
        isPhoto: true,
        name: '',
        school: '',
        provinceId: '',
        cityId: '',
        regionId: '',
        areaStatus: '',
        areaSelect: false,
        error: {
          applicant: '',
          area: '',
          name: '',
          attachments: '',
        },
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
      areaShow(ids) {
        this.$refs.area.blur();
        this.error.area='';
        this.areaSelect = !this.areaSelect;
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
           this.$refs.confirm.show()
          } else if (r.status == 'fail') {
            for (let k in r.data) {
              // console.log(k,data.data[k])
              this.error[k] = r.data[k][0]
            }
            if (!this.areaStatus) {
              this.error.area = '请选择所在地区'
            }
          }
        })
      },
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
    margin: 60px auto 0;
    .file {
      margin: 30px 0;
      @extend %start;
      color: $color-text-l;
      font-size: $font-size-medium;
      position: relative;
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
      p{
        position: absolute;
        left: 20px;
        top: 170px;
        font-size: $font-size-small;
        color: #ff4d5a;
        &:before {
          content: '*';
          display: inline-block;
          margin-right: 4px;
        }
      }
    }
  }
</style>
