<style type="text/css">
  .role-input{
    width: 290px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :rules="roleRules" :inline="true" :model="roleFrom" ref="roleFrom" class="demo-form-inline">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleFrom.roleName" maxlength="20" placeholder="请输入角色名称" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="简单描述" prop="describeStr">
          <el-input type="textarea" v-model="roleFrom.describeStr" :show-word-limit="true" maxlength="90"
                    resize="none" rows="5" placeholder="请输入描述" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <el-select v-model="roleFrom.status" placeholder="请选择状态" class="role-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit('roleFrom')" class="role-input">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'role-info',
    data () {
      return {
        loading: false,
        showInfo: false,
        showParent: false,
        showTitle: '',
        roleFrom: {
          id: '',
          roleName: '',
          describeStr: '',
          status: '1'
        },
        roleRules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {type: 'string', min: 1, max: 20, message: '账号长度为1-20个字符', trigger: 'blur'}
          ],
          describeStr: [
            {type: 'string', max: 150, message: '账号长度不能超过150个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      let roleId = this.$cookies.get('roleId')
      this.setRoleId(roleId)
    },
    mounted () {
    },
    methods: {
      setRoleId(roleId){
        if (roleId && roleId != '0'){
          this.roleFrom.id = roleId
          this.loading = true
          this.$axios({
            url: '/api/manage/getManagerRole',
            method: 'post',
            data: {id: roleId}
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code === '1') {
              this.roleFrom = res.data.data
              this.roleFrom.status = this.roleFrom.status ? '1':'0'
              delete this.roleFrom.updateDate
            } else if (res.data.code === "-1") {
              this.$message.error(res.data.data)
            }
            this.$cookies.remove('roleId')
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
        // this.$refs['roleForm'].resetFields()
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/updateManagerRole',
              method: 'post',
              data: this.roleFrom
            }).then(res => {
              console.info('后台返回的数据', res.data)
              let that = this
              res.data.code === '1' ? this.$message.success({message: res.data.data,duration: 1000, onClose: function () {
                  that.$emit('setRoleId')
              }
              }) : this.$message.error(res.data.data)
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          }
        })
      },
    }
  }
</script>
