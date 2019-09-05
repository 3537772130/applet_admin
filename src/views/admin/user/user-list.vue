<style type="text/css">
  .applet-input {
    width: 190px;
  }

  .user-dialog .el-dialog {
    width: 650px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="user-list-form" :inline="true" :model="info" ref="queryUserForm" class="demo-form-inline"
               style="text-align: left;">
        <el-form-item label="用户手机" prop="mobile">
          <el-input type="number" v-model="info.mobile" placeholder="输入用户手机号码" class="applet-input"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="info.nickName" placeholder="请输入用户昵称" class="applet-input"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="ifRetail">
          <el-date-picker v-model="info.startDate" placeholder="选择日期"
                          :format="format" :value-format="valueFormat" class="form-info-val">
          </el-date-picker>
          &nbsp;-&nbsp;
          <el-date-picker v-model="info.endDate" placeholder="选择日期"
                          :format="format" :value-format="valueFormat" class="form-info-val">
          </el-date-picker>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-select v-model="info.status" placeholder="请选择用户状态" class="applet-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="resetForm()">重置</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="info.page" type="hidden"></el-input>
          <el-input v-model="info.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号"
                         width="50"></el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号码" width="120"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="nickName" label="昵称" width="160"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="nickName" label="性别" width="50"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.gender ? '男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="birthday" label="生日" width="120"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" width="160"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="balance" label="余额" width="120"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="freeBalance" label="冻结余额" width="120"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="integral" label="积分" width="120"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="100"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.status">正常</el-link>
            <el-link type="warning" :underline="false" v-if="!scope.row.status">禁用</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createDate" label="更新日期" width="100"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="setStatus(scope.row.id)" v-if="scope.row.status">详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;height: 35px;padding-top: 10px;padding-right: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="info.page"
          :page-size="info.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="user-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false">
        <div style="overflow-x: hidden;overflow-y: auto;">
<!--          <appletDetails ref="appletDetails" v-on:setAppletId="setAppletId"></appletDetails>-->
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import appletDetails from '@/views/admin/applet/applet-details.vue'

  export default {
    name: 'applet-audit-list',
    components: {
      'appletDetails': appletDetails
    },
    data() {
      return {
        loading: true,
        tableHeight: 50,
        showInfo: false,
        showTitle: '',
        currentPage: 1,
        total: 0,
        info: {
          mobile: '',
          nickName: '',
          startDate: '',
          endDate: '',
          status: '',
          page: 1,
          pageSize: 15
        },
        format: 'yyyy年MM月dd日',
        valueFormat: 'yyyy-MM-dd',
        rList: []
      }
    },
    created() {
      this.onSubmit()
    },
    mounted() {
    },
    methods: {
      indexMethod(index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      onSubmit() {
        this.loading = true
        this.$axios({
          url: '/api/manage/user/queryUserToPage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'user-list-form')
          if (res.data.code === '1') {
            this.tableData = res.data.data.dataSource
            this.total = res.data.data.totalCount
          } else if (res.data.code === "-1") {
            this.$message.error(res.data.data)
          }
          this.$global.exitLoad(this, null, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      },
      selectList() {
        this.info.page = 1
        this.showInfo = false
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.info.page = val
        this.onSubmit()
      },
      resetForm() {
        this.info.startDate = ''
        this.info.endDate = ''
        this.$refs['queryUserForm'].resetFields();
      },
      setStatus(appletId, appletName) {

      },
      setAppletId() {
        this.selectList()
      }
    }
  }
</script>
