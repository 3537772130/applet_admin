<style type="text/css">
  .el-form-item__label {
    width: 100px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding: 20px;">
      <el-form :rules="managerRules" :inline="true" :model="managerForm" ref="managerForm" class="demo-form-inline">
        <el-form-item label="用户账号" prop="userName" v-if="showUserName === ''">
          <el-input v-model="managerForm.userName" placeholder="请输入账号" class="manager-input"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" v-if="showUserName != ''">
          <div class="manager-input" style="text-align: left;">{{showUserName}}</div>
        </el-form-item>
        <el-form-item label=" " prop="">
          <div class="manager-input"></div>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="managerForm.nickName" placeholder="请输入昵称" class="manager-input"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleId">
          <el-select v-model="managerForm.roleId" placeholder="选择角色" class="manager-input" @change="changeRole">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="(role, index) in roleList" :key="index" :label="role.name" :value="role.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="managerForm.password" placeholder="请输入密码" class="manager-input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="managerForm.confirmPassword" placeholder="请输入确认密码"
                    class="manager-input"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input type="number" v-model="managerForm.mobile" placeholder="输入手机号码" class="manager-input"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="managerForm.email" placeholder="输入邮箱" class="manager-input"></el-input>
        </el-form-item>
        <el-form-item label="QQ账号" prop="qqAccount">
          <el-input type="number" v-model="managerForm.qqAccount" placeholder="输入QQ账号" class="manager-input"></el-input>
        </el-form-item>
        <el-form-item label="微信账号" prop="weChatAccount">
          <el-input v-model="managerForm.weChatAccount" placeholder="输入微信账号" class="manager-input"></el-input>
        </el-form-item>
        <el-form-item label="所属区域" prop="county">
          <el-cascader v-model="region" :options="regions" placeholder="请选择所属区域" @change="handleChange" style="width: 495px;"></el-cascader>
        </el-form-item>
        <el-form-item label="上级" prop="parentId" v-if="showParent">
          <el-select v-model="managerForm.parentId" placeholder="选择上级" class="manager-input">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="(parent, index) in parentList" :key="index" :label="parent.nickName + ' ' + parent.userName" :value="parent.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="managerForm.status" placeholder="选择状态" class="manager-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" " prop="" v-if="!showParent">
          <div class="manager-input"></div>
        </el-form-item>

        <div style="text-align: center;margin: 20px 0px;">
          <el-button type="primary" @click="onSubmit('managerForm')" class="manager-input">提交</el-button>
        </div>
      </el-form>
    </el-main>
  </div>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'manager-info',
    data() {
      return {
        loading: false,
        showUserName: '',
        showInfo: false,
        showParent: false,
        showTitle: '',
        roleList: [],
        provList: [],
        cityList: [],
        countyList: [],
        parentList: [],
        region: [],
        regions: [],
        managerForm: {
          id: '',
          userName: '',
          roleId: '',
          nickName: '',
          password: '',
          confirmPassword: '',
          mobile: '',
          email: '',
          qqAccount: '',
          weChatAccount: '',
          province: '',
          city: '',
          county: '',
          parentId: '',
          status: '1'
        },
        managerRules: {
          userName: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {type: 'string', min: 5, max: 20, message: '账号长度为5-20个字符', trigger: 'blur'},
            {validator: this.$global.validate(this).userNameValidator, trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请选择角色', trigger: 'blur'}
          ],
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {type: 'string', max: 20, message: '昵称长度不能超过20个字符', trigger: 'blur'}
          ],
          password: [
            {validator: this.$global.validate(this).managerPasswordValidator, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: this.$global.validate(this).managerConfirmPasswordValidator, trigger: 'blur'}
          ],
          mobile: [
            {type: 'string', max: 11, message: '长度为11个数字', trigger: 'blur'},
            {validator: this.$global.validate(this).mobileValidator, trigger: 'blur'}
          ],
          email: [
            {type: 'string', max: 50, message: '邮箱长度不能超过50个字符', trigger: 'blur'},
            {validator: this.$global.validate(this).emailValidator, trigger: 'blur'}
          ],
          qqAccount: [
            {type: 'string', max: 20, message: 'QQ账号长度不能超过20个字符', trigger: 'blur'}
          ],
          weChatAccount: [
            {type: 'string', max: 50, message: '微信账号长度不能超过50个字符', trigger: 'blur'}
          ],
          county: [
            {required: true, message: '请选择所属地域', trigger: 'blur'}
          ],
          parentId: [
            {required: true, message: '请选择上级', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      let managerId = this.$cookies.get('managerId')
      this.setManagerId(managerId)
    },
    mounted() {
    },
    methods: {
      setManagerId(managerId) {
        if (managerId){
          this.loading = true
          this.$axios({
            url: '/api/manage/getManagerInfo',
            method: 'post',
            data: {id: managerId}
          }).then(res => {
            console.info('后台返回的数据', res.data)
            this.parentList = res.data.data.parentList
            this.roleList = res.data.data.roleList
            this.regions = JSON.parse(res.data.data.regions)
            if (res.data.code === '1') {
              this.managerForm = res.data.data.manager
              this.region = [this.managerForm.province, this.managerForm.city, this.managerForm.county]
              this.managerForm.status = this.managerForm.status ? '1' : '0'
              this.showUserName = this.managerForm.userName
              delete this.managerForm.createDate
              delete this.managerForm.userName
              this.changeRole()
            }
            this.$cookies.remove('managerId')
            this.loading = false
            // this.$global.selectRegionJson(this)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      getManagerId() {
        return this.managerForm.id
      },
      getPassword() {
        return this.managerForm.password
      },
      changeRole() {
        if (this.managerForm.roleId === 4) {
          this.showParent = true
        } else {
          this.showParent = false
        }
      },
      handleChange(res){
        this.managerForm.province = res[0]
        this.managerForm.city = res[1]
        this.managerForm.county = res[2]
      },
      onSubmit(formName) {
        if (this.managerForm.roleId != 4) {
          delete this.managerForm.parentId
          this.$refs[formName].clearValidate("parentId")
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/UpdateManagerInfo',
              method: 'post',
              data: this.managerForm
            }).then(res => {
              console.info('后台返回的数据', res.data)
              let that = this
              res.data.code === '1' ? this.$message.success({
                message: res.data.data, duration: 1000, onClose: function () {
                  that.$emit('setManagerId')
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
