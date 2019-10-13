<style type="text/css">
  applet-page-form {
    text-align: left;
  }

  .applet-page-form .el-select {
    width: 190px;
  }

  .in-dialog .el-dialog {
    width: 500px;
  }
  .in-dialog .el-dialog > .el-dialog__body {
    padding: 0px 0px;
  }

  .applet-page-dialog .el-dialog {
    width: 450px;
  }

  .applet-page-dialog .el-dialog > .el-dialog__body {
    padding: 0px 0px;
  }

  .applet-page-element-dialog .el-dialog {
    width: 980px;
  }

  .applet-page-element-dialog .el-dialog > .el-dialog__body {
    padding: 0px 0px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-page-form" ref="info" :rules="fileRules" :inline="true" :model="info"
               class="demo-form-inline applet-page-form" style="text-align: left;">
        <el-form-item label="页面名称">
          <el-input v-model="info.pageName" placeholder="输入页面名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList()">查询</el-button>
          <el-button type="success" @click="updateAppletPage('0')">添加页面</el-button>
          <el-button type="warning" @click="inDialog()">继承</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="pageLogo" label="页面标识" width="80"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="pageName" label="页面名称" width="120"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新日期" width="140"></el-table-column>
        <el-table-column align="center" prop="pageStatus" label="页面状态" width="80">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.pageStatus">正常</el-link>
            <el-link type="danger" :underline="false" v-if="!scope.row.pageStatus">禁用</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" plain size="mini" @click="updateAppletPage(scope.row.id)">修改</el-button>
            <el-button type="primary" plain size="mini"
                       @click="loadPageElementType(scope.row.id, scope.row.pageName)">元素类型</el-button>
            <el-button type="primary" plain size="mini"
                       @click="loadPageElement(scope.row.id, scope.row.pageName)">元素列表</el-button>
            <el-button type="success" plain size="mini"
                       @click="loadPageDefault(scope.row.id, )">默认页面</el-button>
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
      <el-dialog :title="inTitle" :visible.sync="inShow" class="in-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true" :append-to-body="true">
        <el-form ref="fileForm" :rules="fileRules" :inline="true" :model="fileForm"
                 class="demo-form-inline applet-page-form" style="text-align: center;height: 80px;">
          <el-form-item label="文件版本" prop="inFileId">
            <el-select v-model="fileForm.inFileId" style="width: 200px;">
              <el-option label="请选择文件版本" value=""></el-option>
              <el-option v-for="(item, index) in fileList" :key="index" :label="item.versionNumber"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="inFile()">继承</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :title="infoTitle" :visible.sync="infoShow" class="applet-page-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true" :append-to-body="true">
        <AppletPage ref="AppletPage" v-on:refreshSet="refreshSet"></AppletPage>
      </el-dialog>
      <el-dialog :title="typeTitle" :visible.sync="typeShow" class="applet-page-element-dialog"
                 :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true" :append-to-body="true">
        <ElementTypeList ref="ElementTypeList"></ElementTypeList>
      </el-dialog>
      <el-dialog :title="elementTitle" :visible.sync="elementShow" class="applet-page-element-dialog"
                 :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true" :append-to-body="true">
        <AppletElementList ref="AppletElementList"></AppletElementList>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import AppletPage from '@/views/admin/applet/file/page/applet-page.vue'
  import ElementTypeList from '@/views/admin/applet/file/page/element-type/element-type-list.vue'
  import AppletElementList from '@/views/admin/applet/file/page/element/applet-element-list.vue'

  export default {
    name: 'applet-page-list',
    components: {
      'AppletPage': AppletPage,
      'ElementTypeList': ElementTypeList,
      'AppletElementList': AppletElementList
    },
    data() {
      return {
        loading: false,
        tableHeight: 50,
        inShow: false,
        inTitle: '',
        infoShow: false,
        infoTitle: '',
        typeShow: false,
        typeTitle: '',
        elementShow: false,
        elementTitle: '',
        tableData: [],
        fileTypeId: '',
        fileList: [],
        fileForm: {
          inFileId: ''
        },
        info: {
          fileId: '',
          pageName: '',
          page: 1,
          pageSize: 10
        },
        fileRules: {
          inFileId: [
            {required: true, message: '请选择文件版本', trigger: 'blur'}
          ]
        },
        newWin: {}
      }
    },
    created() {
      let fileId = this.$cookies.get('applet_file_id')
      this.loadAppletPage(fileId)
    },
    mounted() {
    },
    methods: {
      loadAppletPage(fileId) {
        if (fileId) {
          this.$cookies.set('page_file_id', fileId)
          this.info.fileId = this.$cookies.get('page_file_id')
          this.loading = true
          this.$axios({
            url: '/api/manage/applet/page/loadAppletPageList',
            method: 'post',
            data: {fileId: fileId}
          }).then(res => {
            if (res.data.code === '1') {
              this.fileTypeId = res.data.data.fileTypeId
              this.fileList = res.data.data.fileList
              this.onSubmit()
            }
            this.$cookies.remove('applet_file_id')
            fileId = null
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
        try {
          this.newWin.close()
        } catch (e) {
        }
      },
      onSubmit() {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/page/queryAppletPage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setAppendTableHeight(this, 'applet-page-form')
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
      indexMethod(index) {
        return index + 1
      },
      selectList() {
        this.info.page = 1
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.info.page = val
        this.onSubmit()
      },
      updateAppletPage(pageId) {
        this.infoShow = true
        if (pageId && pageId != '0') {
          this.infoTitle = '修改小程序页面信息'
        } else {
          pageId = null
          this.infoTitle = '添加小程序页面信息'
        }
        this.$cookies.set('applet_page_id', pageId)
        try {
          this.$refs.AppletPage.loadAppletPage(pageId)
        } catch (e) {
        }
      },
      loadPageElement(pageId, pageName) {
        this.elementShow = true
        this.elementTitle = pageName + ' - 元素列表'
        this.$cookies.set('applet_page_id', pageId)
        try {
          this.$refs.AppletElementList.loadAppletElementPage(pageId)
        } catch (e) {
        }
      },
      loadPageElementType(pageId, pageName) {
        this.typeShow = true
        this.typeTitle = '页面：' + pageName + ' - 元素类型列表'
        this.$cookies.set('applet_page_id', pageId)
        try {
          this.$refs.ElementTypeList.loadElementTypePage(pageId)
        } catch (e) {
        }
      },
      loadPageDefault(pageId){
        this.$cookies.set('default_page_id', pageId)
        this.$cookies.set('file_type_id', this.fileTypeId)
        const { href } = this.$router.resolve({
          name: 'page-default'
        })
        try {
          if (!this.newWin.closed) {
            this.newWin.close()
          }
        } catch (e) {
        }
        this.newWin = window.open(href, '_blank')
      },
      refreshSet() {
        this.infoShow = false
        this.loadAppletPage(this.$cookies.get('page_file_id'))
      },
      inDialog(){
        this.inShow = true
        this.inTitle = '继承版本'
      },
      inFile() {
        this.$refs['fileForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确定继承吗？继承成功后，原有的所有记录将会被替换，请谨慎操作！', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let fileId = this.$cookies.get('page_file_id')
              let loading = Loading.service({fullscreen: true, text: '正在提交'})
              this.$axios({
                url: '/api/manage/applet/updateAppletFile',
                method: 'post',
                data: {fileId: fileId, inFileId: this.fileForm.inFileId}
              }).then(res => {
                let that = this
                res.data.code === '1' ? this.$message.success({
                  message: res.data.data, duration: 1000, onClose: function () {
                    that.loadAppletPage(fileId)
                  }
                }) : this.$message.error(res.data.data)
                this.$global.exitLoad(this, loading, res.data)
              }).catch(error => {
                console.info('错误信息', error)
                this.$global.exitLoad(this, loading, '')
              })
            })
          }
        })
      }
    }
  }
</script>
