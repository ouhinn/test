/*
* @Author: Administrator
* @Date:   2018-03-02 21:15:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-02 21:15:54
*/
for (var i = 1; i< 11; i ++) {
  (function(i) {
    setTimeout(function () {
      console.log(i)
    }, 500 * i)
  })(i)
}