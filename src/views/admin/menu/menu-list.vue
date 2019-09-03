<style type="text/css">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .menu-tree-title {
    width: 1200px;
    text-align: left;
    flex: none;
  }

  .menu-tree-title > table>tr>td {
    text-align: center;
    background-color: #fafafa;
    padding: 8px 0px;
  }

  .menu-tree {
    width: 1200px;
  }

  .menu-tree .el-tree-node__content{
    height: 40px;
  }

  .menu-tree .custom-tree-node {
    flex: none;
  }

  .menu-tree .custom-tree-node > span {
    display: inline-block;
    text-align: left;
  }

  .menu-list-dialog .el-dialog {
    width: 450px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <div class="menu-tree-title">
        <table cellspacing="0">
          <tr>
            <td style="width: 216px;">菜单名称</td>
            <td style="width: 220px;">菜单标识</td>
            <td style="width: 400px;">菜单路径</td>
            <td style="width: 100px;">菜单等级</td>
            <td style="width: 100px;">菜单序号</td>
            <td style="width: 210px;">操作</td>
          </tr>
        </table>
      </div>
      <div class="custom-tree-container menu-tree">
        <div class="block">
          <el-tree
            :data="menuData"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span style="width: 194px; text-indent: 0.5em;" v-if="data.level === 0">{{ node.label }}</span>
              <span style="width: 176px; text-indent: 0.5em;" v-if="data.level === 1">{{ node.label }}</span>
              <span style="width: 158px; text-indent: 0.5em;" v-if="data.level === 2">
                <i :class="data.icon" style="margin-right: 5px;"></i>{{ node.label }}
              </span>
              <span style="width: 140px; text-indent: 0.5em;" v-if="data.level === 3">{{ node.label }}</span>
              <span style="width: 220px;">{{ data.logo }}</span>
              <span style="width: 360px;">{{ data.path }}</span>
              <span style="width: 100px; text-align: center;">{{ data.level === 1 ? '一级':data.level === 2 ?
                '二级':data.level === 3 ? '三级':'' }}
              </span>
              <span style="width: 100px; text-align: center;">{{ data.index }}</span>
              <span style="width: 210px; text-align: center;">
                <el-button type="primary" plain @click="update('0', data.id)" v-if="data.level != 3">添加子级</el-button>
                <el-button type="warning" plain @click="update(data.id, data.parentId)" v-if="data.level != 0">修改</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <el-dialog :title="showTitle" :visible.sync="showInfo" class="menu-list-dialog" :modal-append-to-body="false"
                 :close-on-click-modal="false" :destroy-on-close="true">
        <div style="overflow-x: hidden;overflow-y: auto;">
          <menuDetails ref="menuDetails" v-on:loadMenuInfo="loadMenuInfo"></menuDetails>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'
  import menuDetails from '@/views/admin/menu/menu-details.vue'

  export default {
    name: 'menu-list',
    components: {
      'menuDetails': menuDetails
    },
    data() {
      return {
        loading: false,
        showInfo: false,
        showTitle: '',
        menuData: '',
      }
    },
    created() {
      this.loadMenuList()
    },
    mounted() {

    },
    methods: {
      loadMenuList() {
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
      update(id, parentId) {
        this.showInfo = true
        if (id && id != ''){
          this.showTitle = '修改菜单';
        } else {
          this.showTitle = '添加菜单';
        }
        try {
          this.$refs.menuDetails.loadMenuInfo(id, parentId)
        }catch (e) {
          this.$cookies.set('menuId', id)
          this.$cookies.set('menuParentId', parentId)
        }
      },
      loadMenuInfo(){
        this.showInfo = false
        this.loadMenuList()
      }
    }
  }
</script>
