<script type='text/javascript'>
  import BScroll from 'better-scroll'

  var partList = []

  var storeList = [{
    'id': 'goods-search',
    'name': '搜索栏'
  }, {
    'id': 'img-carousel',
    'name': '轮播图',
    'list': [
      '/static/images/carousel/carousel-1.png',
      '/static/images/carousel/carousel-2.png',
      '/static/images/carousel/carousel-3.png',
      '/static/images/carousel/carousel-4.png',
      '/static/images/carousel/carousel-5.png'
    ]
  }, {
    'id': 'notice-bar',
    'name': '通知栏',
    'textContent': '轰烈流沙枕上白发,杯中酒比划,年少风雅鲜衣怒马,也不过一刹那,难免疏漏儿时檐下,莫测变化,隔却山海,转身时从容煎茶。嗯哼'
  }, {
    'id': 'type-frame',
    'name': '分类栏',
    'list': [{
      'id': '0',
      'name': 'type1',
      'icon': '/static/images/icon/shopping.png'
    }, {
      'id': '0',
      'name': 'type2',
      'icon': '/static/images/icon/shopping.png'
    }, {
      'id': '0',
      'name': 'type3',
      'icon': '/static/images/icon/shopping.png'
    }, {
      'id': '0',
      'name': 'type4',
      'icon': '/static/images/icon/shopping.png'
    }, {
      'id': '0',
      'name': 'type5',
      'icon': '/static/images/icon/shopping.png'
    }, {
      'id': '0',
      'name': 'type6',
      'icon': '/static/images/icon/shopping.png'
    }]
  }, {
    'id': 'img-text-title',
    'name': '图文标题',
    'title': '拼团更实惠',
    'remark': '团购促销，多买多降',
    'icon': '/static/images/icon/shopping.png'
  }, {
    'id': 'img-title',
    'name': '图片标题',
    'icon': '/static/images/carousel/carousel-6.png'
  }, {
    'id': 'divider-title',
    'name': '分隔符标题',
    'title': '分隔符标题'
  }, {
    'id': 'goods-two-row',
    'name': '推荐商品（双排）',
    'list': [{
      'id': '0',
      'name': 'goods-name1发送飒飒大师师傅三水电费阿斯顿撒',
      'minPrice': '88.88',
      'maxPrice': '166.99',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name2',
      'minPrice': '9888.88',
      'maxPrice': '13288.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name3',
      'minPrice': '9888.88',
      'maxPrice': '13288.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name4',
      'minPrice': '688.88',
      'maxPrice': '888.88',
      'icon': '/static/images/goods/goods-1.png'
    }]
  }, {
    'id': 'goods-three-row',
    'name': '推荐商品（三排）',
    'list': [{
      'id': '0',
      'name': 'goods-name1发送飒飒大师师傅三水电费阿斯顿撒',
      'minPrice': '88.88',
      'maxPrice': '166.99',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name2',
      'minPrice': '9888.88',
      'maxPrice': '13288.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name3',
      'minPrice': '9888.88',
      'maxPrice': '13288.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name4',
      'minPrice': '688.88',
      'maxPrice': '888.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name5',
      'minPrice': '18.00',
      'maxPrice': '78.00',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name6',
      'minPrice': '66.30',
      'maxPrice': '0.00',
      'icon': '/static/images/goods/goods-1.png'
    }]
  }, {
    'id': 'imgX-scroll',
    'name': '图片滑块（横）',
    'list': [
      '/static/images/carousel/carousel-1.png',
      '/static/images/carousel/carousel-2.png',
      '/static/images/carousel/carousel-3.png',
      '/static/images/carousel/carousel-4.png',
      '/static/images/carousel/carousel-5.png'
    ]
  }, {
    'id': 'imgY-scroll',
    'name': '图片滑块（竖）',
    'list': [
      '/static/images/carousel/carousel-1.png',
      '/static/images/carousel/carousel-2.png',
      '/static/images/carousel/carousel-3.png',
      '/static/images/carousel/carousel-4.png',
      '/static/images/carousel/carousel-5.png'
    ]
  }, {
    'id': 'goodsY-scroll',
    'name': '商品滑块（普通）',
    'list': [{
      'id': '0',
      'name': 'goods-name1发送飒飒大师师傅三水电费阿斯顿撒',
      'minPrice': '88.88',
      'maxPrice': '166.99',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name2',
      'minPrice': '9888.88',
      'maxPrice': '13288.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name3',
      'minPrice': '9888.88',
      'maxPrice': '13288.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name4',
      'minPrice': '688.88',
      'maxPrice': '888.88',
      'icon': '/static/images/goods/goods-1.png'
    }]
  }, {
    'id': 'goods-discount',
    'name': '商品滑块（折扣）',
    'title': '限时秒杀，过期不候',
    'list': [{
      'id': '0',
      'name': 'goods-name1发送飒飒大师师傅三水电费阿斯顿撒',
      'newPrice': '88.88',
      'oldPrice': '166.99',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name2',
      'newPrice': '9888.88',
      'oldPrice': '13288.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name3',
      'newPrice': '9888.88',
      'oldPrice': '13288.88',
      'icon': '/static/images/goods/goods-1.png'
    }, {
      'id': '0',
      'name': 'goods-name4',
      'newPrice': '688.88',
      'oldPrice': '888.88',
      'icon': '/static/images/goods/goods-1.png'
    }]
  }]

  let getPartList = function(){
    return partList
  }

  let setPartList = function(list){
    partList = list
  }

  let getStoreList = function () {
    return storeList
  }

  let setStoreList = function(list){
    storeList = list
  }

  let getStorePart = function (id) {
    let obj = storeList.find((item) => {
      return item.id === id
    })
    return obj
  }

  let _initStoreScroll = function (that) {
    try{
      that.$nextTick(() => {
        let part = getStorePart('imgX-scroll')
        if (part) {
          let imgXLength = part.list.length
          that.imgXScrollStyle = {
            'width': (240 * imgXLength) + 'px'
          }
          that.aBScroll = new BScroll(that.$refs.imgXScroll[0], {
            startX: 0,
            scrollX: true,
            click: true
          })
        }
        part = getStorePart('imgY-scroll')
        if (part) {
          let imgYLength = part.list.length
          that.imgYScrollStyle = {
            'width': (140 * imgYLength) + 'px'
          }
          that.aBScroll = new BScroll(that.$refs.imgYScroll[0], {
            startX: 0,
            scrollX: true,
            click: true
          })
        }
        part = getStorePart('goodsY-scroll')
        if (part) {
          let goodsYLength = part.list.length
          that.goodsYScrollStyle = {
            'width': (220 * goodsYLength) + 'px'
          }
          that.aBScroll = new BScroll(that.$refs.goodsYScroll[0], {
            startX: 0,
            scrollX: true,
            click: true
          })
        }
        part = getStorePart('goods-discount')
        if (part) {
          let goodsXLength = part.list.length
          that.goodsXScrollStyle = {
            'width': (270 * goodsXLength) + 'px'
          }
          that.aBScroll = new BScroll(that.$refs.goodsXScroll[0], {
            startX: 0,
            scrollX: true,
            click: true
          })
        }
      })
    }catch (e) {
      console.info('错误信息：', e)
    }
  }

  export default {
    getPartList,
    setPartList,
    getStoreList,
    setStoreList,
    getStorePart,
    _initStoreScroll
  }
</script>
