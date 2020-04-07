<style type="text/css">
  .remark{
    color: red;
    height: 30px;
    line-height: 30px;
    margin-left: 80px;
  }

  .notice-update-form {
    text-align: left;
    padding-left: 50px;
  }

  .notice-update-input {
    width: 340px;
  }

  .notice-update-form .el-form-item__error {
    left: 80px;
  }

  .notice-describe{
    height: 20px;
    line-height: 20px;
    color: #cdcdcd;
    font-size: 12px;
    margin-left: 80px;
  }

  .sub-div {
    height: 50px;
  }

  .sub-but {
    width: 320px;
    height: 30px;
  }
</style>
<template>
  <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
    <el-form :model="info" :rules="infoRules" ref="info" class="notice-update-form">
      <div class="remark">注：内容提交后不可再更改，只允许调整状态</div>
      <el-form-item label="通知标题" prop="noticeTitle">
        <el-input v-model="info.noticeTitle" placeholder="请输入通知标题" class="notice-update-input" :readonly="info.id ? true : false"></el-input>
      </el-form-item>
      <el-form-item label="通知内容" prop="noticeContent">
        <el-input type="textarea" v-model="info.noticeContent" :show-word-limit="true" maxlength="2000"
                  resize="none" rows="12" placeholder="请输入通知内容（使用<br>在段尾进行分段）"
                  class="notice-update-input" :readonly="info.id ? true : false"></el-input>
      </el-form-item>
      <div class="notice-describe">系统公告：仅保留一条有效消息。</div>
      <div class="notice-describe">新用户推送：新用户绑定小程序，将收到此类推送，可以存在多条。</div>
      <div class="notice-describe">普通推送：系统将向全平台用户推送一条通知消息。</div>
      <el-form-item label="通知类型" prop="noticeType">
        <el-select v-model="info.noticeType" placeholder="请选择通知类型" class="notice-update-input" :disabled="info.id ? true : false">
          <el-option label="系统公告" value="1"></el-option>
          <el-option label="新用户推送" value="2"></el-option>
          <el-option label="普通推送" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知状态" prop="noticeStatus">
        <el-select v-model="noticeStatus" placeholder="请选择通知状态" class="notice-update-input">
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="sub-div">
        <el-button class="sub-but" type="primary" style="width: 190px;position: absolute;left: 80px;"
                   @click="onSubmitInfo()">提&nbsp;&nbsp;交
        </el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'user-info',
    data () {
      return {
        loading: false,
        info: {
          id: null,
          noticeTitle: '',
          noticeContent: '',
          noticeType: '1',
          noticeStatus: true
        },
        noticeStatus: '1',
        infoRules: {
          noticeTitle: [
            {required: true, message: '请输入通知标题', trigger: 'blur'},
            {min: 1, max: 50, message: '通知标题长度过长', trigger: 'blur'}
          ],
          noticeContent: [
            {required: true, message: '请输入通知内容', trigger: 'blur'},
            {min: 1, max: 2000, message: '通知内容长度过长', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      let id = this.$cookies.get('system_notice_id')
      this.loadInfo(id)
    },
    mounted () {

    },
    methods: {
      loadInfo (id) {
        if (id && id != '0') {
          this.$cookies.remove('system_notice_id')
          let loading = Loading.service({fullscreen: true, text: '加载中'})
          this.$axios({
            url: '/api/manage/platformSet/loadSystemNoticeDetails',
            method: 'post',
            data: {id: id}
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code === '1') {
              this.info = res.data.data
              this.info.noticeType = this.info.noticeType.toString()
              this.noticeStatus = this.info.noticeStatus ? '1' : '0'
              delete this.info.createTime
            } else {
              this.$message.error(res.data.data)
            }
            this.$global.exitLoad(this, loading, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, loading, '')
          })
        } else {
          delete this.info.id
        }
      },
      onSubmitInfo () {
        this.$refs['info'].validate((valid) => {
          if (valid) {
            this.info.noticeStatus = this.noticeStatus === '1'
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/platformSet/updateSystemNotice',
              method: 'post',
              data: this.info
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                this.$emit('loadInfo')
              } else if (res.data.code === '-1') {
                this.$message.error(res.data.data)
              }
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          } else {
            this.$message({message: '信息提交失败', type: 'warning'})
          }
        })
      }
    }
  }
</script>
