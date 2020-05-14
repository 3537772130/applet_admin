<style type="text/css">
  .order-form-inline .el-form-item__label{
    width: 100px;
  }

  .order-input {
    width: 190px;
  }

  .order-dialog .el-dialog {
    width: 770px;
    height: 650px;
  }

  .load-image{
    width: 135px;
    height: 170px;
  }

  .main-image{
    width: 230px;
    height: 80px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="order-list-form" :inline="true" :model="info" ref="queryorderForm" class="order-form-inline"
               style="text-align: left;">
        <el-form-item label="小程序类型" prop="appletTypeId">
          <el-select v-model="info.appletTypeId" placeholder="选择小程序类型" class="order-input">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面类型" prop="pageLogo">
          <el-select v-model="info.pageLogo" placeholder="选择页面类型" class="order-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="load封面" value="LOAD"></el-option>
            <el-option label="主页" value="MAIN"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广类型" prop="relationType">
          <el-select v-model="info.relationType" placeholder="选择推广类型" class="order-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="内部推广" value="1"></el-option>
            <el-option label="外部推广" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联网址" prop="relationWebsite">
          <el-input v-model="info.relationWebsite" placeholder="输入关联网址" :clearable="true" class="order-input"></el-input>
        </el-form-item>
        <el-form-item label="推广对象" prop="relationName">
          <el-input v-model="info.relationName" placeholder="输入推广对象" :clearable="true" class="order-input"></el-input>
        </el-form-item>
        <el-form-item label="推广状态" prop="relationStatus">
          <el-select v-model="info.relationStatus" placeholder="请选择推广状态" class="order-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="失效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="loadDetails(0, '')">添加</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="info.page" type="hidden"></el-input>
          <el-input v-model="info.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="orderNo" label="订单号" width="260"></el-table-column>
        <el-table-column align="center" prop="courierNo" label="设备号" width="120"></el-table-column>
        <el-table-column align="center" prop="appletName" label="小程序" width="160"></el-table-column>
        <el-table-column align="center" prop="userMobile" label="用户账号" width="100"></el-table-column>
        <el-table-column align="center" prop="couponAmount" label="优惠金额" width="120">
          <template slot-scope="scope">{{scope.row.couponAmount|addZero}}</template>
        </el-table-column>
        <el-table-column align="center" prop="freightAmount" label="运费" width="120">
          <template slot-scope="scope">{{scope.row.freightAmount|addZero}}</template>
        </el-table-column>
        <el-table-column align="center" prop="totalAmount" label="订单总金额" width="120">
          <template slot-scope="scope">{{scope.row.totalAmount|addZero}}</template>
        </el-table-column>
        <el-table-column align="center" prop="actualAmount" label="实付金额" width="120">
          <template slot-scope="scope">{{scope.row.actualAmount|addZero}}</template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="更新时间" width="160"></el-table-column>
        <el-table-column align="center" prop="orderStatus" label="订单状态" width="80">
          <template slot-scope="scope">
            <el-link type="info" :underline="false" v-if="scope.row.orderStatus === -1">订单失效</el-link>
            <el-link type="primary" :underline="false" v-if="scope.row.orderStatus === 0">正在进行</el-link>
            <el-link type="success" :underline="false" v-if="scope.row.orderStatus === 1">订单完成</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="loadDetails(scope.row.id, scope.row.relationName)">详情
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="order-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <div style="overflow-x: hidden;overflow-y: auto;">
          <orderDetails ref="orderDetails" v-on:loadInfo="loadInfo"></orderDetails>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import orderDetails from '@/views/admin/order/order-details.vue'

  export default {
    name: 'order-list',
    components: {
      'orderDetails': orderDetails
    },
    data () {
      return {
        loading: true,
        tableHeight: 50,
        showInfo: false,
        showTitle: '',
        currentPage: 1,
        total: 0,
        tableData: [],
        typeList: [],
        info: {
          orderNo: '',
          courierNo: '',
          appletName: '',
          userMobile: '',
          createTime: null,
          updateTime: null,
          orderStatus: '',
          page: 1,
          pageSize: 15
        },
        systemDate: ''
      }
    },
    created () {
      this.loadList()
    },
    mounted () {
    },
    methods: {
      indexMethod (index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      loadList () {
        this.loading = true
        this.$axios({
          url: '/api/manage/order/queryOrderInfoByPage',
          method: 'post',
          data: this.info,
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'order-list-form')
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
        this.loadList()
      },
      handleCurrentChange (val) {
        this.info.page = val
        this.loadList()
      },
      loadDetails (id, title) {
        this.showInfo = true
        if (title && title != '') {
          this.showTitle = title
        } else {
          this.showTitle = '添加推广关联信息'
        }
        try {
          this.$refs.orderDetails.loadInfo(id)
        } catch (e) {
          this.$cookies.set('order_relation_id', id)
        }
      },
      loadInfo: function () {
        this.showInfo = false
        this.loadList()
      },
      addDate() {
        const nowDate = new Date();
        let date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
          date: nowDate.getDate(),
        }
        let systemDate = date.year
        systemDate += '/' + (date.month > 9 ? date.month : '0' + date.month)
        systemDate += '/' + (date.date > 9 ? date.date : '0' + date.date)
        console.log(systemDate);
        this.systemDate = systemDate
        return systemDate
      }
    }
  }
</script>
