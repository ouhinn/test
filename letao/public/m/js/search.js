$(function(){
    $('#search-btn').on('click',function(){
        var keyWord = $(this).siblings('input').val();
        if (keyWord){
            // 搜索跳转之前将关键字存储在keyArr数组中
            keyArr.push(keyWord);
            // 将关键词存在在本地
            localStorage.setItem('keyArr',JSON.stringify(keyArr));

            location.href = "search_result.html?keyword="+keyWord;
        }else{
            alert("请输入要搜索的关键字");
        }
    });

    var keyArr = [];
    if (localStorage.getItem('keyArr')){
        keyArr = JSON.parse(localStorage.getItem('keyArr'));

        var html = template('search_tpl',{result: keyArr});
        $("#historyBox").html(html);
    }

    /* 清空搜索历史 */
    $("#clearBtn").on('click',function(){
        localStorage.removeItem('keyArr');
        $("#historyBox").html("");
        keyArr = [];
    })
});