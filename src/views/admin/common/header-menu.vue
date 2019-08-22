<style type="text/css">
</style>
<template>
  <div>
    <div style="display: inline-block;width: 200px;height: 63px;text-align: center;position: absolute;top: 0px;left: 0px;">
      <img style="position: relative;top: 18px;" src="/api/image/getImage?text=Applet Site&color=16777215&fontFamily=华文隶书">
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF" :style="menuWidth">
      <el-submenu index="1" v-if="loginStatus" @click.native="handleSelect('5-1','5')">
        <template slot="title">
          <el-avatar :size="50" :src="info.avatarUrl" @error="errorHandler">
            <img :src="info.avatarUrl"/>
          </el-avatar>
        </template>
        <el-menu-item disabled>{{info.nickName}}</el-menu-item>
        <el-menu-item index="1-1">{{info.userName + '(' + info.roleName + ')'}}</el-menu-item>
        <el-menu-item index="1-2" @click.native="exitLogin()">注销登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {Loading} from 'element-ui'

  export default {
    name: 'header-menu',
    data() {
      return {
        ifLogo: true,
        activeIndex: '1',
        loginStatus: false,
        menuWidth: {'display': 'inline-block', 'border-bottom': 'none', 'width': '500px', 'margin-right': '30px'},
        info: this.$cookies.get('manager_info')
      }
    },
    created() {
      this.checkLogin()
    },
    methods: {
      errorHandler() {
        return true
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        switch (key) {
          case "1-2":
            this.exitLogin()
            break
          case "6":
            this.$router.push({path: '/echarts'})
            break
        }
      },
      checkLogin() {
        this.loginStatus = this.$global.checkLogin(this)
        if (!this.loginStatus) {
          this.menuWidth = {
            'display': 'inline-block',
            'border-bottom': 'none',
            'width': '450px',
            'margin-right': '30px'
          }
        }
      },
      setMenuIndex(index) {
        this.activeIndex = index
        if (index === '5-1') {
          this.ifLogo = false
        }
      },
      updateInfo() {
        this.info = this.$cookies.get('manager_info')
      },
      exitLogin() {
        this.$confirm('确定注销登录吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loading = Loading.service({fullscreen: true, text: '正在注销'})
          this.$axios({
            url: '/api/manager/exitLogin',
            method: 'post'
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code === '1') {
              this.$cookies.remove('manager_info')
              this.$router.push({path: '/'})
            } else {
              this.$message.error(res.data.data)
            }
            this.$global.exitLoad(this, loading, res.data)
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
