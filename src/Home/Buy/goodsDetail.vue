<template>
    <div class="mui-content">
        <div class="detail">
            <div class="top">
              <swipe :imgUrl="this.url+this.id"></swipe>
            </div>
        </div>
        <div class="sell">
            <h4>{{goodsInfo.title}}</h4>
            <div class="price">
                市场价：<s>￥{{goodsInfo.market_price}}</s> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 销售价：<span>￥{{goodsInfo.sell_price}}</span>
            </div>
            <div class="num">
                购买数量：
                <num :id="this.id" :stock="goodsInfo.stock_quantity" @numChange="getNum"></num>
                <!-- <div class="ball"></div> -->
            </div>
            <div class="button">
                <button class="mui-btn mui-btn-primary">立刻购买</button>
                <button @click="addCar" class="mui-btn mui-btn-danger">加入购物车</button>
            </div>
        </div>

        <div class="param">
            <h5>商品参数</h5>
            <div class="info">
                <p>商品编号：{{goodsInfo.goods_no}}</p>
                <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                <p>上架时间：{{goodsInfo.add_time | timeFormat('YYYY-MM-DD HH:mm:ss')}}</p>
            </div>
        </div>
        
        <div class="footer">
            <a @click="intro" class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</a>
            <a  @click="comment" class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</a>
        </div>
    </div>
</template>

<script>
    import swipe from '../../Common/swipe.vue'
    import num from '../../Common/num.vue'
    import vmObj from '../../Common/connect'
    //导出组件
    export default {
        data() {
            return {
                 url:'getthumimages/',
                 goodsInfo:{},
                 num:1
            }
        },
        components:{
            swipe,
            num
        },
        props:['id'],
        created(){
            this.getInfo()

        },
        methods:{
            getInfo(){
                 this.$http.get('/goods/getinfo/'+this.id)
                 .then((res)=>{
                     if(res.status===200 && res.data.status ===0){
                         if(res.data.message.length>0){
                             this.goodsInfo = res.data.message[0]
                         }
                     }
                 })
                 .catch((err)=>{
                     console.error(err)
                 })
            },
            comment(){
                this.$router.push({name:'comment',params:{id:this.id}})
            },
            intro(){
                this.$router.push({name:'intro',params:{id:this.id}})
            },
            getNum(num){
                   this.num = num;
            },
            addCar(){
                //点击加入购物车，将该组件的传递给购物车
               vmObj.$emit('sendNum',this.num)
            }
        }
    }
</script>

<style scoped>
      .num {
        position: relative; 
    }
    .ball {
        left: 115px;
        top: 33px;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        transition: all 0.5s linear;
        z-index: 1000;
        
    }
    
    .mui-content {
        background-color: #fff;
    }
    
    .top,
    .sell,
    .param,
    .footer {
        border: 1px solid rgba(92, 92, 92, 0.7);
        border-radius: 5px;
        margin: 5px;
        padding: 10px;
    }
    
    .sell h4 {
        color: dodgerblue;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    
    .price,
    .num,
    .button {
        margin: 10px;
        font-size: 15px;
    }
    
    .price span {
        font-size: 18px;
        color: red;
    }
    
    .param h5 {
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    
    .info {
        margin-top: 10px;
        margin-left: 20px;
    }
    
    .info p {
        margin: 0;
    }
    
    .footer .mui-btn {
        width: 100%;
    }
    
    .footer .mui-btn-danger {
        margin-top: 10px;
    }
</style>
