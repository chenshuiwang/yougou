const request = (config = {}) => {
  return new Promise((resolve,reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if(config.url.search(/^http/) === -1){
      config.url = request.defaults.baseURL + config.url;
    }
    
    wx.request({
      ...config,
      success(res){
        resolve(res)
      },
      fail(res){
        reject(res)
      },
      complete(res){
        request.errors(res)
        wx.hideLoading()
      }
    })
  })
}
request.defaults = {
  baseURL: 'http://157.122.54.189:9095'
}
request.errors = () => {}
request.onError = (callback) =>{
  if(typeof callback === 'function'){
    request.errors = callback;
  }
}
export default request;