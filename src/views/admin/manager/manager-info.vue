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
        <el-form-item label="省份" prop="province">
          <el-select v-model="managerForm.province" placeholder="选择省份" class="manager-input" @change="selectProvince">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="(prov, index) in provList" :key="index" :label="prov.areaName"
                       :value="prov.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="managerForm.city" placeholder="选择城市" class="manager-input" @change="selectCity">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="(city, index) in cityList" :key="index" :label="city.areaName"
                       :value="city.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区/县" prop="county">
          <el-select v-model="managerForm.county" placeholder="选择区/县" class="manager-input" @change="selectCounty">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="(county, index) in countyList" :key="index" :label="county.areaName"
                       :value="county.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级" prop="parentId" v-if="showParent">
          <el-select v-model="managerForm.parentId" placeholder="选择上级" class="manager-input">
            <el-option label="请选择" value=''></el-option>
            <el-option label="角色1" value="1"></el-option>
            <el-option label="角色2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="managerForm.status" placeholder="选择状态" class="manager-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" " prop="" v-if="showParent">
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
          province: [
            {required: true, message: '请选择省份', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'blur'}
          ],
          county: [
            {required: true, message: '请选择区县', trigger: 'blur'}
          ],
          parentId: [
            {validator: this.$global.validate(this).managerParentIdValidator, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.selectManagerRoleList()
      this.$global.selectRegionList(this, '', '1')
      let managerId = this.$cookies.get('managerId')
      this.setManagerId(managerId)
    },
    mounted() {
    },
    methods: {
      setManagerId(managerId) {
        if (managerId && managerId != '0') {
          this.managerForm.id = managerId
          this.loading = true
          this.$axios({
            url: '/api/manage/getManagerInfo',
            method: 'post',
            data: {id: managerId}
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code === '1') {
              res.data.data.confirmPassword = null
              this.managerForm = res.data.data.manager
              this.cityList = res.data.data.cityList
              this.countyList = res.data.data.countyList
              this.managerForm.status = this.managerForm.status ? '1' : '0'
              this.showUserName = this.managerForm.userName
              delete this.managerForm.createDate
              delete this.managerForm.userName
            } else if (res.data.code === '-1') {
              this.$message.error(res.data.data)
            }
            this.$cookies.remove('managerId')
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        } else {
          this.showUserName = ''
          this.cityList = []
          this.countyList = []
          this.managerForm = {password: '', confirmPassword: '', status: '1'}
        }
        this.$refs['managerForm'].resetFields()
      },
      selectManagerRoleList() {
        this.$axios({
          url: '/api/manage/selectManagerRoleList',
          method: 'post',
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.roleList = res.data.data
          } else if (res.data.code === '-1') {
            this.$message.error(res.data.data)
          }
          this.$global.exitLoad(this, null, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      },
      selectProvince() {
        let province = this.managerForm.province
        this.managerForm.city = ''
        this.managerForm.county = ''
        this.cityList = []
        this.countyList = []
        if (province != '') {
          let obj = this.provList.find((item) => {
            return item.areaName === province
          })
          this.$global.selectRegionList(this, obj.id, '2')
        }
      },
      selectCity() {
        let city = this.managerForm.city
        this.countyList = []
        this.managerForm.county = ''
        if (city != '') {
          let obj = this.cityList.find((item) => {
            return item.areaName === city
          })
          this.$global.selectRegionList(this, obj.id, '3')
          this.selectCounty()
        }
      },
      selectCounty() {
        this.managerForm.status === '1' ? this.managerForm.status = '0' : this.managerForm.status = '1'
        this.managerForm.status === '1' ? this.managerForm.status = '0' : this.managerForm.status = '1'
      },
      getManagerId() {
        return this.managerForm.id
      },
      getPassword() {
        return this.managerForm.password
      },
      getRoleId() {
        return this.managerForm.roleId
      },
      changeRole() {
        if (this.managerForm.roleId === 4) {
          this.showParent = true
        } else {
          this.showParent = false
        }
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            if (this.managerForm.roleId != 4) {
              delete this.managerForm.parentId
            }
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
