<template>
    <div id="tmpl">
        <div class="cate">
            <ul v-bind="{style:'width:'+ulWidth+'px'}">
                <li @click="getimages(0)">全部</li>
                <li v-for="item in cates" @click="getimages(item.id)">{{item.title}}</li>
            </ul>
        </div>
        <div class="imglist">
            <ul>
                <router-link tag="li" v-for="item in list" v-bind="{to:'/photo/photoinfo/'+item.id}" >
                    <img v-lazy="item.img_url">
                    <div class="desc">
                        <h5 v-text="item.title"></h5>
                        <p v-text="item.zhaiyao"></p>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';

    export default{
        data(){
            return{
                cates:[],
                ulWidth:375,
                list:[]
            }
        },
        created(){
            this.getcates();
            var all = 0;
            this.getimages(all);
        },
        methods:{
            getcates(){
                var url = 'api/getimgcategory';
                this.$http.get(url).then(function(res){
                    if (res.body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    this.cates = res.body.message;

                    var w = 73;
                    var count = res.body.message.length+1;
                    this.ulWidth = w*count;
                })
            },
            getimages(cateid){
                cateid = cateid || 0;
                var url = 'api/getimages/'+cateid;
                this.$http.get(url).then(function(res){
                    if (res.body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    this.list = res.body.message;
                })
            }
        }
    }
</script>
<style scoped>
    .cate{
        width: 375px;
        overflow-x: auto;
    }
    .cate ul {
        margin:0; 
        padding-left: 10px;
    }
    .cate li {
        list-style: none;
        display: inline-block;
        color: #0094ff;
        font-size: 14px;
        padding-right: 6px;
        cursor: pointer;
    }
    .imglist ul{
        list-style: none;
        padding-left: 0;
        margin-top: -10px;
    }
    .imglist li {
        position: relative;
        background-color: #999;
    }
    .imglist img{
        width:100%;
        height: 300px;
    }
    .desc {
        position: absolute;
        width: 100%;
        background-color: rgba(0,0,0,0.3);
        bottom: 2px;
        left: 0px;
    }
    .desc h5{
        color: #ffffff;
        font-weight: bold;
    }
    .desc p{
        color:#fff;
    }
    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

    /*滚动条样式*/
    ::-webkit-scrollbar {
        width: 1px;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0,0,0,0);
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255,0,0,0);
    }

</style>