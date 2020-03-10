Component({
  data: {
    selected: 0,
    "color": "#000000",
    "selectedColor": "#ff2d4a",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "../images/icon_home@3x.png",
        "selectedIconPath": "../images/icon_home_active@3x.png"
      },
      {
        "pagePath": "/pages/category/index",
        "text": "分类",
        "iconPath": "../images/icon_category@3x.png",
        "selectedIconPath": "../images/icon_category_active@3x.png"
      },
      {
        "pagePath": "/pages/cart/index",
        "text": "购物车",
        "iconPath": "../images/icon_cart@3x.png",
        "selectedIconPath": "../images/icon_cart_active@3x.png"
      },
      {
        "pagePath": "/pages/personal/index",
        "text": "我的",
        "iconPath": "../images/icon_me@3x.png",
        "selectedIconPath": "../images/icon_me_active@3x.png"
      }
    ],
    cartCount: (wx.getStorageSync("goods") || []).length
  },
  attached() {
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show:  () => { 
      console.log(212)
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})