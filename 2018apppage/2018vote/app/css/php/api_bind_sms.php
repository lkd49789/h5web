<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== APP用户绑定设备号短信发送 ==========================
POST参数
  appid     APPID
  apptoken  APPToken
  phone     绑定手机号码
  dev_cd    设备号

返回
  errcode = 0 请求成功


说明
  APP独有功能，首次绑定成功后手机号码今后将无法修改
  连续5次绑定失败30分钟内会被禁止再次发送
  1601  APPToken验证失败
  1602  找不到用户信息
  1603  电话号码与绑定信息不符
  1604  该设备号已经绑定
*/

php_begin();

// 参数检查
$args = array('appid', 'apptoken', 'phone', 'dev_cd');

if (!chk_empty_args('POST', $args))
  exit_error('120', "参数错误");

// 提交参数整理
$appid = intval($_POST['appid']);
// $apptoken = get_arg_str('POST', 'apptoken', 255);
$phone = get_arg_str('POST', 'phone');
$dev_cd = get_arg_str('POST', 'dev_cd');

// 构造API提交数据
$post_data = append_api_post(array('appid'=>$appid, 'apptoken'=>$_POST['apptoken'], 'phone'=>$phone, 'dev_cd'=>$dev_cd), 0);

// 调用APP用户绑定设备号短信发送API，发送验证码
$apidata = Api::app_bind_sms($post_data);

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
