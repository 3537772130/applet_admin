<style type="text/css">
  .applet-details-tabs {
    height: 320px;
  }

  .applet-details-tabs .el-form-item__label {
    width: 90px;
  }

  .demo-image__preview .el-image-viewer__close > i {
    color: #FFFFFF;
  }

  .applet-details-logo {
    width: 180px;
    height: 180px;
    position: relative;
    top: -200px;
    left: 400px;
  }

  .applet-details-logo > .el-image {
    width: 180px;
    height: 180px;
    text-align: center;
    line-height: 180px;
  }

  .applet-details-logo > .el-image > img {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    position: relative;
    top: 20px;
  }

  .applet-details-logo > .el-image > img:hover {
    width: 130px;
    height: 130px;
    border-radius: 65px;
    transition: all 1s;
    transform: scale(1.1);
  }

  .applet-details-input{
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
            <el-image :src="'api\\' + info.appletLogo" :preview-src-list="logoList"></el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="营业信息" name="business" style="height: 400px;">
          <el-form style="text-align: left; padding-top: 30px;">
            <el-form-item label="执照代码" class="form-info-div">
              <span>{{info.licenseCode}}</span>
            </el-form-item>
            <el-form-item label="营业范围" class="form-info-div">
              <div style="width: 260px;padding-left: 90px;">{{info.businessScope}}</div>
            </el-form-item>
            <el-form-item label="所在地域" class="form-info-div">
              <span>{{info.province}},{{info.city}},{{info.county}}</span>
            </el-form-item>
          </el-form>
          <div class="demo-image__preview applet-details-logo" style="top: -180px;">
            <el-image :src="'api\\' + info.licenseSrc" :preview-src-list="licenseList"></el-image>
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
        <el-tab-pane label="推荐信息" name="recommend" style="height: 400px;">
          <el-form style="text-align: left; padding-top: 30px;">
            <el-form-item label="推荐人" class="form-info-div">
              <span>{{info.recommenderAccount}}({{info.recommenderName}})</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-form :model="auditForm" ref="auditForm" :rules="auditRules" :inline="true"
               style="text-align: left; padding-top: 30px;">
        <el-form-item label="审核结果" prop="result">
          <el-select v-model="auditForm.result" placeholder="请选择审核结果" class="applet-details-input">
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
          <el-button type="primary" @click="onSubmit('auditForm')">提交</el-button>
        </el-form-item>
      </el-form>
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
        logoList: [],
        licenseList: [],
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
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/loadAppletAuditDetails',
          method: 'post',
          data: {id: id}
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.info = res.data.data
            this.logoList.push('api\\' + this.info.appletLogo)
            this.licenseList.push('api\\' + this.info.licenseSrc)
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
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/updateManagerRole',
              method: 'post',
              data: this.auditForm
            }).then(res => {
              console.info('后台返回的数据', res.data)
              let that = this
              res.data.code === '1' ? this.$message.success({message: res.data.data,duration: 1000, onClose: function () {
                  that.$emit('setAppletId')
                }
              }) : this.$message.error(res.data.data)
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          }
        })
      }
    }
  }
</script>
