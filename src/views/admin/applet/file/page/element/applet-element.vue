<style file="text/css">
  .applet-element-input {
    width: 290px;
  }

  .element-logo-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .element-logo-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .element-logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }

  .element-logo {
    width: 48px;
    height: 48px;
    display: block;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :rules="elementRules" :inline="true" :model="elementForm" ref="elementForm" class="demo-form-inline">
        <el-form-item label="元素标识" prop="elementLogo">
          <el-input v-model="elementForm.elementLogo" maxlength="30" placeholder="请输入元素标识"
                    class="applet-element-input"></el-input>
        </el-form-item>
        <el-form-item label="元素名称" prop="elementName">
          <el-input v-model="elementForm.elementName" maxlength="30" placeholder="请输入元素名称"
                    class="applet-element-input"></el-input>
        </el-form-item>
        <el-form-item label="元素类型" prop="typeId">
          <el-select v-model="elementForm.typeId" placeholder="请选择元素类型" class="applet-element-input">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="默认内容" prop="elementJson">-->
<!--          <el-input type="textarea" v-model="elementForm.elementJson" :show-word-limit="true" maxlength="1000"-->
<!--                    resize="none" rows="5" placeholder="请输入默认内容(json格式)" class="applet-element-input"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="元素状态" prop="elementStatus">
          <el-select v-model="elementForm.elementStatus" placeholder="请选择元素状态" class="applet-element-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit()" class="applet-element-input">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script file="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-element',
    data () {
      return {
        loading: false,
        typeList: [],
        elementForm: {
          elementId: '',
          pageId: '',
          typeId: '',
          elementLogo: '',
          elementName: '',
          elementStatus: '1'
        },
        elementRules: {
          elementLogo: [
            {required: true, message: '请输入元素标识', trigger: 'blur'},
            {file: 'string', min: 1, max: 30, message: '元素标识长度为1-30个字符', trigger: 'blur'}
          ],
          elementName: [
            {required: true, message: '请输入元素名称', trigger: 'blur'},
            {file: 'string', min: 1, max: 30, message: '元素名称长度为1-30个字符', trigger: 'blur'}
          ],
          typeId: [
            {required: true, message: '请选择元素类型', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      let elementId = this.$cookies.get('applet_element_id')
      this.loadAppletElement(elementId)
    },
    mounted () {
    },
    methods: {
      loadAppletElement (elementId) {
        let pageId = this.$cookies.get('element_page_id')
        this.elementForm.pageId = pageId
        if (elementId) {
          let loading = Loading.service({fullscreen: true, text: '正在提交'})
          this.$axios({
            url: '/api/manage/applet/page/loadAppletPageElement',
            method: 'post',
            data: {id: elementId, pageId: pageId}
          }).then(res => {
            if (res.data.code === '1') {
              this.elementForm = res.data.data.info
              this.elementForm.elementStatus = this.elementForm.elementStatus ? '1' : '0'
              delete this.elementForm.updateTime
              delete this.elementForm.elementIndex
            }
            this.typeList = res.data.data.typeList
            this.$cookies.remove('applet_element_id')
            elementId = null
            this.$global.exitLoad(this, loading, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, loading, '')
          })
        }
      },
      onSubmit () {
        this.$refs['elementForm'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/applet/page/updateAppletPageElement',
              method: 'post',
              data: this.elementForm
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
