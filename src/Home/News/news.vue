<template>
  <div class="mui-content ">
    <ul class="mui-table-view space">
        <li class="mui-table-view-cell mui-media" v-for="(item,index) in newsList" :key="index">
            <router-link :to="{name:'infoIndex',params:{id:item.id}}">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body mui-ellipsis">
                   {{item.title}} 
                    <p class='time'>
                        <span>发布时间：{{item.add_time | timeFormat('YYYY-MM-DD HH:mm:ss')}}</span><span>次数：{{item.click}}</span>
                    </p>
                </div>
            </router-link>
        </li>
	</ul>
  </div>
</template>

<script>
    import Vue from 'vue'
    import moment from 'moment'
    Vue.filter('timeFormat',function(value,formatValue){
         return moment(value).format(formatValue)
    })
    export default {
           data(){
               return {
                   newsList:[]
               }
           },
           created(){
               this.getNews()
           },
           methods:{
              getNews(){
                  this.$http.get('/getnewslist')
                  .then((res)=>{
                      if(res.status===200&& res.data.status ===0){
                          this.newsList=res.data.message;
                      }
                      
                  })
                  .catch((err)=>{
                      console.error(err)
                  })
              }
           }
    }
</script>

<style scoped>
   .mui-content > .mui-table-view:first-child {
        margin-top: 0;
   }
    .mui-media-body {
        font-size: 15px;
    }
    .time {
        color: #0094ff;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }
</style>

