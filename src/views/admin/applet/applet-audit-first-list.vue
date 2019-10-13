<style type="text/css">
  .applet-audit-input {
    width: 190px;
  }

  .applet-record-dialog .el-dialog {
    width: 450px;
  }

  .applet-record-dialog .el-dialog > .el-dialog__body {
    padding: 0px 0px;
  }

  .applet-details-dialog .el-dialog {
    width: 650px;
  }

  .applet-details-dialog .el-dialog > .el-dialog__body {
    padding: 0px 0px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="audit-form-first" :inline="true" :model="info" ref="appletAuditFirstForm" class="demo-form-inline"
               style="text-align: left;">
        <el-form-item label="编码" prop="appletCode">
          <el-input v-model="info.appletCode" placeholder="请输入小程序编码" class="applet-audit-input"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="appletName">
          <el-input v-model="info.appletName" placeholder="输入小程序名称" class="applet-audit-input"></el-input>
        </el-form-item>
        <el-form-item label="用户手机" prop="mobile">
          <el-input type="number" v-model="info.mobile" placeholder="输入用户手机号码" class="applet-audit-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="resetForm('appletAuditFirstForm')">重置</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="info.page" type="hidden"></el-input>
          <el-input v-model="info.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="appletCode" label="编码" width="185"></el-table-column>
        <el-table-column align="center" prop="appletName" label="名称" width="220"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="mobile" label="用户(账号/名称)" width="180" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.mobile + '(' + scope.row.nickName + ')'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="typeName" label="服务类型" :show-overflow-tooltip="true"
                         width="120"></el-table-column>
        <el-table-column align="center" prop="ifRetail" label="营业类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.ifRetail">批发</span>
            <span v-if="!scope.row.ifRetail">零售</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="province" label="省份" :show-overflow-tooltip="true"
                         width="120"></el-table-column>
        <el-table-column align="center" prop="city" label="城市" :show-overflow-tooltip="true"
                         width="120"></el-table-column>
        <el-table-column align="center" prop="county" label="区/县" :show-overflow-tooltip="true"
                         width="120"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新日期" width="160"></el-table-column>
        <el-table-column align="center" prop="auditResult" label="审核状态" width="100" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击查看审核记录" placement="top">
              <el-link type="warning" :underline="false" @click="loadAuditRecord(scope.row.id, scope.row.appletName)">
                待审核
              </el-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini"
                       @click="loadDetails(scope.row.id, scope.row.appletName, scope.row.status)">审核
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

      <el-dialog :title="showTitle" :visible.sync="showRecord" class="applet-record-dialog"
                 :modal-append-to-body="false"
                 :close-on-click-modal="false">
        <appletAuditRecord ref="appletAuditRecord" v-on:setAppletId="setAppletId"></appletAuditRecord>
      </el-dialog>
      <el-dialog :title="showTitle" :visible.sync="showDetails" class="applet-details-dialog"
                 :modal-append-to-body="false"
                 :close-on-click-modal="false">
        <appletDetails ref="appletDetails" v-on:setAppletId="setAppletId"></appletDetails>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import appletAuditRecord from '@/views/admin/applet/applet-audit-record.vue'
  import appletDetails from '@/views/admin/applet/applet-details.vue'

  export default {
    name: 'applet-audit-first-list',
    components: {
      'appletAuditRecord': appletAuditRecord,
      'appletDetails': appletDetails
    },
    data() {
      return {
        loading: true,
        tableHeight: 50,
        showDetails: false,
        showRecord: false,
        showTitle: '',
        currentPage: 1,
        total: 0,
        info: {
          appletCode: '',
          appletName: '',
          mobile: '',
          province: '',
          city: '',
          county: '',
          recommenderAccount: '',
          ifRetail: '',
          ifSelling: '',
          status: '',
          page: 1,
          pageSize: 15
        },
        provList: [],
        cityList: [],
        countyList: [],
        tableData: []
      }
    },
    created() {
      this.$global.selectRegionList(this, '', '1')
      this.onSubmit()
    },
    mounted() {

    },
    methods: {
      indexMethod(index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      selectProvince() {
        let province = this.info.province
        this.info.city = ''
        this.info.county = ''
        this.cityList = []
        this.countyList = []
        if (province != '') {
          let obj = this.provList.find((item) => {
            return item.areaName === province;
          })
          this.$global.selectRegionList(this, obj.id, '2')
        }
      },
      selectCity() {
        let city = this.info.city
        this.countyList = []
        this.info.county = ''
        if (city != '') {
          let obj = this.cityList.find((item) => {
            return item.areaName === city;
          })
          this.$global.selectRegionList(this, obj.id, '3')
        }
      },
      onSubmit() {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/queryAppletAuditToFirstTrial',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'audit-form-first')
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
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.info.page = val
        this.onSubmit()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      loadAuditRecord(appletId, appletName) {
        this.showRecord = true
        this.showTitle = appletName + ' - 审核记录'
        try {
          this.$refs.appletAuditRecord.setAppletId(appletId)
        } catch (e) {
          this.$cookies.set('appletId', appletId)
        }
      },
      loadDetails(appletId, appletName) {
        this.showDetails = true
        this.showTitle = appletName + ' - 详情'
        this.$cookies.set('auditResult', 1)
        try {
          this.$refs.appletDetails.setAppletId(appletId)
        } catch (e) {
          this.$cookies.set('appletId', appletId)
        }
      },
      setAppletId() {
        this.showDetails = false
        this.selectList()
      }
    }
  }
</script>
