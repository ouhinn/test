$(function(){

    var size = null;
    var reserveNum = null;

    // 商品Id
    var id = getParamsByUrl(location.href,'id');

    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function(res){

            reserveNum = res.num;
            // console.log(res);
            var html = template('productTpl',res);

            $('#productBox').html(html);

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    });

    $('#productBox').on('tap','.productSize span',function(){

        $(this).addClass('active').siblings('span').removeClass('active');

        // 用户选择的尺码
        size = $(this).html();

    });

    var inp = $('#inp');

    $('#increase').on('tap',function () {
        var num = inp.val();
        num++;
        if(num>reserveNum){
            num = reserveNum;
        }
        inp.val(num);
    });

    $('#reduce').on('tap',function () {
        var num = inp.val();
        num--;
        if(num < 1){
            num = 1;
        }
        inp.val(num);
    });

    $('#addCart').on('tap',function(){
        if (!size){
            alert("请选择尺码");
            return;
        }
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num: inp.val(),
                size: size
            },
            success: function(res){
                if(res.success){
                    mui.confirm("商品已添加到购物车,跳转到购物车?",function(message){
                        // console.log(message)
                        if(message.index){
                            location.href = "cart.html";
                        }
                    })
                }
            }
        })
    })

});