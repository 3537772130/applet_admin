<style type="text/css">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .auth-tree-title {
    width: 940px;
    text-align: left;
    flex: none;
  }

  .auth-tree-title > table>tr>td {
    text-align: center;
    background-color: #fafafa;
    padding: 8px 0px;
  }

  .auth-tree {
    width: 940px;
  }

  .auth-tree .el-tree-node__content{
    height: 40px;
  }

  .auth-tree .custom-tree-node {
    flex: none;
  }

  .auth-tree .custom-tree-node > span {
    display: inline-block;
    text-align: left;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <div class="auth-tree-title">
        <table cellspacing="0">
          <tr>
            <td style="width: 216px;">菜单名称</td>
            <td style="width: 220px;">菜单标识</td>
            <td style="width: 400px;">菜单路径</td>
            <td style="width: 100px;">菜单等级</td>
          </tr>
        </table>
      </div>
      <div class="custom-tree-container auth-tree">
        <div class="block">
          <el-tree
            :data="menuData"
            node-key="id"
            ref="roleAuthTree"
            show-checkbox
            default-expand-all
            :default-checked-keys="idList"
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
            </span>
          </el-tree>
        </div>
      </div>
      <div style="height: 40px;line-height: 40px;text-align: center;margin: 20px 0px;">
        <el-button type="primary" size="mini" style="width: 290px;" @click="onSubmit()">提&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'menu-list',
    data() {
      return {
        loading: false,
        showInfo: false,
        showTitle: '',
        idList: [],
        menuData: '',
        roleId: 0
      }
    },
    created() {
      let id = this.$cookies.get("roleAuthId")
      this.loadMenuList(id)
    },
    mounted() {
    },
    methods: {
      loadMenuList(id) {
        if (id){
          this.roleId = id
          this.loading = true
          this.$axios({
            url: '/api/manage/menu/loadRoleMenuList',
            method: 'post',
            data: {roleId: id}
          }).then(res => {
            if (res.data.code === '1') {
              this.idList = res.data.data.idList
              this.menuData = JSON.parse(res.data.data.menuList)
            } else {
              this.$message.error(res.data.data)
            }
            this.$cookies.remove("roleAuthId")
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, res.data)
          })
        }
      },
      onSubmit() {
        let list = this.$refs.roleAuthTree.getCheckedKeys()
        let loading = Loading.service({fullscreen: true, text: '正在提交'})
        this.$axios({
          url: '/api/manage/menu/updateRoleMenuAuth',
          method: 'post',
          data: {roleId: this.roleId, idJson: JSON.stringify(list)}
        }).then(res => {
          let that = this
          res.data.code === '1' ? this.$message.success({message: res.data.data,duration: 1000, onClose: function () {
              that.$emit('loadMenuList')
            }
          }) : this.$message.error(res.data.data)
          this.$global.exitLoad(this, loading, res.data)
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, loading, '')
        })
      }
    }
  }
</script>
