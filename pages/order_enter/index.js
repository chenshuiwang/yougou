// pages/order_enter/index.js
Page({

  data: {
    cate:["全部","代付款","已付款","退款/退货"],
    current:0
  },
  handleIndex(e){
    console.log(e)
    this.setData({
      current: e.target.dataset.index
    })
  }
  
})