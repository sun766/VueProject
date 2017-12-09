<template>
    <div class="mui-content">
        <div class="title">
            <h3>{{info.title}}</h3>
            <span>{{info.add_time | timeFormat('YYYY-MM-DD HH:mm:ss')}}&nbsp;&nbsp;&nbsp;&nbsp;{{info.click}}次浏览</span>
        </div>
        <div class="details" v-html="info.content" ></div>
        
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
    import '../../../static/css/style.css'
    export default {
          data(){
              return {
                  info:{},
                  pageIndex:1,
                  commentList:[],
                  text:''
              }
          },
          props:['id'],
          created(){
              this.getInfo();
              this.getComment();
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
              },
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
                  console.log(this.text);
                  let data = {content:this.text};
                  this.$http.post('/postcomment/'+this.id,data)
                     .then((res)=>{
                         console.log(res);
                         this.commentList.unshift({
                             user_name:'匿名用户',
                             add_time: new Date(),
                             content: this.text
                         })
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
