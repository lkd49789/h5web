// 弹出成功信息框
function show_OK_msg(title, msg) {
  layer.alert(msg, {
    icon: 1,
    title: title,
    btn: ['OK']
  });
}

// 弹出失败信息框
function show_NG_msg(title, msg) {
  layer.msg(msg, {
    icon: 2,
    title: title,
    btn: ['好吧']
  });
}

// 设置cookies函数
function SetCookie(name, value) {
    document.cookie = name + "=" + escape(value);
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

// 当前用户是否未登录
function IsGuset() {
	if (GetCookie('vote_name') != null) return false;
	return true;
}

// AJAX通用失败处理
function ajax_error_handle(response) {
  $("#action_ctrl").val(0);
  show_NG_msg('处理失败', response.errmsg);
  return false;
}

// 调用API共通函数
function CallApi(api_url, post_data, suc_func, error_func) {

  post_data = post_data || {};
  suc_func = suc_func || function(){};
  error_func = error_func || function(){};
  console.log('Call API:' + api_url);
  console.log(JSON.stringify(post_data));
  
	$.ajax({
		type:'post',
		url:api_url,
		dataType:"json",
		data:post_data,
		success:function(response){
      console.log(JSON.stringify(response));
      // API返回失败
      if (response.errcode != 0) {
				error_func(response);
      } else {
        // 成功处理数据
        suc_func(response);
      }
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// API错误异常
      var response={"errcode":-1,"errmsg":'系统异常，请稍候再试'};
      // 异常处理
      error_func(response);
		}
	});
}

// 用户本地Cookie删除处理
function DelUserCookie() {
	// 退出删除所有Cookie
	DelCookie('vote_name');
  DelCookie('vote_rest');
  DelCookie('vote_total');
}

// 用户登录处理
function Login(username, password, suc_func, error_func) {
	// 用户本地Cookie删除处理
	DelUserCookie();
	var api_url = 'php/api_login.php';
  var post_data={"username":username,"password":password};

  CallApi(api_url, post_data, suc_func, error_func);
}

// 查询用户信息
function UserInfo(suc_func, error_func) {
	var api_url = 'php/api_user_info.php';

  CallApi(api_url, {}, suc_func, error_func);
}

// 投票券激活处理
function ActiveCode(tpcd, suc_func, error_func){
	var api_url = 'php/api_active_code.php';
  var post_data={"tpcd":tpcd};

  CallApi(api_url, post_data, suc_func, error_func);
}

// 登录用户投票处理
function UserVote(sid, tp_no, suc_func, error_func) {
	var api_url = 'php/api_user_vote.php';
  var post_data={"sid":sid,"tp_no":tp_no};

  CallApi(api_url, post_data, suc_func, error_func);
}

// 投票券激活记录查询
function ActiveLog() {
	var api_url = 'php/api_active_log.php';

  CallApi(api_url, {}, suc_func, error_func);
}

// 投票记录查询
function VoteLog() {
	var api_url = 'php/api_vote_log.php';

  CallApi(api_url, {}, suc_func, error_func);
}

// 合计投票记录查询
function VoteSumLog() {
	var api_url = 'php/api_vote_sum_log.php';

  CallApi(api_url, {}, suc_func, error_func);
}
