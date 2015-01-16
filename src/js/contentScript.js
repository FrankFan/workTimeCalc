// 监听扩展程序进程或内容脚本发送的请求
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    debugger;
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    if(request.action === 'getDays'){

        console.log('chrome.extension.onRequest.addListener callback');

        var days = calcWorkTime();
        sendResponse({
            days: days
        });
    }
});


function calcWorkTime () {
    //验证
    var obj = {};

    debugger;
    // 获取所有的日期框
    var days = document.querySelectorAll("#ctl00_cphMain_CalendarAC tbody tr td table.listAC");
    for(var i = 0, len = days.length; i < len; i++){
        var day = days[i];

        // 获取每个日期格子里的打卡 开始时间~结束时间 | 无刷卡记录
        var textOrHour = day.querySelectorAll('.list_body')[1].querySelector('td').innerText;
        if (textOrHour !== '无刷卡记录') {
            // 计算一天工作了多长时间 时间格式： "09:42~18:44"
            var startdate = textOrHour.split('~')[0];
            var enddate = textOrHour.split('~')[1];
            //
            var result = datediff(startdate, enddate);
            obj[i] = result;
        };
    }

    console.dir(obj);

    return obj;
}

/**
 * @description:  计算两个时间差
 * @version: v0.1
 */
function datediff(startdate, enddate) {
    var retValue,
        endHour = enddate.split(':')[0],
        endMin  = enddate.split(':')[1],
        startHour = startdate.split(':')[0],
        startMin = startdate.split(':')[1],
        workHour = parseInt(endHour) - parseInt(startHour),
        workMin  = parseInt(endMin) - parseInt(startMin);

    if (workMin < 0) {
        workMin = 60 + workMin;
        workHour = workHour - 1;
        retValue = workHour + 'h' + workMin + 'm';
    }else{
        retValue = workHour + 'h' + workMin + 'm';
    }

    return retValue;
}