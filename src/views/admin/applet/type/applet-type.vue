<style type="text/css">
  .applet-type-input {
    width: 290px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :rules="typeRules" :inline="true" :model="typeForm" ref="typeForm" class="demo-form-inline">
        <el-form-item label="类型名称" prop="typeName">
          <el-input v-model="typeForm.typeName" maxlength="15" placeholder="请输入类型名称"
                    class="applet-type-input"></el-input>
        </el-form-item>
        <el-form-item label="类型状态" prop="typeStatus">
          <el-select v-model="typeForm.typeStatus" placeholder="请选择类型状态" class="applet-type-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit()" class="applet-type-input">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-type',
    data() {
      return {
        loading: false,
        typeForm: {
          id: '',
          typeName: '',
          typeStatus: '1'
        },
        typeRules: {
          roleName: [
            {required: true, message: '请输入类型名称', trigger: 'blur'},
            {type: 'string', min: 1, max: 15, message: '类型名称长度为1-15个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      let typeId = this.$cookies.get('applet_type_id')
      this.loadAppletType(typeId)
    },
    mounted() {
    },
    methods: {
      loadAppletType(typeId) {
        if (typeId) {
          this.typeForm.id = typeId
          this.loading = true
          this.$axios({
            url: '/api/manage/applet/loadAppletType',
            method: 'post',
            data: {id: typeId}
          }).then(res => {
            if (res.data.code === '1') {
              this.typeForm = res.data.data
              this.typeForm.typeStatus = this.typeForm.typeStatus ? '1' : '0'
              delete this.typeForm.updateTime
            } else if (res.data.code === "-1") {
              this.$message.error(res.data.data)
            }
            this.$cookies.remove('applet_type_id')
            typeId = null
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      onSubmit() {
        this.$refs['typeForm'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/applet/updateAppletType',
              method: 'post',
              data: this.typeForm
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
