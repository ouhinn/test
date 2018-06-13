<template>
    <div id="tmpl">
        <h4 v-text="info.title"></h4>
        <p class="line"></p>
        <p v-html="info.content"></p>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            id: 0,
            info: {}
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.getinfo();
    },
    methods:{
        getinfo(){
            var url = 'api/goods/getdesc/'+this.id;
            this.$http.get(url).then(function(res){
                if(res.body.status != 0){
                    Toast(res.body.message);
                    return;
                }
                this.info = res.body.message[0];
            })
        }
    }
}
</script>
<style scoped>
    
</style>