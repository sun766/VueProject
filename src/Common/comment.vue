<template>
       <div>
            <!-- 评论功能 -->
            <div class="comm">
                <h4>提交评论</h4>
                <textarea  placeholder="请输入评论内容" v-model="text"></textarea>
                <button class="mui-btn mui-btn-primary" @click="submit">发表</button>
            </div>
           <!-- 评论列表 -->
            <div class="list">
                <h4>评论列表</h4>
                <ul>
                    <li class="line" v-for="(item,index) in commentList" :key="index">
                        <div class="content">{{item.content}}</div>
                        <div class="detailTime">
                            <span>{{item.user_name}}</span><span>{{item.add_time| timeFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                        </div>
                    </li>
                </ul>
                <button class="mui-btn mui-btn-primary" @click="getMore">加载更多</button>
            </div>
       </div>
     
</template>

<script>
export default {
      data:function(){
          return{
                pageIndex:1,
                commentList:[],
                text:''
          }
      },
      created(){
          this.getComment();
      },
      props:['id'],
      methods:{
            getComment(){
                  let url = `/getcomments/${this.id}?pageindex=${this.pageIndex}`;
                  this.$http.get(url)
                  .then((res)=>{
                        if(res.status===200 && res.data.status===0){
                            this.commentList = this.commentList.concat(res.data.message);
                        }
                  })
                  .catch((err)=>{
                      console.error(err)
                  })
              },
              submit(){
                  if(this.text.length==0){
                       this.$toast('请输入内容')
                  }
                  let data = {content:this.text};
                  this.$http.post('/postcomment/'+this.id,data)
                     .then((res)=>{
                         this.commentList.unshift({
                             user_name:'匿名用户',
                             add_time: new Date(),
                             content: this.text
                         })
                         this.text="";
                         this.$toast('评论成功')
                     })
                     .catch((err)=>{
                         console.error(err)
                     })
              },
              getMore(){
                  this.pageIndex++;
                  this.getComment()
              }
      }
}
</script>

<style scoped>
    /* 提交评论样式 */
  .comm {
      padding: 4px;
  }
  .comm textarea {
      display:block;
      margin:10px auto;
      padding: 2px;
      width: 96%;
      resize:none;
      height: auto;
      border-radius: 3px;
  }
  .mui-btn {
      display:block;
      width: 95%;
      margin: 10px auto;
  }
  /* 评论列表样式 */
  .list {
      padding: 4px;
  }
  .list h4 {
      line-height: 50px;
      height: 50px;
      border:1px solid rgba(92,92,92,0.4);
      border-left:0;
      border-right: 0;
      margin:0 -5px;
  }
  .line {
      border-bottom: 1px solid rgba(92,92,92,0.4);
      padding: 3px;
  }
  ul,li {
      list-style:none;
      margin: 0 ;
      padding: 0;
  }
  .list .line {
      padding: 3px 3px;
  }
  .detailTime{
      display: flex;
      justify-content:space-between;
      font-size: 14px;
  }
  .content {
      font-size: 16px;
      color: #000;
      margin: 10px auto;
  }
  .detailTime span:first-child{
      color:skyblue;
      
  }
</style>

