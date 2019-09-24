<style type="text/css">
  applet-file-form {
    text-align: left;
  }

  .applet-file-form .el-select {
    width: 190px;
  }

  .applet-file-dialog .el-dialog {
    width: 450px;
  }

  .applet-file-upload>div{
    display: inline-block;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-file-form" :inline="true" :model="info" class="demo-form-inline applet-file-form" style="text-align: left;">
        <el-form-item label="文件版本">
          <el-input v-model="info.versionNumber" placeholder="请输入文件版本"></el-input>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-select v-model="info.typeId" placeholder="选择服务类型" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件状态">
          <el-select v-model="info.fileStatus" placeholder="选择文件状态" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
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
        <el-table-column align="center" prop="typeName" label="服务类型" width="120" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="filePath" label="文件路径" width="220" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="versionNumber" label="文件版本" width="140"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新日期" width="140"></el-table-column>
        <el-table-column align="center" prop="fileStatus" label="文件状态" width="80">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" v-if="scope.row.fileStatus">正常</el-link>
            <el-link type="danger" :underline="false" v-if="!scope.row.fileStatus">禁用</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div class="applet-file-upload">
              <el-button type="warning" plain size="mini" @click="updateInfo(scope.row.id)">修改</el-button>
              <el-upload
                :action="'/api/manage/applet/uploadAppletFile?id=' + scope.row.id + '&typeId=' + scope.row.typeId"
                name="typeZip"
                :headers="myHeader"
                :show-file-list="false"
                :on-success="handleFileSuccess"
                :on-error="handleFileError"
                :before-upload="beforeAvatarUpload">
                <el-button type="primary" plain size="mini">上传</el-button>
              </el-upload>
            </div>
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
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="applet-file-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <AppletFile ref="AppletFile" v-on:refreshSet="refreshSet"></AppletFile>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'
  import AppletFile from '@/views/admin/applet/file/applet-file.vue'

  export default {
    name: 'applet-file-list',
    components: {
      'AppletFile': AppletFile
    },
    data() {
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
          fileStatus: '',
          page: 1,
          pageSize: 15
        },
        tableData: [],
        typeList: [],
        myHeader: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    },
    created() {
      this.loadAppletFile()
    },
    mounted() {
    },
    methods: {
      loadAppletFile(){
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/loadAppletFilePage',
          method: 'post'
        }).then(res => {
          if (res.data.code === '1') {
            this.typeList = res.data.data
            this.onSubmit()
          } else {
            this.$global.exitLoad(this, null, res.data)
          }
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      },
      indexMethod(index) {
        let count = (parseInt(this.info.page) - 1) * parseInt(this.info.pageSize)
        return count + (parseInt(index) + 1)
      },
      onSubmit() {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/queryAppletFilePage',
          method: 'post',
          data: this.info
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'applet-file-form')
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
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.info.page = val
        this.onSubmit()
      },
      updateInfo(fileId) {
        this.showInfo = true
        if (fileId && fileId != '0') {
          this.showTitle = '修改小程序文件信息'
        } else {
          this.showTitle = '添加小程序文件信息'
        }
        this.$cookies.set('applet_file_id', fileId)
        try {
          this.$refs.AppletFile.loadAppletFile(fileId)
        } catch (e) {
        }
      },
      refreshSet() {
        this.showInfo = false
        this.selectList()
      },
      handleFileSuccess(res, file) {
        if (res.code === '1') {
          this.$message.success('上传成功')
          this.onSubmit()
        } else {
          this.$message.error('上传失败')
        }
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        this.$global.exitLoad(this, loading, {'code': res.data})
      },
      beforeAvatarUpload(file) {
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        const isJPG = 'application/x-zip-compressed,application/x-7z-compressed,application/x-gzip'.indexOf(file.type) >= 0
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传压缩文件格式错误!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        if (!isJPG || !isLt2M) {
          loading.close()
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
