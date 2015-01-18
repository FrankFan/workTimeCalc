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

        console.log('click calc btn');

        chrome.tabs.getSelected(null, function(tab){
            // 向tab发送请求
            chrome.tabs.sendRequest(tab.id, {action: 'getDays'}, function(response){

                if(response !== 'undefined' && response.days){

                    workdays = response.days;
                    for (var key in workdays) {
                        var element= '<li> '+ (key + 1) +'日: ' + workdays[key] + '</li>';
                        $("#result-ul").append(element);
                    }
                }
            });
        });

        console.log('over');

    });
});

