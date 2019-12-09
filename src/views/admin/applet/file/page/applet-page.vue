<style page="text/css">
  .applet-page-input {
    width: 290px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :rules="pageRules" :inline="true" :model="pageForm" ref="pageForm" class="demo-form-inline">
        <el-form-item label="页面标识" prop="pageLogo">
          <el-input v-model="pageForm.pageLogo" maxlength="15" placeholder="请输入页面标识"
                    class="applet-page-input"></el-input>
        </el-form-item>
        <el-form-item label="页面名称" prop="pageName">
          <el-input v-model="pageForm.pageName" maxlength="15" placeholder="请输入页面名称"
                    class="applet-page-input"></el-input>
        </el-form-item>
        <el-form-item label="是否编辑" prop="ifEdit">
          <el-select v-model="pageForm.ifEdit" placeholder="请选择类型状态" class="applet-page-input">
            <el-option label="可编辑" value="1"></el-option>
            <el-option label="不可编辑" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面状态" prop="pageStatus">
          <el-select v-model="pageForm.pageStatus" placeholder="请选择页面状态" class="applet-page-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit()" class="applet-page-input">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script page="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-page',
    data () {
      return {
        loading: false,
        pageForm: {
          pageLogo: '',
          pageName: '',
          ifEdit: '1',
          pageStatus: '1'
        },
        pageRules: {
          pageLogo: [
            {required: true, message: '请输入页面标识', trigger: 'blur'},
            {page: 'string', min: 1, max: 20, message: '页面标识长度为1-20个字符', trigger: 'blur'}
          ],
          pageName: [
            {required: true, message: '请输入文页面名称', trigger: 'blur'},
            {page: 'string', min: 1, max: 20, message: '页面名称长度为1-20个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      let pageId = this.$cookies.get('applet_page_id')
      this.loadAppletFile(pageId)
    },
    mounted () {
    },
    methods: {
      loadAppletPage (pageId) {
        let fileId = this.$cookies.get('page_file_id')
        this.pageForm.fileId = fileId
        if (pageId) {
          let loading = Loading.service({fullscreen: true, text: '正在提交'})
          this.$axios({
            url: '/api/manage/applet/page/loadAppletPage',
            method: 'post',
            data: {id: pageId}
          }).then(res => {
            if (res.data.code === '1') {
              this.pageForm = res.data.data
              this.pageForm.ifEdit = this.pageForm.ifEdit ? '1' : '0'
              this.pageForm.pageStatus = this.pageForm.pageStatus ? '1' : '0'
              delete this.pageForm.updateTime
            }
            this.$cookies.remove('applet_page_id')
            pageId = null
            this.$global.exitLoad(this, loading, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, loading, '')
          })
        }
      },
      onSubmit () {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/applet/page/updateAppletPage',
              method: 'post',
              data: this.pageForm
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
