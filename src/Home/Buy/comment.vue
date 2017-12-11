<template>
        <div class="mui-content">
            <comment :id="id">

            </comment>
        </div>
</template>

<script>
import  comment  from '../../Common/comment.vue'
export default {
       components:{
           comment
       },
       props:['id']
      
}
</script>

<style scoped>

</style>

