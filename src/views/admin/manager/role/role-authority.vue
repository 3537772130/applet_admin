<style type="text/css">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .menu-tree .custom-tree-node{
    flex: none;
  }
  .menu-tree .custom-tree-node>span{
    display:inline-block;
    text-align: left;
    border: 1px red solid;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <div class="custom-tree-container menu-tree">
        <div class="block">
          <p>使用 scoped slot</p>
          <el-tree
            :data="menuData"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span style="width: 176px; text-indent: 0.5em;" v-if="node.level === 1">{{ node.label }}</span>
              <span style="width: 158px; text-indent: 0.5em;" v-if="node.level === 2">{{ node.label }}</span>
              <span style="width: 140px; text-indent: 0.5em;" v-if="node.level === 3">{{ node.label }}</span>
              <span style="width: 220px;">{{ data.logo }}</span>
              <span style="width: 400px;">{{ data.path }}</span>
              <span style="width: 80px; text-align: center;">{{ node.level === 1 ? '一级':node.level === 2 ? '二级':'三级' }}</span>
              <span style="width: 80px; text-align: center;">{{ data.index }}</span>
              <span style="width: 160px; text-align: center;">
                <el-button type="text" size="mini" @click="() => append(data)" v-if="node.level != 3">添加</el-button>
                <el-button type="text" size="mini" @click="() => update(node, data)">修改</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="manager-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <div style="overflow-x: hidden;overflow-y: auto;">
          <managerInfo ref="managerInfo" v-on:setManagerId="setManagerId"></managerInfo>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'
  import headerMenu from '@/views/admin/common/header-menu.vue'

  export default {
    name: 'main_info',
    components: {
      'headerMenu': headerMenu
    },
    data() {
      return {
        loading: false,
        showInfo: false,
        menuData: '',
      }
    },
    created() {
      this.loadMenuList()
    },
    mounted() {

    },
    methods: {
      loadMenuList(){
        this.loading = true
        this.$axios({
          url: '/api/manage/menu/loadMenuList',
          method: 'post'
        }).then(res => {
          if (res.data.code === '1') {
            this.menuData = JSON.parse(res.data.data)
          } else {
            this.$message.error(res.data.data)
          }
          this.$global.exitLoad(this, null, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, res.data)
        })
      },
      append(data) {

      },
      update(node, data) {

      }
    }
  }
</script>
