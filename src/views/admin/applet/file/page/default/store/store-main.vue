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
          <div>
            <el-divider content-position="center"><span class="c-divider">分割线标题</span></el-divider>
          </div>
          <div class="img-title">
            <el-image src="/static/images/icon/shopping.png" class="img-title-image"></el-image>
            <span class="img-title-text">拼团更实惠<span> | <span>团购促销，多买多降</span></span></span>
          </div>
          <div class="img-carousel">
            <el-carousel :interval="3000" arrow="never" height="220px" indicator-position="none">
              <el-carousel-item>
                <img src="/static/images/carousel/zhao-shang.png" style="width: 100%;height: 220px;">
              </el-carousel-item>
              <el-carousel-item>
                <img src="/static/images/carousel/zhe-shang.png" style="width: 100%;height: 220px;">
              </el-carousel-item>
              <el-carousel-item>
                <img src="/static/images/carousel/zhong-guo.png" style="width: 100%;height: 220px;">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="img-ordinary">
            <el-image src="/static/images/carousel/zhong-guo.png" style="width: 100%;height: 140px;"></el-image>
          </div>
          <div class="text-move">
            <div class="text-content"
                 style="transition: transform 13542ms linear 0ms;transform: translateX(-541.68px);transform-origin: 50% 50% 0px;">
              轰烈流沙枕上白发,杯中酒比划,年少风雅鲜衣怒马,也不过一刹那,难免疏漏儿时檐下,莫测变化,隔却山海,转身时从容煎茶。
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script file="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-element',
    data () {
      return {
        contentHeight: `${document.documentElement.scrollHeight - 150}`,
        loading: false,
        list: [],
        contentList: [],
        trans: 0
      }
    },
    created () {
      let pageId = this.$cookies.get('default_page_id')
      this.loadAppletElement(pageId)
    },
    mounted () {
    },
    methods: {
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
      addContentList (id){

      }
    }
  }
</script>
