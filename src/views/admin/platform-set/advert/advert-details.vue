<style type="text/css">
  .upload-div {
    width: 280px;
    position: absolute;
    top: 95px;
    right: 30px;
  }

  .upload-div > .img-div {
    width: 100%;
  }

  .advert-img-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .advert-img-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .advert-img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 267px;
    text-align: center;
  }

  .advert-img {
    width: 178px;
    height: 267px;
    display: block;
  }

  .upload-div > .text-div {
    color: #cdcdcd;
    margin-top: 10px;
  }

  .advert-form {
    width: 380px;
    text-align: left;
    padding-left: 50px;
  }

  .advert-form .el-form-item__label {
    width: 100px;
  }

  .advert-form .el-input {
    width: 240px;
  }

  .advert-form .el-textarea {
    width: 240px;
  }

  .advert-form .el-button {
    width: 240px;
  }

  .advert-form .el-form-item__error {
    left: 100px;
  }

  .sub-div {
    height: 50px;
  }

  .sub-but {
    width: 320px;
    height: 30px;
  }
</style>
<template>
  <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
    <div class="upload-div" :style="info.pageLogo == 2 ? 'top: 190px;' : ''">
      <div class="img-div">
        <el-upload
          class="advert-img-uploader"
          action="/api/manage/platformSet/uploadImage"
          name="image"
          :show-file-list="false"
          :on-success="handleAdvertSuccess"
          :before-upload="beforeAdvertUpload">
          <img v-if="info.relationImage" :src="info.relationImage" class="advert-img"
               :style="info.pageLogo == 2 ? typeStyle : ''">
          <i v-else class="el-icon-plus advert-img-uploader-icon"
             :style="info.pageLogo == 2 ? typeIconStyle : 'line-height: 267px;'"></i>
        </el-upload>
      </div>
      <div class="text-div">上传推广图片</div>
    </div>
    <el-form :model="info" :rules="infoRules" ref="info" class="advert-form">
      <el-form-item label="小程序类型" prop="appletTypeId">
        <el-select v-model="info.appletTypeId" placeholder="请选择小程序类型"
                   @change="clearDate(1)">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面类型" prop="pageLogo">
        <el-select v-model="info.pageLogo" placeholder="请选择页面类型"
                   @change="clearDate(2)">
          <el-option label="请选择" value=''></el-option>
          <el-option label="load封面" value="LOAD"></el-option>
          <el-option label="主页" value="MAIN"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推广类型" prop="relationType">
        <el-select v-model="info.relationType" placeholder="请选择推广类型"
                   @change="typeChange">
          <el-option label="内部推广" value="1"></el-option>
          <el-option label="外部推广" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联网址" prop="relationWebsite">
        <el-input type="textarea" v-model="info.relationWebsite" placeholder="请输入关联网址"
                  maxlength="150" resize="none" rows="3"></el-input>
      </el-form-item>
      <el-form-item label="推广对象" prop="relationName">
        <el-input v-model="info.relationName" placeholder="企业、店铺名称" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="开始日期" prop="startTime" v-if="!info.isDefault">
        <el-date-picker v-model="info.startTime" placeholder="请选择日期" :format="format"
                        :value-format="valueFormat" :picker-options="pickerOptionsStart">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期" prop="expireTime" v-if="!info.isDefault">
        <el-date-picker v-model="info.expireTime" placeholder="请选择日期" :format="format"
                        :value-format="valueFormat" :picker-options="pickerOptionsStart">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否默认" prop="isDefault" v-if="info.relationType === '1'">
        <el-switch v-model="info.isDefault" active-color="#409EFF" :active-text="isDefaultText"
                   inactive-color="#303133" @change="defaultChange"></el-switch>
      </el-form-item>
      <el-form-item label="关联状态" prop="relationStatus">
        <el-switch v-model="info.relationStatus" active-color="#409EFF" :active-text="relationStatusText"
                   inactive-color="#303133" @change="statusChange"></el-switch>
      </el-form-item>
      <el-form-item class="sub-div">
        <el-button class="sub-but" type="primary" style="position: absolute;left: 100px;"
                   @click="onSubmitInfo()">提&nbsp;&nbsp;交
        </el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'user-info',
    data () {
      return {
        loading: false,
        typeList: [],
        info: {
          id: '',
          relationImage: '',
          appletTypeId: '',
          pageLogo: '',
          relationType: '1',
          relationWebsite: '',
          relationName: '平台推广',
          startTime: '2020/05/07',
          expireTime: '',
          isDefault: false,
          relationStatus: false
        },
        lastTime: Date.now(),
        format: 'yyyy年MM月dd日',
        valueFormat: 'yyyy/MM/dd',
        isDefaultText: '关闭',
        relationStatusText: '禁用',
        typeStyle: 'width: 275px;height: 80px;',
        typeIconStyle: 'width: 275px;height: 80px;line-height: 80px;',
        infoRules: {
          relationImage: [
            {required: true, message: '请上传推广图片', trigger: 'blur'}
          ],
          appletTypeId: [
            {required: true, message: '请选择小程序类型', trigger: 'blur'}
          ],
          pageLogo: [
            {required: true, message: '请选择页面类型', trigger: 'blur'}
          ],
          relationWebsite: [
            {min: 0, max: 100, message: '关联网址长度过长', trigger: 'blur'}
          ],
          relationName: [
            {required: true, message: '请输入关联对象', trigger: 'blur'},
            {min: 1, max: 100, message: '关联对象长度过长', trigger: 'blur'}
          ]
        },
        pickerOptionsStart: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      }
    },
    created () {
      let id = this.$cookies.get('advert_relation_id')
      this.loadInfo(id)
      this.loadAppletFile()
      // this.info.startTime = this.addDate()
      // this.info.expireTime = this.info.startTime
    },
    mounted () {

    },
    methods: {
      loadInfo (id) {
        if (id && id != '0') {
          this.$cookies.remove('advert_relation_id')
          let loading = Loading.service({fullscreen: true, text: '加载中'})
          this.$axios({
            url: '/api/manage/platformSet/loadAppletAdvertRelationDetails',
            method: 'post',
            data: {id: id}
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code === '1') {
              this.info = res.data.data
              this.info.relationType = this.info.relationType.toString()
              this.statusChange()
              this.defaultChange()
              delete this.info.updateTime
            } else {
              this.$message.error(res.data.data)
            }
            this.$global.exitLoad(this, loading, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, loading, '')
          })
        } else {
          delete this.info.id
        }
      },
      loadAppletFile () {
        this.$axios({
          url: '/api/manage/applet/loadAppletFilePage',
          method: 'post'
        }).then(res => {
          if (res.data.code === '1') {
            this.typeList = res.data.data
          }
        }).catch(error => {
          console.info('错误信息', error)
        })
      },
      clearDate (type) {
        this.info.startTime = this.addDate()
        this.info.expireTime = this.info.startTime
        if (type === 2) {
          this.info.relationImage = ''
        }
        if (this.info.appletTypeId != '' && this.info.pageLogo != '') {
          this.$axios({
            url: '/api/manage/platformSet/queryAppletAdvertRelationByLastExpireTime',
            method: 'post',
            data: {appletTypeId: this.info.appletTypeId, pageLogo: this.info.pageLogo},
          }).then(res => {
            if (res.data.code === '1') {
              let data = res.data.data
              this.info.startTime = data.startDate
              this.info.expireTime = data.expireTime
              this.pickerOptionsStart = {
                disabledDate (time) {
                  return time.getTime() < new Date(data.lastDate)
                }
              }
            }
          }).catch(error => {
            console.info('错误信息', error)
          })
        }
      },
      typeChange () {
        if (this.info.relationType != '1') {
          this.info.isDefault = false
          this.info.relationName = this.info.relationName.trim() === '平台推广' ? '' : this.info.relationName
        } else {
          this.info.relationName = '平台推广'
        }
        console.info('结果：' + this.info.id ? (this.info.relationType != '1') : false)
      },
      defaultChange () {
        if (this.info.isDefault) {
          this.isDefaultText = '开启'
        } else {
          this.isDefaultText = '关闭'
        }
      },
      statusChange () {
        if (this.info.relationStatus) {
          this.relationStatusText = '正常'
        } else {
          this.relationStatusText = '禁用'
        }
      },
      handleAdvertSuccess (res, file) {
        if (res.code === '1') {
          // this.info.avatarUrl = URL.createObjectURL(file.raw)
          this.info.relationImage = res.data
          this.$message({message: '上传成功', type: 'success'})
        } else {
          this.$message.error('上传失败')
        }
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        this.$global.exitLoad(this, loading, {'code': res.data})
      },
      beforeAdvertUpload (file) {
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        const isJPG = 'image/png,image/jpeg,image/jpg'.indexOf(file.type) >= 0
        const isLt2M = file.size / 1024 / 1024 < 3
        if (!isJPG) {
          this.$message.error('上传推广图片格式错误!')
        }
        if (!isLt2M) {
          this.$message.error('上传推广图片大小不能超过 3MB!')
        }
        if (!isJPG || !isLt2M) {
          loading.close()
        }
        return isJPG && isLt2M
      },
      onSubmitInfo () {
        this.$refs['info'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/platformSet/updateAppletAdvertRelation',
              method: 'POST',
              data: this.info
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                this.$emit('loadInfo')
              } else if (res.data.code === '-1') {
                this.$message.error(res.data.data)
              }
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          } else {
            this.$message({message: '信息提交失败', type: 'warning'})
          }
        })
      },
      addDate () {
        const nowDate = new Date()
        let date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
          date: nowDate.getDate(),
        }
        let systemDate = date.year
        systemDate += '/' + (date.month > 9 ? date.month : '0' + date.month)
        systemDate += '/' + (date.date > 9 ? date.date : '0' + date.date)
        console.log(systemDate)
        return systemDate
      }
    }
  }
</script>
