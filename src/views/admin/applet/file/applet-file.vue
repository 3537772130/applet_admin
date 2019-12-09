<style file="text/css">
  .applet-file-input {
    width: 290px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :rules="fileRules" :inline="true" :model="fileForm" ref="fileForm" class="demo-form-inline">
        <el-form-item label="服务类型" prop="typeId">
          <el-select v-model="fileForm.typeId" placeholder="请选择服务类型" class="applet-file-input">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件版本" prop="versionNumber">
          <el-input v-model="fileForm.versionNumber" maxlength="15" placeholder="请输入文件版本"
                    class="applet-file-input"></el-input>
        </el-form-item>
        <el-form-item label="类型状态" prop="fileStatus">
          <el-select v-model="fileForm.fileStatus" placeholder="请选择类型状态" class="applet-file-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit()" class="applet-file-input">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script file="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-file',
    data () {
      return {
        loading: false,
        typeList: [],
        fileForm: {
          typeId: '',
          versionNumber: '',
          fileStatus: '1'
        },
        fileRules: {
          typeId: [
            {required: true, message: '请输入文件版本', trigger: 'blur'}
          ],
          versionNumber: [
            {required: true, message: '请输入文件版本', trigger: 'blur'},
            {file: 'string', min: 1, max: 20, message: '文件版本长度为1-20个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      let fileId = this.$cookies.get('applet_file_id')
      this.loadAppletFile(fileId)
    },
    mounted () {
    },
    methods: {
      loadAppletFile (fileId) {
        if (fileId) {
          this.loading = true
          this.$axios({
            url: '/api/manage/applet/loadAppletFile',
            method: 'post',
            data: {id: fileId}
          }).then(res => {
            if (res.data.code === '1') {
              this.fileForm = res.data.data.info
              this.fileForm.fileStatus = this.fileForm.fileStatus ? '1' : '0'
              delete this.fileForm.updateTime
              delete this.fileForm.filePath
            }
            this.typeList = res.data.data.typeList
            this.$cookies.remove('applet_file_id')
            fileId = null
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      onSubmit () {
        this.$refs['fileForm'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/applet/updateAppletFile',
              method: 'post',
              data: this.fileForm
            }).then(res => {
              let that = this
              res.data.code === '1' ? this.$message.success({
                message: res.data.data,
                duration: 1000,
                onClose: function () {
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
