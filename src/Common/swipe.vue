<template>
     <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in imgList" :key="index">
                <a :href="item.url">
                  <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
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
           imgList:[]
        }
    },
    created(){
        this.getImg()
    },
    props:['imgUrl'],
    methods:{
        getImg(){
            this.$http.get(this.imgUrl)
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
}
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
</style>


