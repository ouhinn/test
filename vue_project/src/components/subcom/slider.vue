<template>
    <div id="tmpl">
        <mt-swipe :auto="2000">
            <!-- <mt-swipe-item>111</mt-swipe-item> -->
            <mt-swipe-item v-for="item in imgs">
                <img :src="item.img || item.src">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        props:['imgs'],     //接收父组件传过来的数据
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
    .mint-swipe{
        height: 300px;
    }
    .mint-swipe-item img{
        width: 100%;
    }
    .mint-swipe-item{
        width: 100%;
        height: 300px;
    }

</style>