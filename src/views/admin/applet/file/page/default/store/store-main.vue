<style file="text/css">
  @import "../../../../../../../../static/css/page/default/default.css";
  @import "../../../../../../../../static/css/page/default/store/store-main.css";
</style>
<template>
  <div style="text-align: left;">
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div class="config-operation">
        <el-button type="primary" @click="onSubmit()"><i class="el-icon-folder-checked"></i>&nbsp;保存配置</el-button>
        <el-button type="danger" @click="onSubmit()"><i class="el-icon-folder-delete"></i>&nbsp;取消配置</el-button>
      </div>
      <div class="left-menu" :style="{height: contentHeight + 'px'}">
        <div v-for="(item1, index1) in typeList" :key="index1">
          <el-divider content-position="left">{{item1.name}}</el-divider>
          <div v-for="(item2, index2) in item1.list" :key="index2" class="style-choose">
            <div @click="addPartList(item2.logo)" class="box">
              <div class="wrap">{{item2.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-menu" :style="{height: contentHeight + 'px'}">
        <el-image src="/static/images/timg.jpg" class="center-img"></el-image>

        <div class="center-content">
          <!--          <div class="components">-->
          <!--            <div class="bscroll imgX-scroll" ref="imgXScroll" @click="openDrawer(item.id)">-->
          <!--              <div class="bscroll-container" :style="imgXScrollStyle">-->
          <!--                <el-image class="image" src="/static/images/carousel/carousel-1.png"></el-image>-->
          <!--                <el-image class="image" src="/static/images/carousel/carousel-2.png"></el-image>-->
          <!--                <el-image class="image" src="/static/images/carousel/carousel-3.png"></el-image>-->
          <!--                <el-image class="image" src="/static/images/carousel/carousel-4.png"></el-image>-->
          <!--                <el-image class="image" src="/static/images/carousel/carousel-5.png"></el-image>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="components" v-for="(item,partIndex) in partList" :key="partIndex">
            <div class="goods-search" @click="openDrawer(item.id, item.name)" v-if="item.id === 'goods-search'">
              <div class="search-part">
                <i class="el-icon-search"></i>搜索商品
              </div>
            </div>
            <div class="img-carousel" @click="openDrawer(item.id, item.name)" v-if="item.id === 'img-carousel'">
              <el-carousel :interval="3000" arrow="never" height="150px">
                <el-carousel-item v-for="(car,index) in item.list" :key="index">
                  <el-image class="image" :src="car"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="notice-bar" @click="openDrawer(item.id, item.name)" v-if="item.id === 'notice-bar'">
              <div class="text-content">{{item.textContent}}</div>
              <div :style="moveCoverStyle">
                <div class="cover-left" :style="cover_1">
                  <div></div>
                </div>
                <div :style="cover_2"></div>
                <div class="cover-right" :style="cover_1">
                  <div></div>
                </div>
              </div>
              <el-image class="text-trumpet" src="/static/images/icon/trumpet.png"></el-image>
            </div>
            <div class="type-frame" @click="openDrawer(item.id, item.name)" v-if="item.id === 'type-frame'">
              <div class="type-element" v-for="(type,index) in item.list" :key="index">
                <div>
                  <el-image class="type-icon" :src="type.icon"></el-image>
                </div>
                <span class="type-name">{{type.name}}</span>
              </div>
            </div>
            <div class="img-text-title" @click="openDrawer(item.id, item.name)" v-if="item.id === 'img-text-title'">
              <el-image :src="item.icon" class="img-text-title-image"></el-image>
              <span class="img-text-title-text">
                {{item.title}}
                <span v-if="item.remark != ''"> | <span>{{item.remark}}</span></span>
              </span>
            </div>
            <div class="img-title" @click="openDrawer(item.id, item.name)" v-if="item.id === 'img-title'">
              <el-image class="image" :src="item.icon"></el-image>
            </div>
            <div class="goods-two-row" @click="openDrawer(item.id, item.name)" v-if="item.id === 'goods-two-row'">
              <div class="goods-def" v-for="(goods,index) in item.list" :key="index">
                <div>
                  <el-image class="goods-img" :src="goods.icon"></el-image>
                </div>
                <div class="goods-price">
                  &yen;{{goods.minPrice|addZero}}
                  <span v-if="goods.minPrice < goods.maxPrice">-{{goods.maxPrice|addZero}}</span>
                </div>
                <div class="goods-name">{{goods.name}}</div>
              </div>
            </div>
            <div class="divider-title" @click="openDrawer(item.id, item.name)" v-if="item.id === 'divider-title'">
              <div class="divider-line"></div>
              <span class="c-divider">{{item.title}}</span>
            </div>
            <div class="goods-three-row" @click="openDrawer(item.id, item.name)" v-if="item.id === 'goods-three-row'">
              <div class="goods-def" v-for="(goods, index) in item.list" :key="index">
                <div>
                  <el-image class="goods-img" :src="goods.icon"></el-image>
                </div>
                <div class="goods-price">
                  &yen;{{goods.minPrice|addZero}}
                  <span v-if="goods.minPrice < goods.maxPrice">-{{goods.maxPrice|addZero}}</span>
                </div>
                <div class="goods-name">{{goods.name}}</div>
              </div>
            </div>
            <div class="bscroll imgX-scroll" ref="imgXScroll" @click="openDrawer(item.id, item.name)"
                 v-if="item.id === 'imgX-scroll'">
              <div class="bscroll-container" :style="imgXScrollStyle">
                <el-image class="image" v-for="(img, index) in item.list" :key="index" :src="img"></el-image>
              </div>
            </div>
            <div class="bscroll imgY-scroll" ref="imgYScroll" @click="openDrawer(item.id, item.name)"
                 v-if="item.id === 'imgY-scroll'">
              <div class="bscroll-container" :style="imgYScrollStyle">
                <el-image class="image" v-for="(img, index) in item.list" :key="index" :src="img"></el-image>
              </div>
            </div>
            <div class="bscroll goodsY-scroll" ref="goodsYScroll" @click="openDrawer(item.id, item.name)"
                 v-if="item.id === 'goodsY-scroll'">
              <div class="bscroll-container" :style="goodsYScrollStyle">
                <div class="goods-def" v-for="(goods, index) in item.list" :key="index">
                  <div>
                    <el-image class="goods-img" :src="goods.icon"></el-image>
                  </div>
                  <div class="goods-price">
                    &yen;{{goods.minPrice|addZero}}
                    <span v-if="goods.minPrice < goods.maxPrice">-{{goods.maxPrice|addZero}}</span>
                  </div>
                  <div class="goods-name">{{goods.name}}</div>
                </div>
              </div>
            </div>
            <div class="goods-discount" @click="openDrawer(item.id, item.name)" v-if="item.id === 'goods-discount'">
              <div class="text-title">
                <div class="text">{{item.title}}</div>
                <div class="more">更多&nbsp;>></div>
              </div>
              <div class="bscroll goodsX-scroll" ref="goodsXScroll">
                <div class="bscroll-container" :style="goodsXScrollStyle">
                  <div class="goods-def" v-for="(goods, index) in item.list" :key="index">
                    <el-image class="goods-img" :src="goods.icon"></el-image>
                    <div>
                      <div class="goods-price">现价：<span>{{goods.newPrice|addZero}}</span></div>
                      <div class="goods-price">原价：<span
                        style="font-size: 14px;text-decoration:line-through;">{{goods.oldPrice|addZero}}</span></div>
                      <div class="goods-name">{{goods.name}}</div>
                      <div style="width:120px;height: 30px;display: inline-block;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-drawer
        :title="drawerTitle"
        :visible.sync="drawer"
        direction="rtl"
        :modal="false"
        :before-close="handleClose">
        <el-scrollbar :style="drawerstyle">
          <StoreMainPart ref="StoreMainPart" v-on:refreshSet="refreshSet"></StoreMainPart>
        </el-scrollbar>
      </el-drawer>
    </el-main>
  </div>
</template>
<script file="text/javascript">
  import {Loading} from 'element-ui'
  // import BScroll from 'better-scroll'
  import StoreMainPart from '@/views/admin/applet/file/page/default/store/store-main-part.vue'

  export default {
    name: 'applet-element',
    components: {
      'StoreMainPart': StoreMainPart
    },
    data () {
      return {
        contentHeight: `${document.documentElement.scrollHeight - 150}`,
        contentWidth: `${document.documentElement.scrollWidth}`,
        loading: false,
        typeList: [],
        partList: [],
        coverWidth: 0,
        imgXScrollStyle: {},
        imgYScrollStyle: {},
        goodsYScrollStyle: {},
        goodsXScrollStyle: {},
        moveCoverStyle: {
          'width': `${document.documentElement.scrollWidth}` + 'px',
          'height': '30px',
          'position': 'relative',
          'left': (0 - (`${(document.documentElement.scrollWidth - 395) / 2}`)) + 'px',
          'top': '-30px',
          'text-align': 'left'
        },
        cover_1: {
          'width': (`${(document.documentElement.scrollWidth - 385) / 2 - 16}`) + 'px',
          'height': '30px',
          'display': 'inline-block',
          'background-color': '#FFFFFF'
        },
        cover_2: {
          'width': '377px',
          'height': '30px',
          'display': 'inline-block',
          'margin-left': '5px',
          'margin-right': '7px'
        },
        drawer: false,
        drawerTitle: '',
        drawerstyle: {}
      }
    },
    created () {
      let pageId = this.$cookies.get('default_page_id')
      this.loadAppletElement(pageId)
      let height = document.getElementById('app').offsetHeight
      this.drawerstyle = {
        'overflow': 'scroll',
        'height': (height - 50) + 'px'
      }
    },
    mounted () {

    },
    methods: {
      loadAppletElement (pageId) {
        if (pageId) {
          let loading = Loading.service({fullscreen: true, text: '正在加载'})
          this.$axios({
            url: '/api/manage/applet/page/loadPageElement',
            method: 'post',
            data: {pageId: pageId}
          }).then(res => {
            if (res.data.code === '1') {
              this.typeList = res.data.data
              this.partList = this.$part.getStoreList()
              this.$part.setPartList(this.partList)
              this.$part._initStoreScroll(this)

              // let part = this.$part.getStorePart('imgX-scroll')
              // if (part) {
              //   let imgXLength = part.list.length
              //   this.imgXScrollStyle = {
              //     'width': (240 * imgXLength) + 'px'
              //   }
              //   this.aBScroll = new BScroll(this.$refs.imgXScroll, {
              //     startX: 0,
              //     scrollX: true,
              //     click: true
              //   })
              // }
            }
            this.$global.exitLoad(this, loading, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, loading, '')
          })
        }
      },
      addPartList (logo) {
        let part = this.$part.getStorePart(logo)
        if (part) {
          let list = this.partList
          let limit = true
          //滑块part只允许添加一次，超出无效
          for (let i = 0; i < list.length; i++) {
            if (part.id === list[i].id) {
              if ('imgX-scroll,imgY-scroll,goodsY-scroll,goods-discount'.indexOf(part.id) >= 0) {
                limit = false
                this.$message.warning('相同滑块只能被添加一次哦')
              }
              break
            }
          }
          if (limit) {
            list.push(part)
          }
        } else {
          this.$message.warning('元素不存在')
        }
      },
      openDrawer (id, title) {
        // let obj = this.partList.find((item) => {
        //   return item.id === id
        // })
        for (let i = 0; i < this.partList.length; i++) {
          if (this.partList[i].id === id) {
            this.$cookies.set('store_main_part_index', i)
            this.drawer = true
            this.drawerTitle = title
            try{
              this.$refs.StoreMainPart.loadPart()
            } catch (e) {

            }
            break
          }
        }
      },
      handleClose (done) {
        done()
      },
      refreshSet () {

      }
    }
  }
</script>
