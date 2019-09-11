<style type="text/css">
  .manager-details-form {
    width: 500px;
    margin-top: 20px;
    margin-left: 50px;
  }

  .manager-details-form .manager-details-div {
    width: 290px;
    text-align: left;
    font-size: 18px;
  }

  .manager-details-form .manager-details-div > .avatar-img {
    width: 120px;
    height: 120px;
  }

  .manager-details-dialog .el-dialog {
    width: 750px;
  }
</style>
<template>
  <div style="width: 100%;">
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :model="managerForm" :inline="true" class="manager-details-form">
        <el-form-item label="用户头像">
          <div class="manager-details-div">
            <el-image :src="managerForm.avatarUrl" class="avatar-img"></el-image>
          </div>
        </el-form-item>
        <el-form-item label="用户账号">
          <div class="manager-details-div">{{managerForm.userName}}</div>
        </el-form-item>
        <el-form-item label="用户昵称">
          <div class="manager-details-div">{{managerForm.nickName}}</div>
        </el-form-item>
        <el-form-item label="用户角色">
          <div class="manager-details-div">{{managerForm.roleName}}</div>
        </el-form-item>
        <el-form-item label="手机号码">
          <div class="manager-details-div">{{managerForm.mobile}}</div>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <div class="manager-details-div">{{managerForm.email}}</div>
        </el-form-item>
        <el-form-item label="QQ账号">
          <div class="manager-details-div">{{managerForm.qqAccount}}</div>
        </el-form-item>
        <el-form-item label="微信账号">
          <div class="manager-details-div">{{managerForm.weChatAccount}}</div>
        </el-form-item>
        <el-form-item label="所属区域">
          <div class="manager-details-div">{{managerForm.province + managerForm.city + managerForm.county}}
          </div>
        </el-form-item>
        <el-form-item label="上级" v-if="managerForm.parentId != null">
          <div class="manager-details-div">{{managerForm.parentUserName + ' (' + managerForm.parentNickName + ')'}}
          </div>
        </el-form-item>

        <div style="text-align: center;margin: 20px 0px;">
          <el-button type="primary" @click="toUpdate()" style="width: 190px;">修改资料</el-button>
        </div>
      </el-form>
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="manager-details-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <managerDetails ref="managerDetails" v-on:loadManager="loadManager"></managerDetails>
      </el-dialog>
    </el-main>
  </div>
</template>
<script type="text/javascript">
  import managerDetails from '@/views/admin/manager/manager-update.vue'

  export default {
    name: 'manager-details',
    components: {
      'managerDetails': managerDetails
    },
    data() {
      return {
        loading: false,
        showInfo: false,
        showTitle: '修改资料',
        managerForm: {}
      }
    },
    created() {
      this.loadManagerInfo()
    },
    mounted() {
    },
    methods: {
      loadManagerInfo() {
        this.managerForm = this.$cookies.get('manager_info')
      },
      toUpdate() {
        this.showInfo = true
      },
      loadManager() {
        this.showInfo = false
        this.loadManagerInfo()
        this.$emit('updateInfo')
      }
    }
  }
</script>
