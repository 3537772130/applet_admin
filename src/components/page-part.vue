<script type='text/javascript'>
  import BScroll from 'better-scroll'

  var storeList = [{
    'id': 'goods-search'
  }, {
    'id': 'img-carousel',
    'list': [
      '/static/images/carousel/carousel-1.png',
      '/static/images/carousel/carousel-2.png',
      '/static/images/carousel/carousel-3.png',
      '/static/images/carousel/carousel-4.png',
      '/static/images/carousel/carousel-5.png'
    ]
  }, {
    'id': 'notice-bar',
    'textContent': '轰烈流沙枕上白发,杯中酒比划,年少风雅鲜衣怒马,也不过一刹那,难免疏漏儿时檐下,莫测变化,隔却山海,转身时从容煎茶。'
  }, {
    'id': 'type-frame',
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
    'title': '拼团更实惠',
    'remark': '团购促销，多买多降',
    'icon': '/static/images/icon/shopping.png'
  }, {
    'id': 'img-title',
    'icon': '/static/images/carousel/carousel-6.png'
  }, {
    'id': 'divider-title',
    'title': '分割线标题'
  }, {
    'id': 'goods-two-row',
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
    'list': [
      '/static/images/carousel/carousel-1.png',
      '/static/images/carousel/carousel-2.png',
      '/static/images/carousel/carousel-3.png',
      '/static/images/carousel/carousel-4.png',
      '/static/images/carousel/carousel-5.png'
    ]
  }, {
    'id': 'imgY-scroll',
    'list': [
      '/static/images/carousel/carousel-1.png',
      '/static/images/carousel/carousel-2.png',
      '/static/images/carousel/carousel-3.png',
      '/static/images/carousel/carousel-4.png',
      '/static/images/carousel/carousel-5.png'
    ]
  }, {
    'id': 'goodsX-scroll',
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

  let getStore = function () {
    return storeList
  }

  let getStorePart = function (id) {
    let obj = storeList.find((item) => {
      return item.id === id
    })
    return obj
  }

  let _initScroll = function (that) {
    let part = getStorePart('imgX-scroll')
    if (part) {
      let imgXLength = part.list.length
      that.imgXScrollStyle = {
        'width': (240 * imgXLength) + 'px'
      }
      that.aBScroll = new BScroll(that.$refs.imgXScroll, {
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
      that.aBScroll = new BScroll(that.$refs.imgYScroll, {
        startX: 0,
        scrollX: true,
        click: true
      })
    }
    part = getStorePart('goodsX-scroll')
    if (part) {
      let goodsYLength = part.list.length
      that.goodsYScrollStyle = {
        'width': (220 * goodsYLength) + 'px'
      }
      that.aBScroll = new BScroll(that.$refs.goodsYScroll, {
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
      that.aBScroll = new BScroll(that.$refs.goodsXScroll, {
        startX: 0,
        scrollX: true,
        click: true
      })
    }
  }

  export default {
    getStore,
    getStorePart,
    _initScroll
  }
</script>
