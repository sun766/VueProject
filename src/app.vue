<template>
    <div class="container">
        <header class="mui-bar mui-bar-nav">
			<a v-if="isShow" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack()"></a>
			<h1 class="mui-title">底部选项卡-div模式</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/member" class="mui-tab-item">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link to="/shopCar" class="mui-tab-item">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/search" class="mui-tab-item">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

		<router-view></router-view>
    </div>
</template>

<script>
//这是一个单页面应用
	 export default {
           data:function(){
			   return {
				   isShow: false
			   }
		   },
		   methods:{
			    goBack:function(){
                        this.$router.go(-1);
				},
                isGoBack(path){
                     let pathArr = ['/home','/member','/shopCar','/search'];
					if(pathArr.indexOf(path)==-1){
                        this.isShow = true
					}else{
						this.isShow= false;
					}
				}
		   },
		   created(){
                 this.isGoBack(this.$route.path)
		   },
		   watch:{
			    $route:function(newValue){
					    this.isGoBack(newValue.path)
				}
		   }
    }
    
</script>

<style scoped>
    
</style>