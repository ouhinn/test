$(function(){

    /**
     *  给确认修改注册点击事件
     *  获取表单用户输入的数据
     *  验证数据
     *  调用修改密码接口
     *  跳转到登录页面重新登录
     */
    $("#modifyBtn").on('tap',function(){
        var originPass = $.trim($('[name="originPass"]').val());
        var newPass = $.trim($('[name="newPass"]').val());
        var confirmPass = $.trim($('[name="confirmPass"]').val());
        var vCode = $.trim($('[name="vCode"]').val());

        if(!originPass){
            mui.toast("原密码不能为空");
            return;
        }
        if(newPass !=confirmPass){
            mui.toast("两次输入的密码不一致");
            return;
        }

        /* 发送修改密码请求 */
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function(res){
                mui.toast("密码修改成功");
                setTimeout(function(){
                    location.href = "login.html";
                },1500)
            }
        })

    });


    /* 获取验证码 */
    $("#getCode").on('tap',function(){
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function(res){
                $('[name="vCode"]').val(res.vCode);
            }
        })
    })

});