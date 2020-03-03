// pages/search/index.js
import request from '../../utils/request.js'
Page({
  data: {
    inputValue:"",
    isShow: false,
    recommend: [],
    isLoading: false,
    lastValue: '',
    history: []
  },
  handleInput(e){
    this.setData({
      isShow: true,
      inputValue: e.detail.value
    })
    this.getRecommend();
  },
  getRecommend(){
    if(this.data.isLoading){
      return;
    }
    this.setData({
      isLoading: true,
      lastValue: this.data.inputValue
    })
    request({
      url: "/goods/qsearch",
      data:{
        query: this.data.inputValue
      }
    }).then(res => {
      console.log(res)
      this.setData({
        recommend:res.data.message,
        isLoading: false
      })
      if (this.data.inputValue !== this.data.lastValue) {
        this.getRecommend();
      }
    })
  },
  handleCancel(){
    this.setData({
      isShow: false,
      inputValue: "",
      recommend: []
    })
  },
  handleEnter(){
    let arr = wx.getStorageSync('history');
    if(!Array.isArray(arr)){
      arr = []
    }
    arr.unshift(this.data.inputValue)
    wx.setStorageSync('history', arr)
    wx.redirectTo({
      url: '/pages/goods_list/index?keyword=' + this.data.inputValue,
    })
  },
  onLoad(){
    let arr = wx.getStorageSync('history');
    if (!Array.isArray(arr)) {
      arr = []
    }
    this.setData({
      history:arr
    })
  },
  handleBlur(){
    this.setData({
      recommend: []
    })
  },
  handleClear(){
    this.setData({
      history: []
    })
    wx.setStorageSync('history', [])
  }
})