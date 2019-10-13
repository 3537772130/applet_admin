<style type="text/css">
  .element-type-form {
    text-align: left;
  }

  .element-type-form .el-select {
    width: 190px;
  }

  .element-type-dialog .el-dialog {
    width: 450px;
  }

  .element-type-dialog .el-dialog > .el-dialog__body {
    padding: 0px 0px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="element-type-form" :inline="true" :model="info" ref="elementTypeForm" class="element-type-form"
               style="text-align: left;">
        <el-form-item label="类型名称">
          <el-input v-model="info.typeName" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="类型状态">
          <el-select v-model="info.typeStatus" placeholder="选择类型状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList()">查询</el-button>
          <el-button type="success" @click="updateInfo('0')">添加</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="info.page" type="hidden"></el-input>
          <el-input v-model="info.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="typeName" label="类型名称" width="100"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="typeIndex" label="排序" width="180">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="上移" placement="top">
              <i class="el-icon-caret-top sort-direction" @click="shiftSort(scope.row.id, scope.row.pageId, 'top')"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="下移" placement="top">
              <i class="el-icon-caret-bottom sort-direction"
                 @click="shiftSort(scope.row.id, scope.row.pageId, 'bot')"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="typeStatus" label="类型状态" width="80">
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="element-type-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true" :append-to-body="true">
        <ElementType ref="ElementType" v-on:refreshSet="refreshSet"></ElementType>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import ElementType from '@/views/admin/applet/file/page/element-type/element-type.vue'

  export default {
    name: 'element-type-list',
    components: {
      'ElementType': ElementType
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
          pageId: '',
          typeName: '',
          typeStatus: '',
          page: 1,
          pageSize: 15
        },
        tableData: []
      }
    },
    created () {
      let pageId = this.$cookies.get('applet_page_id')
      this.loadElementTypePage(pageId)
    },
    mounted () {
    },
    methods: {
      loadElementTypePage (pageId) {
        if (pageId) {
          this.$cookies.set('element_page_id', pageId)
          this.info.pageId = this.$cookies.get('element_page_id')
          this.onSubmit()
          pageId = null
          this.$cookies.remove('applet_page_id')
        }
      },
      indexMethod (index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      onSubmit () {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/page/queryElementTypePage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setAppendTableHeight(this, 'element-type-form')
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
          this.showTitle = '修改元素类型信息'
        } else {
          this.showTitle = '添加元素类型信息'
        }
        this.$cookies.set('element_type_id', typeId)
        try {
          this.$refs.ElementType.loadAppletelement(typeId)
        } catch (e) {
        }
      },
      refreshSet () {
        this.showInfo = false
        this.selectList()
      },
      shiftSort (id, pageId, sort) {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/page/updateElementTypeIndex',
          method: 'post',
          data: {typeId: id, pageId: pageId, sort: sort}
        }).then(res => {
          if (res.data.code === '1') {
            this.onSubmit()
          } else if (res.data.code === '-1') {
            this.$message.error(res.data.data)
            this.$global.exitLoad(this, null, res.data)
          }
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      }
    }
  }
</script>
