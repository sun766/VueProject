<template>
    <div class="mui-content ">
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in imgList" :key="index">
                <a :href="item.url">
                  <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
         <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9 home">
            <li v-for="item in gridList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link :to="item.url">
                    <span class="mui-icon" :class="item.className"></span>
                    <div class="mui-media-body">{{item.title}}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Swipe, SwipeItem } from 'mint-ui';
    import 'mint-ui/lib/style.css'

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);   
    export default {
        data:function(){
            return {
                gridList:[],
                imgList:[]
            }
        },
        created:function(){
            this.getGrid();
            this.getImg()
        },
        methods:{
           getGrid:function(){
               this.$http.get('/getmenus')
               .then((res)=>{
                   if(res.status===200 && res.data.status===0){
                        this.gridList= res.data.message;
                    }
               })
               .catch((err)=>{
                   console.error(err)
               })
           },
           getImg(){
                this.$http.get('/getlunbo')
                .then((res)=>{
                    if(res.status===200 && res.data.status===0){
                        this.imgList= res.data.message;
                    }
                    
                })
                .catch((error)=>{
                    console.log(error)
                })
           }
        }
        
};
</script>

<style scoped>
     /* 轮播图 */
    .mint-swipe{
         height: 250px;
    }
    .mint-swipe img {
        width: 100%;
        height: 100%;
    }
    /* 九宫格 */
    .home {
        background: #fff;
    }
    .mui-icon {
		width: 50px;
		height: 50px;
		background-repeat: round;

	}
    .icon-news {
        background-image: url(../../static/images/menu1.png);
    }
    .icon-share {
        background-image: url(../../static/images/menu2.png);
    }
    .icon-buy {
        background-image: url(../../static/images/menu3.png);
    }
    .icon-feedback{
        background-image: url(../../static/images/menu4.png);
    }
    .icon-video{
        background-image: url(../../static/images/menu5.png);
    }
    .icon-contact{
        background-image: url(../../static/images/menu6.png);
    }
</style>
