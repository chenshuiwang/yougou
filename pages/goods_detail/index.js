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
  }
})