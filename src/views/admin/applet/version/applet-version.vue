<style version="text/css">
  .applet-version-input {
    width: 290px;
    text-align: left;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :rules="versionRules" :inline="true" :model="versionForm" ref="versionForm" class="demo-form-inline">
        <el-form-item label="程序编码">
          <div class="applet-version-input">{{info.appletCode}}</div>
        </el-form-item>
        <el-form-item label="程序名称">
          <div class="applet-version-input">{{info.appletName}}</div>
        </el-form-item>
        <el-form-item label="服务类型">
          <div class="applet-version-input">{{info.typeName}}</div>
        </el-form-item>
        <el-form-item label="文件版本" prop="fileId">
          <el-select v-model="versionForm.fileId" placeholder="选择文件版本" class="applet-version-input">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(item, index) in fileList" :key="index" :label="item.versionNumber" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit()" class="applet-version-input" style="text-align: center;">提交</el-button>
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
        fileList: [],
        info: {},
        versionForm: {
          id: '',
          fileId: ''
        },
        versionRules: {
          fileId: [
            {required: true, message: '请选择文件版本', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      let versionId = this.$cookies.get('applet_version_id')
      this.loadAppletVersion(versionId)
    },
    mounted() {
    },
    methods: {
      loadAppletVersion(versionId) {
        if (versionId) {
          this.loading = true
          this.$axios({
            url: '/api/manage/applet/loadAppletVersion',
            method: 'post',
            data: {id: versionId}
          }).then(res => {
            this.fileList = res.data.data.list
            if (res.data.code === '1') {
              this.info = res.data.data.info
              this.versionForm.id = this.info.id
              this.versionForm.fileId = this.info.fileId
              this.versionForm.versionId = this.info.versionId
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
              url: '/api/manage/applet/updateAppletVersion',
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
