Page({
  data: {
    address:{},
    goods: [],
    sumPrice: 0,
  },
  getAddress(){
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          address:{
            name: res.userName,
            number: res.telNumber,
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        wx.setStorageSync("address", this.data.address)
      }
    })
  },
  onLoad(){
    this.setData({
      address: wx.getStorageSync("address")||{}
    })
  },
  onShow(){
    let goods = wx.getStorageSync("goods")||[];
    this.setData({
      goods
    })
    this.handleAllPrice();
  },
  caculate(e){
    const {number,index} = e.target.dataset;
    this.data.goods[index].number += number;
    if (this.data.goods[index].number === 0){
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        success: (res) => {
          if (res.confirm) {
            this.data.goods.splice(index,1);
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
    wx.setStorageSync("goods",this.data.goods)
  },
  handleAllPrice(){
    let price = 0
    for (let i = 0; i < this.data.goods.length; i++) {
      price += this.data.goods[i].number * this.data.goods[i].price
    }
    this.setData({
      sumPrice: Number(price).toFixed(2)
    })
  }
})