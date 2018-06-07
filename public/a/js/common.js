/* 登录拦截 */
$.ajax({
	url: '/employee/checkRootLogin',
	type: 'get',
	success: function (res) {
		if(res.error && res.error==400){
			location.href = "login.html";
		}
    }
});

$(function(){

	$('.login_out_bot').on('click',function(){

        if (confirm("确定要退出吗?")) {
            $.ajax({
                url: '/employee/employeeLogout',
                type: 'get',
                success: function (res) {

                    if (res.success) {

                        location.href = "login.html";

                    } else {

                        alert(res.message);
                    }
                }
            })
        }
	});





    var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});