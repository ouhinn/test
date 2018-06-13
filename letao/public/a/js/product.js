$(function(){

    $.ajax({
        url: '/product/queryProductDetailList',
        type: 'get',
        data: {
            page: 1,
            pageSize: 10
        },
        success: function (res) {
            // console.log(res)
            var html = template("productTpl",res);
            $('#productBox').html(html);
        }
    })

    /* 添加商品 */
    // 获取二级分类
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function(res){
            console.log(res)
            var html = template("brandTpl",res);
            $("#brandBox").html(html);
        }
    })

    // 保存上传的图片到数组
    var imageArray = [];
    // 初始化上传照片插件
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {

            imageArray.push(data.result);
            console.log(imageArray)
        }
    });


    $('#addProduct').on('click', function(){

        var proName = $.trim($("[name='proName']").val());
        var oldPrice = $.trim($("[name='oldPrice']").val());
        var price = $.trim($("[name='price']").val());
        var proDesc = $.trim($("[name='proDesc']").val());
        var size = $.trim($("[name='size']").val());
        var num = $.trim($("[name='num']").val());
        var brandId = $.trim($("[name='brandId']").val());

        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                brandId: brandId,
                statu: 1,
                pic: imageArray
            },
            success: function(res){

                if(res.success){

                    location.reload();

                } else {

                    alert(res.message);

                }

            }
        })

    });

});