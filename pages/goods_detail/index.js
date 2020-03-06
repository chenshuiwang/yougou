// pages/goods_detail/index.js
import request from '../../utils/request.js'
Page({
  data: {
    goods:{},
    tabIndex: 0,
    urls:[]
  },
  onLoad(options){
    request({
      url:'/goods/detail',
      data:{
        goods_id:options.id||8888
      }
    }).then(res =>{
      console.log(res)
      const urls = res.data.message.pics.map(v => {
        return v.pics_big
      })
      this.setData({
        goods:res.data.message,
        urls
      })
    })
  },
  handleTab(e){
    this.setData({
      tabIndex: e.target.dataset.index
    })
  },
  previewImage(e){
    const urls = this.data.urls;
    wx.previewImage({
      current: urls[e.target.dataset.index], 
      urls
    })
  },
  toCart(){
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  addCart(){
    let goods = wx.getStorageSync("goods")||[];
    console.log(goods)
    let index = goods.some(v => {
      const isExit =  this.data.goods.goods_id === v.id;
      console.log(this.data.goods.goods_id);
      console.log(v.id)
      if(isExit){
        v.number += 1;
        wx.showModal({
          title: '数量加一',
          icon: 'success'
        })
      }
      return isExit;
    })
    console.log(index)
    if(!index){
      goods.unshift({
        id: this.data.goods.goods_id,
        name: this.data.goods.goods_name,
        logo: this.data.goods.goods_small_logo,
        price: Number(this.data.goods.goods_price).toFixed(2),
        number: 1
      })
    }
    wx.setStorageSync("goods", goods)
  }
})