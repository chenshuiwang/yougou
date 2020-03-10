// pages/auth/index.js
import request from '../../utils/request.js'
Page({
  data:{

  },
  handleUserInfo(w){
    console.log(w)
    const { encryptedData, rawData, iv, signature} = w.detail;
    // 获取code
    wx.login({
      success(res) {
        if (res.code) {
          // 获取token
          request({
            url:'/users/wxlogin',
            method:'POST',
            data:{
              encryptedData,
              rawData, 
              iv, 
              signature,
              code:res.code
            }
          }).then(res => {
            wx.setStorageSync("token", res.data.message.token);
            wx.navigateBack();
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})