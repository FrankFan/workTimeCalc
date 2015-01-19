/**
 * @descriptin: 工时计算器 design for ctriper
 * http://oa.cn1.global.ctrip.com/HR/AttendenceCalendar.aspx
 *
 */
// DOM ready
$(function () {
    console.log('ready');

    var workdays;

    $('#btnCalc').click(function(){

        $("#result-ul").empty();

        chrome.tabs.getSelected(null, function(tab){
            // 向tab发送请求
            chrome.tabs.sendRequest(tab.id, {action: 'getDays'}, function(response){

                if(typeof response !== 'undefined'){
                    if(response.message && response.message === 'empty'){
                        var innerHtml = '<li> 1. 请保持OA系统是登录状态 <a href="http://oa.cn1.global.ctrip.com/" target="_blank">http://oa.cn1.global.ctrip.com/</a>  </li>';
                        innerHtml += '<li> 2. 一定要打开 <a target="_blank" href="http://oa.cn1.global.ctrip.com/HR/AttendenceCalendar.aspx">http://oa.cn1.global.ctrip.com/HR/AttendenceCalendar.aspx</a> 点击查询按钮再使用</li>';
                        $("#result-ul").append(innerHtml);
                    }else if(response.days){
                        workdays = response.days;
                        for (var key in workdays) {
                            var element= '<li> '+ (parseInt(key) + 1) +'日: ' + workdays[key] + '</li>';
                            $("#result-ul").append(element);
                        }
                    }
                }else{
                    $("#result-ul").append('<li> 同学,你打开方式不对啊 ~ 呜呜呜~~~~(>_<)~~~~  </li>');
                }
            });
        });

        console.log('over');

    });
});

