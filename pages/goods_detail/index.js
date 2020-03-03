// pages/goods_detail/index.js
import request from '../../utils/request.js'
Page({
  data: {
    goods:{}
  },
  onLoad(options){
    request({
      url:'/goods/detail',
      data:{
        goods_id:options.id||8888
      }
    }).then(res =>{
      console.log(res)
      this.setData({
        goods:res.data.message
      })
    })
  }
})