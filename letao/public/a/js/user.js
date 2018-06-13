$(function () {

    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page:1,
            pageSize: 10
        },
        success: function (res) {
            console.log(res);
            var html = template('formTpl',res);
            // console.log(html)
            $('#formBox').html(html);
        }
    });

    /*
    * 判断用户的状态:
    * 1, 添加点击事件 2, 提取用户当前的状态 3, 调用接口,传递当前的参数 4, 重载页面
    * */
    $('#formBox').on('click','.editBtn', function(){
        var isDelete = Number($(this).attr("data-isDelete"));
        var id = $(this).attr("data-id");
        // alert(typeof (isDelete));
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            success: function(res){
                if(res.success){
                    location.reload();
                }
            }
        })
    })






});