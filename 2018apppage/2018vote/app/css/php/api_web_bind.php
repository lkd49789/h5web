<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== APP用户绑定丝瓜账号 ==========================
POST参数
  appid     APPID
  apptoken  APPToken
  username  丝瓜用户名
  password  丝瓜密码
  dev_cd    设备号


返回
   errcode = 0 请求成功

说明
  连续5次绑定失败30分钟内会被禁止再次绑定

  1401  用户名密码错误
  1402  该丝瓜账号已被其他账户绑定
*/

php_begin();

if (!is_login())
  exit_error('101', "请先登录");

// 参数检查
$args = array('appid', 'apptoken', 'username', 'password', 'dev_cd');

if (!chk_empty_args('POST', $args))
  exit_error('120', "参数错误");

// 提交参数整理
$appid = intval($_POST['appid']);
// $apptoken = get_arg_str('POST', 'apptoken', 255);
$username = get_arg_str('POST', 'username');
$password = get_arg_str('POST', 'password');
$dev_cd = get_arg_str('POST', 'dev_cd');

// 构造API提交数据
$post_data = append_api_post(array('appid'=>$appid, 'apptoken'=>$_POST['apptoken'], 'username'=>$username, 'password'=>$password, 'dev_cd'=>$dev_cd));

// 调用用户资料取得API，取得用户资料
$apidata = Api::app_web_bind($post_data);

// API失败，则返回API的调用结果
if (Api::is_fail($apidata))
  exit_api_error($apidata);

$rtn_ary = array();
$rtn_ary['errcode'] = '0';
$rtn_ary['errmsg'] = '';

$rtn_str = json_encode($rtn_ary);
// 输出内容
php_end($rtn_str);
?>
