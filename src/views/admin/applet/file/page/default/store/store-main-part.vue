<style file="text/css">
  .store-main-part>.demo-form-inline {
    margin-bottom: 40px;
    padding-top: 10px;
  }

  .store-main-part .part-input {
    width: 290px;
  }

  .store-main-part .part-button {
    width: 80px;
  }

  .store-main-part .img-carousel-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .store-main-part .img-carousel-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .store-main-part .img-carousel-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 375px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .store-main-part .img-carousel {
    width: 375px;
    height: 150px;
    display: block;
  }

  .store-main-part .img-carousel-badge .el-badge__content{
    width: 18px;
    top: 0px;
    right: 10px;
    padding: 0px;
  }

  .store-main-part .img-carousel-badge .el-badge__content:hover {
    cursor: pointer;
  }

  .store-main-part .type-frame-badge .el-badge__content{
    width: 18px;
    top: 0px;
    right: 16px;
    padding: 0px;
  }

  .store-main-part .type-frame-badge .el-badge__content:hover{
    cursor: pointer;
  }

  .store-main-part .type-element {
    width: 80px;
    height: 80px;
    margin: 0px 5px;
    text-align: center;
    display: inline-block;
    border: 1px #cdcdcd dashed;
    border-radius: 5px;
  }

  .store-main-part .type-element:hover {
    cursor: pointer;
  }

  .store-main-part .type-element > .type-icon-div {
    text-align: center;
    margin-top: 10px;
  }

  .store-main-part .type-element > .type-name {
    width: 100%;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    font-size: 14px;
    position: relative;
    top: -15px;
  }


</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF; padding: 0px 20px;">
      <div class="store-main-part" v-for="(item, pIndex) in partList" :key="pIndex">
        <el-form class="demo-form-inline" v-if="partIndex === pIndex && item.id === 'goods-search'">
          <el-form-item label=" " style="margin-top: 20px;">
            <el-button type="primary" class="part-button"><i class="el-icon-caret-top"></i>&nbsp;上移</el-button>
            <el-button type="primary" class="part-button"><i class="el-icon-caret-bottom"></i>&nbsp;下移</el-button>
            <el-button type="danger" @click="onSubmit(pIndex)" class="part-button"><i
              class="el-icon-remove-outline"></i>&nbsp;删除
            </el-button>
          </el-form-item>
        </el-form>
        <el-form class="demo-form-inline" v-if="partIndex === pIndex && item.id === 'notice-bar'">
          <el-form-item label="通知内容" prop="elementLogo">
            <el-input type="textarea" v-model="item.textContent" :show-word-limit="true" maxlength="60"
                      resize="none" rows="5" placeholder="请输入通知内容" class="part-input"></el-input>
          </el-form-item>
          <el-form-item label=" " style="margin-top: 20px;">
            <el-button type="primary" class="part-button"><i class="el-icon-caret-top"></i>&nbsp;上移</el-button>
            <el-button type="primary" class="part-button"><i class="el-icon-caret-bottom"></i>&nbsp;下移</el-button>
            <el-button type="danger" @click="onSubmit()" class="part-button"><i class="el-icon-remove-outline"></i>&nbsp;删除
            </el-button>
          </el-form-item>
        </el-form>
        <el-form class="demo-form-inline" v-if="partIndex === pIndex && item.id === 'img-carousel'">
          <el-form-item label=" " style="margin-bottom: 0px;" v-for="(img, index) in item.list" :key="index">
            <el-badge value="×" class="item img-carousel-badge">
              <el-image :src="img" style="width: 375px;height: 150px;"></el-image>
            </el-badge>
          </el-form-item>
          <el-form-item label=" " v-if="item.list.length < 5">
            <el-upload
              class="img-carousel-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="img-carousel">
              <i v-else class="el-icon-plus img-carousel-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label=" " style="margin-top: 20px;">
            <el-button type="primary" class="part-button"><i class="el-icon-caret-top"></i>&nbsp;上移</el-button>
            <el-button type="primary" class="part-button"><i class="el-icon-caret-bottom"></i>&nbsp;下移</el-button>
            <el-button type="danger" @click="onSubmit()" class="part-button"><i class="el-icon-remove-outline"></i>&nbsp;删除
            </el-button>
          </el-form-item>
        </el-form>
        <el-form class="demo-form-inline" v-if="partIndex === pIndex && item.id === 'type-frame'">
          <el-form-item label=" " style="margin-bottom: 0px;">
            <el-badge value="×" class="item type-frame-badge" v-for="(type, index) in item.list" :key="index">
              <div class="type-element">
                <div class="type-icon-div">
                  <el-image :src="type.icon" style="width: 40px;height: 40px;"></el-image>
                </div>
                <span class="type-name">{{type.name}}</span>
              </div>
            </el-badge>
            <el-badge value="" class="item">
              <div class="type-element" v-if="item.list.length < 12">
                <div class="type-icon-div">
                  <el-image src="/static/images/icon/add.png" style="width: 40px;height: 40px;"></el-image>
                </div>
                <span class="type-name" style="color: #cdcdcd;">添加</span>
              </div>
            </el-badge>
          </el-form-item>
          <el-form-item label=" " style="margin-top: 20px;">
            <el-button type="primary" class="part-button"><i class="el-icon-caret-top"></i>&nbsp;上移</el-button>
            <el-button type="primary" class="part-button"><i class="el-icon-caret-bottom"></i>&nbsp;下移</el-button>
            <el-button type="danger" @click="onSubmit()" class="part-button"><i class="el-icon-remove-outline"></i>&nbsp;删除
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--      <el-form :rules="goodsSearchRules" :inline="true" :model="info" ref="info" class="demo-form-inline">-->
      <!--        <el-form-item label="元素标识" prop="elementLogo">-->
      <!--          <el-input v-model="info.elementLogo" maxlength="30" placeholder="请输入元素标识"-->
      <!--                    class="part-button"></el-input>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item label="元素名称" prop="elementName">-->
      <!--          <el-input v-model="info.elementName" maxlength="30" placeholder="请输入元素名称"-->
      <!--                    class="part-button"></el-input>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item label="元素类型" prop="typeId">-->
      <!--          <el-select v-model="info.typeId" placeholder="请选择元素类型" class="part-button">-->
      <!--            <el-option label="请选择" value=""></el-option>-->
      <!--            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName"-->
      <!--                       :value="item.id"></el-option>-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item label="默认内容" prop="elementJson">-->
      <!--          <el-input type="textarea" v-model="info.elementJson" :show-word-limit="true" maxlength="1000"-->
      <!--                    resize="none" rows="5" placeholder="请输入默认内容(json格式)" class="part-button"></el-input>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item label="元素状态" prop="elementStatus">-->
      <!--          <el-select v-model="info.elementStatus" placeholder="请选择元素状态" class="part-button">-->
      <!--            <el-option label="正常" value="1"></el-option>-->
      <!--            <el-option label="禁用" value="0"></el-option>-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item label=" ">-->
      <!--          <el-button type="danger" @click="onSubmit()" class="part-button" plain>删除</el-button>-->
      <!--        </el-form-item>-->
      <!--      </el-form>-->
    </el-main>
  </div>
</template>
<script file="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'store-main-part',
    data () {
      return {
        loading: false,
        partIndex: 0,
        partList: [],
        goodsSearchRules: {
          elementLogo: [
            {required: true, message: '请输入元素标识', trigger: 'blur'},
            {file: 'string', min: 1, max: 30, message: '元素标识长度为1-30个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.loadPart()
    },
    mounted () {
    },
    methods: {
      loadPart () {
        this.partIndex = parseInt(this.$cookies.get('store_main_part_index'))
        this.partList = this.$part.getPartList()
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      onSubmit () {
        this.$refs['info'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/manage/applet/page/updateAppletPageElement',
              method: 'post',
              data: this.info
            }).then(res => {
              let that = this
              res.data.code === '1' ? this.$message.success({
                message: res.data.data, duration: 1000, onClose: function () {
                  that.$emit('refreshSet')
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
