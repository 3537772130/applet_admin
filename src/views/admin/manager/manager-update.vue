<style type="text/css">

  .manager-update-form {
    text-align: left;
    padding-top: 30px;
    padding-left: 50px;
  }

  .manager-update-input {
    width: 190px;
  }

  .manager-update-form .el-form-item__error {
    left: 80px;
  }

  .form-info-div {
    text-align: left;
  }

  .sub-but {
    width: 215px;
    height: 30px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
<template>
  <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
    <el-tabs v-model="showTabs" type="border-card">
      <el-tab-pane label="修改信息" name="up-info" style="height: 400px;">
        <el-form :model="upInfo" :rules="infoRules" ref="upInfo" class="manager-update-form">
          <el-form-item label="用户账号">
            <div class="manager-update-input">{{info.userName}}</div>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="upInfo.nickName" placeholder="请输入昵称" class="manager-update-input"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="upInfo.mobile" placeholder="请输入手机号码" class="manager-update-input"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="upInfo.email" placeholder="请输入邮箱" class="manager-update-input"></el-input>
          </el-form-item>
          <el-form-item label="QQ账号" prop="qqAccount">
            <el-input v-model="upInfo.qqAccount" placeholder="请输入QQ账号" class="manager-update-input"></el-input>
          </el-form-item>
          <el-form-item label="微信账号" prop="weChatAccount">
            <el-input v-model="upInfo.weChatAccount" placeholder="请输入微信账号" class="manager-update-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="sub-but" type="primary" style="width: 190px;position: absolute;left: 80px;"
                       @click="onSubmitInfo()">提&nbsp;&nbsp;交
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="up-pass" style="height: 400px;">
        <el-form :model="passForm" :rules="passRules" ref="passForm" class="manager-update-form">
          <el-form-item label="原密码" prop="oldPass">
            <el-input v-model="passForm.oldPass" name="oldPass" type="password"
                      placeholder="请输入原密码"
                      class="manager-update-input"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input v-model="passForm.newPass" name="newPass" type="password"
                      placeholder="请输入登录密码"
                      class="manager-update-input"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPass">
            <el-input v-model="passForm.confirmPass" name="confirmPass" type="password"
                      placeholder="请输入确认密码"
                      class="manager-update-input"
                      show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="sub-but" type="primary" style="width: 190px;position: absolute;left: 80px;"
                       @click="onSubmitPass()">提&nbsp;&nbsp;交
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改头像" name="up-img" style="height: 400px;">
        <div style="text-align: left; padding-top: 30px;padding-left: 50px;">
          <el-upload
            class="avatar-uploader"
            action="/api/manage/manager/uploadManagerAvatar"
            name="avatar"
            :headers="myHeader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="info.avatarUrl" :src="info.avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span
            style="color: #DCDFE6; font-size: 14px;position: relative;top: 5px;left: 25px;">(点击图片修改头像)</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'user-info',
    data () {
      return {
        info: {},
        showTabs: 'up-info',
        loading: false,
        roleName: '',
        upInfo: {
          nickName: '',
          mobile: '',
          email: '',
          qqAccount: '',
          weChatAccount: ''
        },
        passForm: {
          oldPass: '',
          newPass: '',
          confirmPass: ''
        },
        infoRules: {
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {min: 1, max: 20, message: '昵称长度过长', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: this.$global.validate(this).mobileValidator, trigger: 'blur'}
          ]
        },
        passRules: {
          oldPass: [
            {required: true, message: '请输入原密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'},
            {type: 'string', max: 20, message: '密码长度最多20位', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'},
            {type: 'string', max: 20, message: '密码长度最多20位', trigger: 'blur'}
          ],
          confirmPass: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'},
            {type: 'string', max: 20, message: '密码长度最多20位', trigger: 'blur'},
            {validator: this.$global.validate(this).confirmPassValidator, trigger: 'blur'}
          ]
        },
        myHeader: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    },
    created () {
      this.loadManager()
    },
    mounted () {

    },
    methods: {
      loadManager () {
        this.info = this.$cookies.get('manager_info')
        this.upInfo.nickName = this.info.nickName
        this.upInfo.mobile = this.info.mobile
        this.upInfo.email = this.info.email
        this.upInfo.qqAccount = this.info.qqAccount
        this.upInfo.weChatAccount = this.info.weChatAccount
        this.roleName = this.info.roleName
      },
      getPassword () {
        return this.passForm.newPass
      },
      onSubmitInfo () {
        this.$refs['upInfo'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/manager/updateManagerBase',
              method: 'post',
              data: {
                nickName: this.upInfo.nickName, mobile: this.upInfo.mobile, email: this.upInfo.email,
                qqAccount: this.upInfo.qqAccount, weChatAccount: this.upInfo.weChatAccount
              }
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                let info = res.data.data
                this.info = info
                this.info.roleName = this.roleName
                this.$cookies.set('manager_info', info)
                this.$message({message: '修改信息成功', type: 'success'})
                this.$emit('loadManager')
              } else if (res.data.code === '-1') {
                this.$message.error(res.data.data)
              }
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          } else {
            this.$message({message: '信息提交失败', type: 'warning'})
          }
        })
      },
      onSubmitPass () {
        this.$refs['passForm'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/manager/updateManagerPassword',
              method: 'post',
              data: {oldPass: this.passForm.oldPass, newPass: this.passForm.newPass}
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                let that = this
                this.$message({
                  message: res.data.data,
                  type: 'success',
                  onClose: function () {
                    that.$axios({
                      url: '/api/manage/exitLogin',
                      method: 'post'
                    }).then(re => {
                      if (re.data.code === '1') {
                        that.$global.exitLoad(that, loading, {'code': '0'})
                      } else {
                        that.$message.error(re.data.data)
                      }
                    })
                  }
                })
              } else {
                this.$message.error(res.data.data)
                this.$global.exitLoad(this, loading, res.data)
              }
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          } else {
            this.$message({message: '信息提交失败', type: 'warning'})
          }
        })
      },
      handleAvatarSuccess (res, file) {
        if (res.code === '1') {
          this.info = this.$cookies.get('manager_info')
          // this.info.avatarUrl = URL.createObjectURL(file.raw)
          this.info.avatarUrl = res.data
          this.$cookies.set('manager_info', this.info)
          this.$message({message: '上传成功', type: 'success'})
          this.$emit('loadManager')
        } else {
          this.$message.error('上传失败')
        }
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        this.$global.exitLoad(this, loading, {'code': res.data})
      },
      beforeAvatarUpload (file) {
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        const isJPG = 'image/png,image/jpeg,image/jpg'.indexOf(file.type) >= 0
        const isLt2M = file.size / 1024 / 1024 < 3
        if (!isJPG) {
          this.$message.error('上传头像图片格式错误!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 3MB!')
        }
        if (!isJPG || !isLt2M) {
          loading.close()
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
