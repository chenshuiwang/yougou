// pages/personal/index.js
Page({
  onShow(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  data: {

  },
  address(){
    wx.chooseAddress()
  },
  contact(){
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  }
})