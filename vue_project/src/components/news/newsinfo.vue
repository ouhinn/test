<template>
    <div id="tmpl">
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{ info.add_time | datefmt('YYYY-MM-DD')}} {{info.click}}次浏览</p>
        </div>
        <div class="content" v-html="info.content"></div>
        <comment :id = "id"></comment>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import comment from "../subcom/comment.vue";

    export default {
        components:{
            comment
        },
        data(){
            return{
                id: 0,
                info:[]
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getinfo();
        },
        methods:{
            getinfo(){
                var url = 'api/getnew/'+this.id;
                this.$http.get(url).then(function(res){
                    var body = res.body;
                    if (body.status != 0) {
                        Toast(body.message);
                        return;
                    }
                    this.info = body.message[0];
                })
            }
        }
    }
</script>
<style scoped>
    .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }
    .title,.content{
        padding: 5px;
    }

</style>