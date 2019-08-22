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
            <el-input v-model="info.userName" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="info.roleId" placeholder="选择角色">
              <el-option label="全部" value=''></el-option>
              <el-option v-for="role in roleList" :key="role" :label="role.name" :value="role.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="info.email" placeholder="输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="info.mobile" placeholder="输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="QQ账号">
            <el-input v-model="info.qqAccount" placeholder="输入QQ账号"></el-input>
          </el-form-item>
          <el-form-item label="微信账号">
            <el-input v-model="info.weChatAccount" placeholder="输入微信账号"></el-input>
          </el-form-item>
          <el-form-item label="省份">
            <el-select v-model="info.province" placeholder="选择省份" @change="selectProvince">
              <el-option label="全部" value=''></el-option>
              <el-option v-for="prov in provList" :key="prov" :label="prov.areaName" :value="prov.areaName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="info.city" placeholder="选择城市" @change="selectCity">
              <el-option label="全部" value=''></el-option>
              <el-option v-for="city in cityList" :key="city" :label="city.areaName" :value="city.areaName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区/县">
            <el-select v-model="info.county" placeholder="选择区/县">
              <el-option label="全部" value=''></el-option>
              <el-option v-for="county in countyList" :key="county" :label="county.areaName" :value="county.areaName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="info.status" placeholder="选择状态">
              <el-option label="全部" value=''></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级账号">
            <el-input v-model="info.parentUserName" placeholder="输入上级账号"></el-input>
          </el-form-item>
          <el-form-item label="上级名称">
            <el-input v-model="info.parentNickName" placeholder="输入上级名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="updateInfo('0','')">添加</el-button>
          </el-form-item>
          <div style="display: none;">
            <el-input v-model="info.page" type="hidden"></el-input>
            <el-input v-model="info.pageSize" type="hidden"></el-input>
          </div>
        </el-form>
      </div>
      <div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column align="center" fixed="left" type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
          <el-table-column align="center" fixed="left" prop="userName" label="账号" width="120"></el-table-column>
          <el-table-column align="center" prop="nickName" label="昵称" width="80"></el-table-column>
          <el-table-column align="center" prop="roleName" label="角色名称" width="80"></el-table-column>
          <el-table-column align="center" prop="email" label="邮箱" width="150"></el-table-column>
          <el-table-column align="center" prop="mobile" label="手机号码" width="100"></el-table-column>
          <el-table-column align="center" prop="qqAccount" label="QQ账号" :show-overflow-tooltip="true" width="100"></el-table-column>
          <el-table-column align="center" prop="weChatAccount" label="微信账号" width="120"></el-table-column>
          <el-table-column align="center" prop="province" label="省份" width="100"></el-table-column>
          <el-table-column align="center" prop="city" label="城市" width="100"></el-table-column>
          <el-table-column align="center" prop="county" label="区/县" width="100"></el-table-column>
          <el-table-column align="center" prop="parentUserName" label="上级账号" width="120"></el-table-column>
          <el-table-column align="center" prop="parentNickName" label="上级名称" width="80"></el-table-column>
          <el-table-column align="center" prop="createDate" label="创建日期" width="90"></el-table-column>
          <el-table-column align="center" prop="status" :show-overflow-tooltip="true" label="状态" width="50">
            <template slot-scope="scope">
              {{scope.row.status ? '正常':'禁用'}}
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="80">
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
        <div style="width: 450px;height: 70%;overflow-x: hidden;overflow-y: auto;">
          <managerInfo ref="managerInfo" v-on:setManagerId="setManagerId"></managerInfo>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import managerInfo from '@/views/admin/manager/manager-info.vue'

  export default {
    name: 'manager-list',
    components: {
      'managerInfo': managerInfo
    },
    data() {
      return {
        loading: true,
        showInfo: false,
        showTitle: '',
        managerId: '',
        currentPage: 1,
        total: 0,
        info: {
          userName: '',
          roleId: '',
          mobile: '',
          email: '',
          qqAccount: '',
          weChatAccount: '',
          province: '',
          city: '',
          county: '',
          parentUserName: '',
          parentNickName: '',
          status: '',
          page: 1,
          pageSize: 15
        },
        roleList: [],
        provList: [],
        cityList: [],
        countyList: [],
        tableData: []
      }
    },
    created() {
      this.selectManagerRoleList()
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
      selectManagerRoleList(){
        this.$axios({
          url: '/api/manager/selectManagerRoleList',
          method: 'post',
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.roleList = res.data.data
          } else if (res.data.code === "-1") {
            this.$message.error(res.data.data)
          }
          this.$global.exitLoad(this, null, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      },
      selectProvince() {
        let province = this.info.province
        this.info.city = ''
        this.info.county = ''
        this.countyList = []
        if (province != ''){
          let obj = this.provList.find((item)=> {
            return item.areaName === province;
          })
          this.$global.selectRegionList(this, obj.id, '2')
        }
      },
      selectCity() {
        let city = this.info.city
        this.info.county = ''
        if (city != ''){
          let obj = this.cityList.find((item)=> {
            return item.areaName === city;
          })
          this.$global.selectRegionList(this, obj.id, '3')
        }
      },
      onSubmit() {
        this.loading = true
        this.$axios({
          url: '/api/manager/selectManagerInfoToPage',
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
      selectList() {
        this.info.page = 1
        this.showInfo = false
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.info.page = val
        this.onSubmit()
      },
      updateInfo(managerId, userName){
        this.showInfo = true
        this.managerId = managerId
        if (userName && userName != '0'){
          this.showTitle = userName
        } else {
          this.showTitle = '添加管理员账号'
        }
        try{
          this.$refs.managerInfo.setManagerId(managerId)
        } catch (e) {
          this.$cookies.set("managerId", managerId)
        }
      }
    },
    setManagerId(){
      this.selectList()
    }
  }
</script>
