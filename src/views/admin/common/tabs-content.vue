<style>
  .el-main {
    padding: 10px;
  }

  .el-tabs__nav {
    height: 40px;
    line-height: 40px;
  }

  .tab-div-content::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
  }

  .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }

  .tab-div-content > .tab-div-content-page {
    /*padding: 15px;*/
  }

  .tab-div-content .el-table th > .cell {
    font-size: 14px;
    color: #000000;
  }
</style>
<template>
  <el-tabs v-model="editableTabsValue" type="border-card" @tab-click="clickTab" @tab-remove="removeTab"
           :style="{height: tabHeight + 'px'}">
    <!--    <el-tab-pane label="管理主页" name="0" :style="{height: tabPaneHeight + 'px',display: mainShow}">-->
    <!--      <div>123</div>-->
    <!--    </el-tab-pane>-->
    <el-tab-pane class="tab-div-content" v-for="item in editableTabs" :key="item.name"
                 :label="item.title" :name="item.name" :style="{'height': tabPaneHeight + 'px','overflow-y': 'scroll'}"
                 closable>
      <div v-if="item.name === 'queryManagerRoleToPage'" class="tab-div-content-page">
        <RoleList></RoleList>
      </div>
      <div v-if="item.name === 'queryManagerToPage'" class="tab-div-content-page">
        <ManagerList></ManagerList>
      </div>
      <div v-if="item.name === 'loadManagerInfo'" class="tab-div-content-page">
        <ManagerDetails ref="ManagerDetails" v-on:updateInfo="updateInfo"></ManagerDetails>
      </div>
      <div v-if="item.name === 'queryAppletToPage'" class="tab-div-content-page">
        <AppletList></AppletList>
      </div>
      <div v-if="item.name === 'queryAppletManageToPage'" class="tab-div-content-page">
        <AppletManageList></AppletManageList>
      </div>
      <div v-if="item.name === 'queryAppletAuditToFirstTrial'" class="tab-div-content-page">
        <AppletAuditFirstList></AppletAuditFirstList>
      </div>
      <div v-if="item.name === 'queryAppletAuditToLastTrial'" class="tab-div-content-page">
        <AppletAuditLastList></AppletAuditLastList>
      </div>
      <div v-if="item.name === 'queryAppletTypePage'" class="tab-div-content-page">
        <AppletTypeList></AppletTypeList>
      </div>
      <div v-if="item.name === 'queryAppletFilePage'" class="tab-div-content-page">
        <AppletFileList></AppletFileList>
      </div>
      <div v-if="item.name === 'queryAppletVersionPage'" class="tab-div-content-page">
        <AppletVersionList></AppletVersionList>
      </div>
      <div v-if="item.name === 'loadMenuList'" class="tab-div-content-page">
        <MenuList></MenuList>
      </div>
      <div v-if="item.name === 'loadSystemNoticeByPage'" class="tab-div-content-page">
        <NoticeList></NoticeList>
      </div>
      <div v-if="item.name === 'queryUserToPage'" class="tab-div-content-page">
        <UserList></UserList>
      </div>
      <div v-if="item.name === 'queryMerchantToPage'" class="tab-div-content-page">
        <MerchantList></MerchantList>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import RoleList from '@/views/admin/manager/role/role-list.vue'
  import ManagerList from '@/views/admin/manager/manager-list.vue'
  import ManagerDetails from '@/views/admin/manager/manager-details.vue'
  import AppletList from '@/views/admin/applet/applet-list.vue'
  import AppletManageList from '@/views/admin/applet/applet-manage-list.vue'
  import AppletAuditFirstList from '@/views/admin/applet/applet-audit-first-list.vue'
  import AppletAuditLastList from '@/views/admin/applet/applet-audit-last-list.vue'
  import AppletTypeList from '@/views/admin/applet/type/applet-type-list.vue'
  import AppletFileList from '@/views/admin/applet/file/applet-file-list.vue'
  import AppletVersionList from '@/views/admin/applet/version/applet-version-list.vue'
  import MenuList from '@/views/admin/platform-set/menu/menu-list.vue'
  import NoticeList from '@/views/admin/platform-set/notice/notice-list.vue'
  import UserList from '@/views/admin/user/user-list.vue'
  import MerchantList from '@/views/admin/user/merchant-list.vue'

  export default {
    name: 'tabs-content',
    components: {
      'RoleList': RoleList,
      'ManagerList': ManagerList,
      'ManagerDetails': ManagerDetails,
      'AppletList': AppletList,
      'AppletManageList': AppletManageList,
      'AppletAuditFirstList': AppletAuditFirstList,
      'AppletAuditLastList': AppletAuditLastList,
      'AppletTypeList': AppletTypeList,
      'AppletFileList': AppletFileList,
      'AppletVersionList': AppletVersionList,
      'MenuList': MenuList,
      'NoticeList': NoticeList,
      'UserList': UserList,
      'MerchantList': MerchantList
    },
    data () {
      return {
        tabHeight: `${document.documentElement.clientHeight - 85}`,
        tabPaneHeight: `${document.documentElement.clientHeight - 135}`,
        // mainShow: 'block',
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 0,
        parentMenuIndex: ''
      }
    },
    created () {
      this.$cookies.set('tabPaneHeight', this.tabPaneHeight)
    },
    method () {

    },
    methods: {
      // 添加标签页
      addTab (menuIndex, title) {
        this.mainShow = 'none'
        let menuLists = this.editableTabs
        let ifBe = true
        for (var i = 0; i < menuLists.length; i++) {
          if (menuLists[i].name === menuIndex) {
            ifBe = false
            break
          }
        }
        if (ifBe) {
          this.editableTabs.push({
            title: title,
            name: menuIndex
          })
        }
        this.editableTabsValue = menuIndex
      },
      // 选中标签页
      clickTab (targetName) {
        // 更新main-info菜单选中目标
        this.parentMenuIndex = targetName.$el.id.replace('pane-', '')
        this.setActiveIndex()
      },
      // 移除标签页
      removeTab (targetName) {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
        // if (tabs.length === 1) {
        //   this.mainShow = 'block'
        // }
        // 更新main-info菜单选中目标
        this.parentMenuIndex = tabs.length === 1 ? '0' : this.editableTabsValue
        this.setActiveIndex()
      },
      updateInfo () {
        this.$emit('updateInfo')
      },
      setActiveIndex () {
        this.$emit('updateInfo', this.parentMenuIndex)
      }
    }
  }
</script>
