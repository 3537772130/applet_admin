<style type="text/css">
  .advert-form-inline .el-form-item__label{
    width: 100px;
  }

  .advert-form-inline .el-input {
    width: 190px;
  }

  .advert-dialog .el-dialog {
    width: 750px;
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
      <el-form id="advert-list-form" :inline="true" :model="info" ref="queryadvertForm" class="advert-form-inline"
               style="text-align: left;">
        <el-form-item label="小程序类型" prop="appletTypeId">
          <el-select v-model="info.appletTypeId" placeholder="选择小程序类型">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面类型" prop="pageLogo">
          <el-select v-model="info.pageLogo" placeholder="选择页面类型">
            <el-option label="全部" value=''></el-option>
            <el-option label="load封面" value="LOAD"></el-option>
            <el-option label="主页" value="MAIN"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广类型" prop="relationType">
          <el-select v-model="info.relationType" placeholder="选择推广类型">
            <el-option label="全部" value=''></el-option>
            <el-option label="内部推广" value="1"></el-option>
            <el-option label="外部推广" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联网址" prop="relationWebsite">
          <el-input v-model="info.relationWebsite" placeholder="输入关联网址" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="推广对象" prop="relationName">
          <el-input v-model="info.relationName" placeholder="输入推广对象" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="推广状态" prop="relationStatus">
          <el-select v-model="info.relationStatus" placeholder="请选择推广状态">
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
        <el-table-column align="center" type="index" :index="indexMethod" label="序号"
                         width="50"></el-table-column>
        <el-table-column align="center" prop="relationImage" label="推广图片" width="260">
          <template slot-scope="scope">
            <el-image :src="scope.row.relationImage" class="load-image"></el-image>
<!--            <el-image :src="scope.row.relationImage" class="main-image"></el-image>-->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appletTypeName" label="小程序类型" width="120"></el-table-column>
        <el-table-column align="center" prop="pageLoad" label="页面类型" width="120">
          <template slot-scope="scope">
            <label v-if="scope.row.pageLogo === 'LOAD'">load加载</label>
            <label v-if="!scope.row.pageLogo === 'MAIN'">主页</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="relationWebsite" label="关联网址" width="160">
          <template slot-scope="scope">
            <a :href="scope.row.relationWebsite" style="color: #409EFF;font-weight: 500;font-size: 14px;">{{scope.row.relationWebsite}}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="relationTypeName" label="推广类型" width="100"></el-table-column>
        <el-table-column align="center" prop="relationName" label="推广对象" width="260"></el-table-column>
        <el-table-column align="center" prop="startTime" label="开始日期" width="120"></el-table-column>
        <el-table-column align="center" prop="expireTime" label="截止日期" width="120"></el-table-column>
        <el-table-column align="center" prop="isDefault" label="是否默认" width="80">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.isDefault">是</el-link>
            <el-link type="danger" :underline="false" v-if="!scope.row.isDefault">否</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="relationStatus" label="通知状态" width="100">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.relationStatus">正常</el-link>
            <el-link type="warning" :underline="false" v-if="!scope.row.relationStatus">失效</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" width="160"></el-table-column>
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="advert-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <div style="overflow-x: hidden;overflow-y: auto;">
          <AdvertDetails ref="advertDetails" v-on:loadInfo="loadInfo"></AdvertDetails>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import AdvertDetails from '@/views/admin/platform-set/advert/advert-details.vue'

  export default {
    name: 'advert-list',
    components: {
      'AdvertDetails': AdvertDetails
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
          appletTypeId: '',
          pageLogo: '',
          relationWebsite: '',
          relationType: '',
          relationName: '',
          relationStatus: '',
          page: 1,
          pageSize: 15
        },
        systemDate: ''
      }
    },
    created () {
      this.addDate()
      this.loadAppletFile()
      this.loadList()
    },
    mounted () {
    },
    methods: {
      loadAppletFile () {
        this.$axios({
          url: '/api/manage/applet/loadAppletFilePage',
          method: 'post'
        }).then(res => {
          if (res.data.code === '1') {
            this.typeList = res.data.data
          }
        }).catch(error => {
          console.info('错误信息', error)
        })
      },
      indexMethod (index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      loadList () {
        this.loading = true
        this.$axios({
          url: '/api/manage/platformSet/loadAppletAdvertRelationByPage',
          method: 'post',
          data: this.info,
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'advert-list-form')
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
          this.$refs.advertDetails.loadInfo(id)
        } catch (e) {
          this.$cookies.set('advert_relation_id', id)
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
