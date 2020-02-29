//index.js
import request from '../../utils/request.js'
Page({
  onLoad(){
    //请求轮播图数据
    request({
      url:'/home/swiperdata'
    }).then(res => {
      // console.log(res)
      this.setData({
        banners: res.data.message
      })
    })
    //请求分类菜单数据
    request({
      url: '/home/catitems'
    }).then(res => {
      res.data.message.map((v,i) => {
        if(i === 0){
          v.navigator_url = "/pages/category/index"
        }
        return v;
      })
      this.setData({
        menu: res.data.message
      })
    })
    //请求楼层数据
    request({
      url: '/home/floordata'
    }).then(res => {
      console.log(res)
      this.setData({
        floor: res.data.message
      })
    })
  },
  data:{
    banners: [],
    menu: [],
    floor: [],
    isShow: false
  },
  //回到顶部
  handleToTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //监听页面滚动
  onPageScroll(e){
    let show = this.data.isShow;
    if(e.scrollTop > 100){
      show = true;
    }else{
      show = false;
    }
    if(show === this.data.isShow){
      return;
    }else{
      console.log(123)
      this.setData({
        isShow: show
      })
    }
  }
})
