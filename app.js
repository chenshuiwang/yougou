//app.js
import request from './utils/request.js'
App({
  onLaunch(){
    request.defaults.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
  }
})