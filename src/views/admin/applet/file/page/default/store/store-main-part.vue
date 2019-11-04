<style file="text/css">
  @import "../../../../../../../../static/css/page/default/store/store-main-part.css";
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF; padding: 0px 20px;">
      <el-form class="demo-form-inline">
        <div class="store-main-part" v-for="(item, pIndex) in partList" :key="pIndex">
          <div v-if="partIndex === pIndex && item.id === 'notice-bar'">
            <el-form-item label="通知内容" prop="elementLogo">
              <el-input type="textarea" v-model="item.textContent" :show-word-limit="true" maxlength="60"
                        resize="none" rows="5" placeholder="请输入通知内容" class="part-input"></el-input>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'img-carousel'">
            <table>
              <tr v-for="(car, index) in item.list" :key="index">
                <td>
                  <el-form-item label="" style="margin-bottom: 0px;">
                    <el-badge value="×" class="item img-carousel-badge">
                      <el-image :src="car.icon" style="width: 244px;height: 95px;"></el-image>
                    </el-badge>
                  </el-form-item>
                </td>
                <td class="bind-goods">
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png" v-if="car.goodsId != ''"></el-image>
                  <div class="add-goods" v-if="car.goodsId === ''">
                    <el-image class="goods-icon" src="/static/images/icon/add.png"></el-image>
                    <div class="goods-text">绑定商品</div>
                  </div>
                </td>
              </tr>
              <tr v-if="item.list.length < 5">
                <td>
                  <el-form-item label=" ">
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
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'type-frame'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <el-badge value="×" class="item type-frame-badge" v-for="(type, index) in item.list" :key="index">
                <div class="type-element">
                  <div class="type-icon-div">
                    <el-image :src="type.icon" style="width: 40px;height: 40px;"></el-image>
                  </div>
                  <span class="type-name">{{type.name}}</span>
                </div>
              </el-badge>
              <el-badge value="" class="item type-frame-badge">
                <div class="type-element" v-if="item.list.length < 12">
                  <div class="type-icon-div">
                    <el-image src="/static/images/icon/add.png" style="width: 40px;height: 40px;"></el-image>
                  </div>
                  <span class="type-name" style="color: #cdcdcd;">添加</span>
                </div>
              </el-badge>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'img-text-title'">
            <el-form-item label="图标">
              <el-upload
                class="img-text-title-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="item.icon" :src="item.icon" class="img-text-title">
                <i v-else class="el-icon-plus img-text-title-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="item.title" maxlength="10" placeholder="请输入图文标题" class="part-input"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input v-model="item.describe" maxlength="10" placeholder="请输入图文标题" class="part-input"></el-input>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'img-title'">
            <table>
              <tr v-if="item.icon != ''">
                <td>
                  <el-form-item label="">
                    <el-badge value="×" class="item img-carousel-badge">
                      <el-image :src="item.icon" style="width: 244px;height: 95px;"></el-image>
                    </el-badge>
                  </el-form-item>
                </td>
                <td class="bind-goods">
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png" v-if="item.goodsId != ''"></el-image>
                  <div class="add-goods" style="top: -13px" v-if="item.goodsId === ''">
                    <el-image class="goods-icon" src="/static/images/icon/add.png"></el-image>
                    <div class="goods-text">绑定商品</div>
                  </div>
                </td>
              </tr>
              <tr v-if="item.icon === ''">
                <td>
                  <el-form-item label=" ">
                    <el-upload
                      class="img-title-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="img-title">
                      <i v-else class="el-icon-plus img-title-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'divider-title'">
            <el-form-item label="标题" prop="title">
              <el-input v-model="item.title" maxlength="12" placeholder="请输入标题" class="part-input"></el-input>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'goods-two-row'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <el-badge value="×" class="item goods-two-badge" v-for="(type, index) in item.list" :key="index">
                <div class="goods-element">
                  <div class="goods-icon-div">
                    <el-image :src="type.icon" style="width: 140px;height: 140px;"></el-image>
                  </div>
                  <div class="goods-name">{{type.name}}</div>
                </div>
              </el-badge>
              <el-badge value="" class="item goods-two-badge" style="top: -7px;">
                <div class="goods-element" v-if="item.list.length < 10">
                  <div class="goods-icon-div" style="width: 140px;height: 140px;line-height: 140px; margin: auto;">
                    <el-image src="/static/images/icon/add.png" style="width: 40px;height: 40px;margin: auto;"></el-image>
                  </div>
                  <span class="goods-name" style="color: #cdcdcd;text-align: center;">添加商品</span>
                </div>
              </el-badge>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'goods-three-row'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <el-badge value="×" class="item goods-three-badge" v-for="(type, index) in item.list" :key="index">
                <div class="goods-element">
                  <div class="goods-icon-div">
                    <el-image :src="type.icon" style="width: 95px;height: 95px;"></el-image>
                  </div>
                  <div class="goods-name">{{type.name}}</div>
                </div>
              </el-badge>
              <el-badge value="" class="item goods-three-badge" style="top: -10px;">
                <div class="goods-element" v-if="item.list.length < 12">
                  <div class="goods-icon-div" style="width: 95px;height: 95px;line-height: 95px; margin: auto;">
                    <el-image src="/static/images/icon/add.png" style="width: 40px;height: 40px;margin: auto;"></el-image>
                  </div>
                  <span class="goods-name" style="color: #cdcdcd;text-align: center;">添加商品</span>
                </div>
              </el-badge>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'imgX-scroll'">
            <table>
              <tr v-for="(img, index) in item.list" :key="index">
                <td>
                  <el-form-item label="" style="margin-bottom: 0px;">
                    <el-badge value="×" class="item imgX-scroll-badge">
                      <el-image :src="img.icon" style="width: 244px;height: 95px;border-radius: 5px;"></el-image>
                    </el-badge>
                  </el-form-item>
                </td>
                <td class="bind-goods">
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png" v-if="img.goodsId != ''"></el-image>
                  <div class="add-goods" v-if="img.goodsId === ''">
                    <el-image class="goods-icon" src="/static/images/icon/add.png"></el-image>
                    <div class="goods-text">绑定商品</div>
                  </div>
                </td>
              </tr>
              <tr v-if="item.list.length < 10">
                <td>
                  <el-form-item label=" " style="margin-bottom: 0px;">
                    <el-upload
                      class="imgX-scroll-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="imgX-scroll">
                      <i v-else class="el-icon-plus imgX-scroll-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'imgY-scroll'">
            <table>
              <tr style="width: 375px;" v-for="(img, index) in item.list" :key="index">
                <td>
                  <el-form-item label="" style="margin-bottom: 0px;text-align: center;">
                    <el-badge value="×" class="item imgY-scroll-badge" style="display: inline-block;">
                      <el-image :src="img.icon" style="width: 120px;height: 220px;border-radius: 5px;;"></el-image>
                    </el-badge>
                  </el-form-item>
                </td>
                <td class="bind-goods">
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png" v-if="img.goodsId != ''"></el-image>
                  <div class="add-goods" v-if="img.goodsId === ''">
                    <el-image class="goods-icon" src="/static/images/icon/add.png"></el-image>
                    <div class="goods-text">绑定商品</div>
                  </div>
                </td>
              </tr>
              <tr v-if="item.list.length < 10">
                <td>
                  <el-form-item label="" style="margin-bottom: 0px;text-align: center;">
                    <el-upload
                      class="imgY-scroll-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload" style="display: inline-block;" v-if="item.list.length < 10">
                      <img v-if="imageUrl" :src="imageUrl" class="imgY-scroll">
                      <i v-else class="el-icon-plus imgY-scroll-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
<!--            <el-form-item label="" style="margin-bottom: 0px; width: 375px;text-align: center;">-->
<!--              <el-badge value="×" class="item imgY-scroll-badge" style="display: inline-block;" v-for="(img, index) in item.list" :key="index">-->
<!--                <el-image :src="img" style="width: 120px;height: 220px;border-radius: 5px;;"></el-image>-->
<!--              </el-badge>-->
<!--              <el-badge value="" class="item imgY-scroll-badge">-->
<!--                <el-upload-->
<!--                  class="imgY-scroll-uploader"-->
<!--                  action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                  :show-file-list="false"-->
<!--                  :on-success="handleAvatarSuccess"-->
<!--                  :before-upload="beforeAvatarUpload" style="display: inline-block;" v-if="item.list.length < 10">-->
<!--                  <img v-if="imageUrl" :src="imageUrl" class="imgY-scroll">-->
<!--                  <i v-else class="el-icon-plus imgY-scroll-uploader-icon"></i>-->
<!--                </el-upload>-->
<!--              </el-badge>-->
<!--            </el-form-item>-->
          </div>
          <div v-if="partIndex === pIndex && item.id === 'goodsY-scroll'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <el-badge value="×" class="item goods-two-badge" v-for="(type, index) in item.list" :key="index">
                <div class="goods-element">
                  <div class="goods-icon-div">
                    <el-image :src="type.icon" style="width: 140px;height: 140px;"></el-image>
                  </div>
                  <div class="goods-name">{{type.name}}</div>
                </div>
              </el-badge>
              <el-badge value="" class="item goods-two-badge" style="position: relative;top: -7px;">
                <div class="goods-element" v-if="item.list.length < 10">
                  <div class="goods-icon-div" style="width: 140px;height: 140px;line-height: 140px; margin: auto;">
                    <el-image src="/static/images/icon/add.png" style="width: 40px;height: 40px;margin: auto;"></el-image>
                  </div>
                  <span class="goods-name" style="color: #cdcdcd;text-align: center;">添加商品</span>
                </div>
              </el-badge>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'goodsX-scroll'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <el-badge value="×" class="item goods-two-badge" v-for="(type, index) in item.list" :key="index">
                <div class="goods-element">
                  <div class="goods-icon-div">
                    <el-image :src="type.icon" style="width: 140px;height: 140px;"></el-image>
                  </div>
                  <div class="goods-name">{{type.name}}</div>
                </div>
              </el-badge>
              <el-badge value="" class="item goods-two-badge" style="position: relative;top: -7px;">
                <div class="goods-element" v-if="item.list.length < 10">
                  <div class="goods-icon-div" style="width: 140px;height: 140px;line-height: 140px; margin: auto;">
                    <el-image src="/static/images/icon/add.png" style="width: 40px;height: 40px;margin: auto;"></el-image>
                  </div>
                  <span class="goods-name" style="color: #cdcdcd;text-align: center;">添加商品</span>
                </div>
              </el-badge>
            </el-form-item>
          </div>
        </div>
        <el-form-item label=" " style="margin-top: 20px;">
          <div class="part-operation">
            <el-divider content-position="left">操作元素</el-divider>
            <el-button type="danger" class="part-button" @click="delElement()">
              <i class="el-icon-close"></i>&nbsp;删除</el-button>
          </div>
          <div class="part-operation">
            <el-divider content-position="left">移动元素</el-divider>
            <el-button type="success" class="part-button" @click="moveIndex(-1)">
              <i class="el-icon-caret-top"></i>&nbsp;上移</el-button>
            <el-button type="success" class="part-button" @click="moveIndex(1)">
              <i class="el-icon-caret-bottom"></i>&nbsp;下移</el-button>
          </div>
        </el-form-item>
      </el-form>
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
      },
      delElement(){
        this.$confirm('确定删除元素吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let list = []
          for (let i = 0; i < this.partList.length; i++){
            if (i != this.partIndex){
              list.push(this.partList[i])
            }
          }
          this.partIndex = null
          this.useElement(list, false, this.partIndex)
        })
      },
      moveIndex(num){
        if ((num < 0 && this.partIndex > 0) || (num > 0 && this.partIndex < (this.partList.length - 1))){
          let list = []
          let part1 = this.partList[this.partIndex]
          let part2 = this.partList[(num+this.partIndex)]
          for (let i = 0; i < this.partList.length; i++){
            let obj = {}
            if (this.partIndex === i){
              obj = part2
            } else if ((num+this.partIndex) === i) {
              obj = part1
            } else {
              obj = this.partList[i]
            }
            list.push(obj)
          }
          this.partIndex = this.partIndex + num
          this.useElement(list, true, this.partIndex)
        } else {
          this.$message.warning('不能再移动啦')
        }
      },
      useElement(list, bool, index){
        this.partList = list
        this.$part.setPartList(this.partList)
        this.$emit('refreshSet', bool, index)
      },
      refreshSet(){

      }
    }
  }
</script>
