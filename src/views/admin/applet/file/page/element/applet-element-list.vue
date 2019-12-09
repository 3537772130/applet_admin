<style type="text/css">
  .applet-element-form {
    text-align: left;
  }

  .applet-element-form .el-select {
    width: 190px;
  }

  .applet-element-dialog .el-dialog {
    width: 450px;
  }

  .applet-element-dialog .el-dialog > .el-dialog__body {
    padding: 0px 0px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-element-form" :inline="true" :model="info" class="demo-form-inline applet-element-form"
               style="text-align: left;">
        <el-form-item label="元素标识">
          <el-input v-model="info.elementLogo" placeholder="请输入元素标识"></el-input>
        </el-form-item>
        <el-form-item label="元素名称">
          <el-input v-model="info.elementName" placeholder="请输入元素名称"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="元素类型">
          <el-select v-model="info.typeId" placeholder="选择元素类型">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="元素状态">
          <el-select v-model="info.elementStatus" placeholder="选择元素状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList()">查询</el-button>
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
        <el-table-column align="center" prop="elementLogo" label="元素标识" width="140"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="elementName" label="元素名称" width="180"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="typeName" label="元素类型" width="100"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新日期" width="140"></el-table-column>
        <el-table-column align="center" prop="elementStatus" label="元素状态" width="80">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.elementStatus">正常</el-link>
            <el-link type="danger" :underline="false" v-if="!scope.row.elementStatus">禁用</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="elementIndex" label="排序" width="100">
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="applet-element-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true" :append-to-body="true">
        <AppletElement ref="AppletElement" v-on:refreshSet="refreshSet"></AppletElement>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'
  import AppletElement from '@/views/admin/applet/file/page/element/applet-element.vue'

  export default {
    name: 'applet-element-list',
    components: {
      'AppletElement': AppletElement
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
          versionNumber: '',
          typeId: '',
          elementStatus: '',
          page: 1,
          pageSize: 10
        },
        tableData: [],
        typeList: []
      }
    },
    created () {
      let pageId = this.$cookies.get('applet_page_id')
      this.loadAppletElementPage(pageId)
    },
    mounted () {
    },
    methods: {
      loadAppletElementPage (pageId) {
        if (pageId) {
          this.$cookies.set('element_page_id', pageId)
          pageId = null
          this.info.pageId = this.$cookies.get('element_page_id')
          this.loading = true
          this.$axios({
            url: '/api/manage/applet/page/loadAppletPageElementPage',
            method: 'post',
            data: {pageId: this.info.pageId}
          }).then(res => {
            this.typeList = res.data.data
            this.onSubmit()
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      indexMethod (index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      onSubmit () {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/page/queryAppletPageElementPage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setAppendTableHeight(this, 'applet-element-form')
          if (res.data.code === '1') {
            this.tableData = res.data.data.dataSource
            this.total = res.data.data.totalCount
          } else if (res.data.code === '-1') {
            this.$message.error(res.data.data)
          }
          this.timestamp = '?' + Date.parse(new Date())
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
      updateInfo (elementId) {
        this.showInfo = true
        if (elementId && elementId != '0') {
          this.showTitle = '修改元素信息'
        } else {
          this.showTitle = '添加元素信息'
        }
        this.$cookies.set('applet_element_id', elementId)
        try {
          this.$refs.AppletElement.loadAppletElement(elementId)
        } catch (e) {
        }
      },
      refreshSet () {
        this.showInfo = false
        this.selectList()
      },
      handleFileSuccess (res, element) {
        if (res.code === '1') {
          this.$message.success('上传成功')
          this.onSubmit()
        } else {
          this.$message.error('上传失败')
        }
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        this.$global.exitLoad(this, loading, {'code': res.data})
      },
      beforeAvatarUpload (element) {
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        const isJPG = 'application/x-zip-compressed,application/x-7z-compressed,application/x-gzip'.indexOf(element.type) >= 0
        const isLt2M = element.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传压缩元素格式错误!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        if (!isJPG || !isLt2M) {
          loading.close()
        }
        return isJPG && isLt2M
      },
      shiftSort (id, pageId, sort) {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/page/updateElementIndex',
          method: 'post',
          data: {elementId: id, pageId: pageId, sort: sort}
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
