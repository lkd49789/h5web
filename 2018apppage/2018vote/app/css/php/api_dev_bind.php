<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== APP用户绑定设备号 ==========================
POST参数
  appid     APPID
  apptoken  APPToken
  sms_code  短信验证码
  dev_cd    设备号

返回
  errcode = 0 请求成功

说明
  APP独有功能
  连续5次绑定失败30分钟内会被禁止再次绑定
  1701  找不到用户绑定信息
  1702  APPToken验证失败
  1703  验证码错误
  1704  设备号与请求验证码的设备不一致
*/

php_begin();

// 参数检查
$args = array('appid', 'apptoken', 'sms_code', 'dev_cd');

if (!chk_empty_args('POST', $args))
  exit_error('120', "参数错误");

// 提交参数整理
$appid = intval($_POST['appid']);
// $apptoken = get_arg_str('POST', 'apptoken', 255);
$sms_code = get_arg_str('POST', 'sms_code', 4);
$dev_cd = get_arg_str('POST', 'dev_cd');

// 构造API提交数据
$post_data = append_api_post(array('appid'=>$appid, 'apptoken'=>$_POST['apptoken'], 'sms_code'=>$sms_code, 'dev_cd'=>$dev_cd), 0);

// 调用APP用户绑定设备号API，绑定设备号
$apidata = Api::app_dev_bind($post_data);

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
