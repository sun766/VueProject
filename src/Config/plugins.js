import Vue from 'vue'
import axios from 'axios'

import '../../static/css/mui.css'

axios.defaults.baseURL = 'http://127.0.0.1:8899/api';
Vue.prototype.$http = axios;


//mint-ui
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
Vue.use(Mint)
  
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
