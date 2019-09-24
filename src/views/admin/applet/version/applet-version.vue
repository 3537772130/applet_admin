<style version="text/css">
  .applet-version-input {
    width: 290px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :rules="versionRules" :inline="true" :model="versionForm" ref="versionForm" class="demo-form-inline">
        <el-form-item label="程序编码" prop="appletCode">
          <el-input v-model="versionForm.appletCode" maxlength="15" placeholder="输入程序编码"
                    class="applet-version-input"></el-input>
        </el-form-item>
        <el-form-item label="程序名称" prop="appletName">
          <el-input v-model="versionForm.appletName" maxlength="15" placeholder="输入程序名称"
                    class="applet-version-input"></el-input>
        </el-form-item>
        <el-form-item label="类型状态" prop="versionStatus">
          <el-select v-model="versionForm.versionStatus" placeholder="选择类型状态" class="applet-version-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件版本" prop="versionName">
          <el-input v-model="versionForm.versionName" maxlength="15" placeholder="输入文件版本"
                    class="applet-version-input"></el-input>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button version="primary" @click="onSubmit()" class="applet-version-input">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script version="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-version',
    data() {
      return {
        loading: false,
        versionForm: {
          id: '',
          versionName: '',
          versionStatus: '1'
        },
        versionRules: {
          roleName: [
            {required: true, message: '请输入文件版本', trigger: 'blur'},
            {version: 'string', min: 1, max: 15, message: '文件版本长度为1-15个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      let versionId = this.$cookies.get('applet_version_id')
      this.loadAppletType(versionId)
    },
    mounted() {
    },
    methods: {
      loadAppletType(versionId) {
        if (versionId) {
          this.versionForm.id = versionId
          this.loading = true
          this.$axios({
            url: '/api/manage/applet/loadAppletType',
            method: 'post',
            data: {id: versionId}
          }).then(res => {
            if (res.data.code === '1') {
              this.versionForm = res.data.data
              this.versionForm.versionStatus = this.versionForm.versionStatus ? '1' : '0'
              delete this.versionForm.updateTime
            } else if (res.data.code === "-1") {
              this.$message.error(res.data.data)
            }
            this.$cookies.remove('applet_version_id')
            versionId = null
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      onSubmit() {
        this.$refs['versionForm'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/applet/updateAppletType',
              method: 'post',
              data: this.versionForm
            }).then(res => {
              let that = this
              res.data.code === '1' ? this.$message.success({
                message: res.data.data, duration: 1000, onClose: function () {
                  that.$emit('refreshSet')
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
