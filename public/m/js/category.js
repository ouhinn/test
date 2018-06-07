$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 获取一级分类
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function(res){
            var html = template('category-first',{result:res.rows});
            $("#links").html(html);

            if (res.rows.length){
                // 默认第一个active样式
                $('#links').find('a').eq(0).addClass('active');
                var id = res.rows[0].id;

                getSecondCategory(id);
            }
        }
    });

    $("#links").on('click','a',function(){
        var id = $(this).attr('data-id');

        // 添加active样式
        $(this).addClass('active').siblings().removeClass('active');

        getSecondCategory(id);

    });
    /* 封装获取二级目录的方法 */
    function getSecondCategory(id){
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data:{
                id: id
            },
            success: function (res) {
                // console.log(res);
                var html = template('category-second',res);
                $('#brandLists').html(html);
            }
        })
    }


});