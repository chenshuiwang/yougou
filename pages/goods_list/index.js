// pages/goods_list/index.js
import request from '../../utils/request.js'
Page({
  data: {
    products:[],
    current: 0,
    cate:["综合","销量","价格"],
    keyword: '',
    pageNum: 1,
    tips:'加载中',
    isLoading: false
  },
  onLoad(options){
    let {keyword} = options;
    this.setData({
      keyword
    })
    this.getdata()
  },
  getdata(){
    if(this.data.tips === '我也是有底线的'){
      return;
    }
    request({
      url: "/goods/search",
      data: {
        query: this.data.keyword,
        pagesize: 10,
        pagenum: this.data.pageNum
      }
    }).then(res => {
      console.log(res);
      let data = res.data.message.goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2);
        return v;
      })
      this.setData({
        products: [...this.data.products,...data],
        isLoading: true
      })
      if(res.data.message.total === this.data.products.length){
        this.setData({
          tips:"我也是有底线的"
        })
      }
    })
  },
  handleIndex(e){
    this.setData({
      current: e.target.dataset.index
    })
  },
  onReachBottom(){
    if(this.data.isLoading){
      this.setData({
        pageNum: this.data.pageNum + 1,
        isLoading: false
      })
      this.getdata()
    }
  }
})