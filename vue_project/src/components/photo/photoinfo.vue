<template>
    <div id="tmpl">
        <div class="desc">
            <div class="title">
                <h4>{{photoinfo.title}}</h4>
                <p>{{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}} {{photoinfo.click}}次浏览</p>
            </div>

            <div class="smallImg">
                <ul>
                    <li v-for="(item,index) in list">
                        <img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)">
                    </li>
                </ul>
            </div>

            <p v-html="photoinfo.content"></p>
        </div>
        <!-- 3.0 使用评论组件 -->
        <div class="comment">
            <comment :id="id"></comment>
        </div>
    </div>
</template>

<script>
import comment from '../subcom/comment.vue';//2.0导入评论组件
import { Toast } from 'mint-ui';

    export default{
        components:{
            comment        //1.0注册评论组件
        },
        data(){
            return{
                id:0,
                photoinfo:{
                    // id: 37,
                    // title: "现代简约 明亮的外表卧室卧室背景墙、吊顶黄色",
                    // click: 0,
                    // add_time: "2015-04-18T04:30:50.000Z",
                    // content: "不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计，欧式卧室飘窗装修效果图。</span>"
                },
                list:[  //存储缩略图数据
                    /*{
                        src: 'https://placekitten.com/600/400',
                        w: 600,
                        h: 400
                    },
                    {
                        src: 'https://placekitten.com/1200/900',
                        w: 1200,
                        h: 900
                    }*/
                ]
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getinfo();
            this.getsmallImg();
        },
        methods:{
            getinfo(){
                var url = 'api/getimageInfo/'+this.id;
                this.$http.get(url).then(function(res){
                    if (res.body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    this.photoinfo = res.body.message[0];
                });
            },
            getsmallImg(){
                var url = 'api/getthumimages/'+this.id;
                this.$http.get(url).then(function(res){
                    if (res.body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    //vue-preview组件需要的格式是{src:, w:,h:} ,服务器返回的数据没有w和h,自己添加
                    res.body.message.forEach(function(item){
                        var img = document.createElement('img');
                        img.src = item.src;
                        img.onload = function(){
                            item.h=img.height;
                            item.w=img.width;
                        }
                    });
                    this.list = res.body.message;
                });
            }
        }
    }
</script>
<style scoped>
    .desc {
        padding: 10px;
        border-bottom: 2px solid #ccc;
    }
    .desc .title h4 {
        color: #0094ff;
    }
    .desc .title p {
        color: rgba(0,0,0,.5);
    }
    .smallImg ul {
        padding-left: 5px;
    }
    .smallImg li {
        list-style: none;
        display: inline-block;
        width: 33%;
    }
    .smallImg img {
        width: 100px;
        height: 100px;
    }
</style>