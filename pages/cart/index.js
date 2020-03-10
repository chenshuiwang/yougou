Page({
  data: {
    address: {},
    goods: [],
    sumPrice: 0,
    selectAll: false,
    jiesuan: 0
  },
  // 获取地址
  getAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          address: {
            name: res.userName,
            number: res.telNumber,
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        wx.setStorageSync("address", this.data.address)
      }
    })
  },
  onLoad() {
    this.setData({
      address: wx.getStorageSync("address") || {}
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
        cartCount: (wx.getStorageSync("goods") || []).length
      })
    }
    let goods = wx.getStorageSync("goods") || [];
    let select = goods.some(v => {
      return !v.select
    })
    let num1 = 0
    goods.forEach(v => {
      if (v.select === true) {
        num1 += 1;
      }
    })
    this.setData({
      goods,
      selectAll: !select,
      jiesuan: num1
    })
    this.handleAllPrice();
  },
  // 加减数量
  caculate(e) {
    const {
      number,
      index
    } = e.target.dataset;
    this.data.goods[index].number += number;
    if (this.data.goods[index].number === 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        success: (res) => {
          if (res.confirm) {
            this.data.goods.splice(index, 1);
          } else if (res.cancel) {
            this.data.goods[index].number += 1;
          }
          this.setData({
            goods: this.data.goods
          })
        }
      })
    }
    this.setData({
      goods: this.data.goods
    })
    this.handleAllPrice();
    wx.setStorageSync("goods", this.data.goods)
  },
  handleAllPrice() {
    let price = 0
    for (let i = 0; i < this.data.goods.length; i++) {
      if (this.data.goods[i].select === true) {
        price += this.data.goods[i].number * this.data.goods[i].price
      }
    }
    this.setData({
      sumPrice: Number(price).toFixed(2)
    })
  },
  // 输入框编辑数量
  editNumber(e) {
    const {
      index
    } = e.target.dataset
    if (isNaN(e.detail.value) || e.detail.value < 1) {

    } else {
      this.data.goods[index].number = +e.detail.value;
    }
    this.setData({
      goods: this.data.goods
    })
    this.handleAllPrice();
  },
  // 全选商品
  selectAll() {
    let num1 = 0;
    this.setData({
      selectAll: !this.data.selectAll
    })
    this.data.goods.forEach(v => {
      v.select = this.data.selectAll;
      if (v.select === true) {
        num1 += 1;
      }
    })
    this.setData({
      goods: this.data.goods,
      jiesuan: num1
    })
    this.handleAllPrice();
    wx.setStorageSync("goods", this.data.goods)
  },
  // 选择单个商品
  selectOne(e) {
    let num1 = 0;
    this.data.goods[e.target.dataset.index].select = !this.data.goods[e.target.dataset.index].select;
    const select = this.data.goods.some(v => {
      return !v.select
    })
    this.data.goods.forEach(v => {
      if (v.select === true) {
        num1 += 1;
      }
    })
    this.setData({
      goods: this.data.goods,
      selectAll: !select,
      jiesuan: num1
    })
    this.handleAllPrice();
    wx.setStorageSync("goods", this.data.goods)
  },
  jiesuan() {
    let address = wx.getStorageSync("address");
    console.log(address)
    if (this.data.jiesuan === 0) {
      wx.showToast({
        title: '你还没选择宝贝哦',
        icon: 'cancel'
      })
      return;
    }
    if (!address) {
      wx.showToast({
        title: '未选择收货地址',
        icon: 'cancel'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/order_enter/index',
    })
  }
})