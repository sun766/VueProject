import Vue from 'vue'
import moment from 'moment'
Vue.filter('timeFormat',function(value,formatValue){
     return moment(value).format(formatValue)
})