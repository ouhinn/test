$(function(){
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;

    // 页面加载完显示第一页数据
    getDate();

    /* 点击下一页 */
    $('#nextPage').on('click',function(){
        page++;
        if(page>totalPage){
            page = totalPage;
            alert("已经是最后一页了~")
            return;
        }
        getDate();
    });
    /* 点击上一页 */
    $('#prevPage').on('click',function(){
        page--;
        if(page<1){
            page = 1;
            alert("已经是第一页了~")
            return;
        }
        getDate();
    });


    /* 请求一级分类数据 */
    function getDate(){
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                console.log(res)
                // 获取总页码
                totalPage = Math.ceil(res.total / pageSize);
                var html = template("categoryFirstTpl",res);
                $('#categoryFirstBox').html(html);
            }
        });
    }

    /* 添加一级分类
     * 1, 点击事件 2, 获取输入的数据,校验 3, 调用接口实现功能 4, 重载页面
     */
    $('#addFirstBtn').on('click',function(){
        var firstCategory = $.trim($("[name='categoryFirstName']").val());
        if(!firstCategory){
            alert("请输入创建的分类名称");
            return;
        }
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: {
                categoryName: firstCategory
            },
            success: function(res){
                if(res.success){
                    location.reload();
                }
            }
        })

    });



});