<style type="text/css">
  .applet-details-tabs {
    height: 320px;
  }

  .applet-details-tabs .el-form-item__label {
    width: 100px;
  }

  .applet-details-form .el-form-item__label {
    width: 100px;
  }

  .demo-image__preview .el-image-viewer__close > i {
    color: #FFFFFF;
  }

  .applet-details-logo {
    position: absolute;
    top: 60px;
    left: 400px;
  }

  .applet-details-logo > .el-image > img {
    width: 120px;
    height: 120px;
  }

  .applet-details-input {
    width: 290px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-tabs v-model="editableTabsValue" type="border-card" class="applet-details-tabs">
        <el-tab-pane label="基础信息" name="basics" style="height: 400px;">
          <el-form style=" height: 235px; text-align: left; padding-top: 30px;">
            <el-form-item label="编码" class="form-info-div">
              <span>{{info.appletCode}}</span>
            </el-form-item>
            <el-form-item label="名称" class="form-info-div">
              <span>{{info.appletName}}</span>
            </el-form-item>
            <el-form-item label="简称" class="form-info-div">
              <span>{{info.appletSimple}}</span>
            </el-form-item>
            <el-form-item label="联系电话" class="form-info-div">
              <span>{{info.telephone}}</span>
            </el-form-item>
            <el-form-item label="营业类型" class="form-info-div">
              <span>{{info.ifRetail ? '批发':'零售'}}</span>
            </el-form-item>
          </el-form>
          <div class="demo-image__preview applet-details-logo">
            <el-image :src="'api\\' + info.appletLogo" :preview-src-list="imgList"></el-image>
            <div style="color: #D9D9D9;font-size: 14px;">点击图片查看大图</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="营业信息" name="business" style="height: 400px;">
          <el-form style="text-align: left; padding-top: 30px;">
            <el-form-item label="执照代码" class="form-info-div">
              <span>{{info.licenseCode}}</span>
            </el-form-item>
            <el-form-item label="营业范围" class="form-info-div">
              <div style="width: 260px;padding-left: 100px;">{{info.businessScope}}</div>
            </el-form-item>
            <el-form-item label="所在地域" class="form-info-div">
              <span>{{info.province}},{{info.city}},{{info.county}}</span>
            </el-form-item>
          </el-form>
          <div class="demo-image__preview applet-details-logo">
            <el-image :src="'api\\' + info.licenseSrc" :preview-src-list="imgList"></el-image>
            <div style="color: #D9D9D9;font-size: 14px;">点击图片查看大图</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理信息" name="manage" style="height: 400px;">
          <el-form style="text-align: left; padding-top: 30px;">
            <el-form-item label="管理账号" class="form-info-div">
              <span>{{info.managerAccount}}</span>
            </el-form-item>
            <el-form-item label="管理密码" class="form-info-div">
              <span>{{info.managerPassword}}</span>
            </el-form-item>
            <el-form-item label="APPID" class="form-info-div">
              <span>{{info.appId}}</span>
            </el-form-item>
            <el-form-item label="SECRET" class="form-info-div">
              <span>{{info.appSecret}}</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div  v-if="auditResult == 1">
        <el-form :model="auditForm" ref="auditForm" :rules="auditRules" :inline="true"
                 style="text-align: left; padding-top: 30px;" class="applet-details-form">
          <el-form-item label="审核结果" prop="result">
            <el-select v-model="auditForm.result" placeholder="请选择审核结果" class="applet-details-input" @change="changeResult">
              <el-option label="请选择" value=''></el-option>
              <el-option label="驳回" value="-1"></el-option>
              <el-option label="通过" value="1"></el-option>
            </el-select>
          </el-form-item>
          <br/>
          <el-form-item label="备注说明" prop="remark">
            <el-input type="textarea" v-model="auditForm.remark" :show-word-limit="true" maxlength="90"
                      resize="none" rows="5" placeholder="请输入备注说明" class="applet-details-input"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label=" ">
            <el-button type="primary" @click="onSubmit('auditForm')" class="applet-details-input">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-details',
    data() {
      return {
        loading: false,
        editableTabsValue: 'basics',
        info: {},
        imgList: [],
        auditResult: this.$cookies.get('auditResult'),
        auditForm: {
          appletId: '',
          result: '',
          remark: ''
        },
        auditRules: {
          result: [
            {required: true, message: '请选择审核结果', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请输入备注说明', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.setAppletId(this.$cookies.get("appletId"))
    },
    mounted() {
    },
    methods: {
      setAppletId(id) {
        this.auditResult = this.$cookies.get('auditResult')
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/loadAppletAuditDetails',
          method: 'post',
          data: {id: id}
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.info = res.data.data
            this.imgList.push('api\\' + this.info.appletLogo)
            this.imgList.push('api\\' + this.info.licenseSrc)
            this.auditForm.appletId = this.info.id
          } else if (res.data.code === "-1") {
            this.$message.error(res.data.data)
          }
          this.$cookies.remove('appletId')
          this.editableTabsValue = 'basics'
          this.$global.exitLoad(this, null, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      },
      changeResult(){
        if (this.auditForm.result == 1){
          this.auditForm.remark = '审核通过，信息确认'
        }
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              let loading = Loading.service({fullscreen: true, text: '正在提交'})
              this.$axios({
                url: '/api/manage/applet/saveAppletAuditInfo',
                method: 'post',
                data: this.auditForm
              }).then(res => {
                  console.info('后台返回的数据', res.data)
                  if (res.data.code === '1') {
                    this.$refs[formName].resetFields();
                    this.$message.success(res.data.data)
                    this.$emit('setAppletId')
                  } else {
                    this.$message.error(res.data.data)
                  }
                  this.$global.exitLoad(this, loading, res.data)
                }
              ).catch(error => {
                console.info('错误信息', error)
                this.$global.exitLoad(this, loading, '')
              })
            }
          }
        )
      }
    }
  }
</script>
