$(function(){
    $('body').on('tap','a',function(){
        /*mui.openWindow({
            url: $(this).attr('href')
        })*/

        location.href = $(this).attr('href');
    });

});

/**
 * 获取地址栏参数
 * @param url
 * @param name
 * @returns {*}
 */
function getParamsByUrl(url,name) {

    var params = url.substr(url.indexOf('?')+1);
    // location.search 获取地址栏参数
    // console.log(params);
    var param = params.split('&');
    // console.log(param)

    for (var i=0; i<param.length;i++){
        // console.log(param[i]);
        var current = param[i].split('=');
        // console.log(current)
        if (current[0]== name){
            // console.log(current[1]);
            return current[1];
        }
        return null;
    }
}