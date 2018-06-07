$(function(){

    $('#registerBtn').on('click',function(){

        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var againPass = $('[name="againPass"]').val();
        var vCode = $('[name="vCode"]').val();


        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode

            },
            success: function(res){
                // console.log(res)
                alert("注册成功");
                setTimeout(function(){
                    location.href = "login.html";
                }, 2000)
            }
        })
    });

    $('#getCode').on('click',function(){
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function(res){
                // console.log(res.vCode);
                $('[name=vCode]').val(res.vCode);
            }
        })
    })



});