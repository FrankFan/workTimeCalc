// 监听扩展程序进程或内容脚本发送的请求
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    debugger;
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    if(request.action === 'getDays'){
        var days = calcWorkTime();
        sendResponse({
            days: days
        });
    }
});


function calcWorkTime () {

    var obj = {};

    // 获取DOM所有的日期div
    var days = document.querySelectorAll("#ctl00_cphMain_CalendarAC tbody tr td table.listAC");
    for(var i = 0, len = days.length; i < len; i++){
        var day = days[i];

        // 获取每个日期格子里的打卡 开始时间~结束时间 | 无刷卡记录
        var textOrHour = day.querySelectorAll('.list_body')[1].querySelector('td').innerText;
        if (textOrHour !== '无刷卡记录') {
            // 计算一天工作了多长时间 时间格式： "09:42~18:44"
            var startdate = textOrHour.split('~')[0];
            var enddate = textOrHour.split('~')[1];
            // 一天工作小时数
            var result = datediff(startdate, enddate);
            obj[i] = result;
        };
    }

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
        retValue = setFront(workHour) + 'h' + setFront(workMin) + 'm';
    }else{
        retValue = setFront(workHour) + 'h' + setFront(workMin) + 'm';
    }

    return retValue;
}

/**
 * @description: 给时间<10的设置前导数字0
 *
 */
function setFront(num){
    // 验证
    if(typeof(num) !== 'number')
        return;
    if(num < 10){
        num = '0' + num;
    }
    return num;
}