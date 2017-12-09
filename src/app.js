
import app from './app.vue'
import Vue from 'vue'
import vueRouter from 'vue-router'
import axios from 'axios'

import home from './Home/home.vue'
import member from './Member/member.vue'
import search from './Search/search.vue'
import shopCar from './ShopCar/shopCar.vue'

import news from './Home/News/news.vue'
import share from './Home/Share/share.vue'
import buy from './Home/Buy/buy.vue'
import feedback from './Home/Feedback/feedback.vue'
import video from './Home/Video/video.vue'
import contact from './Home/Contact/contact.vue'

import infoNews from './Home/News/info.vue'

import '../static/css/mui.css'

axios.defaults.baseURL = 'http://127.0.0.1:8899/api';
Vue.prototype.$http = axios;
Vue.use(vueRouter)
let router = new vueRouter({
    linkActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member },
        {path:'/shopCar',component:shopCar},
        {path:'/search',component:search},

        {path:'/news',component:news},
        {path:'/share',component:share},
        {path:'/buy',component:buy},
        {path:'/share',component:share},
        {path:'/feedback',component:feedback},
        {path:'/video',component:video},
        {path:'/contact',component:contact},
        
        {name:'infoIndex',path:'/news/:id',component:infoNews,props:true}

    ]
})

let vm = new Vue({
   
    el:'#app',
    router,
    render:function(createElement){
        return createElement(app)
    }
})