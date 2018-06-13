<template>
    <div id="tmpl">
        <ul class="mui-table-view">
            <li v-for="item in list" class="mui-table-view-cell mui-media">
                <router-link v-bind="{to:'/news/newsinfo/'+item.id}">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis' v-text="item.zhaiyao"></p>
                        <div class="ft">
                            <span>发表时间:{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span class="click">点击数：{{item.click}}</span>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                list:[]
            }
        },
        created(){
            this.getnewslists();
        },
        methods:{
            getnewslists(){
                var url = 'api/getnewslist';

                this.$http.get(url).then(function(res){
                    var body = res.body;

                    if (body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    this.list = body.message;
                });
            }
        }
    }   
</script>

<style scoped>
.mui-table-view img{
    height:80px;
    width:80px;
}

.mui-table-view .mui-media-object{
    max-width: 80px;
    line-height: 80px;
}

.ft{
    margin-top: 1.5em;
    font-size: 14px;
    color:#0094ff;
}

.ft .click{
    margin-left: 20px;
}
</style>