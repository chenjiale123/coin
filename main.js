import Vue from 'vue'
import App from './App'
import uniRequest from 'uni-request';
import H5Api from './ican-H5Api'


Vue.config.productionTip = true
App.mpType = 'app'
Vue.prototype.qiniu='http://www.d6k1x.cn/'
uniRequest.defaults.baseURL = 'http://www.d6k1x.cn';

uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';




const app = new Vue({
    ...App
})
app.$mount()

