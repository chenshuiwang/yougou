// pages/category/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList:[],
    current: 0
  },
  onLoad(){
    request({
      url:'/categories'
    }).then(res => {
      console.log(res);
      this.setData({
        cateList: res.data.message
      })
    })
  },
  handleIndex(e){
    this.setData({
      current: e.target.dataset.index
    })
  }
  
})