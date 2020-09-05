import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import api from './api/index.js'
import './styles/iconfont/index.css';

Vue.prototype.api = api
Vue.use(uView)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
