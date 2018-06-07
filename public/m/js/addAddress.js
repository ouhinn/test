$(function(){
    /* 判断是添加页还是编辑页 */
    // 取出地址栏isEdit参数
    var isEdit = Number(getParamsByUrl(location.href,'isEdit'));
    console.log(isEdit);

    if(isEdit){
        // =1为真,编辑页
        if (localStorage.getItem('editAddress')){
            var address = JSON.parse(localStorage.getItem('editAddress'));
            console.log(address);
            var html = template('editTpl',address);
            $('#editForm').html(html);
        }
    }else{
        // =0, 添加页
        var html = template('editTpl',{});
        $('#editForm').html(html);
    }



    // 初始化picker选择器
    var picker = new mui.PopPicker({layer:3});
    // 设置数据
    picker.setData(cityData);
    // 点击表单 显示选择器
    $('#selectCity').on('tap',function(){
        picker.show(function(selectItems){
            // console.log(selectItems);
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });
    });


    /* 添加收货地址 */
    $('#addAddressBtn').on('tap',function(){
        var username = $.trim($("[name='userName']").val());
        var postCode = $.trim($("[name='postCode']").val());
        var city = $.trim($("[name='city']").val());
        var detail = $.trim($("[name='detail']").val());

        if(!username && !postCode && !city && !detail){
            mui.toast("请输入完整信息");
            return;
        }

        var data = {
            address: city,
            addressDetail: detail,
            recipients: username,
            postcode: postCode
        };
        // 判断不同页面的url和data
        if(isEdit){
            var url = '/address/updateAddress'
            data.id = address.id;
        }else {
            var url = '/address/addAddress'
        }

        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function(res){
                if (isEdit){
                    mui.toast("地址修改成功");
                }else{
                    mui.toast("地址添加成功");
                }
                setTimeout(function(){
                    location.href = "address.html";
                },1500)
            }
        })

    });



});