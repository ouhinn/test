<template>
    <div id="tmpl">
        <!-- 商品轮播图 -->
        <slider :imgs="imgs"></slider>
        <div id="buy">
            <h4>{{info.title}}</h4>
            <ul>
            <li>
                市场价：<s>￥{{info.market_price}}</s>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售价：<span>￥{{info.sell_price}}</span>
            </li>
            <li class="inputli">
                购买数量： <inputnumber v-on:dataobj="getcount" class="inputnumber"></inputnumber>
            </li>
            <li>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small">加入购物车</mt-button>
            </li>
        </ul>
        </div>
        <div id="params">
            <h5>商品参数</h5>
            <ul>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存数量：{{info.stock_quantity}}</li>
                <li>上架时间：{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <div id="other">
            <router-link v-bind="{to:'/goods/goodsdesc/'+id}">
                <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodscomment/'+id}">
                <mt-button type="danger" size="large">商品评论</mt-button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import slider from '../subcom/slider.vue';  /* 1.0 导入轮播图组件*/
import inputnumber from '../subcom/inputNumber.vue';

export default {
    components:{
        slider,      /* 2.0 注册子组件*/
        inputnumber

    },
    data(){
        return {
            id:0,    //商品ID
            imgs:[],
            info:{},
            inputNumberCount:1
        }
    },
    created(){
        this.id = this.$route.params.id;    //获取路由传过来的商品ID值
        this.getimgs();
        this.getinfo();

    },
    methods:{
        //获取inputnumber组件中传入的值
        getcount(count){
            this.inputNumberCount = count;
        },
        getimgs(){
            var url = 'api/getthumimages/'+this.id;
            this.$http.get(url).then(function(res){ 
                if (res.body.status != 0) {
                    Toast(res.body.message);
                    return;
                }
            this.imgs = res.body.message;
            })
        },
        getinfo(){
            var url = 'api/goods/getinfo/'+this.id;
            this.$http.get(url).then(function(res){
                if (res.body.status != 0) {
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
    #buy,#params,#other
    {
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
 .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
 #buy h4{
     color:#0094ff;
    padding: 5px;
 }
 #buy li,#params li{
     list-style: none;
     padding: 8px;
 }

    #buy .price span{
        color:red;
    }

    #other .imgdesc{
        margin-bottom: 10px;
    }
    .inputli{
        position: relative;
    }
    .inputnumber{
        position: absolute;
        left:100px;
        top:5px;
    }
</style>