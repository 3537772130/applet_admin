<style type="text/css">
  body {
    margin: 0px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px 0px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-aside::-webkit-scrollbar {
    display: none;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 460px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-menu {
    background-color: #515a6e;
    width: 200px;
  }

  .el-submenu__title, .el-menu-item, .el-submenu__title i {
    color: #FFFFFF;
  }

  .el-menu-item-group__title {
    display: none;
  }

  .el-dropdown {
    height: 54px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .user-photo {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 1px #dcdee2 solid;
    position: relative;
    top: 4px;
  }

  .el-submenu__title {
    text-align: left;
  }

  .el-submenu .el-menu-item {
    text-align: left;
  }
</style>
<template>
  <el-container :style="{height: bodyHeight}">
    <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
      <div style="width: 200px;height: 63px;display: inline-block;"></div>
      <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        @open="handleSOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF" style="position: relative;top: -140px;">
        <el-submenu v-for="menu in secondList" :key="menu.index" :index="menu.index">
          <template slot="title"><i :class="menu.icon"></i>{{menu.title}}</template>
          <el-menu-item-group>
            <el-menu-item v-for="item in menu.items" :key="item.index" :index="item.logo">{{item.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background-color: #545c64;text-align: right;">
        <headerMenu ref="headerMenu" v-on:upActiveIndex="upActiveIndex"></headerMenu>
      </el-header>
      <el-main style="background-color: #DCDFE6;">
        <tabsContent ref="tabsContent" v-on:updateInfo="updateInfo"></tabsContent>
      </el-main>
    </el-container>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'
  import headerMenu from '@/views/admin/common/header-menu.vue'
  import tabsContent from '@/views/admin/common/tabs-content.vue'

  export default {
    name: 'main_info',
    components: {
      'headerMenu': headerMenu,
      'tabsContent': tabsContent
    },
    data() {
      return {
        bodyHeight: `${document.documentElement.clientHeight}` + 'px',
        info: this.$cookies.get('manager_info'),
        activeIndex: '0',
        menuList: [],
        secondList: []
      }
    },
    created() {
      let loading = Loading.service({fullscreen: true, text: '正在加载'})
      this.$axios({
        url: '/api/manage/checkLogin',
        method: 'post'
      }).then(res => {
        // console.info('后台返回的数据', res.data)
        if (res.data.code === '1') {
          this.menuList = res.data.data
          this.$refs.headerMenu.loadFirstMenu(res.data.data)
          this.secondList = res.data.data[0].items
        } else {
          this.$cookies.remove("manager_info")
          this.$router.push({path: '/'})
        }
        this.$global.exitLoad(this, loading, res.data)
      }).catch(error => {
        console.info('错误信息', error)
        this.$global.exitLoad(this, loading, '')
      })
    },
    mounted() {

    },
    methods: {
      updateInfo(index) {
        if (index) {
          if (index === '0'){
            this.activeIndex = this.activeIndex === '0' ? '':'0';
          } else {
            this.activeIndex = index
          }
        } else {
          this.$refs.headerMenu.updateInfo()
        }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        let keyTitle = ''
        let list = this.secondList
        for (let i = 0; i < list.length; i++) {
          let items = list[i].items
          for (let k = 0; k < items.length; k++) {
            let item = items[k]
            if (item.logo === key) {
              keyTitle = item.title
              break
            }
          }
        }
        this.$refs.tabsContent.addTab(key, keyTitle)
      },
      handleSOpen(key, keyPath) {
        // console.log("打开：", key, keyPath)
      },
      handleClose(key, keyPath) {
        // console.log("关闭：", key, keyPath)
      },
      upActiveIndex(index) {
        this.secondList = this.menuList[index].items
      }
    }
  }
</script>
