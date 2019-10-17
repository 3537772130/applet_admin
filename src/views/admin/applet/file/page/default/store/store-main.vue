<style file="text/css">
  @import "../../../../../../../../static/css/page/default/default.css";
  @import "../../../../../../../../static/css/page/default/store/store-main.css";
</style>
<template>
  <div style="text-align: left;">
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div class="left-menu" :style="{height: contentHeight + 'px'}">
        <div v-for="(item1, index1) in list" :key="index1">
          <el-divider content-position="left">{{item1.name}}</el-divider>
          <div v-for="(item2, index2) in item1.list" :key="index2" class="style-choose">
            <div @click="addContentList(item2.id)" class="box">
              <div class="wrap">{{item2.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-menu" :style="{height: contentHeight + 'px'}">
        <el-image src="/static/images/timg.jpg" class="center-img"></el-image>
        <div class="center-content">
          <div class="components">
            <div class="goods-search">
              <div class="search-part">
                <i class="el-icon-search"></i>搜索商品
              </div>
            </div>
            <div class="img-carousel">
              <el-carousel :interval="3000" arrow="never" height="150px">
                <el-carousel-item>
                  <el-image class="image" src="/static/images/carousel/carousel-1.png"></el-image>
                </el-carousel-item>
                <el-carousel-item>
                  <el-image class="image" src="/static/images/carousel/carousel-2.png"></el-image>
                </el-carousel-item>
                <el-carousel-item>
                  <el-image class="image" src="/static/images/carousel/carousel-3.png"></el-image>
                </el-carousel-item>
                <el-carousel-item>
                  <el-image class="image" src="/static/images/carousel/carousel-4.png"></el-image>
                </el-carousel-item>
                <el-carousel-item>
                  <el-image class="image" src="/static/images/carousel/carousel-5.png"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="text-move">
              <div class="text-content">
                轰烈流沙枕上白发,杯中酒比划,年少风雅鲜衣怒马,也不过一刹那,难免疏漏儿时檐下,莫测变化,隔却山海,转身时从容煎茶。
              </div>
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
            <div class="type-frame">
              <div class="type-element">
                <div>
                  <el-image class="type-icon" src="/static/images/icon/shopping.png"></el-image>
                </div>
                <span class="type-name">type1</span>
              </div>
              <div class="type-element">
                <div>
                  <el-image class="type-icon" src="/static/images/icon/shopping.png"></el-image>
                </div>
                <span class="type-name">type2</span>
              </div>
              <div class="type-element">
                <div>
                  <el-image class="type-icon" src="/static/images/icon/shopping.png"></el-image>
                </div>
                <span class="type-name">type3</span>
              </div>
              <div class="type-element">
                <div>
                  <el-image class="type-icon" src="/static/images/icon/shopping.png"></el-image>
                </div>
                <span class="type-name">type4</span>
              </div>
              <div class="type-element">
                <div>
                  <el-image class="type-icon" src="/static/images/icon/shopping.png"></el-image>
                </div>
                <span class="type-name">type5</span>
              </div>
              <div class="type-element">
                <div>
                  <el-image class="type-icon" src="/static/images/icon/shopping.png"></el-image>
                </div>
                <span class="type-name">type6</span>
              </div>
              <div class="type-element">
                <div>
                  <el-image class="type-icon" src="/static/images/icon/shopping.png"></el-image>
                </div>
                <span class="type-name">type7</span>
              </div>
            </div>
            <div class="img-title">
              <el-image src="/static/images/icon/shopping.png" class="img-title-image"></el-image>
              <span class="img-title-text">拼团更实惠<span> | <span>团购促销，多买多降</span></span></span>
            </div>
            <div class="img-ordinary">
              <el-image class="image" src="/static/images/carousel/carousel-6.png"></el-image>
            </div>
            <div class="goods-two-row">
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥188.88</div>
                <div class="goods-name">goods-name1发送飒飒大师sd水电费阿斯顿撒</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥13288.88-13288.88</div>
                <div class="goods-name">goods-name2</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥1088.88-1088.88</div>
                <div class="goods-name">goods-name3</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥98.88</div>
                <div class="goods-name">goods-name4</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥18.88</div>
                <div class="goods-name">goods-name5</div>
              </div>
            </div>
            <div class="divider-title">
              <div class="divider-line"></div>
              <span class="c-divider">分割线标题</span>
            </div>
            <div class="goods-three-row">
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥188.88<span>-388.88</span></div>
                <div class="goods-name">goods-name1发送飒飒大师水电费阿斯顿撒</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥13288.88-13288.88</div>
                <div class="goods-name">goods-name2</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥1088.88-1088.88</div>
                <div class="goods-name">goods-name3</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥98.88</div>
                <div class="goods-name">goods-name4</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥168.88</div>
                <div class="goods-name">goods-name5</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥2388.88</div>
                <div class="goods-name">goods-name6</div>
              </div>
              <div class="goods-def">
                <div>
                  <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                </div>
                <div class="goods-price">￥388.88</div>
                <div class="goods-name">goods-name7</div>
              </div>
            </div>
            <div class="bscroll imgX-scroll" ref="imgXScroll">
              <div class="bscroll-container" :style="imgXScrollStyle">
                <el-image class="image" src="/static/images/carousel/carousel-1.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-2.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-3.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-4.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-5.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-6.png"></el-image>
              </div>
            </div>
            <div class="bscroll imgY-scroll" ref="imgYScroll">
              <div class="bscroll-container" :style="imgYScrollStyle">
                <el-image class="image" src="/static/images/carousel/carousel-1.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-2.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-3.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-4.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-5.png"></el-image>
                <el-image class="image" src="/static/images/carousel/carousel-6.png"></el-image>
              </div>
            </div>
            <div class="bscroll goodsX-scroll" ref="goodsXScroll">
              <div class="bscroll-container" :style="goodsXScrollStyle">
                <div class="goods-def">
                  <div>
                    <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                  </div>
                  <div class="goods-price">￥188.88</div>
                  <div class="goods-name">goods-name1发送飒飒大师sd水电费阿斯顿撒水电费水电费</div>
                </div>
                <div class="goods-def">
                  <div>
                    <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                  </div>
                  <div class="goods-price">￥1888.88</div>
                  <div class="goods-name">goods-name2</div>
                </div>
                <div class="goods-def">
                  <div>
                    <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                  </div>
                  <div class="goods-price">￥10988.88</div>
                  <div class="goods-name">goods-name3</div>
                </div>
              </div>
            </div>
            <div class="goods-discount">
              <div class="text-title">
                <div>限时秒杀，过期不候</div>
              </div>
              <div class="bscroll goodsY-scroll" ref="goodsYScroll">
                <div class="bscroll-container" :style="goodsYScrollStyle">
                  <div class="goods-def">
                    <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                    <div>
                      <div class="goods-price">现价：<span>188.88</span></div>
                      <div class="goods-price">原价：<span
                        style="font-size: 14px;text-decoration:line-through;">188.88</span></div>
                      <div class="goods-name">goods-name1发送飒飒大师胜多负少水电费阿斯顿撒水电费水电费</div>
                      <div style="width:120px;height: 30px;display: inline-block;"></div>
                    </div>
                  </div>
                  <div class="goods-def">
                    <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                    <div>
                      <div class="goods-price">现价：<span>188.88</span></div>
                      <div class="goods-price">原价：<span
                        style="font-size: 14px;text-decoration:line-through;">188.88</span></div>
                      <div class="goods-name">goods-name2</div>
                      <div style="width:120px;height: 30px;display: inline-block;"></div>
                    </div>
                  </div>
                  <div class="goods-def">
                    <el-image class="goods-img" src="/static/images/goods/goods-1.png"></el-image>
                    <div>
                      <div class="goods-price">现价：<span>10588.88</span></div>
                      <div class="goods-price">原价：<span
                        style="font-size: 14px;text-decoration:line-through;">10988.88</span></div>
                      <div class="goods-name">goods-name3</div>
                      <div style="width:120px;height: 30px;display: inline-block;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script file="text/javascript">
  import {Loading} from 'element-ui'
  import BScroll from 'better-scroll'

  export default {
    name: 'applet-element',
    components: {},
    data () {
      return {
        contentHeight: `${document.documentElement.scrollHeight - 150}`,
        contentWidth: `${document.documentElement.scrollWidth}`,
        loading: false,
        list: [],
        contentList: [],
        coverWidth: 0,
        imgXScrollStyle: {},
        imgYScrollStyle: {},
        goodsXScrollStyle: {},
        goodsYScrollStyle: {},
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
        }
      }
    },
    created () {
      let pageId = this.$cookies.get('default_page_id')
      this.loadAppletElement(pageId)
    },
    mounted () {
      this._initScroll()
    },
    methods: {
      _initScroll () {
        let imgXLength = 6
        this.imgXScrollStyle = {
          'width': (240 * imgXLength) + 'px'
        }
        let imgYLength = 6
        this.imgYScrollStyle = {
          'width': (140 * imgYLength) + 'px'
        }
        let goodsXLength = 3
        this.goodsXScrollStyle = {
          'width': (220 * goodsXLength) + 'px'
        }
        let goodsYLength = 3
        this.goodsYScrollStyle = {
          'width': (270 * goodsYLength) + 'px'
        }
        this.$nextTick(() => {
          this.aBScroll = new BScroll(this.$refs.imgXScroll, {
            startX: 0,
            scrollX: true,
            click: true
          })
          this.aBScroll = new BScroll(this.$refs.imgYScroll, {
            startX: 0,
            scrollX: true,
            click: true
          })
          this.aBScroll = new BScroll(this.$refs.goodsXScroll, {
            startX: 0,
            scrollX: true,
            click: true
          })
          this.aBScroll = new BScroll(this.$refs.goodsYScroll, {
            startX: 0,
            scrollX: true,
            click: true
          })
        })
      },
      loadAppletElement (pageId) {
        if (pageId) {
          let loading = Loading.service({fullscreen: true, text: '正在提交'})
          this.$axios({
            url: '/api/manage/applet/page/loadPageElement',
            method: 'post',
            data: {pageId: pageId}
          }).then(res => {
            if (res.data.code === '1') {
              this.list = res.data.data
            }
            this.$global.exitLoad(this, loading, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, loading, '')
          })
        }
      },
      addContentList (id) {

      }
    }
  }
</script>
