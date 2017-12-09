<template>
     <div class="mui-content">
        <div class="title">
            <h4>{{contentInfo.title}}</h4>
            <span>{{contentInfo.add_time | timeFormat('YYYY-MM-DD') }}</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>点击次数:{{contentInfo.click}}</span>
        </div>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in imgList" :key="index">
                   <a href="#">
                     <img :src="item.src" alt="">
                   </a>
            </li>
           
        </ul> 

        <p class="content" v-html="contentInfo.content">
        
        </p>

        <!-- 评论--> 
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import comment from '../../Common/comment.vue'
    export default {
        data:function(){
            return {
                contentInfo:{},
                imgList:[]
            }
        },
        props:['id'],
        created(){
            this.getInfo();
            this.getImg();
        },
        methods:{
            getInfo:function(){
                this.$http.get('/getimageInfo/'+this.id)
                .then((res)=>{
                    if(res.status===200 && res.data.status ===0){
                        if(res.data.message.length>0){
                            this.contentInfo  = res.data.message[0]
                        }
                    }else{
                            console.log('err')
                        }
                })
                .catch((error)=>{
                    console.error(error)
                })
            },
            getImg(){
                this.$http.get('/getthumimages/'+this.id)
                .then((res)=>{
                    if(res.status===200 && res.data.status===0){
                        this.imgList = res.data.message;
                    }else{
                        console.log('err')
                    }
                })
                .catch((err)=>{
                    console.error(err)
                })
            }
        },
        components:{
            comment
        }
    }
</script>

<style scoped>
    .mui-content {
    background-color: #fff;
  }
  .title {
        margin: 15px 5px;
    }
    
    .title h4 {
        color: dodgerblue;
    }
    
    .title span {
        font-size: 13px;
        color: rgba(92, 92, 92, 0.6);
    }
    /*9宫格样式*/
    
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border-left: 0px;
    }
    
    .mui-table-view-cell img {
        height: 100px;
    }
    
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border-right: 0px;
        border-bottom: 0px;
        padding: 0;
        margin: 0;
    }
    
    .mui-grid-view.mui-grid-9 .mui-table-view-cell>a:not(.mui-btn) {
        padding: 0;
    }
</style>


