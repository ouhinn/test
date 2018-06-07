// 保存用户信息
var userInfo = null;

$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    async: false,
    success: function (res) {

        if (res.error && res.error == 400){
            setTimeout(function(){
                window.location.href = "login.html";
            })
        }

        userInfo = res;
    }
});

$(function(){

    $('#logout').on('click',function(){
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function(res){
                // console.log(res)
                if(res.success){
                    mui.toast("退出成功");
                    setTimeout(function(){
                        location.href = "index.html";
                    },1500)
                }
            }
        })
    });

    // 拼接模板
    var html = template('userTpl', userInfo);

    // 展示用户信息
    $('#userInfoBox').html(html);

});