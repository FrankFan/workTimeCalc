/**
 * @descriptin: 工时计算器 design for ctriper
 * http://oa.cn1.global.ctrip.com/HR/AttendenceCalendar.aspx
 *
 */
// DOM ready
$(function () {
    console.log('ready');

    var workdays;

    $('#calc').click(function(){

        $("#result-ul").empty();

        chrome.tabs.getSelected(null, function(tab){
            // 向tab发送请求
            chrome.tabs.sendRequest(tab.id, {action: 'getDays'}, function(response){

                if(response !== 'undefined'){
                    if(response.message && response.message === 'empty'){
                        $("#result-ul").append('<li> 请在 http://oa.cn1.global.ctrip.com/HR/AttendenceCalendar.aspx 页面中使用此插件 </li>');
                    }else if(response.days){
                        workdays = response.days;
                        for (var key in workdays) {
                            var element= '<li> '+ (parseInt(key) + 1) +'日: ' + workdays[key] + '</li>';
                            $("#result-ul").append(element);
                        }
                    }
                }
            });
        });

        console.log('over');

    });
});

