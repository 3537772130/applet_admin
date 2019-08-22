<style type="text/css">
  .el-form-item__label{
    width: 70px;
  }
  .el-select{
    width: 190px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding: 20px;">
      <div>
        <el-form :inline="true" :model="info" class="demo-form-inline" style="text-align: left;">
          <el-form-item label="账号">
            <el-input v-model="info.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="info.status" placeholder="选择状态" style="width: 200px;">
              <el-option label="全部" value=''></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectRoleList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="updateInfo('0')">添加</el-button>
          </el-form-item>
          <div style="display: none;">
            <el-input v-model="info.page" type="hidden"></el-input>
            <el-input v-model="info.pageSize" type="hidden"></el-input>
          </div>
        </el-form>
      </div>
      <div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
          <el-table-column align="center" prop="roleName" label="角色名称" width="100"></el-table-column>
          <el-table-column align="center" prop="describeStr" label="描述"></el-table-column>
          <el-table-column align="center" prop="updateDate" label="更新日期" width="180"></el-table-column>
          <el-table-column align="center" prop="status" label="状态" width="180">
            <template slot-scope="scope">
              {{scope.row.status ? '正常':'禁用'}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" @click="updateInfo(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="info.page"
            :page-size="info.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>

      <el-dialog :title="showTitle" :visible.sync="showInfo">
        <roleInfo ref="roleInfo" v-on:setRoleId="setRoleId"></roleInfo>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import roleInfo from '@/views/admin/manager/role/role-info.vue'

  export default {
    name: 'role-list',
    components: {
      'roleInfo': roleInfo
    },
    data() {
      return {
        loading: false,
        showInfo: false,
        showTitle: '',
        roleId: '',
        currentPage: 1,
        total: 0,
        info: {
          roleName: '',
          status: '',
          page: 1,
          pageSize: 15
        },
        tableData: []
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
          url: '/api/manager/selectManagerRoleToPage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
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
      selectRoleList() {
        this.info.page = 1
        this.showInfo = false
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.info.page = val
        this.onSubmit()
      },
      updateInfo(roleId){
        this.showInfo = true
        this.roleId = roleId
        if (roleId && roleId != '0'){
          this.showTitle = '修改角色信息'
        } else {
          this.showTitle = '添加角色信息'
        }
        try{
          this.$refs.roleInfo.setRoleId(roleId)
        } catch (e) {
          this.$cookies.set('roleId', roleId)
        }
      },
      setRoleId(id){
        this.selectRoleList()
      }
    }
  }
</script>
