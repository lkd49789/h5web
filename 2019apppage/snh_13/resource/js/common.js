// 设置cookies函数
function SetCookie(name, value) {
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000 * 2;
    now.setTime(time);
    document.cookie = name + "=" + escape(value) + '; expires=' + now.toUTCString();
}
// 取cookies函数
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}
// 删除cookie函数
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
// 取得URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
// 激活码格式检查
function IsCode(s) {
    var patrn = /^[a-zA-Z0-9]{13}$/;
    return patrn.exec(s);
}
// 手机号码格式检查
function IsPhone(s) {
    var patrn = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    return patrn.exec(s);
}
// Email格式检查
function IsEmail(s) {
    var patrn = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
    return patrn.exec(s);
}
// 调用API共通函数
function CallApi(api_url, post_data, suc_func, error_func) {
    var api_site = 'https://apimeet.48.cn/join/api/';
    post_data = post_data || {};
    suc_func = suc_func || function () {};
    error_func = error_func || function () {};
    //console.log('Call API:' + api_url);
    // console.log(JSON.stringify(post_data));
    $.ajax({
		"async": false,
        "crossDomain": true,
        "url": api_site + api_url,
        "method": "POST",
        "headers": {},
        "processData": false,
        "contentType": 'application/json',
        "mimeType": "multipart/form-data",
        "data": JSON.stringify(post_data),
        success: function (dt) {
            var response = JSON.parse(dt)
            console.log(JSON.stringify(dt));
            console.log("response.status-------"+response.status);
            console.log("response.errcode-------"+response.errcode);
            // 成功处理数据
            if (response.errcode == 0 || response.errcode == "0") {
                suc_func(response);
            } else {// API返回失败
                error_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}
// 提交报名表处理
function InfoSubmit(post_data, suc_func, error_func) {
    console.log(1);
    var api_url = 'submit';
    CallApi(api_url, post_data, suc_func, error_func);
}
// 邮箱验证邮件重发处理
function EmailSend(phone, email, suc_func, error_func) {
    console.log(2);
    var api_url = 'email/sendagain';
    var post_data = {"phone": phone, "email": email};
    CallApi(api_url, post_data, suc_func, error_func);
}
// 取得浏览器信息
function GetBrowserInfo() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}
/**
 * 禁用按钮
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 * @return {boolean}
 */
function DisableClick($this, btnText) {
    if (!$this) {
        console.warn("$this 不能为空");
        return true;
    }
    var status = Number($this.attr('data-clickStatus') || 1);
    if (status == 0) {
        return true;
    }
    btnText = btnText ? btnText : "处理中";
    $this.attr('data-clickStatus', 0);
    $this.html(btnText);
    return false;
}
/**
 * 激活按钮
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 */
function ActiveClick($this, btnText) {
    if (!$this) {
        console.warn("$this 不能为空");
        return;
    }
    btnText = btnText ? btnText : "确认";
    $this.attr('data-clickStatus', 1);
    $this.html(btnText);
}