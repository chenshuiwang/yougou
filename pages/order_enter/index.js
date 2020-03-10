import request from '../../utils/request.js'
Page({
  data: {
    address: {},
    goods: [],
    sumPrice: 0
  },
  // 获取地址
  onLoad() {
    this.setData({
      address: wx.getStorageSync("address") || {}
    })
    let goods = wx.getStorageSync("goods") || [];
    goods = goods.filter(v => {
      return v.select === true
    })
    this.setData({
      goods
    })
    this.handleAllPrice();
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
  // 点击结算
  pay(){
    const token = wx.getStorageSync("token");
    let {sumPrice,address,goods} = this.data;
    goods = goods.map(v => {
      return{
        goods_id: v.id,
        goods_number: v.number,
        goods_price: v.price
      }
    })
    if(token){
      request({
        url:'/my/orders/create',
        method: 'POST',
        header:{
          Authorization:token
        },
        data:{
          order_price:sumPrice,
          consignee_addr: address.name + address.tel + address.detail,
          goods
        }
      }).then(res => {
        console.log(res)
        if(res.data.meta.msg === "创建订单成功"){
          wx.showToast({
            title: '创建订单成功！',
          })
          let goods = wx.getStorageSync("goods")||[];
          let newGoods = goods.filter(v => {
            return !v.select
          })
          wx.setStorageSync("goods", newGoods)
          request({
            url:'/my/orders/req_unifiedorder',
            header: {
              Authorization: token
            },
            method:'POST',
            data:{
              order_number: res.data.message.order_number
            }
          }).then(res => {
            console.log(res)
            if (res.data.meta.msg === "预付订单生成成功"){
              const {pay} = res.data.message;
              wx.requestPayment(pay)
            }
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/auth/index'
      })
    }
  }
})