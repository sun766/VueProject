import Vue from 'vue'
import app from './app.vue'


import './Config/filters'
import router from './Config/router'
import './Config/plugins'
let vm = new Vue({
   
    el:'#app',
    router,
    render:function(createElement){
        return createElement(app)
    },
    created(){
        // Add a request interceptor
        this.$http.interceptors.request.use( (config)=> {
            
            this.$indicator.open('正在加载中......')
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.$http.interceptors.response.use( (response)=> {
             this.$indicator.close()
            return response;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }
})