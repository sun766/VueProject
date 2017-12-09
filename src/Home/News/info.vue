<template>
    <div class="mui-content">
        <div class="title">
            <h3>{{info.title}}</h3>
            <span>{{info.add_time | timeFormat('YYYY-MM-DD HH:mm:ss')}}&nbsp;&nbsp;&nbsp;&nbsp;{{info.click}}次浏览</span>
        </div>
        <div class="details" v-html="info.content" ></div>
        
        <comment :id="id"></comment>
        
       
    </div>
</template>

<script>
    import '../../../static/css/style.css'
    import comment from '../../Common/comment.vue'
    export default {
          data(){
              return {
                  info:{}  
              }
          },
          props:['id'],
          created(){
              this.getInfo();
              
          },
          methods:{
              getInfo(){
                  this.$http.get('/getnew/'+this.id)
                  .then((res)=>{
                      if(res.status===200 && res.data.status===0){
                          if(res.data.message.length>0){
                             this.info = res.data.message[0]
                          }else{
                              alert('无详情')
                          }
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
  /* 文章详情样式 */
  .mui-content {
    background-color: #fff;
  }
  .title {
    padding: 10px 5px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.1);
  }
  .title h3 {
    font-size: 16px;
    font-weight: bold;
    color: #0094ff;
  }
  .title span {
    color: rgba(92, 92, 92, 0.7);
    font-size: 12px;
  }
  .details {
    padding: 5px 5px;
    overflow: hidden;
  }
  
</style>
