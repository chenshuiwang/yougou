const request = (config = {}) => {
  return new Promise((resolve,reject) => {
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