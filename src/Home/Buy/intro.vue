<template>
        <div class="mui-content">
            <h3>{{introObj.title}}</h3>
            <div v-html="introObj.content" class="content"></div>
        </div>
</template>

<script>
import '../../../static/css/style.css'
export default {
      data: function(){
          return {
               introObj:{}
          }
      },
      props:['id'],
      created(){
            this.getIntro()
      },
      methods:{
          getIntro(){
               this.$http.get('/goods/getdesc/'+this.id)
               .then((res)=>{
                   if(res.status===200 && res.data.status===0){
                       if(res.data.message.length>0){
                           this.introObj=res.data.message[0]
                       }
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
     .mui-content{
         background:#fff;
     }
      h3 {
        font-size: 16px;
        font-weight: bold;
        color: #0094ff;
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;

    }
    .content p {
        font-size: 14px;
    }
    img {
       width:100%;
    }
</style>


