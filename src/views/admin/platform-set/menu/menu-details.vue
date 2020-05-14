<style type="text/css">
  .menu-input {
    width: 290px;
    text-align: left;
  }

  .menu-dialog .el-dialog {
    width: 320px;
  }

  .m-d-div {
    text-align: left;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }

  .m-d-div:hover {
    cursor: pointer;
    color: #409EFF;
  }

  .m-d-first {
    text-indent: 1em;
  }

  .m-d-second {
    text-indent: 2em;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <el-form :rules="menuRules" :inline="true" :model="menuForm" ref="menuForm" class="demo-form-inline">
        <el-form-item label="菜单等级">
          <div class="menu-input">
            <el-link type="primary" :underline="false" v-if="menuForm.menuLevel == 1">一级</el-link>
            <el-link type="primary" :underline="false" v-if="menuForm.menuLevel == 2">二级</el-link>
            <el-link type="primary" :underline="false" v-if="menuForm.menuLevel == 3">三级</el-link>
          </div>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="menuForm.parentId" placeholder="请选择上级菜单" class="menu-input" @change="chooseParentId()">
            <el-option v-for="(item, index) in parentList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单icon" prop="menuIcon" v-if="menuForm.menuLevel == 2">
          <el-input v-model="menuForm.menuIcon" maxlength="50" placeholder="请输入菜单icon" class="menu-input"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" maxlength="20" placeholder="请输入菜单名称" class="menu-input"></el-input>
        </el-form-item>
        <el-form-item label="菜单标识" prop="menuLogo">
          <el-input v-model="menuForm.menuLogo" maxlength="50" placeholder="请输入菜单标识" class="menu-input"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="menuPath" v-if="menuForm.menuLevel == 3">
          <el-input type="textarea" v-model="menuForm.menuPath" :show-word-limit="true" maxlength="150"
                    resize="none" rows="5" placeholder="请输入菜单路径" class="menu-input"></el-input>
        </el-form-item>
        <el-form-item label="菜单序号" prop="menuIndex">
          <el-input v-model.number="menuForm.menuIndex" type="number" placeholder="请输入菜单序号"
                    class="menu-input"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态" prop="status">
          <el-select v-model="menuForm.status" placeholder="请选择菜单状态" class="menu-input">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit('menuForm')" class="menu-input" style="text-align: center;">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'role-info',
    data () {
      return {
        loading: false,
        showInfo: false,
        showTitle: '父级菜单',
        parentList: [],
        parentName: '',
        menuForm: {},
        menuRules: {
          menuName: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
            {type: 'string', min: 1, max: 20, message: '菜单名称不能超过20个字符', trigger: 'blur'}
          ],
          menuLogo: [
            {required: true, message: '请输入菜单标识', trigger: 'blur'},
            {type: 'string', min: 1, max: 50, message: '菜单标识不能超过50个字符', trigger: 'blur'}
          ],
          menuPath: [
            {required: true, message: '请输入菜单路径', trigger: 'blur'},
            {type: 'string', min: 1, max: 250, message: '菜单路径不能超过250个字符', trigger: 'blur'}
          ],
          menuIndex: [
            {required: true, message: '请输入菜单序号', trigger: 'blur'},
            {type: 'number', min: 1, max: 999, message: '菜单序号为1-999的数字', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      let menuId = this.$cookies.get('menuId')
      let menuParentId = this.$cookies.get('menuParentId')
      this.loadMenuInfo(menuId, menuParentId)
    },
    mounted () {

    },
    methods: {
      loadMenuInfo (id, parentId) {
        if (parentId != null && parentId >= 0) {
          this.loading = true
          this.$axios({
            url: '/api/manage/menu/loadMenuDetails',
            method: 'post',
            data: {id: id, parentId: parentId}
          }).then(res => {
            this.parentList = res.data.data.parentList
            this.parentName = res.data.data.parentInfo.menuName
            this.menuForm = {
              id: '',
              parentId: res.data.data.parentInfo.id,
              menuIcon: '',
              menuName: '',
              menuLogo: '',
              menuPath: '',
              menuIndex: '',
              menuLevel: 1,
              status: '1'
            }
            this.menuForm.menuLevel = res.data.data.level
            if (res.data.code === '1') {
              this.menuForm = res.data.data.info
              this.menuForm.status = this.menuForm.status ? '1' : '0'
              delete this.menuForm.updateTime
            }
            this.$cookies.remove('menuId')
            this.$cookies.remove('menuParentId')
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      chooseParentId () {
        this.showInfo = true
      },
      setParentId (id, name) {
        this.menuForm.parentId = id
        this.parentName = name
        this.showInfo = false
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/menu/updateMenuInfo',
              method: 'post',
              data: this.menuForm
            }).then(res => {
              console.info('后台返回的数据', res.data)
              let that = this
              res.data.code === '1' ? this.$message.success({
                message: res.data.data, duration: 1000, onClose: function () {
                  that.$emit('loadMenuInfo')
                }
              }) : this.$message.error(res.data.data)
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          }
        })
      }
    }
  }
</script>
