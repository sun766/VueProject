<template>
    <div class="mui-content ">
        <swipe :imgUrl="img_url"></swipe>
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
    import swipe from '../Common/swipe.vue'
    export default {
        data:function(){
            return {
                gridList:[],
                img_url:'/getlunbo'
               
            }
        },
        created:function(){
            this.getGrid();
           
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
           }
        },
        components:{
            swipe
        }
        
};
</script>

<style scoped>
    
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
