<template>
    <div id="tmpl">
        <div class="postcomment">
            <h3>提交评论</h3>
            <textarea placeholder="请输入评论内容" v-model="postcontent"></textarea>
            <mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
        </div>
        <div class="list">
            <h3>评论列表</h3>
            <ul v-for="(item,index) in list">
                <li>
                    <span class="top">第{{index+1}}楼 用户：{{item.user_name}} 发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span><br>
                    <span class="bottom" v-text="item.content"></span>
                </li>
            </ul>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                postcontent:'',
                list:[],
                pageindex:1
            }
        },
        props:['id'], //接受父组件传过来的id值
        created(){  
            this.getcommentlist(this.pageindex);
        },
        methods:{
            getmore(){
                this.pageindex++;
                this.getcommentlist(this.pageindex);
            },
            getcommentlist(pageindex){
                pageindex = pageindex || 1;
                var url = "api/getcomments/"+this.id+"?pageindex="+pageindex;
                
                this.$http.get(url).then(function(res){
                    if (res.body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    //把新页添加到之前页之后 数组拼接
                    this.list = this.list.concat(res.body.message);
                    //this.list = res.body.message;
                });
            },
            postcomment(){
                //判断用户填写评论是否为空
                if (this.postcontent.trim().length<=0) {
                    Toast('评论内容不能为空!');
                    return;
                }
                var url = 'api/postcomment/'+this.id;
                this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
                    Toast(res.body.message);
                    //将最新评论添加到评论列表顶部
                    this.list = [{
                        'user_name': '匿名用户',
                        'add_time': new Date(),
                        'content': this.postcontent
                    }].concat(this.list);
                    
                    this.postcontent = '';
                });
            }
        }
    }
</script>
<style scoped>
    .postcomment {
        padding: 5px;
    }
    .postcomment h3{
        padding-bottom: 2px;
        border-bottom: 1px solid rgba(0,0,0,0.3);
    }
    .list {
        padding: 5px;
    }
    .list ul {
        list-style: none;
        margin-left: -2.5em;
        font-size: 16px;
    }
    .list .top {
        display: inline-block;
        background-color: rgba(0,0,0,0.1);
    }
</style>