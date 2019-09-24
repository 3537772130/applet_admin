<style version="text/css">
  .applet-version-form {
    text-align: left;
  }

  .applet-version-form .el-select {
    width: 190px;
  }

  .applet-version-dialog .el-dialog {
    width: 450px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-version-form" :inline="true" :model="info" class="demo-form-inline applet-version-form"
               style="text-align: left;">
        <el-form-item label="类型名称">
          <el-input v-model="info.versionName" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="类型状态">
          <el-select v-model="info.versionStatus" placeholder="选择类型状态" style="width: 200px;">
            <el-option label="全部" value=''></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="info.page" version="hidden"></el-input>
          <el-input v-model="info.pageSize" version="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="appletCode" label="小程序编码" width="185"></el-table-column>
        <el-table-column align="center" prop="appletName" label="小程序名称" width="220"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="typeName" label="服务类型" width="120"></el-table-column>
        <el-table-column align="center" prop="versionNumber" label="版本号" width="120"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" width="180"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" plain size="mini" @click="updateInfo(scope.row.id, scope.row.appletName)">更新版本
            </el-button>
            <el-button type="primary" plain size="mini" @click="downloadZip(scope.row.id)" v-if="scope.row.filePath">
              下载文件
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="applet-version-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <AppletVersion ref="AppletVersion" v-on:refreshSet="refreshSet"></AppletVersion>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script version="text/javascript">
  import AppletVersion from '@/views/admin/applet/version/applet-version.vue'

  export default {
    name: 'applet-version-list',
    components: {
      'AppletVersion': AppletVersion
    },
    data () {
      return {
        loading: false,
        tableHeight: 50,
        showInfo: false,
        showTitle: '',
        currentPage: 1,
        total: 0,
        info: {
          versionName: '',
          versionStatus: '',
          page: 1,
          pageSize: 15
        },
        tableData: []
      }
    },
    created () {
      this.onSubmit()
    },
    mounted () {
    },
    methods: {
      indexMethod (index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      onSubmit () {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/queryAppletVersionPage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'applet-version-form')
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
        this.onSubmit()
      },
      handleCurrentChange (val) {
        this.info.page = val
        this.onSubmit()
      },
      updateInfo (versionId, appletName) {
        this.showInfo = true
        this.showTitle = appletName + ' - 更新版本'
        this.$cookies.set('applet_version_id', versionId)
        try {
          this.$refs.AppletVersion.loadAppletVersion(versionId)
        } catch (e) {
        }
      },
      refreshSet () {
        this.showInfo = false
        this.selectList()
      },
      downloadZip (versionId) {
        window.open("/api/manage/applet/downloadAppletVersionFile?id=" + versionId)
      }
    }
  }
</script>
