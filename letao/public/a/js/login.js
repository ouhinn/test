$(function(){

    $('#loginBtn').on('click',function(){

        var username = $.trim($('[name="username"]').val());
        var password = $.trim($('[name="password"]').val());

        if (!username && !password){
            alert("用户名或密码不全");
            return;
        }

        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function(res){

                if(res.success){

                    // 登录成功
                    location.href = "user.html";

                }else {

                    alert(res.message);

                }

            }
        });
    })

});