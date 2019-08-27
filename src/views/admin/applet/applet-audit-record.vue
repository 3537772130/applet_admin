<style type="text/css">
  .el-form-item__label {
    width: 70px;
  }

  .manager-input {
    width: 190px;
  }

  .manager-dialog .el-dialog {
    width: 750px;
  }

  .el-table .has-gutter{

  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-table :data="tableData" :height="450" stripe style="width: 100%">
        <el-table-column align="center" prop="auditTime" label="审核时间" width="140"></el-table-column>
        <el-table-column align="center" prop="auditResult" label="审核结果" width="90">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.auditResult == -1">审核未通过</el-link>
            <el-link type="warning" :underline="false" v-if="scope.row.auditResult == 0">待审核</el-link>
            <el-link type="danger"  :underline="false" v-if="scope.row.auditResult == 1">初审通过</el-link>
            <el-link type="primary" :underline="false" v-if="scope.row.auditResult == 2">终审通过</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="auditRemark" label="备注" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="parentUserName" label="审核人(账号/名称)" width="160">
          <template slot-scope="scope">
              <span v-if="scope.row.auditorId != null">
                {{scope.row.auditorUserName + '(' + scope.row.auditorNickName + ')'}}
              </span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">

  export default {
    name: 'applet-audit-record',
    data() {
      return {
        loading: false,
        tableData: []
      }
    },
    created() {
      this.onSubmit(this.$cookies.get('appletId'))
    },
    mounted() {
    },
    methods: {
      setAppletId(appletId){
        this.onSubmit(appletId)
      },
      onSubmit(id) {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/queryAppletAuditToList',
          method: 'post',
          data: {id: id}
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.tableData = res.data.data
          } else if (res.data.code === "-1") {
            this.$message.error(res.data.data)
          }
          this.$cookies.remove('appletId')
          this.$global.exitLoad(this, null, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      }
    }
  }
</script>
