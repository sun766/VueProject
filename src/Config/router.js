
import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

import home from '../Home/home.vue'
import member from '../Member/member.vue'
import search from '../Search/search.vue'
import shopCar from '../ShopCar/shopCar.vue'

import news from '../Home/News/news.vue'
import share from '../Home/Share/share.vue'
import buy from '../Home/Buy/buy.vue'
import feedback from '../Home/Feedback/feedback.vue'
import video from '../Home/Video/video.vue'
import contact from '../Home/Contact/contact.vue'

import infoNews from '../Home/News/info.vue'
import infoShare from '../Home/Share/info.vue'
import goodsDetail from '../Home/Buy/goodsDetail.vue'
import comment from '../Home/Buy/comment.vue'
import intro from '../Home/Buy/intro.vue'

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
        
        {name:'infoIndex',path:'/news/:id',component:infoNews,props:true},
        {name:'infoShare',path:'/info/:id',component:infoShare,props:true},
        {name:'goodsDetail',path:'/detail/:id',component: goodsDetail,props: true},
        {name:'comment' , path:'/comment/:id',component: comment,props:true},
        {name:'intro',path:'/intro/:id',component: intro,props:true}
    ]
})

export default router;