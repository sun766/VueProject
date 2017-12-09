<template>
   <div class="mui-content">
        <div class="title">
            <ul :style="ulWidth">
                <li>
                    <a @click.prevent="getDetail(-1)"  href="#">全部</a>
                </li>
                <li v-for="item in cateList" :key="item.id">
                    <a @click.prevent="getDetail(item.id)" href="#">{{item.title}}</a>
                </li>
            </ul>
        </div>
        <div class="images">
            <ul>
                <li v-for="item in detailList" :key="item.id">
                    <router-link :to="{name:'infoShare',params:{id:item.id}}">
                        <img :src="item.img_url" alt="">
                        <p class="cover">
                            <span>{{item.title}}</span><br>
                            {{item.zhaiyao}}
                        </p>
                    </router-link>
                </li>
              
            </ul>
        </div>
   </div>
</template>

<script>
    export default {
        data:function(){
            return {
                 cateList:[],
                 detailList:[],
                 ulWidth:'width: 1000px'

            }
        },
        created(){
            this.getCate();
            this.getDetail(-1);
        },
        methods:{
            getCate:function(){
                 this.$http.get('/getimgcategory')
                    .then((res)=>{
                        if(res.status===200 && res.data.status===0){
                            this.cateList= res.data.message;
                            this.ulWidth = 'width:'+(78*this.cateList.length+50) +'px';
                        }else{
                            console.log('error')
                        }
                    })
                    .catch((err)=>{
                        console.error(err)
                    })
            },
            getDetail:function(id){
                this.$http.get('/getimages/'+id)
                .then((res)=>{
                    if(res.status===200 && res.data.status===0){
                        this.detailList = res.data.message;
                    }
                })
            }
           
        }
    }
</script>

<style scoped>
     ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
  }
  
  .title {
      overflow-x: auto;
      overflow-y: hidden;
  }
  
  .title>ul {
      width: 1000px;
  }
  /* webkit核心的浏览器 隐藏滚动条 */
  ::-webkit-scrollbar{
    display:none;
  }
  
  .title>ul>li {
      display: inline-block;
      padding: 20px 5px;
  }
  
  .images {
      margin-top: 10px;
  }
  
  .images>ul {}
  
  .images img {
      height: 300px;
      width: 100%;
  }
  
  .images>ul>li {
      position: relative;
  }
  
  .images .cover>span {
      font-weight: bold;
  }
  
  .images .cover {
      color: #fff;
      position: absolute;
      left: 0px;
      bottom: 0px;
      background-color: rgba(92, 92, 92, 0.4);
      width: 100%;
      margin-bottom: 5px;
  }
</style>
