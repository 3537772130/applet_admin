<style type="text/css">
  applet-type-form {
    text-align: left;
  }

  .applet-type-form .el-input {
    width: 190px;
  }

  .applet-type-form .el-select {
    width: 190px;
  }

  .applet-type-dialog .el-dialog {
    width: 470px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-type-form" :inline="true" :model="info" class="applet-type-form"
               style="text-align: left;">
        <el-form-item label="类型名称">
          <el-input v-model="info.typeName" placeholder="请输入类型名称" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="类型状态">
          <el-select v-model="info.typeStatus" placeholder="选择类型状态">
            <el-option label="全部" value=''></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="updateInfo('0')">添加</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="info.page" type="hidden"></el-input>
          <el-input v-model="info.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="typeName" label="类型名称" width="220"></el-table-column>
        <el-table-column align="center" prop="versionNumber" label="最新版本" width="220"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新日期" width="180"></el-table-column>
        <el-table-column align="center" prop="typeStatus" label="类型状态" width="180">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.typeStatus">正常</el-link>
            <el-link type="danger" :underline="false" v-if="!scope.row.typeStatus">禁用</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" plain size="mini" @click="updateInfo(scope.row.id)">修改</el-button>
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="applet-type-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <AppletType ref="AppletType" v-on:refreshSet="refreshSet"></AppletType>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import AppletType from '@/views/admin/applet/type/applet-type.vue'

  export default {
    name: 'applet-type-list',
    components: {
      'AppletType': AppletType
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
          typeName: '',
          typeStatus: '',
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
          url: '/api/manage/applet/queryAppletTypePage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'applet-type-form')
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
      updateInfo (typeId) {
        this.showInfo = true
        if (typeId && typeId != '0') {
          this.showTitle = '修改小程序服务类型信息'
        } else {
          this.showTitle = '添加小程序服务类型信息'
        }
        try {
          this.$refs.AppletType.loadAppletType(typeId)
        } catch (e) {
          this.$cookies.set('applet_type_id', typeId)
        }
      },
      refreshSet () {
        this.showInfo = false
        this.selectList()
      }
    }
  }
</script>
