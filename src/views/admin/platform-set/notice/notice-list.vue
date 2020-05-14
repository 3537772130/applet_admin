<style type="text/css">
  .notice-list-form .el-input {
    width: 190px;
  }

  .notice-list-form .el-select {
    width: 190px;
  }

  .notice-dialog .el-dialog {
    width: 670px;
    height: 650px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="notice-list-form" :inline="true" :model="info" ref="querynoticeForm" class="notice-list-form"
               style="text-align: left;">
        <el-form-item label="通知标题" prop="noticeTitle">
          <el-input v-model="info.noticeTitle" placeholder="输入通知标题" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="通知类型" prop="noticeType">
          <el-select v-model="info.noticeType" placeholder="请选择通知类型">
            <el-option label="全部" value=''></el-option>
            <el-option label="系统公告" value="1"></el-option>
            <el-option label="新用户推送" value="2"></el-option>
            <el-option label="普通推送" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知状态" prop="noticeStatus">
          <el-select v-model="info.noticeStatus" placeholder="请选择通知状态">
            <el-option label="全部" value=''></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="loadDetails(0)">添加</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="info.page" type="hidden"></el-input>
          <el-input v-model="info.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号"
                         width="50"></el-table-column>
        <el-table-column align="center" prop="noticeTitle" label="通知标题" width="220"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="noticeContent" label="通知内容" width="360"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="noticeType" label="通知类型" width="80"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.noticeType === 1">系统公告</span>
            <span v-if="scope.row.noticeType === 2">新用户推送</span>
            <span v-if="scope.row.noticeType === 3">普通推送</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="更新时间" width="160"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="noticeStatus" label="通知状态" width="100"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.noticeStatus">正常</el-link>
            <el-link type="warning" :underline="false" v-if="!scope.row.noticeStatus">禁用</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="loadDetails(scope.row.id)">详情
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="notice-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <div style="overflow-x: hidden;overflow-y: auto;">
                    <systemNotice ref="systemNotice" v-on:loadInfo="loadInfo"></systemNotice>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import systemNotice from '@/views/admin/platform-set/notice/system-notice.vue'

  export default {
    name: 'applet-audit-list',
    components: {
      'systemNotice': systemNotice
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
        info: {
          noticeTitle: '',
          noticeType: '',
          noticeStatus: '',
          page: 1,
          pageSize: 15
        }
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
          url: '/api/manage/platformSet/loadSystemNoticeByPage',
          method: 'post',
          data: {title: this.info.noticeTitle, type: this.info.noticeType,status: this.info.noticeStatus},
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'notice-list-form')
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
          this.showTitle = '添加管理员账号'
        }
        try {
          this.$refs.systemNotice.loadInfo(id)
        } catch (e) {
          this.$cookies.set('system_notice_id', id)
        }
      },
      loadInfo: function () {
        this.showInfo = false
        this.loadList()
      }
    }
  }
</script>
