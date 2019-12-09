<style file="text/css">
  .default-main {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
  }

  .default-main .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" class="default-main">
      <!--餐饮-->
      <el-tabs v-model="showTabs" type="border-card" v-if="fileTypeId == 1" :style="{height: tabsHeight + 'px'}">
        <el-tab-pane :style="{height: tabHeight + 'px'}" v-for="(item, index) in pageList" :key="index"
                     :label="item.pageName" :name="'page' + item.id">
          {{item.pageLogo + '-' + item.pageName}}
        </el-tab-pane>
      </el-tabs>
      <!--百货超市/便利店-->
      <el-tabs v-model="showTabs" type="border-card" v-if="fileTypeId == 2" :style="{height: tabsHeight + 'px'}">
        <el-tab-pane :style="{height: tabHeight + 'px'}" v-for="(item, index) in pageList"
                     :key="index"
                     :label="item.pageName" :name="'page' + item.id">
          <storeMain trf="storeMain" v-if="item.pageLogo == 'MAIN'"></storeMain>
        </el-tab-pane>
      </el-tabs>
      <!--水果专卖-->
      <el-tabs v-model="showTabs" type="border-card" v-if="fileTypeId == 3" :style="{height: tabsHeight + 'px'}">
        <el-tab-pane :style="{height: tabHeight + 'px'}" v-for="(item, index) in pageList" :key="index"
                     :label="item.pageName" :name="'page' + item.id">
          {{item.pageLogo + '-' + item.pageName}}
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>
<script file="text/javascript">
  import storeMain from '@/views/admin/applet/file/page/default/store/store-main.vue'

  export default {
    name: 'page-default',
    components: {
      'storeMain': storeMain
    },
    data () {
      return {
        tabsHeight: `${document.documentElement.scrollHeight + 50}`,
        tabHeight: `${document.documentElement.scrollHeight - 25}`,
        loading: false,
        showTabs: '',
        fileTypeId: this.$cookies.get('file_type_id'),
        pageId: this.$cookies.get('default_page_id'),
        pageList: []
      }
    },
    created () {
      let fileId = this.$cookies.get('page_file_id')
      this.loadPageDefault(fileId)
    },
    mounted () {
    },
    methods: {
      loadPageDefault (fileId) {
        this.loading = true
        this.$axios({
          url: '/api/manage/applet/page/loadPageDefault',
          method: 'post',
          data: {fileId: fileId}
        }).then(res => {
          if (res.data.code === '1') {
            this.pageList = res.data.data
            this.showTabs = 'page' + this.pageId
          } else {
            this.$message.error({
              message: res.data.data,
              duration: 2000,
              onClose: function () {
                window.close()
              }
            })
          }
          this.$global.exitLoad(this, null, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      }
    }
  }
</script>
