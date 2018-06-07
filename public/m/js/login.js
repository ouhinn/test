$(function(){

    $('#loginBtn').on('click',function(){
        var username = $.trim($('[name="username"]').val());
        var password = $.trim($('[name="password"]').val());

        // 数据认证


        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            beforeSend: function(){
                $('#loginBtn').html("正在登录...");
            },
            success: function (res) {

                mui.toast("登录成功");

                setTimeout(function(){
                    location.href = "user.html";
                },2000);
            }
        })
    });
});