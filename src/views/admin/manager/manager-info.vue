<style type="text/css">
  .el-form-item__label {
    width: 100px;
  }

  .role-input {
    width: 290px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding: 20px;">
      <el-form :rules="managerRules" :inline="true" :model="managerFrom" ref="managerFrom" class="demo-form-inline">
        <el-form-item label="用户账号" prop="userName" v-if="showUserName">
          <el-input v-model="managerFrom.userName" placeholder="请输入账号" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" v-if="!showUserName">
          <div class="role-input" style="text-align: left;">{{managerFrom.userName}}</div>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleId">
          <el-select v-model="managerFrom.roleId" placeholder="选择角色" class="role-input" @change="changeRole">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="role in roleList" :key="role" :label="role.name" :value="role.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="managerFrom.nickName" placeholder="请输入账号" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="managerFrom.password" placeholder="输入密码" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="managerFrom.confirmPassword" placeholder="输入确认密码"
                    class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input type="number" v-model="managerFrom.mobile" placeholder="输入手机号码" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="managerFrom.email" placeholder="输入邮箱" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="QQ账号" prop="qqAccount">
          <el-input type="number" v-model="managerFrom.qqAccount" placeholder="输入QQ账号" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="微信账号" prop="weChatAccount">
          <el-input v-model="managerFrom.weChatAccount" placeholder="输入微信账号" class="role-input"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-select v-model="managerFrom.province" placeholder="选择省份" class="role-input" @change="selectProvince">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="prov in provList" :key="prov" :label="prov.areaName" :value="prov.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="managerFrom.city" placeholder="选择城市" class="role-input" @change="selectCity">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="city in cityList" :key="city" :label="city.areaName" :value="city.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区/县" prop="county">
          <el-select v-model="managerFrom.county" placeholder="选择区/县" class="role-input">
            <el-option label="请选择" value=''></el-option>
            <el-option v-for="county in countyList" :key="county" :label="county.areaName"
                       :value="county.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级" prop="parentId" v-if="showParent">
          <el-select v-model="managerFrom.parentId" placeholder="选择上级" class="role-input">
            <el-option label="请选择" value=''></el-option>
            <el-option label="角色1" value="1"></el-option>
            <el-option label="角色2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="managerFrom.status" placeholder="选择状态" class="role-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('managerFrom')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'manager-info',
    data () {
      return {
        loading: false,
        showUserName: true,
        showInfo: false,
        showParent: false,
        showTitle: '',
        roleList: [],
        provList: [],
        cityList: [],
        countyList: [],
        managerFrom: {
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
    created () {
      this.selectManagerRoleList()
      this.$global.selectRegionList(this, '', '1')
      let managerId = this.$cookies.get('managerId')
      this.setManagerId(managerId)
    },
    mounted () {
    },
    methods: {
      setManagerId (managerId) {
        if (managerId && managerId != '0') {
          this.managerFrom.id = managerId
          this.showUserName = false
          this.loading = true
          this.$axios({
            url: '/api/manager/getManagerInfo',
            method: 'post',
            data: {id: managerId}
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code === '1') {
              res.data.data.confirmPassword = null
              this.managerFrom = res.data.data
              this.managerFrom.status = this.managerFrom.status ? '1' : '0'
              delete this.managerFrom.createDate
            } else if (res.data.code === '-1') {
              this.$message.error(res.data.data)
            }
            this.$cookies.remove('managerId')
            this.$global.exitLoad(this, null, res.data)
            this.selectProvince()
            this.selectCity()
            this.$refs['managerFrom'].clearValidate('userName','password','confirmPassword')
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        } else {
          this.managerFrom = {password: '', confirmPassword: '', status: '1'}
        }
      },
      selectManagerRoleList () {
        this.$axios({
          url: '/api/manager/selectManagerRoleList',
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
      selectProvince () {
        let province = this.managerFrom.province
        this.managerFrom.city = ''
        this.managerFrom.county = ''
        this.countyList = []
        if (province != '') {
          let obj = this.provList.find((item) => {
            return item.areaName === province
          })
          this.$global.selectRegionList(this, obj.id, '2')
        }
      },
      selectCity () {
        let city = this.managerFrom.city
        this.managerFrom.county = ''
        if (city != '') {
          let obj = this.cityList.find((item) => {
            return item.areaName === city
          })
          this.$global.selectRegionList(this, obj.id, '3')
        }
      },
      getManagerId () {
        return this.managerFrom.id
      },
      getPassword () {
        return this.managerFrom.password
      },
      getRoleId () {
        return this.managerFrom.roleId
      },
      changeRole () {
        if (this.managerFrom.roleId === 4) {
          this.showParent = true
        } else {
          this.showParent = false
        }
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            if (this.managerFrom.roleId != 4){
              delete this.managerFrom.parentId
              delete this.managerFrom.userName
            }
            this.$axios({
              url: '/api/manager/UpdateManagerInfo',
              method: 'post',
              data: this.managerFrom
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
