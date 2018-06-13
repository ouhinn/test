$(function(){

    var address = null;

    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function(res){

            address = res;
            // console.log(res)
            var html = template('addressTpl',{result: res});
            $("#addressBox").html(html);
        }

    });

    $('#addressBox').on('tap','#deleteBtn',function(){

        var id = this.getAttribute('data-id');
        var li = this.parentNode.parentNode;
        mui.confirm("确认要删除吗?",function(message){
            // console.log(message)
            if(message.index == 1){
                // console.log('我一个人走')
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function(res){
                        if(res.success){
                            location.reload()
                        }
                    }
                })
            }else {
                // console.log('天涯海角留')
                mui.swipeoutClose(li);
            }
        });
    });

    $('#addressBox').on('tap','#editBtn',function(){
        var id = this.getAttribute('data-id');

        for(var i=0; i<address.length; i++){
            if(address[i].id == id ){
                localStorage.setItem('editAddress',JSON.stringify(address[i]));
                break;
            }
        }
        location.href = "addAddress.html?isEdit=1";
    })
});