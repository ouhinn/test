<template>
    <div id="tmpl">
        <!-- 3.0使用组件 子组件=>父组件传值: 父绑定imgs,子用props来接收--> 
        <div id="slider">
            <slider :imgs="list"></slider>
        </div>

        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">新闻资讯</div></router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                    <span class="mui-icon mui-icon-email"></span>
                    <div class="mui-media-body">图片分享</div></router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">商品购买</div></router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/feedback">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div></router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/video">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视频专区</div></router-link>
                </li>

                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/callme">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">关于我们</div></router-link>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import slider from './subcom/slider.vue';   //2.0导入公共轮播图组件

    export default{     //1.0注册轮播图组件
        components:{
            slider
        },
        data(){
            return {
                list:[]
            }
        },
        created(){
            this.getimgs();
        },
        methods:{
            getimgs(){
                var url = 'api/getlunbo';
                this.$http.get(url).then(function(response){
                    var data = response.body;

                    if (data.status != 0) {
                        Toast(data.message);
                        return;
                    }
                    this.list = data.message;
                });
            }
        }
    }
</script>

<style scoped>
    #slider {
        height: 250px
    }
    .mui-content ul {
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border-right: 0px;
        border-bottom: 0px;
    }
    .mui-grid-view.mui-grid-9 {
        border-top: 0px;
        border-left: 0px;
    }
    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content: '';
        display: inline-block;
        width: 50px;
        height: 50px;
        background-repeat: round;
    }
    .mui-icon-home:before {
        background-image: url(../../statics/imgs/1.png);
    }
    .mui-icon-email:before {
        background-image: url(../../statics/imgs/2.png);
    }
    .mui-icon-chatbubble:before {
        background-image: url(../../statics/imgs/3.png);
    }
    .mui-icon-location:before {
        background-image: url(../../statics/imgs/4.png);
    }
    .mui-icon-search:before {
        background-image: url(../../statics/imgs/5.png);
    }
    .mui-icon-phone:before{
        background-image: url(../../statics/imgs/6.png);
    }
</style>