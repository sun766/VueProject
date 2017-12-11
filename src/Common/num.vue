<template>
        <div>
            <span @click="reduce">-</span>
            <input type="text" v-model="num">
            <span @click="add">+</span>
        </div>
       
</template>

<script>
export default {
    data:function(){
        return {
            num: 1
        }
    },
    props:['id','stock'],
     methods:{
          reduce(){
                if(this.num>1){
                     this.num --;
                }else{
                    this.num=1;
                }
                this.notify()
               
            },
            add(){
                if(this.num<this.stock){
                    this.num++
                }else{
                    this.num=this.stock;
                }
                this.notify()
            },
            notify(){
                //只要触发-/+就会发送给父组件
                this.$emit('numChange',this.num)
            }
     }
}
</script>

<style scoped>
    div {
        display:inline-block;
    }
    .num input,.num span {
        display: inline-block;
         width: 30px;
        height: 30px;
        border: 1px solid #eee;
        margin: 0;
        padding: 0;
       vertical-align: top;
        text-align: center;
        line-height: 30px;
        margin-left: -5px;
    }
</style>
