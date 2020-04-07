<style type="text/css">
  .applet-input {
    width: 190px;
  }

  .applet-dialog .el-dialog {
    width: 650px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-list-form" :inline="true" :model="info" ref="queryAppletForm" class="demo-form-inline"
               style="text-align: left;">
        <el-form-item label="编码" prop="appletCode">
          <el-input v-model="info.appletCode" placeholder="请输入小程序编码" :clearable="true" class="applet-input"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="appletName">
          <el-input v-model="info.appletName" placeholder="请输入小程序名称" :clearable="true" class="applet-input"></el-input>
        </el-form-item>
        <el-form-item label="用户手机" prop="mobile">
          <el-input type="number" v-model="info.mobile" placeholder="请输入用户手机号码" :clearable="true" class="applet-input"></el-input>
        </el-form-item>
        <el-form-item label="营业类型" prop="ifRetail">
          <el-select v-model="info.ifRetail" placeholder="请选择营业类型" class="applet-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="批发" value="1"></el-option>
            <el-option label="零售" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业状态" prop="ifSelling">
          <el-select v-model="info.ifSelling" placeholder="请选择营业状态" class="applet-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="正在营业" value="1"></el-option>
            <el-option label="暂停营业" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理状态" prop="ifSelling">
          <el-select v-model="info.status" placeholder="请选择管理状态" class="applet-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-select v-model="info.province" placeholder="请选择省份" class="applet-input" @change="selectProvince">
            <el-option label="全部" value=''></el-option>
            <el-option v-for="(prov, index) in provList" :key="index" :label="prov.areaName"
                       :value="prov.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="info.city" placeholder="请选择城市" class="applet-input" @change="selectCity">
            <el-option label="全部" value=''></el-option>
            <el-option v-for="(city, index) in cityList" :key="index" :label="city.areaName"
                       :value="city.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区/县" prop="county">
          <el-select v-model="info.county" placeholder="请选择区/县" class="applet-input">
            <el-option label="全部" value=''></el-option>
            <el-option v-for="(county, index) in countyList" :key="index" :label="county.areaName"
                       :value="county.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="resetForm('queryAppletForm')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="exportExcel()">导出</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="info.page" type="hidden"></el-input>
          <el-input v-model="info.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" fixed="left" type="index" :index="indexMethod" label="序号"
                         width="50"></el-table-column>
        <el-table-column align="center" fixed="left" prop="appletCode" label="编码" width="185"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="appletName" label="名称" width="220"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="mobile" label="用户(账号/名称)" width="180" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.mobile + '(' + scope.row.nickName + ')'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="province" label="所属地区" :show-overflow-tooltip="true"
                         width="220">
          <template slot-scope="scope">
            <span>{{scope.row.province + ',' + scope.row.city + ',' + scope.row.county}}</span>
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
        <el-table-column align="center" prop="ifSelling" label="营业状态" width="100">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.ifSelling">正在营业</el-link>
            <el-link type="warning" :underline="false" v-if="!scope.row.ifSelling">暂停营业</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateTime" label="注册日期" width="100"></el-table-column>
        <el-table-column align="center" prop="status" label="管理状态" width="100">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.status == 1">正常</el-link>
            <el-link type="danger" :underline="false" v-if="scope.row.status == -1">禁用</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="loadDetails(scope.row.id, scope.row.appletName)">详情
            </el-button>
            <el-button type="danger" plain size="mini" @click="updateStatus(scope.row.id, scope.row.appletName, -1)"
                       v-if="scope.row.status == 1">禁用
            </el-button>
            <el-button type="success" plain size="mini" @click="updateStatus(scope.row.id, scope.row.appletName, 1)"
                       v-if="scope.row.status == -1">启用
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="applet-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false">
        <div style="overflow-x: hidden;overflow-y: auto;">
          <appletDetails ref="appletDetails" v-on:setAppletId="setAppletId"></appletDetails>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'
  import appletDetails from '@/views/admin/applet/applet-details.vue'

  export default {
    name: 'applet-manage-list',
    components: {
      'appletDetails': appletDetails
    },
    data () {
      return {
        loading: true,
        tableHeight: 50,
        showInfo: false,
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
    created () {
      this.$global.selectRegionList(this, '', '1')
      this.onSubmit()
    },
    mounted () {
    },
    methods: {
      indexMethod (index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      selectProvince () {
        let province = this.info.province
        this.info.city = ''
        this.info.county = ''
        this.cityList = []
        this.countyList = []
        if (province != '') {
          let obj = this.provList.find((item) => {
            return item.areaName === province
          })
          this.$global.selectRegionList(this, obj.id, '2')
        }
      },
      selectCity () {
        let city = this.info.city
        this.countyList = []
        this.info.county = ''
        if (city != '') {
          let obj = this.cityList.find((item) => {
            return item.areaName === city
          })
          this.$global.selectRegionList(this, obj.id, '3')
        }
      },
      onSubmit () {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/queryAppletManageToPage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'applet-list-form')
          if (res.data.code === '1') {
            this.tableData = res.data.data.dataSource
            this.total = res.data.data.totalCount
          } else if (res.data.code === '-1') {
            this.$message.error(res.data.data)
          }
          this.$global.exitLoad(this, null, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      },
      selectList () {
        this.info.page = 1
        this.showInfo = false
        this.onSubmit()
      },
      handleCurrentChange (val) {
        this.info.page = val
        this.onSubmit()
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      loadDetails (appletId, appletName) {
        this.showInfo = true
        this.showTitle = appletName + ' - 详情'
        this.$cookies.set('auditResult', 0)
        try {
          this.$refs.appletInfo.setAppletId(appletId)
        } catch (e) {
          this.$cookies.set('appletId', appletId)
        }
      },
      setAppletId () {
        this.selectList()
      },
      updateStatus (id, name, status) {
        let content = ''
        let lod = ''
        if (status === 1) {
          content = '确定启用小程序吗？'
          lod = '启用'
        } else {
          content = '确定禁用小程序吗？'
          lod = '禁用'
        }
        this.$confirm(content, name, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loading = Loading.service({fullscreen: true, text: '正在' + lod})
          this.$axios({
            url: '/api/manage/applet/updateAppletStatus',
            method: 'post',
            data: {id: id, status: status}
          }).then(res => {
            if (res.data.code === '1') {
              this.onSubmit()
              this.$message.success(lod + '成功')
            } else {
              this.$message.error(lod + '失败')
            }
            this.$global.exitLoad(this, loading, res.data)
          })
        })
      },
      exportExcel () {
        window.open('http://localhost:8080/api/manage/excel/exportAppletList?' + this.$global.baseToGet(this.info))
      }
    }
  }
</script>
