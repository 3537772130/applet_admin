<style type="text/css">
  .applet-audit-timeline {
    text-align: left;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div style="height: 500px;overflow-y: auto; padding: 0px 20px;">
        <el-timeline class="applet-audit-timeline">
          <el-timeline-item v-for="(record, index) in recordList" :key="index" :timestamp="record.auditTime"
                            placement="top">
            <el-card>
              <div>
                <span>审核结果：</span>
                <el-link type="danger" :underline="false" v-if="record.auditResult == -1">审核驳回</el-link>
                <el-link type="warning" :underline="false" v-if="record.auditResult == 0">待审核</el-link>
                <el-link type="primary" :underline="false" v-if="record.auditResult == 1">初审通过</el-link>
                <el-link type="success" :underline="false" v-if="record.auditResult == 2">终审通过</el-link>
              </div>
              <div style="margin-top: 10px;">
                <span>备注说明：</span>{{record.auditRemark}}
              </div>
              <div style="margin-top: 10px;">
                <span>审&nbsp;&nbsp;核&nbsp;&nbsp;员：</span>
                <span v-if="record.auditorId != null">{{record.auditorNickName}} ({{record.auditorUserName}})</span>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">

  export default {
    name: 'applet-audit-record',
    data () {
      return {
        loading: false,
        recordList: []
      }
    },
    created () {
      this.onSubmit(this.$cookies.get('appletId'))
    },
    mounted () {
    },
    methods: {
      setAppletId (appletId) {
        this.onSubmit(appletId)
      },
      onSubmit (id) {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/queryAppletAuditToList',
          method: 'post',
          data: {id: id}
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.recordList = res.data.data
          } else if (res.data.code === '-1') {
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
